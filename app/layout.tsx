import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';
import { MUIThemeProvider } from '@/components/ui/MUIThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MediCare — Your Trusted Online Pharmacy',
    template: '%s | MediCare',
  },
  description:
    'Buy medicines, vitamins, supplements and healthcare products online. Fast delivery, genuine products, and great prices at MediCare India.',
  keywords: [
    'online pharmacy', 'buy medicines online', 'medicine delivery', 'vitamins', 'healthcare', 'MediCare India'
  ],
  openGraph: {
    title: 'MediCare — Your Trusted Online Pharmacy',
    description: 'Quality medicines delivered to your doorstep. Shop from 1000+ products.',
    type: 'website',
    siteName: 'MediCare',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ReduxProvider>
          <MUIThemeProvider>
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: '12px',
                  background: '#0f172a',
                  color: '#f8fafc',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '12px 20px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </MUIThemeProvider>
        </ReduxProvider>
        {/* Razorpay checkout SDK – loaded after page is interactive */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
