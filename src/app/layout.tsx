import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "九局下半",
  description: "九局下半的个人博客",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={`${inter.className} bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100`}>
        <div className="min-h-screen flex flex-col">
          <header className="py-5 px-6 text-sm text-gray-400">
            <div className="max-w-2xl mx-auto">
              <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">九局下半</Link>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
