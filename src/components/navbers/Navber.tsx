"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAppSelector } from "@/hooks/hooks";
import { PiListBold } from "react-icons/pi";
import PhoneNavList from "./PhoneNavList";
import { useState } from "react";

interface User {
  fitnessLevel: string;
  goal: string;
  height: number | string;
  weight: number | string;
}

const NavLists = dynamic(() => import("./NavLists"), { ssr: false });

function Navber() {
  const user = useAppSelector((state: { auth: { user: User | null } }) => state.auth.user);
  const [phoneNavList, setPhoneNavList] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 md:px-20 px-3">
      <nav className="h-[57px] md:h-[10vh] bg-white flex justify-between items-center border-b">
        {user && user.fitnessLevel ? (
          <Link href="/homepage">
            <h2 className="font-bold text-3xl">Hallo,</h2>
          </Link>
        ) : (
          <Link href="/">
            <h2 className="font-bold text-3xl">Hallo,</h2>
          </Link>
        )}

        <NavLists />
        <div className="flex items-center">
          <Link href='/pricing' className="md:mr-0 border text-center border-[#6842ff] text-[#6842ff] ease-in duration-300 hover:bg-[#6842ff] hover:text-[#fff] rounded-full font-semibold w-16 py-1 text-sm">
            Pro
          </Link>
          <span onClick={() => setPhoneNavList(!phoneNavList)} className={`text-2xl pl-4 ${user && user.fitnessLevel ? 'block md:hidden' : 'hidden'}`}><PiListBold /></span>
        </div>

        <PhoneNavList setPhoneNavList={setPhoneNavList} phoneNavList={phoneNavList}/>
      </nav>
    </header>
  );
}

export default Navber;
