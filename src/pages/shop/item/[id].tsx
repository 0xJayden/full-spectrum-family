import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

export default function Item() {
  const [index, setIndex] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>loading...</div>;
  const query = api.example.getItem.useQuery({ id: id as string });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;
  if (query.data) console.log(query.data);

  return (
    <>
      <Navbar />
      <div className="min-h-screen md:flex md:w-full md:justify-center">
        <div className="flex flex-col items-center space-y-3 p-5 md:w-full md:max-w-[1250px] md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="flex flex-col items-center space-y-2">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                width={200}
                height={200}
                className="h-full w-full"
                src={query.data.result.sync_product.thumbnail_url}
                alt=""
              />
            </div>
            <div className="flex space-x-2">
              {query.data.result.sync_variants.map((i: any) => (
                <div className="overflow-hidden rounded-lg shadow" key={i.id}>
                  <Image width={50} height={50} alt="" src={i.product.image} />
                </div>
              ))}
            </div>
          </div>
          <div className="md:flex md:min-h-[250px] md:w-full md:items-center md:justify-center ">
            <div>
              <h1 className="text-2xl font-bold">
                {query.data.result.sync_product.name}
              </h1>
              <p className="pb-5 text-xl font-bold">
                ${query.data.result.sync_variants[index].retail_price}
              </p>
              <button className="w-full rounded-full bg-yellow-300 p-2 font-bold">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
