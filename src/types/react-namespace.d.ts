/**
 * Garante React.FormEvent / React.ReactNode no build (jsx: react-jsx).
 * Evita erro TypeScript na Vercel em páginas que usam React.FormEvent sem import.
 */
import type {
  FormEvent as ReactFormEvent,
  ReactNode as ReactReactNode,
  ChangeEvent as ReactChangeEvent,
  MouseEvent as ReactMouseEvent,
} from "react";

export {};

declare global {
  namespace React {
    type FormEvent<T = Element> = ReactFormEvent<T>;
    type ReactNode = ReactReactNode;
    type ChangeEvent<T = Element> = ReactChangeEvent<T>;
    type MouseEvent<T = Element> = ReactMouseEvent<T>;
  }
}
