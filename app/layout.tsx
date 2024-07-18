import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/custom/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ReduxProvider from "@/components/custom/providers/ReduxProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:standard"
        />
      </head>
      <body className={`${poppins.className} select-none`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
