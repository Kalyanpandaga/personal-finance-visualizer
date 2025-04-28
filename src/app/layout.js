import "./globals.css";
import { Inter } from "next/font/google";

// You can change the font if you want.
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Personal Finance Visualizer",
  description: "Track your expenses and budgets easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
