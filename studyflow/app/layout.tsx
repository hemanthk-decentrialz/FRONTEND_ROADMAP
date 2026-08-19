import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import ThemeInitializer from "@/components/settings/ThemeInitializer";

export const metadata: Metadata = {
  title: "StudyFlow",
  description: "Student Productivity Dashboard",
};

const themeInitializationScript = `
  try {
    const theme = localStorage.getItem("theme") === '"dark"'
      ? "dark"
      : "light";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  } catch {}
`;

export default function RootLayout({ children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >

    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: themeInitializationScript,
        }}
      />
    </head>

    <body>

    <AuthProvider>

    <ThemeInitializer />

    {children}

    </AuthProvider>

    </body>

    </html>
  );
}
