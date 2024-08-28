"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { AiFillFire } from "react-icons/ai";
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

const CARD_WIDTH = 220;
function BellyFat() {
    const [loading, setLoading] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef: any = useRef();

    const handleScroll = (scrollAmount: any) => {
        const newScrollPosition = scrollPosition + scrollAmount;
        setScrollPosition(newScrollPosition);
        containerRef.current.scrollLeft = newScrollPosition;
    }
    return (
        <>
            <div className="flex justify-between items-center mt-[26px]">
                <h5 className="font-bold text-lg text-gray-800">Burn Bally Fat</h5>
                <div className="flex">
                    <span onClick={() => handleScroll(-CARD_WIDTH)} className="w-7 md:w-8 h-7 md:h-8 mr-2 sm:mr-3 md:mr-4 cursor-pointer rounded-full bg-[#f0ecff] flex justify-center items-center text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]"><FaAngleLeft /></span>
                    <span onClick={() => handleScroll(CARD_WIDTH)} className="w-7 md:w-8 h-7 md:h-8 rounded-full cursor-pointer bg-[#f0ecff] flex justify-center items-center text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]"><FaAngleRight /></span>
                </div>
            </div>
            <section className='myScrollBar overflow-x-scroll mt-4 no-select' ref={containerRef} style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
                <div className="flex flex-nowrap items-center gap-[10px] sm:gap-[20px] overflow-x-auto" style={{ width: 'max-content' }}>
                    {
                        Array.from({ length: 4 }).map(() => (
                            <div className="w-[300px] sm:w-[320px] md:w-[380px] h-[130px] sm:h-[140px] md:h-[160px] rounded-xl flex p-2 bg-[rgba(0,0,0,0.07)]">
                                <div className="relative w-[45%] h-full">
                                    <Image
                                        src="https://utfs.io/f/bdb5761f-a50c-419b-8a4e-f75cbd017441-7erest.com-resize.webp"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover rounded-xl"
                                        alt="fit-img"
                                        priority
                                    />
                                </div>
                                <div className="h-full flex flex-col items-start justify-center ml-3 sm:ml-4">
                                    <h2 className="text-[14px] sm:text-[15px] md:text-[17px] font-semibold mb-1">Build Muscles</h2>
                                    <div className="flex items-center mb-1 sm:mb-2 md:mb-4">
                                        <span className="text-[#714dff]"><AiFillFire /></span>
                                        <span className="ml-1 text-[10px] sm:text-[12px] md:text-sm font-medium">10 Kcal</span>
                                    </div>
                                    <div className="bg-white px-2 sm:px-3 md:px-4 font-medium py-1 rounded-full text-[9px] sm:text-[10px] md:text-[12px]">Exercise</div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </section>
        </>
    )
}

export default BellyFat