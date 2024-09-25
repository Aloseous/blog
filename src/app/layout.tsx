import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/provide/ThemeProvider";
import NavBar from "@/components/navBar/NavBar";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/provide/AuthProvider";

import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "Next.js blog app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <NavBar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
