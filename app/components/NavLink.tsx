
import {  FaHome, FaProductHunt, FaUsers } from "react-icons/fa";
import { RiAdvertisementLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";

const links = [
    {name: "Dashboard", href: "/dashboard", icon: FaHome},
    {name: "Products", href:"/dashboard/products", icon: FaProductHunt },
    {name: "Categories", href:"/dashboard/categories", icon: BiCategory  },
    {name: "Banners", href: "/dashboard/banners", icon: RiAdvertisementLine},
    {name: "Customers", href: "/dashboard/customers", icon: FaUsers},
    ]

const NavLink = ()=> {
    return (
<>
{
                    links.map(x => {
                        const LinIcon = x.icon;
                        return(
                            <Link
                            key={x.name}
                            href={x.href}
                            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-800
                            p-3 text-lg text-white font-bold hover:bg-slate-400 hover:text-white md:flex-none md:justify-start
                            md:p-2 md:px-3"
                            >
                            <LinIcon className="w-6"/>
                            <p className="hidden md:block">{x.name}</p>
                            </Link>
                        )
                    })
                }</>
    )
}

export default NavLink;