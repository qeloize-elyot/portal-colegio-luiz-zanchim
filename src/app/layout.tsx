import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Escolar | Colégio Vereador Luiz Zanchim",
  description:
    "Portal Escolar do Colégio Estadual Cívico-Militar Vereador Luiz Zanchim. Acesso a materiais, cardápio, grêmio, enquetes e mais.",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png" }],
    shortcut: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full`}>
      <body
        className="min-h-full flex flex-col text-[#0F1E36] antialiased relative selection:bg-[#F4B41A] selection:text-[#0F1E36]"
        style={{
          backgroundColor: "#F7F3E8",
          backgroundImage: "radial-gradient(#0F1E36 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* Margem lateral estilo folha de caderno (visível em ecrãs grandes) */}
        <div
          aria-hidden="true"
          className="hidden 2xl:block pointer-events-none fixed top-0 bottom-0 left-12 w-[2px] bg-[#E04F33]/35 z-0"
        />

        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
