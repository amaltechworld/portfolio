import type { Metadata } from "next";
import clsx from "clsx";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  display: "swap",
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Amal Raj - Full Stack Developer & Web Designer Portfolio",
  description:
    "Professional portfolio of Amal Raj, a skilled full-stack developer and web designer specializing in modern web technologies, responsive design, and user experience optimization.",
  keywords: [
    "Amal Raj",
    "Full Stack Developer",
    "Web Designer",
    "Portfolio",
    "JavaScript",
    "React",
    "Next.js",
    "Web Development",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Amal Raj", url: "https://github.com/amaltechworld" }],
  creator: "Amal Raj",
  publisher: "Amal Raj",
  openGraph: {
    title: "Amal Raj - Full Stack Developer Portfolio",
    description:
      "Explore the professional portfolio of Amal Raj, showcasing innovative web development projects and technical expertise.",
    type: "website",
    locale: "en_US",
    siteName: "Amal Raj Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amal Raj - Full Stack Developer Portfolio",
    description:
      "Professional portfolio showcasing web development projects and technical skills.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amal Raj",
    jobTitle: "Full Stack Developer",
    description:
      "Professional full-stack developer and web designer specializing in modern web technologies",
    url: "https://your-domain.com",
    sameAs: [
      "https://github.com/amaltechworld",
      "https://www.linkedin.com/in/amaltechworld/",
    ],
    knowsAbout: [
      "JavaScript",
      "React",
      "Next.js",
      "Web Development",
      "Frontend Development",
      "Backend Development",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={clsx(
          archivo.className,
          "font-sans antialiased bg-stone-200 text-stone-900 "
        )}
      >
        {children}
      </body>
    </html>
  );
}
