-- Rode no SQL Editor do Supabase (além do schema.sql)

-- Cardápio (um registro por dia da semana)
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

-- Feira de trocas (alunos anunciam livremente)
create table if not exists public.feira (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descricao text,
  tipo text not null default 'TROCA' check (tipo in ('DOACAO', 'TROCA', 'VENDA')),
  contato text,
  autor_id uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Posts do Grêmio
create table if not exists public.gremio_posts (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  conteudo text not null,
  autor_id uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Enquetes
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

alter table public.cardapio enable row level security;
alter table public.feira enable row level security;
alter table public.gremio_posts enable row level security;
alter table public.enquetes enable row level security;
alter table public.enquete_votos enable row level security;

-- Cardápio: todos leem; só ADMIN edita
create policy "cardapio_select" on public.cardapio for select using (true);
create policy "cardapio_update" on public.cardapio for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);
create policy "cardapio_insert" on public.cardapio for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

-- Feira: todos autenticados leem e inserem; autor ou admin apaga
create policy "feira_select" on public.feira for select using (auth.role() = 'authenticated');
create policy "feira_insert" on public.feira for insert with check (auth.uid() = autor_id);
create policy "feira_delete" on public.feira for delete using (
  autor_id = auth.uid()
  or exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

-- Grêmio: todos leem; ADMIN insere/apaga
create policy "gremio_select" on public.gremio_posts for select using (true);
create policy "gremio_insert" on public.gremio_posts for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('ADMIN', 'PROFESSOR'))
);
create policy "gremio_delete" on public.gremio_posts for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

-- Enquetes: todos leem; ADMIN cria; autenticados votam
create policy "enquetes_select" on public.enquetes for select using (true);
create policy "enquetes_insert" on public.enquetes for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);
create policy "enquetes_update" on public.enquetes for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);
create policy "votos_select" on public.enquete_votos for select using (true);
create policy "votos_insert" on public.enquete_votos for insert with check (auth.uid() = user_id);
