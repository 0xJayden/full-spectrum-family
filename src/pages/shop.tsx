import Image from "next/image";

import Navbar from "~/components/Navbar";
import mock1 from "~/assets/images/mock1.png";
import mock2 from "~/assets/images/mock2.png";

export default function Shop() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className=" max-w-[1250px] space-y-4 p-5">
          <h1 className="text-center text-3xl font-bold">Shop</h1>
          <ul className="flex flex-wrap justify-center border-b border-b-[#777777] pb-10">
            <li className="border-r border-r-[#777777] px-2">Accessories</li>
            <li className="border-r border-r-[#777777] px-2">Shoes</li>
            <li className="border-r border-r-[#777777] px-2">Puzzles & Art</li>
            <li className="border-r border-r-[#777777] px-2">Hats</li>
            <li className="border-r border-r-[#777777] px-2">Unisex Apparel</li>
            <li className="border-r border-r-[#777777] px-2">Home</li>
            <li className="border-r border-r-[#777777] px-2">{`Men's Apparel`}</li>
            <li className="px-2">{`Women's Apparel`}</li>
          </ul>
          <div className="md:grid md:grid-cols-2 md:gap-20">
            <div className="space-y-2 text-center">
              <div className="rounded-lg bg-white shadow">
                <Image src={mock1} alt="" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{`Founder's Collection Long Sleeve Midi Dress`}</h1>
                <p>from $99.99</p>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="rounded-lg bg-white shadow">
                <Image src={mock2} alt="" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{`Founder's Collection Men's Windbreaker`}</h1>
                <p>from $99.99</p>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="rounded-lg bg-white shadow">
                <Image src={mock1} alt="" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{`Founder's Collection Long Sleeve Midi Dress`}</h1>
                <p>from $99.99</p>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="rounded-lg bg-white shadow">
                <Image src={mock2} alt="" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{`Founder's Collection Men's Windbreaker`}</h1>
                <p>from $99.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
