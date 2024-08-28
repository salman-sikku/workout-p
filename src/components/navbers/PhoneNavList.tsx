import React from 'react';
import { RxCross2 } from "react-icons/rx";
import Link from 'next/link';

interface FalsePhoneNav {
    setPhoneNavList: React.Dispatch<React.SetStateAction<boolean>>;
    phoneNavList: boolean;
}

const links = [
    { href: '/homepage', label: 'Training' },
    { href: '/discover', label: 'Discover' },
    { href: '/report', label: 'Report' },
    { href: '/blogs', label: 'Blog' },
];

const PhoneNavList: React.FC<FalsePhoneNav> = ({ setPhoneNavList, phoneNavList }) => {
    return (
        <div
            className={`fixed inset-0 bg-[#6842ff] text-white px-3 z-50 transform transition-transform duration-300 ${
                phoneNavList ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <header className="h-[57px] md:h-[10vh] flex justify-between items-center">
                <h2 className="font-bold text-xl">Hallo,</h2>
                <span
                    className="text-2xl"
                    onClick={() => setPhoneNavList(false)}
                >
                    <RxCross2 />
                </span>
            </header>
            <nav className="h-[75%] flex justify-center items-center">
                <ul className="text-center">
                    {links.map((link) => (
                        <li
                            key={link.href}
                            className="text-3xl font-bold leading-[50px]"
                            onClick={() => setPhoneNavList(false)}
                        >
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default PhoneNavList;
