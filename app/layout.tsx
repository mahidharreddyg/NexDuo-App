import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexDuo",
  description: "Video calling App",
  icons: {
    icon: "/icons/ND-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/NexDuo-logo.svg",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#41126A",
            colorBackground: "#0A0A0A",
            colorInputBackground: "#161616",
            colorInputText: "#fff",
          },
        }}
      >
        <body
  className={inter.className}
  style={{
    background: "linear-gradient(to bottom, #101012, #130122)",
  }}
>

          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
