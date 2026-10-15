-- =====================================================
-- SCHEMA DO PORTAL COLÉGIO LUIZ ZANCHIM
-- Cole este SQL no Supabase: SQL Editor → New query → Run
-- =====================================================

-- 1. Tabela de perfis (ligada ao auth.users do Supabase)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'ALUNO' check (role in ('ALUNO', 'PROFESSOR', 'ADMIN')),
  turma text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Sugestões e reclamações (podem ser anônimas)
create table if not exists public.feedbacks (
  id uuid default gen_random_uuid() primary key,
  categoria text not null check (categoria in ('Infraestrutura', 'Pedagógico', 'Convivência', 'Outros')),
  texto text not null,
  status text not null default 'PENDENTE' check (status in ('PENDENTE', 'EM_ANALISE', 'RESOLVIDO', 'ARQUIVADO')),
  created_at timestamptz default now()
);

-- 3. Materiais de apoio
create table if not exists public.materiais (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descricao text,
  disciplina text not null,
  turma text not null,
  ano integer,
  url text,
  tipo text default 'LINK' check (tipo in ('LINK', 'ARQUIVO', 'RESUMO')),
  professor_id uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- 4. Ativar Row Level Security
alter table public.profiles enable row level security;
alter table public.feedbacks enable row level security;
alter table public.materiais enable row level security;

-- 5. Políticas de profiles
create policy "Usuários veem o próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuários atualizam o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins veem todos os perfis"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

-- 6. Políticas de feedbacks
-- Qualquer um autenticado (ou anônimo via service) pode inserir
create policy "Qualquer um pode enviar feedback"
  on public.feedbacks for insert
  with check (true);

create policy "Apenas ADMIN vê feedbacks"
  on public.feedbacks for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

create policy "Apenas ADMIN atualiza feedbacks"
  on public.feedbacks for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

-- 7. Políticas de materiais
create policy "Todos autenticados veem materiais"
  on public.materiais for select
  using (auth.role() = 'authenticated');

create policy "Professor e Admin criam materiais"
  on public.materiais for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('PROFESSOR', 'ADMIN')
    )
  );

create policy "Professor edita os próprios / Admin edita todos"
  on public.materiais for update
  using (
    professor_id = auth.uid()
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

create policy "Professor apaga os próprios / Admin apaga todos"
  on public.materiais for delete
  using (
    professor_id = auth.uid()
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

-- 8. Função: criar perfil automaticamente ao se cadastrar
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'ALUNO')
  );
  return new;
end;
$$;

-- Trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 9. Índice útil
create index if not exists feedbacks_status_idx on public.feedbacks(status);
create index if not exists materiais_turma_idx on public.materiais(turma);
