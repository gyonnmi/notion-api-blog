import Image from "next/image";
import React from "react";
import rizy from "../../public/rizy.png";
import {
  AiOutlineHome,
  AiOutlineTags,
  AiOutlineSearch,
  AiOutlineProfile,
} from "react-icons/ai";
import Link from "next/link";

const NavTable = {
  "/": {
    name: "Home",
    icon: <AiOutlineHome />,
  },
  "/tags": {
    name: "Tags",
    icon: <AiOutlineTags />,
  },
  "/search": {
    name: "Search",
    icon: <AiOutlineSearch />,
  },
  "/profile": {
    name: "Profile",
    icon: <AiOutlineProfile />,
  },
};

const HeaderMenu = () => {
  return (
    <aside className="bg-red-50 fixed top-0 bottom-0 w-3/5 border-r max-w-sm">
      <div className="py-8 flex flex-col h-full">
        <div className="relative w-full h-1/3">
          <Image
            src={rizy}
            alt="Profile Image"
            objectFit="contain"
            layout="fill"
          />
        </div>
        <Link href="/profile">
          <h1 className="text-center font-bold text-2xl text-indigo-900">
            Rizy
          </h1>
        </Link>
        <ul className="mt-8 flex flex-col">
          {Object.entries(NavTable).map(([href, value]) => (
            <li
              key={href}
              className="hover:bg-gray-200 hover:text-red-400 text-2xl text-black/50"
            >
              <Link href={href}>
                <p className="flex flex-row gap-2 items-center p-2">
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
