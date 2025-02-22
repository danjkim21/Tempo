import { AuthProvider } from "@/components/auth/AuthProvider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Tempo Runner",
  description: "Generate your own personal tempo playlists",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
