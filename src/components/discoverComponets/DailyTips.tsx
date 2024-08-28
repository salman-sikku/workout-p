"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Image from 'next/image';


const CARD_WIDTH = 220;

function DailyTips() {

    return (
        <>
            <div className="flex justify-between items-center mt-[14px] mt:mt-[26px]">
                <h5 className="font-bold text-lg text-gray-800">Daily Tips</h5>
                <div className="flex">
                    <span className="w-7 md:w-8 h-7 md:h-8 mr-2 sm:mr-3 md:mr-4 cursor-pointer rounded-full bg-[#f0ecff] flex justify-center items-center text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]"><FaAngleRight /></span>
                </div>
            </div>
            <section className='mt-4'>
                <div className="grid grid-cols-2 gap-[14px] md:gap-[20px]">
                    <div className="h-[220px] md:h-[230px]">
                        <div className='relative w-full h-[60%] md:h-[70%]'>
                            <Image
                                src='https://utfs.io/f/bdb5761f-a50c-419b-8a4e-f75cbd017441-7erest.com-resize.webp'
                                fill
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                className='object-cover rounded-lg md:rounded-xl'
                                alt='fit-img'
                                priority
                            />
                        </div>
                        <div className='w-full'>
                            <h4 className='text-gray-800 text-[15px] md:text-base font-semibold break-before- leading-5 mt-2'>
                                13 Best Exercise Bikes for Home Gyms (2024)..
                            </h4>
                        </div>
                    </div>
                    <div className="h-[220px] md:h-[230px]">
                        <div className='relative w-full h-[60%] md:h-[70%]'>
                            <Image
                                src='https://utfs.io/f/bdb5761f-a50c-419b-8a4e-f75cbd017441-7erest.com-resize.webp'
                                fill
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                className='object-cover rounded-lg md:rounded-xl'
                                alt='fit-img'
                                priority
                            />
                        </div>
                        <div className='w-full'>
                            <h4 className='text-gray-800 text-[15px] md:text-base font-semibold break-before- leading-5 mt-2'>
                                13 Best Exercise Bikes for Home Gyms (2024)..
                            </h4>
                        </div>
                    </div>
                    <div className="h-[220px] md:h-[230px]">
                        <div className='relative w-full h-[60%] md:h-[70%]'>
                            <Image
                                src='https://utfs.io/f/bdb5761f-a50c-419b-8a4e-f75cbd017441-7erest.com-resize.webp'
                                fill
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                className='object-cover rounded-lg md:rounded-xl'
                                alt='fit-img'
                                priority
                            />
                        </div>
                        <div className='w-full'>
                            <h4 className='text-gray-800 text-[15px] md:text-base font-semibold break-before- leading-5 mt-2'>
                                13 Best Exercise Bikes for Home Gyms (2024)..
                            </h4>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DailyTips