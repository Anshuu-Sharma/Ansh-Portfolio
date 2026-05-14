import type { Metadata } from "next";
import { Manrope, DM_Mono, Yatra_One, Orbitron, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingGate from "@/components/LoadingGate";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import Navbar from "@/components/Navbar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const yatraOne = Yatra_One({
  variable: "--font-yatra-one",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio - Creative Web Developer",
  description: "Explore the portfolio of a creative web developer specializing in crafting immersive, high-performance digital experiences with modern technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dmMono.variable} ${yatraOne.variable} ${orbitron.variable} ${inter.variable}`}>
        <StyledComponentsRegistry>
          <LoadingGate>
            <SmoothScroll>
              <Navbar />
              {children}
            </SmoothScroll>
          </LoadingGate>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
