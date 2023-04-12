import { useEffect, useState } from "react";
import {
  Bars3Icon,
  ChevronLeftIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import logo from "~/assets/images/logo.png";
import { useAtom } from "jotai";
import { cartAtom } from "~/pages/shop";
import { atomWithStorage } from "jotai/utils";
import { api } from "~/utils/api";
import { PayPalButtons } from "@paypal/react-paypal-js";

type CartProps = {
  setCheckout: Dispatch<SetStateAction<boolean>>;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
};

type CheckoutProps = {
  setCheckout: Dispatch<SetStateAction<boolean>>;
  setConfirmation: Dispatch<SetStateAction<boolean>>;
};

type ConfirmationProps = {
  setConfirmation: Dispatch<SetStateAction<boolean>>;
};

const firstNameAtom = atomWithStorage("firstName", "");
const lastNameAtom = atomWithStorage("lastName", "");
const addressAtom = atomWithStorage("address", "");
const cityAtom = atomWithStorage("city", "");
const stateAtom = atomWithStorage("state", "");
const countryAtom = atomWithStorage("country", "");
const zipAtom = atomWithStorage("zip", "");
const phoneAtom = atomWithStorage("phone", "");
const emailAtom = atomWithStorage("email", "");

const subtotalAtom = atomWithStorage("subtotal", 0);
const taxAtom = atomWithStorage("tax", 0);
const shippingAtom = atomWithStorage("shipping", [
  {
    id: "",
    name: "",
    rate: "",
    currency: "",
    minDeliveryDays: 0,
    maxDeliveryDays: 0,
    minDeliveryDate: "",
    maxDeliveryDate: "",
  },
]);
const totalAtom = atomWithStorage("total", "");

const itemsAtom = atomWithStorage("items", [
  {
    sync_variant_id: 0,
    variant_id: "",
    quantity: 0,
    value: "",
  },
]);

const Confirmation = ({ setConfirmation }: ConfirmationProps) => {
  const [subtotal, setSubtotal] = useAtom(subtotalAtom);
  const [tax, setTax] = useAtom(taxAtom);
  const [shipping, setShipping] = useAtom(shippingAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const [items, setItems] = useAtom(itemsAtom);

  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [city, setCity] = useAtom(cityAtom);
  const [state, setState] = useAtom(stateAtom);
  const [country, setCountry] = useAtom(countryAtom);
  const [zip, setZip] = useAtom(zipAtom);
  const [phone, setPhone] = useAtom(phoneAtom);
  const [email, setEmail] = useAtom(emailAtom);

  const createOrderMutation = api.example.createOrder.useMutation();

  return (
    <div className="fixed z-[60] h-full w-screen overflow-y-scroll bg-gradient-to-b from-[#ffffff] to-[#fcedff] p-5 pt-0">
      <button
        className="self-start pb-4"
        onClick={() => setConfirmation(false)}
      >
        <ChevronLeftIcon className="h-6" />
      </button>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
        <div className="space-y-4 overflow-y-scroll border-t border-dashed border-t-[#aaaaaa] pb-12 pt-4">
          <div className="flex justify-between">
            <p className="font-bold">Subtotal:</p>
            <p className="font-bold">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Tax:</p>
            <p className="font-bold">${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Shipping:</p>
            <p className="font-bold">
              ${shipping[0] && (+shipping[0].rate).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-lg font-bold">${total}</p>
          </div>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        value: total,
                      },
                    },
                  ],
                })
                .then((orderId) => {
                  // Your code here after create the order
                  console.log(orderId, "orderId");
                  return orderId;
                });
            }}
            onApprove={async (data, actions) => {
              return await actions.order?.capture().then((data2) => {
                // Your code here after capture the order
                console.log(data2, "data2");

                createOrderMutation
                  .mutateAsync({
                    recipient: {
                      name: firstName + " " + lastName,
                      address1: address,
                      city: city,
                      state_code: state,
                      country_code: country,
                      zip: +zip,
                      phone: phone,
                      email: email,
                    },
                    items: items,
                  })
                  .then((res) => {
                    console.log(res, "res");
                  })
                  .catch((err) => {
                    console.log(err, "err");
                  });
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Checkout = ({ setCheckout, setConfirmation }: CheckoutProps) => {
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [city, setCity] = useAtom(cityAtom);
  const [state, setState] = useAtom(stateAtom);
  const [country, setCountry] = useAtom(countryAtom);
  const [zip, setZip] = useAtom(zipAtom);
  const [phone, setPhone] = useAtom(phoneAtom);
  const [email, setEmail] = useAtom(emailAtom);

  const [subtotal, setSubtotal] = useAtom(subtotalAtom);
  const [tax, setTax] = useAtom(taxAtom);
  const [shipping, setShipping] = useAtom(shippingAtom);
  const [total, setTotal] = useAtom(totalAtom);

  const [cart, setCart] = useAtom(cartAtom);
  const [items, setItems] = useAtom(itemsAtom);

  const countries = api.example.getCountries.useQuery(undefined, {
    onSuccess: (data) => {
      setCountry(data.result[0].code);
    },
  });

  const taxMutation = api.example.getTax.useMutation();

  const shippingMutation = api.example.getShipping.useMutation();

  const calculateTaxAndShipping = () => {
    taxMutation.mutate(
      {
        country: country,
        state: state,
        city: city,
        zip: zip,
      },
      {
        onSuccess: (data) => {
          setTax(data.result.rate * subtotal);
        },
      }
    );

    shippingMutation.mutate(
      {
        address: address,
        city: city,
        country: country,
        state: state,
        zip: +zip,
        phone: phone,
        items: items,
      },
      {
        onSuccess: (data) => {
          setShipping(data.result);
          console.log(data.result);
          setTotal(
            (subtotal + tax + +data.result[0].rate).toFixed(2).toString()
          );
          setConfirmation(true);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  useEffect(() => {
    let items: Array<{
      sync_variant_id: number;
      variant_id: string;
      quantity: number;
      value: string;
    }> = [];

    cart.forEach((i: any) => {
      let item = {
        sync_variant_id: i.id,
        variant_id: i.variant_id.toString(),
        quantity: 1,
        value: i.retail_price,
      };

      items.push(item);
    });

    console.log(cart, "cart");

    setItems(items);
    console.log(items, "items");
  }, []);

  return (
    <div className="fixed z-[60] h-full w-screen bg-gradient-to-b from-[#ffffff] to-[#fcedff] p-5 pt-0">
      <button className="self-start pb-4" onClick={() => setCheckout(false)}>
        <ChevronLeftIcon className="h-6" />
      </button>
      <div className="flex w-full flex-col space-y-2">
        <h1 className="font-bold">Shipping Info</h1>
        <input
          required
          className="rounded p-2 shadow"
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          required
          className="rounded p-2 shadow"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          required
          className="rounded p-2 shadow"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          required
          className="rounded p-2 shadow"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <select
          className="rounded p-2 shadow"
          onChange={(e: any) => {
            setState(e.target.value);
          }}
        >
          <option>Select</option>
          {countries.data?.result[0].states.map((country: any) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          required
          className="rounded p-2 shadow"
          placeholder="Zip"
          type={"number"}
          onChange={(e) => setZip(e.target.value)}
        />
        <input
          required
          className="rounded p-2 shadow"
          placeholder="Phone"
          type={"tel"}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          required
          className="rounded p-2 shadow"
          placeholder="Email"
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={() => calculateTaxAndShipping()}
          className="rounded-lg bg-yellow-300 p-2 font-bold"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const Cart = ({ setCheckout, setOpenCart }: CartProps) => {
  const [cart, setCart] = useAtom(cartAtom);
  const [subtotal, setSubtotal] = useAtom(subtotalAtom);

  console.log(cart);

  useEffect(() => {
    setSubtotal((prev) => {
      let total = 0;
      cart.forEach((item: any) => {
        total += +item.retail_price;
      });
      return total;
    });
  }, [cart]);

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
    <div className="fixed z-50 flex h-full w-screen flex-col justify-between overflow-y-scroll bg-gradient-to-b from-[#ffffff] to-[#fcedff] pb-20">
      <button className="self-start pl-5" onClick={() => setOpenCart(false)}>
        <ChevronLeftIcon className="h-6" />
      </button>
      <div className=" min-h-[250px] space-y-2 overflow-y-scroll">
        {renderCart()}
      </div>
      <div className="w-full p-5">
        <div className="space-y-2 border-t border-dashed border-t-[#aaaaaa] pt-3">
          <div className="flex justify-between">
            <h1 className="font-bold text-[#717171]">SubTotal:</h1>
            <p className="font-bold">${subtotal.toFixed(2)}</p>
          </div>
          <button
            onClick={() => setCheckout(true)}
            className="w-full rounded-lg bg-yellow-300 p-2 font-bold shadow"
          >
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
  const [checkout, setCheckout] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

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
      {openCart && <Cart setOpenCart={setOpenCart} setCheckout={setCheckout} />}
      {checkout && (
        <Checkout setCheckout={setCheckout} setConfirmation={setConfirmation} />
      )}
      {confirmation && <Confirmation setConfirmation={setConfirmation} />}
    </>
  );
}
