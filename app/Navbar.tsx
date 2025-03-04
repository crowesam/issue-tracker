import { link } from 'fs'
import Link from 'next/link'
import React from 'react'
import { FaCrow} from 'react-icons/fa'

const Navbar = () => {
   const links = [
    {label: 'Dashboard' , href: '/'},
    {label: 'Issues' , href: '/issues'},
   ]

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center p-4  bg-gray-500 text-white">
        <Link href="/"><FaCrow /></Link>
        <ul className="flex space-x-6">
            {links.map(link => 
            <Link
               key={link.href} 
               className="text-orange-300 hover:text-orange-500 transition-colors" href={link.href}>{link.label}</Link>
            )}
        </ul>
    </nav>
  )
}

export default Navbar