import Image from 'next/image';
import React from 'react';
import rizy from '../../public/rizy.png';
import {
  AiOutlineHome,
  AiOutlineTags,
  AiOutlineSearch,
  AiOutlineProfile,
} from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const NavTable = {
  '/': {
    name: 'Home',
    icon: <AiOutlineHome />,
  },
  '/tags': {
    name: 'Tags',
    icon: <AiOutlineTags />,
  },
  '/search': {
    name: 'Search',
    icon: <AiOutlineSearch />,
  },
  '/profile': {
    name: 'Profile',
    icon: <AiOutlineProfile />,
  },
};

interface HeaderMenuProps {
  isMenuOpen: boolean;
}

const HeaderMenu = ({ isMenuOpen }: HeaderMenuProps) => {
  const { asPath } = useRouter(); //basePath이나 locale이 포함되지 않은 path

  return (
    <aside
      className={`z-50 bg-white fixed top-0 left-0 bottom-0 w-3/5 max-w-sm transition-all duration-500 ${
        isMenuOpen ? '' : '-translate-x-[101%]'
      }
    `}
    >
      <div className="py-8 flex flex-col h-full">
        <motion.div
          className="relative w-full h-1/4 mx-auto"
          initial={{ x: -60 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={rizy}
            alt="Profile Image"
            objectFit="contain"
            layout="fill"
          />
        </motion.div>
        <motion.h1
          className="text-center font-bold text-2xl"
          initial={{ x: -60 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/profile">
            <h1 className="text-center font-bold text-2xl text-indigo-900">
              Rizy
            </h1>
          </Link>
        </motion.h1>
        <ul className="mt-8 flex flex-col">
          {Object.entries(NavTable).map(([href, value]) => (
            <li
              key={href}
              className={`text-xl text-black/50 hover:bg-gray-200 hover:text-red-400 ${
                asPath === href ? 'text-red-400 bg-gray-200' : ''
              }`}
            >
              <Link href={href}>
                <p className="flex flex-row gap-2 items-center px-8 py-6">
                  <span>{value.icon}</span>
                  {value.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default HeaderMenu;
