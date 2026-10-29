import Image from "next/image";
import logo from "@/public/logo.png";
import { IconGift , IconShoppingBagCheck ,IconShoppingCartCheck   } from '@tabler/icons-react';


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      {/* Shared Image */}

  <div className="flex flex-1 flex-col px-6 py-8 lg:px-12 bg-black">

    <Image src={logo} alt="Logo" width={120} height={50} className="-mx-10 -my-10"/>

  <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center">

    {/* Main Heading */}
    <div className="text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#5865F2]">
        Welcome to YourStore
      </p>

      <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
        Shop smarter.{" "}
        <span className="text-[#3640E3]">
          Live better.
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-zinc-300">
        Discover products you'll love, enjoy a seamless shopping
        experience, and find everything you need in one place.
      </p>
    </div>

    {/* Store Benefits */}
    <div className="mt-12 space-y-8">

      {/* Benefit 1 */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3640E3]/10">
          <IconShoppingBagCheck
            size={25}
            stroke={1.8}
            color="#5865F2"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Discover Products You'll Love
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Explore a world of products and discover new
            favorites for your everyday needs.
          </p>
        </div>
      </div>

      {/* Benefit 2 */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3640E3]/10">
          <IconGift
            size={25}
            stroke={1.8}
            color="#5865F2"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            A Better Shopping Experience
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Enjoy a simple, convenient experience from
            browsing products to completing your purchase.
          </p>
        </div>
      </div>

      {/* Benefit 3 */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3640E3]/10">
          <IconShoppingCartCheck
            size={25}
            stroke={1.8}
            color="#5865F2"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Keep Your Orders Organized
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Keep your purchases and order details organized
            in one convenient place.
          </p>
        </div>
      </div>

    </div>
  </main>

  {/* Footer */}
  <footer className="pt-8 text-center">
    <p className="text-xs text-zinc-500">
      © 2026 YourStore. All rights reserved.
    </p>
  </footer>

</div>
      

      {/* Login or Signup Form */}
      <div className="flex items-center justify-center p-12 bg-[#1C1C1C]">
        {children}
      </div>
    </main>
  );
}



