-- ============================================================
-- COLE TUDO ISTO NO SUPABASE → SQL Editor → Run
-- Corrige permissões e cria tabelas que faltam para EDITAR
-- ============================================================

-- 1) Permitir usuário criar/atualizar o próprio perfil
drop policy if exists "Usuários inserem o próprio perfil" on public.profiles;
create policy "Usuários inserem o próprio perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 2) Tipos de material mais flexíveis (link, pdf, imagem, texto)
alter table public.materiais drop constraint if exists materiais_tipo_check;
alter table public.materiais
  add constraint materiais_tipo_check
  check (tipo in ('LINK', 'ARQUIVO', 'RESUMO', 'PDF', 'IMAGEM', 'TEXTO'));

-- 3) Tabela CARDÁPIO
create table if not exists public.cardapio (
  id uuid default gen_random_uuid() primary key,
  dia text not null unique,
  lanche text not null default '',
  almoco text not null default '',
  updated_at timestamptz default now()
);

insert into public.cardapio (dia, lanche, almoco) values
  ('Segunda-feira', 'Pão com queijo + suco', 'Arroz, feijão, frango, salada'),
  ('Terça-feira', 'Bolo de fubá + leite', 'Arroz, feijão, carne moída, legumes'),
  ('Quarta-feira', 'Fruta + iogurte', 'Arroz, feijão, peixe, salada'),
  ('Quinta-feira', 'Pão + suco', 'Arroz, feijão, estrogonofe, batata'),
  ('Sexta-feira', 'Biscoito + leite', 'Arroz, feijão, lasanha, salada')
on conflict (dia) do nothing;

alter table public.cardapio enable row level security;
drop policy if exists "cardapio_select" on public.cardapio;
drop policy if exists "cardapio_update" on public.cardapio;
drop policy if exists "cardapio_insert" on public.cardapio;
create policy "cardapio_select" on public.cardapio for select using (true);
create policy "cardapio_update" on public.cardapio for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
) with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
);

-- 4) FEIRA
create table if not exists public.feira (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descricao text,
  tipo text not null default 'TROCA',
  contato text,
  autor_id uuid references public.profiles(id),
  created_at timestamptz default now()
);
alter table public.feira enable row level security;
drop policy if exists "feira_select" on public.feira;
drop policy if exists "feira_insert" on public.feira;
drop policy if exists "feira_delete" on public.feira;
create policy "feira_select" on public.feira for select to authenticated using (true);
create policy "feira_insert" on public.feira for insert to authenticated with check (auth.uid() = autor_id);
create policy "feira_delete" on public.feira for delete to authenticated using (
  autor_id = auth.uid()
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
);

-- 5) GRÊMIO
create table if not exists public.gremio_posts (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  conteudo text not null,
  autor_id uuid references public.profiles(id),
  created_at timestamptz default now()
);
alter table public.gremio_posts enable row level security;
drop policy if exists "gremio_select" on public.gremio_posts;
drop policy if exists "gremio_insert" on public.gremio_posts;
drop policy if exists "gremio_delete" on public.gremio_posts;
create policy "gremio_select" on public.gremio_posts for select using (true);
create policy "gremio_insert" on public.gremio_posts for insert to authenticated with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('ADMIN', 'PROFESSOR'))
);
create policy "gremio_delete" on public.gremio_posts for delete to authenticated using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
);

-- 6) ENQUETES
create table if not exists public.enquetes (
  id uuid default gen_random_uuid() primary key,
  pergunta text not null,
  opcoes text[] not null,
  ativa boolean default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);
create table if not exists public.enquete_votos (
  id uuid default gen_random_uuid() primary key,
  enquete_id uuid references public.enquetes(id) on delete cascade,
  user_id uuid references public.profiles(id),
  opcao_index int not null,
  created_at timestamptz default now(),
  unique (enquete_id, user_id)
);
alter table public.enquetes enable row level security;
alter table public.enquete_votos enable row level security;
drop policy if exists "enquetes_select" on public.enquetes;
drop policy if exists "enquetes_insert" on public.enquetes;
drop policy if exists "enquetes_update" on public.enquetes;
drop policy if exists "votos_select" on public.enquete_votos;
drop policy if exists "votos_insert" on public.enquete_votos;
create policy "enquetes_select" on public.enquetes for select using (true);
create policy "enquetes_insert" on public.enquetes for insert to authenticated with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
);
create policy "enquetes_update" on public.enquetes for update to authenticated using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
);
create policy "votos_select" on public.enquete_votos for select using (true);
create policy "votos_insert" on public.enquete_votos for insert to authenticated with check (auth.uid() = user_id);

-- 7) GARANTIR que SUA conta é ADMIN (troque o e-mail se precisar)
update public.profiles
set role = 'ADMIN'
where email ilike '%@%'
  and (
    email = (select email from auth.users order by created_at asc limit 1)
    or role = 'ADMIN'
  );

-- Se ainda não for admin, rode só esta linha com SEU e-mail:
-- update public.profiles set role = 'ADMIN' where email = 'seu.email@escola.pr.gov.br';

select id, email, role from public.profiles;
