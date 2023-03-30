import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { api } from "~/utils/api";
import Navbar from "~/components/Navbar";
import bg from "~/assets/images/bg.png";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Full Spectrum Family</title>
        <meta name="description" content="Full Spectrum Family" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-5 ">
        <Image className="container" alt="" src={bg} />
        <div className="container flex flex-col items-center justify-center gap-12 py-4">
          <div className=" text-center">
            <h1 className=" bg-gradient-to-br from-[#6816a2] to-[#e7bb4c] bg-clip-text py-2 text-5xl font-bold text-transparent">
              Welcome to the Family
            </h1>
            {/* <p className="text-[#595959]">
              Where nuerodivergents come together.
            </p> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
