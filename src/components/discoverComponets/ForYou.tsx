import React from 'react'
import Image from 'next/image'

function ForYou() {
    return (
        <>
            <h5 className="font-bold text-lg text-gray-800 mt-[20px] sm:mt-[26px] md:mt-[46px]">For You</h5>
            <section className='grid grid-cols-1'>
                <div className='mt-[5px] md:hover:scale-105 ease-in-out duration-300 hover:cursor-pointer text-white bg-[#5c5ce6] space-[-0.5px] py-[13px] px-[20px] rounded-xl'>
                    <div className='flex justify-between items-center'>
                        <span className='font-bold text-[20px] md:text-[22px] w-[86%]'>Core Supersets!</span>
                        <span className='text-base md:text-[18px] font-semibold'>25</span>
                    </div>
                    <div className='flex justify-between items-center mt-[6px]'>
                        <span className='font-[600] text-[13px] md:text-sm w-[56%] opacity-[0.5]'>Get Ton, Lose Fat</span>
                        <span className='self-end font-medium text-[13px] md:text-sm opacity-[0.5] uppercase'>NO EQUIPMENT</span>
                    </div>
                </div>
                <div className='mt-[5px] md:hover:scale-105 ease-in-out duration-300 hover:cursor-pointer text-white bg-[#5c5ce6] space-[-0.5px] py-[13px] px-[20px] rounded-xl'>
                    <div className='flex justify-between items-center'>
                        <span className='font-bold text-[22px] w-[86%]'>Core Supersets! </span>
                        <span className='text-[18px] font-semibold'>25</span>
                    </div>
                    <div className='flex justify-between items-center mt-[6px]'>
                        <span className='font-[600] text-sm w-[56%] opacity-[0.5]'>Get Ton, Lose Fat</span>
                        <span className=' self-end font-medium text-sm opacity-[0.5] uppercase'>NO EQUIPMENT</span>
                    </div>
                </div>
                <div className='mt-[5px] md:hover:scale-105 ease-in-out duration-300 hover:cursor-pointer text-white bg-[#5c5ce6] space-[-0.5px] py-[13px] px-[20px] rounded-xl'>
                    <div className='flex justify-between items-center'>
                        <span className='font-bold text-[22px] w-[86%]'>Core Supersets! </span>
                        <span className='text-[18px] font-semibold'>25</span>
                    </div>
                    <div className='flex justify-between items-center mt-[6px]'>
                        <span className='font-[600] text-sm w-[56%] opacity-[0.5]'>Get Ton, Lose Fat</span>
                        <span className=' self-end font-medium text-sm opacity-[0.5] uppercase'>NO EQUIPMENT</span>
                    </div>
                </div>
            </section>
            <div className='flex justify-center items-center '>
                <button className='btn'>Load More</button>
            </div>
        </>
    )
}

export default ForYou