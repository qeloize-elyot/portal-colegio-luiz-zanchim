-- =====================================================
-- BIBLIOTECA ESCOLAR
-- Cole no SQL Editor do Supabase e rode
-- =====================================================

create table if not exists public.livros (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  autor text not null,
  categoria text default 'Geral',
  isbn text,
  exemplares int not null default 1 check (exemplares >= 0),
  disponiveis int not null default 1 check (disponiveis >= 0),
  localizacao text, -- prateleira / sala
  sinopse text,
  ativo boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.emprestimos (
  id uuid default gen_random_uuid() primary key,
  livro_id uuid references public.livros(id) on delete cascade not null,
  usuario_id uuid references public.profiles(id) not null,
  usuario_nome text not null,
  data_emprestimo date not null default current_date,
  data_prevista date not null, -- devolução prevista (ex: +14 dias)
  data_devolucao date, -- preenchido quando devolve
  status text not null default 'ATIVO'
    check (status in ('ATIVO', 'DEVOLVIDO', 'ATRASADO', 'CANCELADO')),
  observacao text,
  created_at timestamptz default now()
);

create index if not exists livros_titulo_idx on public.livros using gin (to_tsvector('portuguese', titulo || ' ' || autor));
create index if not exists emprestimos_usuario_idx on public.emprestimos(usuario_id);
create index if not exists emprestimos_status_idx on public.emprestimos(status);

alter table public.livros enable row level security;
alter table public.emprestimos enable row level security;

-- Catálogo: todos autenticados leem
drop policy if exists "livros_select" on public.livros;
drop policy if exists "livros_insert" on public.livros;
drop policy if exists "livros_update" on public.livros;
drop policy if exists "livros_delete" on public.livros;

create policy "livros_select" on public.livros for select using (true);

create policy "livros_insert" on public.livros for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('ADMIN', 'PROFESSOR'))
);

create policy "livros_update" on public.livros for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('ADMIN', 'PROFESSOR'))
);

create policy "livros_delete" on public.livros for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

-- Empréstimos: aluno vê os próprios; staff vê todos; aluno pode solicitar (insert)
drop policy if exists "emp_select" on public.emprestimos;
drop policy if exists "emp_insert" on public.emprestimos;
drop policy if exists "emp_update" on public.emprestimos;

create policy "emp_select" on public.emprestimos for select using (
  usuario_id = auth.uid()
  or exists (select 1 from public.profiles where id = auth.uid() and role in ('ADMIN', 'PROFESSOR'))
);

create policy "emp_insert" on public.emprestimos for insert with check (
  usuario_id = auth.uid()
  and auth.role() = 'authenticated'
);

create policy "emp_update" on public.emprestimos for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('ADMIN', 'PROFESSOR'))
  or usuario_id = auth.uid()
);
