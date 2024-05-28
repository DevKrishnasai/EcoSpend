import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "EcoSpend - Your Ultimate Budget Tracking App",
  description:
    "Take control of your finances with EcoSpend. Track expenses, set budgets, and achieve your financial goals effortlessly.",
  creator: "Krishna Sai",
  icons: "favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Navbar />
            {children}
            <Toaster
              richColors
              position="bottom-right"
              theme="dark"
              toastOptions={{
                duration: 2000,
                style: {
                  background: "#333",
                  color: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px #00000033",
                },
              }}
            />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
