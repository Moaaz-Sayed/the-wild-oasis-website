"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: (
      <CalendarDaysIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
    ),
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-primary-900 md:border-b-0 md:border-r md:border-primary-900">
      <ul className="flex flex-col gap-1 sm:gap-2 text-sm sm:text-base py-2 md:py-0">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-2 sm:py-3 px-3 sm:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 sm:gap-4 font-semibold text-primary-200 ${pathname === link.href ? "bg-primary-900" : ""}`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-1 sm:mt-2 md:mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
