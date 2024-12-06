"use client"

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import PersistantProvider from "./persistantProvider";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation"; // Import usePathname

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route

  return (
    <html lang="en">
      <body className={inter.className}>
        <PersistantProvider>
          <Header />
          
          <ToastContainer />
          {children}
          
          {/* Render Footer only if the route is not /buy */}
          {pathname !== "/buy" && <Footer />}
        </PersistantProvider>
      </body>
    </html>
  );
}
