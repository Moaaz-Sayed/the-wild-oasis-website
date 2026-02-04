 "use client";
 
 import { useState } from "react";
 import Link from "next/link";
 import Image from "next/image";
 
 function NavMenu({ user }) {
   const [open, setOpen] = useState(false);
 
   function handleClose() {
     setOpen(false);
   }
 
  return (
    <nav className="relative z-10">
      <div className="flex items-center gap-3">
         <ul className="hidden md:flex items-center gap-10 lg:gap-14 text-lg lg:text-xl">
           <li>
             <Link
               href="/cabins"
               className="hover:text-accent-400 transition-colors"
             >
               Cabins
             </Link>
           </li>
           <li>
             <Link
               href="/about"
               className="hover:text-accent-400 transition-colors"
             >
               About
             </Link>
           </li>
           <li>
             {user?.image ? (
               <Link
                 href="/account"
                 className="hover:text-accent-400 transition-colors flex items-center gap-3"
               >
                 <Image
                   src={user.image}
                   alt={user.name || "Guest"}
                   width={32}
                   height={32}
                   className="rounded-full"
                 />
                 <span>Guest area</span>
               </Link>
             ) : (
               <Link
                 href="/account"
                 className="hover:text-accent-400 transition-colors"
               >
                 Guest area
               </Link>
             )}
           </li>
         </ul>
 
         <button
           type="button"
           className="md:hidden inline-flex items-center justify-center rounded-md border border-primary-800 p-2 text-primary-100 hover:text-accent-400 hover:border-accent-400 transition-colors"
           aria-label="Toggle navigation menu"
           aria-expanded={open}
           aria-controls="mobile-nav"
           onClick={() => setOpen((value) => !value)}
         >
           <svg
             viewBox="0 0 24 24"
             width="22"
             height="22"
             aria-hidden="true"
             className="fill-current"
           >
             <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
           </svg>
         </button>
       </div>
 
       <div
         id="mobile-nav"
         className={`md:hidden ${open ? "block" : "hidden"}`}
       >
         <div className="absolute right-0 mt-3 w-56 rounded-lg border border-primary-800 bg-primary-950/95 backdrop-blur px-4 py-4 text-base shadow-lg">
           <ul className="flex flex-col gap-3">
             <li>
               <Link
                 href="/cabins"
                 className="hover:text-accent-400 transition-colors"
                 onClick={handleClose}
               >
                 Cabins
               </Link>
             </li>
             <li>
               <Link
                 href="/about"
                 className="hover:text-accent-400 transition-colors"
                 onClick={handleClose}
               >
                 About
               </Link>
             </li>
             <li>
               {user?.image ? (
                 <Link
                   href="/account"
                   className="hover:text-accent-400 transition-colors flex items-center gap-2 text-sm"
                   onClick={handleClose}
                 >
                   <Image
                     src={user.image}
                     alt={user.name || "Guest"}
                     width={24}
                     height={24}
                     className="rounded-full"
                   />
                   <span className="whitespace-nowrap">Guest area</span>
                 </Link>
               ) : (
                 <Link
                   href="/account"
                   className="hover:text-accent-400 transition-colors text-sm"
                   onClick={handleClose}
                 >
                   Guest area
                 </Link>
               )}
             </li>
           </ul>
         </div>
       </div>
     </nav>
   );
 }
 
 export default NavMenu;
