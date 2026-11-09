"use client";

function IllustratedSvgSticker({ type }: { type: string }) {
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 overflow-visible">
          <ellipse cx="40" cy="68" rx="24" ry="5" fill="#0F1E36" fillOpacity="0.15" />
          <g className="svg-float">
            <rect x="14" y="44" width="52" height="14" rx="4" fill="#E04F33" stroke="#0F1E36" strokeWidth="2.5" />
            <rect x="18" y="48" width="44" height="6" rx="2" fill="#FFF8EE" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="18" y="30" width="46" height="14" rx="4" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
            <rect x="22" y="34" width="38" height="6" rx="2" fill="#FFF8EE" stroke="#0F1E36" strokeWidth="1.8" />
            <path
              d="M16 16 C28 13, 36 16, 40 21 C44 16, 52 13, 64 16 L64 31 C52 28, 44 31, 40 35 C36 31, 28 28, 16 31 Z"
              fill="#2554C7"
              stroke="#0F1E36"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M19 13 C29 10, 36 13, 40 18 C44 13, 51 10, 61 13 L61 27 C51 24, 44 27, 40 31 C36 27, 29 24, 19 27 Z"
              fill="#FFFFFF"
              stroke="#0F1E36"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <line x1="40" y1="18" x2="40" y2="31" stroke="#0F1E36" strokeWidth="2.2" />
            <path d="M40 31 L36 43 L40 40 L44 43 Z" fill="#E04F33" stroke="#0F1E36" strokeWidth="1.8" />
          </g>
          <path
            className="svg-bounce"
            d="M66 10 L68 15 L73 17 L68 19 L66 24 L64 19 L59 17 L64 15 Z"
            fill="#F4B41A"
            stroke="#0F1E36"
            strokeWidth="1.8"
          />
        </svg>
      );

    case "apple":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 overflow-visible">
          <ellipse cx="40" cy="68" rx="26" ry="5" fill="#0F1E36" fillOpacity="0.15" />
          <path className="svg-steam-1" d="M26 22 Q23 15 28 10" fill="none" stroke="#E04F33" strokeWidth="2.5" strokeLinecap="round" />
          <path className="svg-steam-2" d="M38 19 Q35 12 40 7" fill="none" stroke="#E04F33" strokeWidth="2.5" strokeLinecap="round" />
          <g className="svg-bounce-gentle">
            <path d="M48 24 L64 24 L61 58 L51 58 Z" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M56 24 L59 13 L66 11" fill="none" stroke="#E04F33" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M32 34 C22 28, 12 36, 15 49 C17 58, 26 62, 32 58 C38 62, 47 58, 49 49 C52 36, 42 28, 32 34 Z"
              fill="#E04F33"
              stroke="#0F1E36"
              strokeWidth="2.5"
            />
            <path d="M32 33 C33 24, 42 22, 43 28 C39 31, 35 33, 32 33 Z" fill="#16A34A" stroke="#0F1E36" strokeWidth="2.2" />
            <path d="M21 41 C20 45, 21 49, 23 51" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "megaphone":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-wiggle">
            <path d="M22 44 L26 62 L18 62 L14 42 Z" fill="#E04F33" stroke="#0F1E36" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="14,34 54,16 54,56 14,44" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="9" y="32" width="7" height="14" rx="3" fill="#2554C7" stroke="#0F1E36" strokeWidth="2.5" />
            <ellipse cx="54" cy="36" rx="5" ry="20" fill="#FFF8EE" stroke="#0F1E36" strokeWidth="2.5" />
          </g>
          <path className="svg-pulse" d="M64 25 C69 31, 69 41, 64 47" fill="none" stroke="#E04F33" strokeWidth="3" strokeLinecap="round" />
          <path className="svg-pulse-delayed" d="M70 19 C77 28, 77 44, 70 53" fill="none" stroke="#2554C7" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case "vote":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <rect x="14" y="34" width="52" height="32" rx="6" fill="#5B3FD9" stroke="#0F1E36" strokeWidth="2.5" />
          <rect x="10" y="28" width="60" height="10" rx="4" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
          <line x1="28" y1="33" x2="52" y2="33" stroke="#0F1E36" strokeWidth="3.5" strokeLinecap="round" />
          <g className="svg-bounce">
            <rect x="30" y="10" width="20" height="22" rx="3" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="2.5" />
            <path d="M35 21 L39 25 L46 17" fill="none" stroke="#16A34A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <rect x="26" y="52" width="6" height="9" rx="1.5" fill="#FFFFFF" />
          <rect x="37" y="45" width="6" height="16" rx="1.5" fill="#F4B41A" />
          <rect x="48" y="49" width="6" height="12" rx="1.5" fill="#FFFFFF" />
        </svg>
      );

    case "swap":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-spin-reversible">
            <path
              d="M16 32 C18 18, 34 12, 52 16 L46 10 M52 16 L44 23"
              fill="none"
              stroke="#15803D"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M64 48 C62 62, 46 68, 28 64 L34 70 M28 64 L36 57"
              fill="none"
              stroke="#E04F33"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <rect x="28" y="27" width="24" height="26" rx="5" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
          <path d="M35 37 L40 42 L46 35" fill="none" stroke="#0F1E36" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "calc":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-float">
            <rect x="18" y="10" width="44" height="60" rx="8" fill="#0F766E" stroke="#0F1E36" strokeWidth="2.5" />
            <rect x="24" y="17" width="32" height="14" rx="3" fill="#D1FAE5" stroke="#0F1E36" strokeWidth="2.2" />
            <text x="30" y="28" fill="#0F1E36" fontSize="11" fontWeight="900" fontFamily="monospace">
              180
            </text>
            <rect className="svg-pulse" x="50" y="20" width="2.5" height="8" fill="#E04F33" />
            <rect x="24" y="37" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="36" y="37" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="48" y="37" width="8" height="8" rx="2" fill="#F4B41A" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="24" y="49" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="36" y="49" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="48" y="49" width="8" height="14" rx="2" fill="#E04F33" stroke="#0F1E36" strokeWidth="1.8" />
          </g>
        </svg>
      );

    case "help":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-bounce-gentle">
            <circle cx="40" cy="40" r="26" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
            <circle cx="40" cy="40" r="20" fill="#FFF8EE" stroke="#0F1E36" strokeWidth="2" />
            <path
              d="M34 33 C34 27, 46 27, 46 34 C46 39, 40 40, 40 45"
              fill="none"
              stroke="#E04F33"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <circle cx="40" cy="52" r="2.5" fill="#0F1E36" />
          </g>
        </svg>
      );

    case "chat":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-float">
            <path
              d="M14 20 H56 C60 20, 64 24, 64 28 V48 C64 52, 60 56, 56 56 H32 L18 66 V56 H14 C10 56, 6 52, 6 48 V28 C6 24, 10 20, 14 20 Z"
              fill="#1B5E4A"
              stroke="#0F1E36"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              className="svg-bounce"
              d="M56 14 L72 20 V32 C72 42, 64 48, 56 51 C48 48, 40 42, 40 32 V20 Z"
              fill="#F4B41A"
              stroke="#0F1E36"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M51 32 L55 36 L62 28" fill="none" stroke="#0F1E36" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="16" y1="33" x2="32" y2="33" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="16" y1="42" x2="26" y2="42" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}

export { IllustratedSvgSticker };
