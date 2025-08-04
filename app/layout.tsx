import type { Metadata } from "next";
import '../app/ui/globals.css'
import { roboto } from "./ui/font";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Panel admin rukanas",
  description: "Panel de administracion de la tienda de rukanas",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html>
            <body className={`${roboto.className} antialiased`}>
                {children}
            </body>
        </html>
    )
}
export default RootLayout;