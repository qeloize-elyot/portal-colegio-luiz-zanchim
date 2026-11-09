-- =====================================================
-- SCHEMA GESTÃO ESCOLAR (funcionalidades do slide)
-- Cole no SQL Editor do Supabase e rode
-- =====================================================

-- 1. Reservas de Laboratórios de Informática
create table if not exists public.lab_reservas (
  id uuid default gen_random_uuid() primary key,
  professor_id uuid references public.profiles(id) not null,
  professor_nome text not null,
  lab text not null default 'Lab 1' check (lab in ('Lab 1', 'Lab 2')),
  data date not null,
  turno text not null check (turno in ('MANHA', 'TARDE')),
  horario text not null, -- ex: '1ª aula', '2ª aula'
  turma text,
  disciplina text,
  observacao text,
  created_at timestamptz default now(),
  unique (lab, data, turno, horario)
);

-- 2. Avisos de ausência / atraso de professores
create table if not exists public.avisos_ausencia (
  id uuid default gen_random_uuid() primary key,
  professor_id uuid references public.profiles(id) not null,
  professor_nome text not null,
  tipo text not null check (tipo in ('FALTA', 'ATRASO', 'ATESTADO')),
  data date not null,
  turno text check (turno in ('MANHA', 'TARDE', 'INTEGRAL')),
  motivo text,
  atestado_url text,
  status text not null default 'PENDENTE' check (status in ('PENDENTE', 'CIENTE', 'SUBSTITUIDO')),
  created_at timestamptz default now()
);

-- 3. Recados fixados e eventos (mural oficial)
create table if not exists public.recados (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  conteudo text not null,
  tipo text not null default 'RECADO' check (tipo in ('RECADO', 'EVENTO', 'VIDEO')),
  fixado boolean default false,
  data_evento date,
  hora_evento text,
  video_url text,
  autor_id uuid references public.profiles(id),
  autor_nome text,
  created_at timestamptz default now()
);

-- 4. Horários oficiais (documentos / links perpétuos)
create table if not exists public.horarios_docs (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descricao text,
  turno text check (turno in ('MANHA', 'TARDE', 'AMBOS')),
  url text,
  tipo text default 'PDF' check (tipo in ('PDF', 'LINK', 'IMAGEM')),
  ordem int default 0,
  created_at timestamptz default now()
);

alter table public.lab_reservas enable row level security;
alter table public.avisos_ausencia enable row level security;
alter table public.recados enable row level security;
alter table public.horarios_docs enable row level security;

-- Lab: todos autenticados leem; professor/admin criam e apagam os próprios
create policy "lab_select" on public.lab_reservas for select using (auth.role() = 'authenticated');
create policy "lab_insert" on public.lab_reservas for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('PROFESSOR', 'ADMIN'))
  and professor_id = auth.uid()
);
create policy "lab_delete" on public.lab_reservas for delete using (
  professor_id = auth.uid()
  or exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

-- Avisos: professor cria o próprio; admin e pedagogos veem todos
create policy "aviso_select" on public.avisos_ausencia for select using (
  professor_id = auth.uid()
  or exists (select 1 from public.profiles where id = auth.uid() and role in ('ADMIN', 'PROFESSOR'))
);
create policy "aviso_insert" on public.avisos_ausencia for insert with check (
  professor_id = auth.uid()
  and exists (select 1 from public.profiles where id = auth.uid() and role in ('PROFESSOR', 'ADMIN'))
);
create policy "aviso_update" on public.avisos_ausencia for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

-- Recados: todos leem; só ADMIN cria/edita/apaga
create policy "recados_select" on public.recados for select using (true);
create policy "recados_insert" on public.recados for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);
create policy "recados_update" on public.recados for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);
create policy "recados_delete" on public.recados for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

-- Horários docs: todos leem; só ADMIN gerencia
create policy "horarios_select" on public.horarios_docs for select using (true);
create policy "horarios_insert" on public.horarios_docs for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);
create policy "horarios_update" on public.horarios_docs for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);
create policy "horarios_delete" on public.horarios_docs for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

create index if not exists lab_reservas_data_idx on public.lab_reservas(data);
create index if not exists avisos_data_idx on public.avisos_ausencia(data);
create index if not exists recados_fixado_idx on public.recados(fixado);
