import { Black_Ops_One } from "next/font/google";
import "./globals.css";

const blackOps = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-ops", 
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={blackOps.variable}>
      <body className={`${blackOps.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}