// src/pages/index.js
import Head from "next/head";
import { Inter } from "next/font/google";
import Dashboard from "@/components/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Exercise Description Generator</title>
        <meta name="description" content="Exercise Description Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"bg-zinc-800 min-h-screen "}>
        <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-500">
            Exercise Description Generator
          </h1>
          <p className="mt-3 text-2xl text-white">
            Create
            {/*This PermanentMarker font is working now, but is doesn't look the same as it does on Google's*/}
            <span className="text-2xl font-bold text-blue-500" >
              {" "}
              AWESOME{" "}
            </span>
            Exercise Descriptions Almost Instantly
          </p>
        </div>
        <Dashboard />
      </main>
    </>
  );
}