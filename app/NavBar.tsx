'use client';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiAlienBug } from 'react-icons/gi';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  console.log(session);

  const links = [
    { labels: 'Dashboard', href: '/' },
    { labels: 'Issues', href: '/issues/list' },
    // { labels: 'Log In', href: '/api/auth/signin' },
    // { labels: 'Log Out', href: '/api/auth/signout' },
  ];
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex gap='3' align='center'>
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
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback='?'
                    radius='full'
                    className='cursor-pointer'
                    size='2'
                    referrerPolicy='no-referrer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='2'>{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Log Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status !== 'authenticated' && (
              <Link href='/api/auth/signin'>Log In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
