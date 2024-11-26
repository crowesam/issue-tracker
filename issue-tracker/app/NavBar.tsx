'use client';
import { link } from 'fs';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { LiaCrowSolid } from "react-icons/lia";
import classnames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname()
    const links =[
        {href: '/', label: 'Dashboard'},
        {href: '/issues', label: 'Issues'},
    ]
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><LiaCrowSolid /></Link>
                <ul className='flex space-x-6'>
                    {links.map(link => <Link
                      key={link.href} 
                      className={classnames({
                            'text-red-600': currentPath === link.href,
                            'text-gray-500': currentPath !== link.href,
                            'hover:text-zinc-800 transition-colors':true
                      })}
                      href={link.href}> {link.label}
                      </Link>)}
                </ul>
            
        </nav>
    );
};

export default NavBar;