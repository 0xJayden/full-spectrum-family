import { useState } from "react";
import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import logo from "~/assets/images/logo.png";

type MobileNavbarProps = {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
};
const MobileNavbar = ({ openMenu, setOpenMenu }: MobileNavbarProps) => {
  const router = useRouter();

  return (
    <div
      className={`fixed bottom-0 right-0 top-[60px] z-40 flex w-full bg-gradient-to-b from-[#ffffff] to-[#fcedff] px-4 py-2 text-2xl shadow-md ${
        openMenu
          ? "opacity-100 transition duration-500 ease-out"
          : "translate-x-full opacity-0 transition duration-500 ease-out"
      }`}
    >
      <ul className="mx-auto my-auto flex h-3/4 flex-col items-center justify-between pt-4">
        <li
          onClick={async () => {
            setOpenMenu(false);
            await router.push("/").finally(() => {});
          }}
          className="flex cursor-pointer items-center justify-start space-x-4"
        >
          <p className=" transition-all duration-200 ease-in-out active:text-[#c11616]">
            Home
          </p>
        </li>
        <li
          onClick={async () => {
            setOpenMenu(false);
            await router.push("/about").finally(() => {});
          }}
          className="flex cursor-pointer items-center justify-start space-x-4"
        >
          <p className=" transition-all duration-200 ease-in-out active:text-[#c11616]">
            About
          </p>
        </li>
        <li
          onClick={async () => {
            setOpenMenu(false);
            await router.push("/shop").finally(() => {});
          }}
          className="flex cursor-pointer items-center justify-start space-x-4"
        >
          <p className=" transition-all duration-200 ease-in-out active:text-[#c11616]">
            Shop
          </p>
        </li>
        <li
          onClick={async () => {
            setOpenMenu(false);
            await router.push("/events").finally(() => {});
          }}
          className="flex cursor-pointer items-center justify-start space-x-4"
        >
          <p className=" transition-all duration-200 ease-in-out active:text-[#c11616]">
            Events
          </p>
        </li>
        <li
          onClick={async () => {
            setOpenMenu(false);
            await router.push("/services").finally(() => {});
          }}
          className="flex cursor-pointer items-center justify-start space-x-4"
        >
          <p className=" transition-all duration-200 ease-in-out active:text-[#c11616]">
            Services
          </p>
        </li>
      </ul>
    </div>
  );
};

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const router = useRouter();

  return (
    <>
      <div className="sticky top-0 flex items-center justify-between p-5">
        <div className="flex items-center space-x-[3px]">
          <Image src={logo} className="max-w-[40px]" alt="logo" />
          <h1>Full Spectrum Family</h1>
        </div>
        <ul className="hidden space-x-10 md:flex">
          <li
            className="cursor-pointer"
            onClick={async () => await router.push("/").finally(() => {})}
          >
            Home
          </li>
          <li
            className="cursor-pointer"
            onClick={async () => await router.push("/about").finally(() => {})}
          >
            About
          </li>
          <li
            className="cursor-pointer"
            onClick={async () => await router.push("/shop").finally(() => {})}
          >
            Shop
          </li>
          <li
            className="cursor-pointer"
            onClick={async () => await router.push("/events").finally(() => {})}
          >
            Events
          </li>
          <li
            className="cursor-pointer"
            onClick={async () =>
              await router.push("/services").finally(() => {})
            }
          >
            Services
          </li>
        </ul>
        <div className="flex space-x-2">
          <ShoppingCartIcon className="h-6 w-6" />
          <Bars3Icon
            onClick={() => setOpenMenu(!openMenu)}
            className="h-6 w-6 md:hidden"
          />
        </div>
      </div>
      <MobileNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  );
}
