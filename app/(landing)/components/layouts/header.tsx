"use client";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import CartPopup from "../ui/cart-popup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";

const Header = () => {
  const { push } = useRouter();
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const { items } = useCartStore();
  return (
    <header className="fixed w-full z-20 backdrop-blur-xl bg-white/50">
      <div className="container flex justify-between gap-10 mx-auto py-7 items-center">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={127}
          height={30}
          onClick={() => push("/")}
          className="cursor-pointer"
        />
        <nav className="flex gap-44 font-medium">
          <Link
            href="/"
            className="relative after:content-[''] after:block after:bg-primary after:rounded-full after:h-[3px] after:w-1/2 after:left-1/2 after:-translate-x-1/2 after:w-full after:absolute"
          >
            Home
          </Link>
          <Link href="#">Category</Link>
          <Link href="#">Explore Products</Link>
        </nav>
        <div className="flex gap-10 relative">
          <FiSearch size={24} />
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}
          >
            <FiShoppingBag size={24} />
            {items.length ? (
              <div className="bg-primary text-[10px] text-center text-white rounded-full w-3.5 h-3.5 absolute -top-1 -right-1">
                {items.length}
              </div>
            ) : (
              <></>
            )}
            {isCartPopupOpen && <CartPopup />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
