import "./globals.css";

export const metadata = {
  title: "Tik Talk - Chat App",
  description: "A Chat App build with Next.js",
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
