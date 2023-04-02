import Image from "next/image";

import Navbar from "~/components/Navbar";
import mock1 from "~/assets/images/mock1.png";
import mock2 from "~/assets/images/mock2.png";
import { api } from "~/utils/api";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Shop() {
  const [all, setAll] = useState(true);

  const router = useRouter();

  const query = api.example.getItems.useQuery();

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;
  if (query.data) console.log(query.data);

  const renderItems = () => {
    return query.data?.result.map((item: any) => (
      <div key={item.id} className="space-y-2 text-center">
        <div
          onClick={() => router.push(`/shop/item/${item.id}`)}
          className="overflow-hidden rounded-lg bg-white shadow"
        >
          <Image
            width={200}
            height={200}
            className="h-full w-full"
            src={item.thumbnail_url}
            alt=""
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{item.name}</h1>
        </div>
        <button onClick={() => {}}>Add to Cart</button>
      </div>
    ));
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className=" max-w-[1250px] space-y-4 p-5">
          <h1 className="text-center text-3xl font-bold">Shop</h1>
          <ul className="flex flex-wrap justify-center border-b border-b-[#777777] pb-10">
            <li
              className={`border-r border-r-[#777777] px-2 ${
                all && "font-bold"
              }`}
            >
              All
            </li>
            <li className="border-r border-r-[#777777] px-2">Accessories</li>
            <li className="border-r border-r-[#777777] px-2">Shoes</li>
            <li className="border-r border-r-[#777777] px-2">Puzzles & Art</li>
            <li className="border-r border-r-[#777777] px-2">Hats</li>
            <li className="border-r border-r-[#777777] px-2">Unisex Apparel</li>
            <li className="border-r border-r-[#777777] px-2">Home</li>
            <li className="border-r border-r-[#777777] px-2">{`Men's Apparel`}</li>
            <li className="px-2">{`Women's Apparel`}</li>
          </ul>
          <div className="space-y-5 md:grid md:grid-cols-2 md:gap-20 md:space-y-0 lg:grid-cols-4">
            {renderItems()}
          </div>
        </div>
      </div>
    </div>
  );
}
