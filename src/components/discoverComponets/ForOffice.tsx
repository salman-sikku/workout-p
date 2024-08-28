"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
import Image from 'next/image';


const CARD_WIDTH = 220;
function ForOffice() {
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
      <div className="flex justify-between items-center mt-[46px]">
        <h5 className="font-bold text-lg text-gray-800">Exercises from office</h5>
        <div className="flex">
          <span onClick={() => handleScroll(-CARD_WIDTH)} className="w-7 md:w-8 h-7 md:h-8 mr-2 sm:mr-3 md:mr-4 cursor-pointer rounded-full bg-[#f0ecff] flex justify-center items-center text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]"><FaAngleLeft /></span>
          <span onClick={() => handleScroll(CARD_WIDTH)} className="w-7 md:w-8 h-7 md:h-8 rounded-full cursor-pointer bg-[#f0ecff] flex justify-center items-center text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]"><FaAngleRight /></span>
        </div>
      </div>
      <section className='myScrollBar overflow-x-scroll mt-4' ref={containerRef} style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
        <div className="flex flex-nowrap items-center gap-[10px] sm:gap-[15px] md:gap-[20px]" style={{ width: 'max-content' }}>
          <div className="relative w-[180px] h-[230px] sm:w-[190px] sm:h-[240px] md:w-[210px] md:h-[260px] rounded-xl bg-[#f0ecff] overflow-hidden">
            <div className='relative w-full h-full'>
              <Image
                src="https://utfs.io/f/bdb5761f-a50c-419b-8a4e-f75cbd017441-7erest.com-resize.webp"
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover'
                alt='fit-img'
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-black to-transparent opacity-75"></div>
            <div className="absolute bottom-0 left-0 w-full h-[70%] flex flex-col items-center justify-center ">
              <h3 className='text-white text-base md:text-lg font-[600]'>Rexlaxing Muscles</h3>
              <p className='text-white text-xs md:text-[13px] flex justify-center items-center'><span className='mr-1 text-[15px]'><BsFire /></span> 70Kcal</p>
            </div>
          </div>
          <div className="relative w-[180px] h-[230px] sm:w-[190px] sm:h-[240px] md:w-[210px] md:h-[260px] rounded-xl bg-[#f0ecff] overflow-hidden">
            <div className='relative w-full h-full'>
              <Image
                src="https://utfs.io/f/bdb5761f-a50c-419b-8a4e-f75cbd017441-7erest.com-resize.webp"
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover'
                alt='fit-img'
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-black to-transparent opacity-75"></div>
            <div className="absolute bottom-0 left-0 w-full h-[70%] flex flex-col items-center justify-center ">
              <h3 className='text-white text-base md:text-lg font-[600]'>Rexlaxing Muscles</h3>
              <p className='text-white text-xs md:text-[13px] flex justify-center items-center'><span className='mr-1 text-[15px]'><BsFire /></span> 70Kcal</p>
            </div>
          </div>
          <div className="relative w-[180px] h-[230px] sm:w-[190px] sm:h-[240px] md:w-[210px] md:h-[260px] rounded-xl bg-[#f0ecff] overflow-hidden">
            <div className='relative w-full h-full'>
              <Image
                src="https://utfs.io/f/bdb5761f-a50c-419b-8a4e-f75cbd017441-7erest.com-resize.webp"
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover'
                alt='fit-img'
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-black to-transparent opacity-75"></div>
            <div className="absolute bottom-0 left-0 w-full h-[70%] flex flex-col items-center justify-center ">
              <h3 className='text-white text-base md:text-lg font-[600]'>Rexlaxing Muscles</h3>
              <p className='text-white text-xs md:text-[13px] flex justify-center items-center'><span className='mr-1 text-[15px]'><BsFire /></span> 70Kcal</p>
            </div>
          </div>


        </div>
      </section>
    </>
  )
}

export default ForOffice