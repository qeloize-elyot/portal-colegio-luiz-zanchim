# Portal Escolar – Colégio Estadual Cívico-Militar Vereador Luiz Zanchim

Portal web interno da escola (Sarandi/PR). Centraliza rotina escolar, estudos, comunicação, gestão de laboratórios, biblioteca, horários, avisos e canais de participação estudantil.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Supabase (Auth + PostgreSQL + RLS)

---

## Índice de funcionalidades

1. [Início](#1-início)
2. [Login e papéis de acesso](#2-login-e-papéis-de-acesso)
3. [Horários e calendário 2026](#3-horários-e-calendário-2026)
4. [Laboratórios de informática](#4-laboratórios-de-informática)
5. [Biblioteca](#5-biblioteca)
6. [Recados, eventos e vídeos](#6-recados-eventos-e-vídeos)
7. [Aviso de ausência / atraso](#7-aviso-de-ausência--atraso)
8. [Minhas Notas](#8-minhas-notas)
9. [Materiais de apoio](#9-materiais-de-apoio)
10. [Cardápio da cantina](#10-cardápio-da-cantina)
11. [Painel do Grêmio](#11-painel-do-grêmio)
12. [Enquetes escolares](#12-enquetes-escolares)
13. [Feira de trocas](#13-feira-de-trocas)
14. [Dúvidas frequentes (FAQ)](#14-dúvidas-frequentes-faq)
15. [Ouvidoria anônima](#15-ouvidoria-anônima)
16. [Painel administrativo](#16-painel-administrativo)
17. [Navegação e design](#17-navegação-e-design)
18. [Banco de dados (Supabase)](#18-banco-de-dados-supabase)
19. [Como rodar](#19-como-rodar)

---

## 1. Início

Página principal com visual estilo **caderno escolar** (pontilhado, bordas grossas, cores institucionais).

- Mural de abertura com identidade do colégio
- Atalhos para os principais serviços
- Cards ilustrados com ícones SVG animados
- Destaques para materiais e cardápio
- Links rápidos para o restante do portal

**Rota:** `/`

---

## 2. Login e papéis de acesso

Autenticação via **Supabase Auth**.

### Papéis (`profiles.role`)

| Papel        | Quem é                         | O que pode fazer de especial                                      |
|--------------|--------------------------------|--------------------------------------------------------------------|
| `ALUNO`      | Estudante                      | Consultar catálogo, horários, emprestar livros, usar Minhas Notas  |
| `PROFESSOR`  | Docente                       | Reservar laboratório, avisar ausência, gestão de biblioteca        |
| `ADMIN`      | Direção / coordenação / TI     | Tudo do professor + publicar recados, docs de horário, painel admin|

- Perfil criado/atualizado automaticamente no login
- Header mostra e-mail resumido e botão **Sair**
- Rotas sensíveis verificam papel no cliente e no **RLS** do banco

**Rota:** `/login`

---

## 3. Horários e calendário 2026

### Grades de aula (turnos reais da escola)

**Manhã**
- Alunos devem estar no colégio às **7:20**
- Aulas começam às **7:30**
- Cada aula: **50 minutos**
- Intervalo de **15 minutos** após a **3ª aula**
- Término: **12:45**

**Tarde**
- Entrada: **13:10**
- Aulas: **13:20**
- Mesma estrutura de 6 aulas + intervalo
- Saída: **18:35**

### Calendário escolar 2026
- Baseado no calendário oficial (SEED / documentos da escola)
- Trimestres, dias letivos, feriados e recessos destacados
- Apoio para o aluno localizar professor (horários de manhã e tarde digitalizados a partir dos PDFs oficiais)

### Documentos de horário
- Admin pode publicar links/PDFs de grades oficiais (`horarios_docs`)
- Alunos consultam para falar com professor com urgência

**Rota:** `/horarios`

---

## 4. Laboratórios de informática

Sistema de **reserva sem conflito**.

### Regras
- **3 laboratórios:** Lab 1, Lab 2, Lab 3
- **6 aulas** por turno (manhã ou tarde)
- Constraint única: mesmo lab + data + turno + horário = **só 1 reserva**
- **Somente PROFESSOR e ADMIN** podem reservar
- Alunos **apenas consultam** a grade (não reservam)

### O que o professor faz
- Escolhe lab, data, turno e horário
- Informa turma e disciplina (opcional)
- Vê o que já está ocupado
- Pode cancelar a própria reserva (admin cancela qualquer)

**Rota:** `/laboratorios`  
**Tabela:** `lab_reservas`

---

## 5. Biblioteca

Catálogo digital + controle de empréstimo.

### Para o aluno
- Busca por título, autor e categoria
- Filtro: só disponíveis / só emprestados
- Status em tempo quase real: quantos exemplares livres
- Botão **Pegar emprestado** (prazo padrão **14 dias**)
- Limite de **3 empréstimos ativos** por aluno
- Aba **Meus empréstimos** com data de devolução e alerta de atraso

### Para professor / admin (aba Gestão)
- Cadastrar livro (título, autor, categoria, exemplares, localização, ISBN, sinopse)
- Ver empréstimos em aberto
- Registrar **devolução** (volta 1 unidade ao estoque)

### Categorias
Geral, Literatura, Didático, História, Ciências, Infantojuvenil, Referência, Outros

**Rota:** `/biblioteca`  
**Tabelas:** `livros`, `emprestimos`

---

## 6. Recados, eventos e vídeos

Mural oficial da escola.

- Tipos: **RECADO**, **EVENTO**, **VIDEO**
- Recados podem ser **fixados** (destaque no topo)
- Eventos com data/hora
- Vídeos com URL
- **Somente ADMIN** publica, edita ou remove
- Todos os usuários autenticados (e visitantes, conforme policy) leem

**Rota:** `/recados`  
**Tabela:** `recados`

---

## 7. Aviso de ausência / atraso

Canal para o **professor** avisar falta ou atraso à coordenação.

### Regras importantes
- **Só PROFESSOR e ADMIN** registram
- Aluno **não** justifica falta de professor nem de si neste módulo (módulo é institucional de staff)
- Turnos permitidos: **apenas MANHÃ e TARDE** (não existe integral)
- Tipos: `FALTA`, `ATRASO`, `ATESTADO`
- Status: `PENDENTE` → `CIENTE` / `SUBSTITUIDO` (admin atualiza)
- Campo de motivo e link de atestado (quando houver)

**Rota:** `/aviso-ausencia`  
**Tabela:** `avisos_ausencia`

---

## 8. Minhas Notas

Ferramenta prática de acompanhamento de desempenho (**lado do aluno**).

- Adicionar matérias livremente
- Notas por **trimestre**
- Média automática do trimestre e do ano
- Barras de progresso e indicação de risco / meta
- Sugestões criativas de estudo conforme desempenho
- Dados salvos em **localStorage** (privacidade no dispositivo; não grava no servidor)

**Rota:** `/calculadora` (interface “Minhas Notas”)

---

## 9. Materiais de apoio

Repositório de apostilas, slides e listas.

- Organização por série / turma / disciplina (conforme dados cadastrados)
- Download ou link para arquivos
- Foco em apoio ao estudo diário

**Rota:** `/materiais`

---

## 10. Cardápio da cantina

Programação semanal da cantina.

- Lanches do recreio e refeições principais
- Visual por dia da semana
- Atualização pela equipe responsável (admin / staff)

**Rota:** `/cardapio`

---

## 11. Painel do Grêmio

Espaço de comunicação estudantil.

- Comunicados oficiais do grêmio
- Gincanas, eventos culturais e avisos
- Canal de visibilidade das ações do corpo discente

**Rota:** `/gremio`

---

## 12. Enquetes escolares

Votações abertas à comunidade escolar.

- Listagem de enquetes ativas
- Participação do aluno nas decisões
- Resultados visíveis conforme configuração

**Rota:** `/enquetes`

---

## 13. Feira de trocas

Espaço solidário.

- Doação, troca ou venda de livros e uniformes
- Anúncios entre alunos
- Foco em sustentabilidade e economia estudantil

**Rota:** `/feira`

---

## 14. Dúvidas frequentes (FAQ)

Guia rápido institucional.

- Uniforme, horários de aula, atestados, secretaria
- Respostas padronizadas para reduzir fila de dúvidas repetidas

**Rota:** `/faq`

---

## 15. Ouvidoria anônima

Canal confidencial de sugestões, críticas e reclamações.

- Envio sem exposição desnecessária da identidade
- Moderação básica / por IA na rota de API (`/api/moderar`)
- Objetivo: escuta segura da comunidade escolar

**Rota:** `/sugestoes`

---

## 16. Painel administrativo

Área restrita a usuários com papel **ADMIN**.

- Visão geral de gestão
- Acesso privilegiado a publicações e configurações
- Link “Admin” aparece no header apenas para administradores

**Rota:** `/admin`

---

## 17. Navegação e design

### Menu (hamburger)
- Três tracinhos no header abrem o menu completo
- Links agrupados: **Portal · Estudo · Escola · Ajuda**
- Evita a barra superior lotada de itens

### Identidade visual
- Cores: azul-marinho `#0F1E36`, amarelo `#F4B41A`, coral `#E04F33`, verde `#1B5E4A`
- Tipografia mais séria/delicada (serif em títulos, sans no corpo)
- Bordas grossas, sombras deslocadas, fundo pontilhado estilo caderno
- SVGs ilustrativos e animações leves
- Responsivo (mobile e desktop)

---

## 18. Banco de dados (Supabase)

Scripts SQL em `supabase/`:

| Arquivo                 | Conteúdo principal                                      |
|-------------------------|---------------------------------------------------------|
| `schema.sql`            | Base (profiles e estruturas iniciais)                   |
| `schema_gestao.sql`     | Labs, avisos de ausência, recados, horários_docs        |
| `schema_biblioteca.sql` | Livros e empréstimos                                    |
| `schema_extra.sql`      | Extensões adicionais                                    |
| `FIX_*.sql`             | Correções pontuais de políticas / recursão RLS          |

**Segurança:** Row Level Security (RLS) em todas as tabelas sensíveis.  
Aluno não grava reserva de lab nem aviso de ausência de professor.

---

## 19. Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Variáveis de ambiente
Configure no `.env.local` (não versionar):

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Depois rode no **SQL Editor** do Supabase os scripts da pasta `supabase/` na ordem adequada.

---

## Estrutura de pastas (front)

```
src/
├── app/
│   ├── page.tsx              # Início
│   ├── login/
│   ├── horarios/
│   ├── laboratorios/
│   ├── biblioteca/
│   ├── recados/
│   ├── aviso-ausencia/
│   ├── calculadora/          # Minhas Notas
│   ├── materiais/
│   ├── cardapio/
│   ├── gremio/
│   ├── enquetes/
│   ├── feira/
│   ├── faq/
│   ├── sugestoes/            # Ouvidoria
│   ├── admin/
│   ├── api/moderar/          # Moderação da ouvidoria
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx            # Menu hamburger + auth
│   ├── Footer.tsx
│   ├── EntryAnimation.tsx
│   └── SvgDecorations.tsx
├── lib/
│   ├── supabase/             # client + server
│   └── useRole.ts            # hook de papel do usuário
└── middleware.ts
```

---

## Resumo rápido por público

| Público    | Usa principalmente                                                                 |
|------------|-------------------------------------------------------------------------------------|
| Aluno      | Horários, biblioteca, minhas notas, materiais, cardápio, enquetes, grêmio, FAQ, ouvidoria |
| Professor  | + Reserva de lab, aviso de ausência, gestão de livros                               |
| Admin      | + Recados, documentos de horário, painel admin, moderação                           |

---

**Colégio Estadual Cívico-Militar Vereador Luiz Zanchim**  
Portal de uso interno · Sarandi/PR
