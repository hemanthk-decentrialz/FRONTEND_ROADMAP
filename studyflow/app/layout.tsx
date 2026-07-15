import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import ThemeInitializer from "@/components/settings/ThemeInitializer";

export const metadata: Metadata = {
  title: "StudyFlow",
  description: "Student Productivity Dashboard",
};

export default function RootLayout({ children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">

    <body>

    <AuthProvider>

    <ThemeInitializer />

    {children}

    </AuthProvider>

    </body>

    </html>
  );
}
