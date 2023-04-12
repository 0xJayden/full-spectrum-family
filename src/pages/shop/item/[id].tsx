import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import { cartAtom } from "..";

export default function Item() {
  const [index, setIndex] = useState(0);
  const [cart, setCart] = useAtom(cartAtom);
  const [image, setImage] = useState("");

  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>loading...</div>;
  const query = api.example.getItem.useQuery(
    { id: id as string },
    {
      onSuccess: (data) => {
        data.result.sync_variants[index].files.map((file: any) => {
          if (file.type === "preview") setImage(file.preview_url);
        });
      },
    }
  );

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen md:flex md:w-full md:justify-center">
        <button className="pl-5" onClick={() => router.back()}>
          <ChevronLeftIcon className="h-6" />
        </button>
        <div className="flex flex-col items-center space-y-3 p-5 md:w-full md:max-w-[1250px] md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="flex flex-col items-center space-y-2">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                width={200}
                height={200}
                className="h-full w-full"
                src={image}
                alt=""
              />
            </div>
            <div className="flex w-[380px] space-x-2 overflow-x-scroll p-2">
              {query.data.result.sync_variants.map((i: any) => (
                <button
                  onClick={() => {
                    setIndex(query.data.result.sync_variants.indexOf(i));
                    query.refetch();
                  }}
                  className={` min-w-[50px] overflow-hidden rounded-lg shadow ${
                    index === query.data.result.sync_variants.indexOf(i) &&
                    "border-[2px] border-yellow-300"
                  }`}
                  key={i.id}
                >
                  <Image width={50} height={50} alt="" src={i.product.image} />
                </button>
              ))}
            </div>
          </div>
          <div className="md:flex md:min-h-[250px] md:w-full md:items-center md:justify-center ">
            <div>
              <h1 className="text-2xl font-bold">
                {query.data.result.sync_variants[index].name}
              </h1>
              <p className="pb-5 text-xl font-bold">
                ${query.data.result.sync_variants[index].retail_price}
              </p>
              <button
                onClick={() =>
                  setCart((prev) => [
                    ...prev,
                    query.data.result.sync_variants[index],
                  ])
                }
                className="w-full rounded-full bg-yellow-300 p-2 font-bold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
