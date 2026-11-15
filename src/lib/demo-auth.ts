export type AppRole = "ALUNO" | "PROFESSOR" | "ADMIN";

export type DemoUser = {
  email: string;
  fullName: string;
  role: AppRole;
};

const STORAGE_KEY = "portal_demo_user";
const COOKIE_NAME = "portal_demo_session";

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoUser;
    if (!parsed?.email || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setDemoUser(user: DemoUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  // Cookie simples para o middleware conseguir bloquear rotas
  const maxAge = 60 * 60 * 24 * 7; // 7 dias
  document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function clearDemoUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

export function isValidRole(value: string): value is AppRole {
  return value === "ALUNO" || value === "PROFESSOR" || value === "ADMIN";
}

// ---------- Helpers de localStorage para dados da demo ----------

function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, items: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(items));
}

// Feedbacks / Sugestões
export type DemoFeedback = {
  id: string;
  categoria: string;
  texto: string;
  status: "PENDENTE" | "EM_ANALISE" | "RESOLVIDO" | "ARQUIVADO";
  created_at: string;
};

const FEEDBACKS_KEY = "portal_demo_feedbacks";

export function getFeedbacks(): DemoFeedback[] {
  return readList<DemoFeedback>(FEEDBACKS_KEY);
}

export function addFeedback(data: { categoria: string; texto: string }): DemoFeedback {
  const list = getFeedbacks();
  const item: DemoFeedback = {
    id: crypto.randomUUID(),
    categoria: data.categoria,
    texto: data.texto,
    status: "PENDENTE",
    created_at: new Date().toISOString(),
  };
  list.unshift(item);
  writeList(FEEDBACKS_KEY, list);
  return item;
}

export function updateFeedbackStatus(
  id: string,
  status: DemoFeedback["status"]
): void {
  const list = getFeedbacks().map((f) =>
    f.id === id ? { ...f, status } : f
  );
  writeList(FEEDBACKS_KEY, list);
}

// Materiais
export type DemoMaterial = {
  id: string;
  titulo: string;
  descricao: string | null;
  disciplina: string;
  turma: string;
  ano: number | null;
  url: string | null;
  tipo: string;
  professor_id: string | null;
  created_at: string;
};

const MATERIAIS_KEY = "portal_demo_materiais";

const SEED_MATERIAIS: DemoMaterial[] = [
  {
    id: "mat-1",
    titulo: "Lista de Exercícios - Funções do 1º Grau",
    descricao: "Exercícios de fixação com gabarito comentado.",
    disciplina: "Matemática",
    turma: "A",
    ano: 1,
    url: "https://example.com/lista-funcoes.pdf",
    tipo: "LINK",
    professor_id: null,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "mat-2",
    titulo: "Slides - Revolução Industrial",
    descricao: "Apresentação usada em sala (capítulos 1 a 3).",
    disciplina: "História",
    turma: "B",
    ano: 2,
    url: "https://example.com/revolucao-industrial",
    tipo: "LINK",
    professor_id: null,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "mat-3",
    titulo: "Resumo - Fotossíntese",
    descricao: "Resumo visual para revisão da prova.",
    disciplina: "Biologia",
    turma: "A",
    ano: 1,
    url: null,
    tipo: "RESUMO",
    professor_id: null,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

export function getMateriais(): DemoMaterial[] {
  const list = readList<DemoMaterial>(MATERIAIS_KEY);
  if (list.length === 0) {
    writeList(MATERIAIS_KEY, SEED_MATERIAIS);
    return SEED_MATERIAIS;
  }
  return list;
}

export function addMaterial(
  data: Omit<DemoMaterial, "id" | "created_at">
): DemoMaterial {
  const list = getMateriais();
  const item: DemoMaterial = {
    ...data,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  list.unshift(item);
  writeList(MATERIAIS_KEY, list);
  return item;
}

// Enquetes
export type DemoEnquete = {
  id: string;
  pergunta: string;
  opcoes: string[];
  ativa: boolean;
  votos: number[]; // contagem por opção
  created_at: string;
};

const ENQUETES_KEY = "portal_demo_enquetes";
const VOTOS_KEY = "portal_demo_meus_votos";

const SEED_ENQUETES: DemoEnquete[] = [
  {
    id: "enq-1",
    pergunta: "Qual tema você prefere para a próxima semana cultural?",
    opcoes: ["Ciência e Tecnologia", "Arte e Cultura", "Esportes", "Meio Ambiente"],
    ativa: true,
    votos: [12, 8, 15, 6],
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "enq-2",
    pergunta: "O horário do recreio deveria ser aumentado?",
    opcoes: ["Sim", "Não", "Tanto faz"],
    ativa: true,
    votos: [22, 9, 4],
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

export function getEnquetes(): DemoEnquete[] {
  const list = readList<DemoEnquete>(ENQUETES_KEY);
  if (list.length === 0) {
    writeList(ENQUETES_KEY, SEED_ENQUETES);
    return SEED_ENQUETES;
  }
  return list;
}

export function addEnquete(pergunta: string, opcoes: string[]): DemoEnquete {
  const list = getEnquetes();
  const item: DemoEnquete = {
    id: crypto.randomUUID(),
    pergunta,
    opcoes,
    ativa: true,
    votos: opcoes.map(() => 0),
    created_at: new Date().toISOString(),
  };
  list.unshift(item);
  writeList(ENQUETES_KEY, list);
  return item;
}

export function getMeusVotos(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(VOTOS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function votarEnquete(enqueteId: string, opcaoIndex: number): void {
  const votos = getMeusVotos();
  if (votos[enqueteId] !== undefined) return; // já votou

  const list = getEnquetes().map((e) => {
    if (e.id !== enqueteId) return e;
    const novosVotos = [...e.votos];
    novosVotos[opcaoIndex] = (novosVotos[opcaoIndex] || 0) + 1;
    return { ...e, votos: novosVotos };
  });
  writeList(ENQUETES_KEY, list);

  votos[enqueteId] = opcaoIndex;
  localStorage.setItem(VOTOS_KEY, JSON.stringify(votos));
}
