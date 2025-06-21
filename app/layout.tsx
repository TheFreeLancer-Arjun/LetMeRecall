// app/layout.tsx
import AuthProvider from "../src/components/AuthContext"; // ✅ correct for default export
import "./globals.css";

export const metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
