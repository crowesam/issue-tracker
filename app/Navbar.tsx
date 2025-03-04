'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaCrow} from 'react-icons/fa';
import classnames from 'classnames';

const Navbar = () => {
   const currentPath = usePathname();
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
               className={classnames({
                  'text-orange-600': currentPath === link.href,
                  'text-white': currentPath !== link.href,
                  'hover:text-amber-400 transition-colors duration-200': true
               })}
                href={link.href}>{link.label}</Link>
            )}
        </ul>
    </nav>
  )
}

export default Navbar