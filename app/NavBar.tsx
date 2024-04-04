import Link from 'next/link';
import React from 'react';
import { GiAlienBug } from 'react-icons/gi';

const NavBar = () => {
  const links = [
    { labels: 'Dashboard', href: '/' },
    { labels: 'issues', href: '/issues' },
  ];
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center '>
      <Link href='/'>
        <GiAlienBug size={20} />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <li>
            <Link
              key={link.href}
              className='text-zinc-500 hover:text-zinc-800 transition-colors'
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
