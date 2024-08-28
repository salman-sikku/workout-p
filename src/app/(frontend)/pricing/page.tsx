"use client"
import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";

export default function page() {
  return (
    <>
      <div className="mx-auto max-w-[660px]">
        <div className="max-w-2xl mx-auto text-center mb-9">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Pay once, use forever
          </h2>
          <p className="mt-1 text-[#6f7070]">
            Invest in your health and fitness with our affordable Premium Plan
          </p>
        </div>
        <div className='grid grid-cols-2 gap-6 lg:items-center'>
          <div className='border border-[#e4e4e5] rounded-lg h-[370px] w-[308px] p-4'>
            <h3 className='text-center pb-4 font-semibold text-2xl'>Free</h3>
            <div className='text-center'>
              <h3 className='font-bold text-4xl'>Free</h3>
              <span className='text-center text-[#6f7070] text-[15px]'>Forever free</span>
            </div>
            <div>
              <ul className='mt-7 space-y-2.5'>
                <li className='flex items-center'>
                  <span className='w-6 h-6 rounded-full flex justify-center items-center bg-[#f0ecff] text-[#714dff]'><FaCheck /></span>
                  <span className='ml-2 text-[#6f7070] text-[14px]'>Challenge workouts</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-6 h-6 rounded-full flex justify-center items-center bg-[#f0ecff] text-[#714dff]'><FaCheck /></span>
                  <span className='ml-2 text-[#6f7070] text-[14px]'>Training workouts</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-6 h-6 rounded-full flex justify-center items-center bg-[#f0ecff] text-[#714dff]'><FaCheck /></span>
                  <span className='ml-2 text-[#6f7070] text-[14px]'>Health daily tips</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-6 h-6 rounded-full flex justify-center items-center bg-[#f0ecff] text-[#714dff]'><FaCheck /></span>
                  <span className='ml-2 text-[#6f7070] text-[14px]'>Programs</span>
                </li>
              </ul>
              <button className='border border-[#e4e4e5] text-[#484949] rounded-lg w-full text-sm font-semibold  h-11 mt-4'>Your current plan</button>
            </div>
          </div>
          <div className='border border-[#714dff] h-[424px] w-[308px] p-5 rounded-lg'>
            <div className='w-[40%] text-[12px] font-semibold h-6 flex items-center justify-center rounded-full bg-[#714dff] text-[#fff] mx-auto'>MOST POPULAR</div>
            <h3 className='text-center pb-4 font-semibold text-2xl mt-[10px]'>Pro</h3>
            <div className='text-center'>
              <h3 className='font-bold text-4xl flex items-center justify-center'><span><FaIndianRupeeSign/></span> 58</h3>
              <p className='text-center text-[#6f7070] text-[15px] leading-[1.3rem] mt-1'>Enjoy lifetime access to ultimate fitness</p>
            </div>
            <div>
              <ul className='mt-7 space-y-2.5'>
                <li className='flex items-center'>
                  <span className='w-6 h-6 rounded-full flex justify-center items-center text-[#fff] bg-[#714dff]'><FaCheck /></span>
                  <span className='ml-2 text-[#6f7070] text-[14px]'>AI Chat</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-6 h-6 rounded-full flex justify-center items-center text-[#fff] bg-[#714dff]'><FaCheck /></span>
                  <span className='ml-2 text-[#6f7070] text-[14px]'>More workout access</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-6 h-6 rounded-full flex justify-center items-center text-[#fff] bg-[#714dff]'><FaCheck /></span>
                  <span className='ml-2 text-[#6f7070] text-[14px]'>Unlimated targeted workouts</span>
                </li>
                <li className='flex items-center'>
                  <span className='w-6 h-6 rounded-full flex justify-center items-center bg-[#f0ecff] text-[#714dff]'><FaCheck /></span>
                  <span className='ml-2 text-[#6f7070] text-[14px]'>Programs</span>
                </li>
              </ul>
              <button className='border border-[#e4e4e5] bg-[#714dff] text-[#fff] rounded-lg w-full text-sm font-semibold  h-11 mt-4'>GET STARTED</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
