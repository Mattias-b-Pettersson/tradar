import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google"
import { svSE } from "@clerk/localizations";

import "../globals.css"

export const metadata = {
    title: "Trådar",
    description: "Trådar",
};

const inter = Inter({ subsets: ["latin-ext"] })

export default function RootLayoyt({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            localization={svSE}
        >
            <html lang="sv" />
            <body className={ `${inter.className} bg-dark-1`}>
                { children }
            </body>
        </ClerkProvider>
    )
}