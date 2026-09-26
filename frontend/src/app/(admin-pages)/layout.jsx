
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Admin Panel",
    description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-screen overflow-x-hidden">
                <Toaster
                    richColors
                    position="top-center"
                />

                <main className="min-h-screen bg-gray-50">
                    {/* Fixed Sidebar */}
                    <Sidebar />

                    {/* Right Content Area */}
                    <div className="ml-64 flex min-h-screen min-w-0 flex-col">
                        {/* Header */}
                        <Header />

                        {/* Page Content */}
                        <div className="min-w-0 flex-1 p-4">
                            {children}
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}