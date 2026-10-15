-- ============================================================
-- CORRIGE: infinite recursion detected in policy for relation "profiles"
-- Cole TUDO no Supabase → SQL Editor → Run
-- ============================================================

-- Funções que leem o role SEM passar pelas policies (security definer)
create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'ADMIN'
  );
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('ADMIN', 'PROFESSOR')
  );
$$;

-- ---------- PROFILES: remove policies recursivas ----------
drop policy if exists "Usuários veem o próprio perfil" on public.profiles;
drop policy if exists "Usuários atualizam o próprio perfil" on public.profiles;
drop policy if exists "Admins veem todos os perfis" on public.profiles;
drop policy if exists "Usuários inserem o próprio perfil" on public.profiles;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admin pode ler todos (usando função, SEM recursão)
create policy "profiles_select_admin"
  on public.profiles for select
  using (public.is_admin());

-- ---------- FEEDBACKS ----------
drop policy if exists "Qualquer um pode enviar feedback" on public.feedbacks;
drop policy if exists "Apenas ADMIN vê feedbacks" on public.feedbacks;
drop policy if exists "Apenas ADMIN atualiza feedbacks" on public.feedbacks;

create policy "feedbacks_insert_all"
  on public.feedbacks for insert
  with check (true);

create policy "feedbacks_select_admin"
  on public.feedbacks for select
  using (public.is_admin());

create policy "feedbacks_update_admin"
  on public.feedbacks for update
  using (public.is_admin());

-- ---------- MATERIAIS ----------
drop policy if exists "Todos autenticados veem materiais" on public.materiais;
drop policy if exists "Professor e Admin criam materiais" on public.materiais;
drop policy if exists "Professor edita os próprios / Admin edita todos" on public.materiais;
drop policy if exists "Professor apaga os próprios / Admin apaga todos" on public.materiais;

create policy "materiais_select"
  on public.materiais for select
  to authenticated
  using (true);

create policy "materiais_insert_staff"
  on public.materiais for insert
  to authenticated
  with check (public.is_staff());

create policy "materiais_update_staff"
  on public.materiais for update
  to authenticated
  using (professor_id = auth.uid() or public.is_admin());

create policy "materiais_delete_staff"
  on public.materiais for delete
  to authenticated
  using (professor_id = auth.uid() or public.is_admin());

-- Tipos flexíveis
alter table public.materiais drop constraint if exists materiais_tipo_check;
alter table public.materiais
  add constraint materiais_tipo_check
  check (tipo in ('LINK', 'ARQUIVO', 'RESUMO', 'PDF', 'IMAGEM', 'TEXTO'));

-- ---------- CARDÁPIO ----------
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
create policy "cardapio_write_admin" on public.cardapio for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- FEIRA ----------
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
create policy "feira_delete" on public.feira for delete to authenticated
  using (autor_id = auth.uid() or public.is_admin());

-- ---------- GRÊMIO ----------
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
create policy "gremio_insert" on public.gremio_posts for insert to authenticated
  with check (public.is_staff());
create policy "gremio_delete" on public.gremio_posts for delete to authenticated
  using (public.is_admin());

-- ---------- ENQUETES ----------
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
create policy "enquetes_insert" on public.enquetes for insert to authenticated
  with check (public.is_admin());
create policy "enquetes_update" on public.enquetes for update to authenticated
  using (public.is_admin());
create policy "votos_select" on public.enquete_votos for select using (true);
create policy "votos_insert" on public.enquete_votos for insert to authenticated
  with check (auth.uid() = user_id);

-- Garante admin na primeira conta / contas já admin
update public.profiles set role = 'ADMIN'
where id in (select id from auth.users order by created_at asc limit 1);

select email, role from public.profiles;
