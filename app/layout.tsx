import { Sidebar } from "./_components/Sidebar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "./_store/store";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfoliolio",
  description: "Generate a portfolio with a helpful AI assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <PortfolioProvider>
          <div className="flex h-screen w-screen">
            <Sidebar />
            {children}
          </div>
        </PortfolioProvider>
      </body>
    </html>
  );
}
