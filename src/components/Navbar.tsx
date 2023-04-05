import { useEffect, useState } from "react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import logo from "~/assets/images/logo.png";
import { useAtom } from "jotai";
import { cartAtom } from "~/pages/shop";
import { api } from "~/utils/api";

const Cart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal((prev) => {
      let total = 0;
      cart.forEach((item: any) => {
        total += +item.retail_price;
      });
      return total;
    });
  }, [cart]);

  // cart.forEach((item: any) => { const query = api.example.getItem.useQuery({id: item})});

  const renderCart = () => {
    return cart.map((item: any) => (
      <div key={item.id} className="flex w-full justify-between p-2">
        <div className="flex space-x-2">
          <div className="h-[100px] w-[100px] overflow-hidden rounded-lg bg-white shadow">
            <Image
              className="h-full w-full object-contain"
              height={100}
              width={100}
              src={item.product.image}
              alt=""
            />
          </div>
          <div className="max-w-[250px] p-1">
            <h1 className=" font-bold">{item.product.name}</h1>
            <p>${item.retail_price}</p>
          </div>
        </div>
        <button
          onClick={() =>
            setCart((prev) => {
              return prev.filter((i: any) => item.id !== i.id);
            })
          }
        >
          <TrashIcon className="h-4" />
        </button>
      </div>
    ));
  };

  return (
    <div className="fixed z-50 flex h-full  w-screen flex-col justify-between bg-gradient-to-b from-[#ffffff] to-[#fcedff] pb-20">
      <div className="my-2 space-y-2 overflow-y-scroll">{renderCart()}</div>
      <div className=" flex h-[250px] w-full flex-col justify-between border-t border-t-[#cccccc] p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-[#717171]">Subtotal:</h1>
          <p className="font-bold">${subtotal.toFixed(2)}</p>
        </div>
        <div className="space-y-2 border-t border-dashed border-t-[#aaaaaa] pt-3">
          <div className="flex justify-between">
            <h1 className="font-bold text-[#717171]">Total:</h1>
            <p className="font-bold">${subtotal.toFixed(2)}</p>
          </div>
          <button className="w-full rounded-lg bg-yellow-300 p-2 font-bold shadow">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

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
            await router.push("/");
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
            await router.push("/about");
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
            await router.push("/shop");
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
            await router.push("/events");
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
            await router.push("/services");
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
  const [openCart, setOpenCart] = useState(false);

  const router = useRouter();

  return (
    <>
      <div className="sticky top-0 flex items-center justify-between p-5">
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-white opacity-75"></div>
        <div className="flex items-center space-x-[3px]">
          <Image src={logo} className="max-w-[40px]" alt="logo" />
          <h1>Full Spectrum Family</h1>
        </div>
        <ul className="hidden md:flex md:w-1/2 md:justify-between">
          <li
            className="cursor-pointer"
            onClick={async () =>
              await router.push("/").finally(() => {
                console.log("success");
              })
            }
          >
            Home
          </li>
          <li
            className="cursor-pointer"
            onClick={async () =>
              await router.push("/about").finally(() => {
                console.log("success");
              })
            }
          >
            About
          </li>
          <li
            className="cursor-pointer"
            onClick={async () =>
              await router.push("/shop").finally(() => {
                console.log("success");
              })
            }
          >
            Shop
          </li>
          <li
            className="cursor-pointer"
            onClick={async () =>
              await router.push("/events").finally(() => {
                console.log("success");
              })
            }
          >
            Events
          </li>
          <li
            className="cursor-pointer"
            onClick={async () =>
              await router.push("/services").finally(() => {
                console.log("success");
              })
            }
          >
            Services
          </li>
        </ul>
        <div className="flex space-x-2">
          <button onClick={() => setOpenCart(!openCart)}>
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
          <Bars3Icon
            onClick={() => setOpenMenu(!openMenu)}
            className="h-6 w-6 md:hidden"
          />
        </div>
      </div>
      <MobileNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      {openCart && <Cart />}
    </>
  );
}
