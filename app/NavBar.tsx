'use client';
import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiAlienBug } from 'react-icons/gi';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { labels: 'Dashboard', href: '/' },
    { labels: 'Issues', href: '/issues/list' },
    // { labels: 'Log In', href: '/api/auth/signin' },
    // { labels: 'Log Out', href: '/api/auth/signout' },
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

      <Box>
        {status === 'authenticated' && (
          <Link href='/api/auth/signout'>Log Out</Link>
        )}
        {status !== 'authenticated' && (
          <Link href='/api/auth/signin'>Log In</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
