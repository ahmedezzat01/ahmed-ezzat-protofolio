import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GlobalSearch } from "@/components/global-search";
import { GlobalAIChat } from "@/components/global-ai-chat";
import { CyberCursor } from "@/components/cyber-cursor";

export const metadata: Metadata = {
  title: "CyberSec Portfolio | Cybersecurity Professional",
  description: "Professional cybersecurity portfolio showcasing penetration testing, security research, and ethical hacking expertise.",
  keywords: "cybersecurity, penetration testing, ethical hacking, security research, CEH, OSCP",
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: 'window.scrollTo(0, 0);' }} />
        <GlobalSearch />
        <GlobalAIChat />
        <CyberCursor />
        {children}
      </body>
    </html>
  );
}
