import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Asamblea de Dios Cuenca",
  description: "Un hogar para ti — Sitio web de la Asamblea de Dios Ecuatoriana en Cuenca, Ecuador",
  appleWebApp: {
    title: "Asamblea Cuenca",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#2E4356" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${jost.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
