import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';
import { usePathname } from 'next/navigation';

interface User {
  fitnessLevel: string;
  goal: string;
  height: number | string;
  weight: number | string;
}


const links = [
  { href: '/homepage', label: 'Training' },
  { href: '/discover', label: 'Discover' },
  { href: '/report', label: 'Report' },
  { href: '/blogs', label: 'Blog' },
];

function NavLists() {
  const user = useAppSelector((state: { auth: { user: User | null } }) => state.auth.user);
  const pathname = usePathname();



  return (
    <div className={`${user && user.fitnessLevel ? 'md:block hidden' : 'hidden'}`}>
      <ul className='flex justify-between w-96 text-md'>
        {links.map(link => {
          const isActive = pathname.startsWith(link.href); 
          return <li key={link.href}>
            <Link href={link.href} className={isActive ? 'font-semibold' : ''}>
              {link.label}
            </Link>
          </li>
        })}
      </ul>
    </div>
  );
}

export default NavLists;
