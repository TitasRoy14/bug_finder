'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { GiAlienBug } from 'react-icons/gi';
import classNames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    { labels: 'Dashboard', href: '/' },
    { labels: 'Issues', href: '/issues' },
  ];
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center '>
      <Link href='/'>
        <GiAlienBug size={20} />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              key={link.href}
              className={classNames({
                'text-zinc-900': currentPath === link.href,
                'text-zinc-500': currentPath !== link.href,
                'hover:text-zinc-800 transition-colors': true,
              })}
              href={link.href}
            >
              {link.labels}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
