"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";

// images
import logo from "../../../../public/screens/freshcart-logo.svg";

// icons
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaShoppingCart,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

// UI
import { Button } from "../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

// next auth
import { signOut, useSession } from "next-auth/react";

// page
import LodingPage from "../../loading";

// context
import { CartContext } from "../../../context/CartContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { status } = useSession();
  const cartContext = useContext(CartContext);

  if (!cartContext) return null;
  const { numberOfCart } = cartContext;

  if (status === "loading") {
    return <LodingPage />;
  }

  return (
    <nav className="text-sm text-gray-900 flex flex-col md:flex-row justify-between items-center p-4 gap-5 px-16 md:px-10 bg-gray-50 fixed w-full z-10 shadow-md">
      <div className="flex justify-between items-center w-full md:w-auto gap-5">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </Link>

        <div className="flex items-center gap-1">
          {/* Account Menu aligned to right */}
          {status === "authenticated" && (
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/icon-7797704_640.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-white w-56 text-center"
                  align="end"
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/allorders">Last Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      className="bg-green-800 hover:bg-green-700 text-white w-full"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/login",
                        })
                      }
                    >
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {/* Menu Icon (hidden on large screens) */}
          <button
            onClick={() => setNav(!nav)}
            className="relative w-3 h-3 flex flex-col justify-between md:hidden"
          >
            <motion.span
              animate={nav ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-0.5 w-4 bg-gray-800 rounded"
            />
            <motion.span
              animate={nav ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-0.5 w-4 bg-gray-800 rounded"
            />
            <motion.span
              animate={nav ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-0.5 w-4 bg-gray-800 rounded"
            />
          </button>
        </div>
      </div>

      {/* Links + Auth + Social */}
      <div
        className={`
          ${nav ? "flex" : "hidden"}
          flex-col md:flex md:flex-row justify-between items-center gap-3 w-full md:gap-20
        `}
      >
        {/* Menu Links */}
        {status === "authenticated" && (
          <div className="flex flex-col md:flex-row gap-3 font-medium w-full md:w-auto">
            <Link
              className="hover:border-green-800 hover:border-b"
              href="/cart"
              onClick={() => setNav(false)}
            >
              Cart
            </Link>
            <Link
              className="hover:border-green-800 hover:border-b"
              href="/wish-list"
              onClick={() => setNav(false)}
            >
              Wish List
            </Link>
            <Link
              className="hover:border-green-800 hover:border-b"
              href="/products"
              onClick={() => setNav(false)}
            >
              Products
            </Link>
            <Link
              className="hover:border-green-800 hover:border-b"
              href="/categories"
              onClick={() => setNav(false)}
            >
              Categories
            </Link>
            <Link
              className="hover:border-green-800 hover:border-b"
              href="/brands"
              onClick={() => setNav(false)}
            >
              Brands
            </Link>
          </div>
        )}

        {/* Social + Auth */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {status === "unauthenticated" && (
              <>
                <Link
                  className="hover:border-green-800 hover:border-b"
                  href="/login"
                  onClick={() => setNav(false)}
                >
                  Login
                </Link>
                <Link
                  className="hover:border-green-800 hover:border-b"
                  href="/register"
                  onClick={() => setNav(false)}
                >
                  Register
                </Link>
              </>
            )}
            {status === "authenticated" && (
              <div className="flex flex-col md:flex-row items-center gap-5">
                {/* Cart with badge */}
                <div className="relative text-2xl">
                  <FaShoppingCart className="text-green-800" />
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {numberOfCart > 0 ? numberOfCart : "0"}
                  </span>
                </div>
                {status === "authenticated" && (
                  <div className="hidden md:block">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                          <AvatarImage src="/icon-7797704_640.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="bg-white w-56 text-center"
                        align="end"
                      >
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/allorders">Last Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Button
                            className="bg-green-800 hover:bg-green-700 text-white w-full"
                            onClick={() =>
                              signOut({
                                callbackUrl: "/login",
                              })
                            }
                          >
                            Sign Out
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Social icons (hidden on desktop) */}
          <div className="flex gap-4 text-lg justify-center items-center text-black md:hidden">
            <FaInstagram />
            <FaFacebook />
            <FaTiktok />
            <FaTwitter />
            <FaLinkedin />
            <FaYoutube />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
