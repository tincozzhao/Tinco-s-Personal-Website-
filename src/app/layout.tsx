import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource-variable/caveat/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "TINCO ZHAO",
  description:
    "A customizable, animated storyboard portfolio template for telling your story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
