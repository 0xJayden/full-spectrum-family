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
  const [xxsmallItems, setXxsmallItems] = useState<Array<any>>([]);
  const [xsmallItems, setXSmallItems] = useState<Array<any>>([]);
  const [smallItems, setSmallItems] = useState<Array<any>>([]);
  const [mediumItems, setMediumItems] = useState<Array<any>>([]);
  const [largeItems, setLargeItems] = useState<Array<any>>([]);
  const [xlargeItems, setXlargeItems] = useState<Array<any>>([]);
  const [xxlargeItems, setXxlargeItems] = useState<Array<any>>([]);
  const [selectedSize, setSelectedSize] = useState("S");

  const router = useRouter();

  const { id } = router.query;

  const query = api.example.getItem.useQuery(
    { id: id as string },
    {
      onSuccess: (data) => {
        data.result.sync_variants[index].files.map((file: any) => {
          if (file.type === "preview") setImage(file.preview_url);
        });

        if (
          xxsmallItems.length !== 0 ||
          xsmallItems.length !== 0 ||
          smallItems.length !== 0 ||
          mediumItems.length !== 0 ||
          largeItems.length !== 0 ||
          xlargeItems.length !== 0 ||
          xxlargeItems.length !== 0
        )
          return;

        data.result.sync_variants.map((i: any) => {
          if (i.name.includes("- 2XS")) setXxsmallItems((prev) => [...prev, i]);
          if (i.name.includes("- XS")) setXSmallItems((prev) => [...prev, i]);
          if (i.name.includes("/ S") || i.name.includes(" - S")) {
            setSmallItems((prev) => [...prev, i]);
            setIndex(data.result.sync_variants.indexOf(i));
          }
          if (i.name.includes("/ M") || i.name.includes(" - M"))
            setMediumItems((prev) => [...prev, i]);
          if (i.name.includes("/ L") || i.name.includes(" - L"))
            setLargeItems((prev) => [...prev, i]);
          if (i.name.includes("/ XL") || i.name.includes(" - XL"))
            setXlargeItems((prev) => [...prev, i]);
          if (i.name.includes("/ 2XL") || i.name.includes(" - 2XL"))
            setXxlargeItems((prev) => [...prev, i]);
        });
      },
    }
  );

  if (!id) return <div>loading...</div>;

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
          <div className="flex flex-col items-center  space-y-2">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                width={200}
                height={200}
                className="h-[300px] w-[300px]"
                src={image}
                alt=""
              />
            </div>
            {smallItems.length > 0 && (
              <div className="flex flex-col justify-center">
                <h1 className="pl-3">Size: {selectedSize}</h1>
                <div className="flex w-[320px] justify-center space-x-2 overflow-x-scroll">
                  {xxsmallItems.length > 0 && (
                    <button
                      onClick={() => setSelectedSize("2XS")}
                      className={`min-w-[35px] rounded-lg border p-1 text-center ${
                        selectedSize === "2XS" &&
                        "border-[2px] border-yellow-300"
                      }`}
                    >
                      2XS
                    </button>
                  )}
                  {xsmallItems.length > 0 && (
                    <button
                      onClick={() => setSelectedSize("XS")}
                      className={`min-w-[35px] rounded-lg border p-1 text-center ${
                        selectedSize === "XS" &&
                        "border-[2px] border-yellow-300"
                      }`}
                    >
                      XS
                    </button>
                  )}
                  {smallItems.length > 0 && (
                    <button
                      onClick={() => setSelectedSize("S")}
                      className={`min-w-[35px] rounded-lg border p-1 text-center ${
                        selectedSize === "S" && "border-[2px] border-yellow-300"
                      }`}
                    >
                      S
                    </button>
                  )}
                  {mediumItems.length > 0 && (
                    <button
                      onClick={() => setSelectedSize("M")}
                      className={`min-w-[35px] rounded-lg border p-1 text-center ${
                        selectedSize === "M" && "border-[2px] border-yellow-300"
                      }`}
                    >
                      M
                    </button>
                  )}
                  {largeItems.length > 0 && (
                    <button
                      onClick={() => setSelectedSize("L")}
                      className={`min-w-[35px] rounded-lg border p-1 text-center ${
                        selectedSize === "L" && "border-[2px] border-yellow-300"
                      }`}
                    >
                      L
                    </button>
                  )}
                  {xlargeItems.length > 0 && (
                    <button
                      onClick={() => setSelectedSize("XL")}
                      className={`min-w-[35px] rounded-lg border p-1 text-center ${
                        selectedSize === "XL" &&
                        "border-[2px] border-yellow-300"
                      }`}
                    >
                      XL
                    </button>
                  )}
                  {xxlargeItems.length > 0 && (
                    <button
                      onClick={() => setSelectedSize("2XL")}
                      className={`min-w-[35px] rounded-lg border p-1 text-center ${
                        selectedSize === "2XL" &&
                        "border-[2px] border-yellow-300"
                      }`}
                    >
                      2XL
                    </button>
                  )}
                </div>
              </div>
            )}
            {selectedSize === "2XS" && xxsmallItems.length > 0 && (
              <div className="flex w-[320px] space-x-2 overflow-x-scroll p-2">
                {xxsmallItems.map((i: any) => (
                  <button
                    onClick={() => {
                      setIndex(query.data.result.sync_variants.indexOf(i));
                      query.refetch();
                    }}
                    className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                      index === query.data.result.sync_variants.indexOf(i) &&
                      "border-[2px] border-yellow-300"
                    }`}
                    key={i.id}
                  >
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      src={i.product.image}
                    />
                  </button>
                ))}
              </div>
            )}
            {selectedSize === "XS" && xsmallItems.length > 0 && (
              <div className="flex w-[320px] space-x-2 overflow-x-scroll p-2">
                {xsmallItems.map((i: any) => (
                  <button
                    onClick={() => {
                      setIndex(query.data.result.sync_variants.indexOf(i));
                      query.refetch();
                    }}
                    className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                      index === query.data.result.sync_variants.indexOf(i) &&
                      "border-[2px] border-yellow-300"
                    }`}
                    key={i.id}
                  >
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      src={i.product.image}
                    />
                  </button>
                ))}
              </div>
            )}
            {selectedSize === "S" && smallItems.length > 0 && (
              <div className="flex w-[320px] space-x-2 overflow-x-scroll p-2">
                {smallItems.map((i: any) => (
                  <button
                    onClick={() => {
                      setIndex(query.data.result.sync_variants.indexOf(i));
                      query.refetch();
                    }}
                    className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                      index === query.data.result.sync_variants.indexOf(i) &&
                      "border-[2px] border-yellow-300"
                    }`}
                    key={i.id}
                  >
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      src={i.product.image}
                    />
                  </button>
                ))}
              </div>
            )}
            {selectedSize === "M" && mediumItems.length > 0 && (
              <div className="flex w-[320px] space-x-2 overflow-x-scroll p-2">
                {mediumItems.map((i: any) => (
                  <button
                    onClick={() => {
                      setIndex(query.data.result.sync_variants.indexOf(i));
                      query.refetch();
                    }}
                    className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                      index === query.data.result.sync_variants.indexOf(i) &&
                      "border-[2px] border-yellow-300"
                    }`}
                    key={i.id}
                  >
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      src={i.product.image}
                    />
                  </button>
                ))}
              </div>
            )}
            {selectedSize === "L" && largeItems.length > 0 && (
              <div className="flex w-[320px] space-x-2 overflow-x-scroll p-2">
                {largeItems.map((i: any) => (
                  <button
                    onClick={() => {
                      setIndex(query.data.result.sync_variants.indexOf(i));
                      query.refetch();
                    }}
                    className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                      index === query.data.result.sync_variants.indexOf(i) &&
                      "border-[2px] border-yellow-300"
                    }`}
                    key={i.id}
                  >
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      src={i.product.image}
                    />
                  </button>
                ))}
              </div>
            )}
            {selectedSize === "XL" && xlargeItems.length > 0 && (
              <div className="flex w-[320px] space-x-2 overflow-x-scroll p-2">
                {xlargeItems.map((i: any) => (
                  <button
                    onClick={() => {
                      setIndex(query.data.result.sync_variants.indexOf(i));
                      query.refetch();
                    }}
                    className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                      index === query.data.result.sync_variants.indexOf(i) &&
                      "border-[2px] border-yellow-300"
                    }`}
                    key={i.id}
                  >
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      src={i.product.image}
                    />
                  </button>
                ))}
              </div>
            )}
            {selectedSize === "2XL" && xxlargeItems.length > 0 && (
              <div className="flex w-[320px] space-x-2 overflow-x-scroll p-2">
                {xxlargeItems.map((i: any) => (
                  <button
                    onClick={() => {
                      setIndex(query.data.result.sync_variants.indexOf(i));
                      query.refetch();
                    }}
                    className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                      index === query.data.result.sync_variants.indexOf(i) &&
                      "border-[2px] border-yellow-300"
                    }`}
                    key={i.id}
                  >
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      src={i.product.image}
                    />
                  </button>
                ))}
              </div>
            )}
            {smallItems.length === 0 && (
              <div className="flex w-[320px] space-x-2 overflow-x-scroll p-2">
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
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      src={i.product.image}
                    />
                  </button>
                ))}
              </div>
            )}
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
