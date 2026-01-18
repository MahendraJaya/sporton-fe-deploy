import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark-alternate ">
      <div className="container mx-auto flex justify-between pt-14 pb-24">
        <div className="w-105">
          <Image
            src="/images/logo-footer.svg"
            alt="logo"
            width={187}
            height={44}
          />
          <p className="text-white mt-8">
            Engineered for endurance and designed for speed. Experience gear
            that moves as fast as you do.
          </p>
        </div>
        <div className="w-105 grid grid-cols-2 text-white">
          <div className="flex flex-col gap-7">
            <Link href="#">Home</Link>
            <Link href="#">Categories</Link>
            <Link href="#">Products</Link>
            <Link href="#">About Us</Link>
          </div>
          <div className="flex flex-col gap-7">
            <Link href="#">Instagram</Link>
            <Link href="#">Facebook</Link>
            <Link href="#">TikTok</Link>
            <Link href="#">Youtube</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-t-w/15 text-white">
        <div className="py-6.5 container mx-auto flex justify-between">
          <div>SportsOn © 2025 All Rights Reserverd.</div>
          <div className="grid grid-cols-2 w-105">
            <Link href="#">Privacy & Policy</Link>
            <Link href="#">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
