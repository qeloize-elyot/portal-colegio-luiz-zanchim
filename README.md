# Portal Interno – Colégio Estadual Cívico-Militar Vereador Luiz Zanchim

Portal web de uso interno da escola. Centraliza serviços do cotidiano escolar, materiais didáticos, painel do Grêmio, enquetes, cardápio, FAQ e canal anônimo de sugestões/reclamações.

## Características

- Design limpo e funcional (inspirado em sites governamentais)
- Responsivo (mobile e desktop)
- Páginas principais já estruturadas
- Formulário de sugestões com moderação básica (simulada)
- Calculadora de notas interativa
- Pronto para evolução com autenticação e backend

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura

```
src/
├── app/                 # Páginas (App Router)
│   ├── page.tsx         # Início
│   ├── materiais/
│   ├── cardapio/
│   ├── gremio/
│   ├── enquetes/
│   ├── feira/
│   ├── faq/
│   ├── sugestoes/
│   └── calculadora/
└── components/
    ├── Header.tsx
    └── Footer.tsx
```

## Próximos passos

1. Autenticação (JWT + papéis: Aluno, Professor, Grêmio, Admin)
2. Backend (NestJS ou API Routes) + PostgreSQL
3. Upload de materiais
4. Moderação real com LLM no canal de sugestões
5. Painel administrativo

## Tecnologia

- Next.js 16 + TypeScript
- Tailwind CSS
- React 19

---

Colégio Estadual Cívico-Militar Vereador Luiz Zanchim  
Portal de uso interno
