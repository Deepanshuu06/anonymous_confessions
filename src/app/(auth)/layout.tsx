import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}
      <Toaster/>
      </body>
    </html>
  );
}
