import "./globals.css";

export const metadata = {
  title: "Tik Talk - Chat App",
  description: "A Chat App build with Next.js",
  icons: {
    icon: "/favicon.png",        // default
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
