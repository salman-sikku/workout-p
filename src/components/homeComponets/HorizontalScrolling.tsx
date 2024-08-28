"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import NodeCache from 'node-cache'; // Adding caching
import TrainCategoryModel from '@/libs/models/trainExercies/TrainCategory';

const CARD_WIDTH = 220;
const categoryCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

interface TrainCategory {
    _id: string;
    name: string;
    slug: string;
    imgUrl: string;
}

function HorizontalScrolling() {
    const [getcategory, setGetcategory] = useState<TrainCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef: any = useRef();

    const handleScroll = (scrollAmount: number) => {
        const newScrollPosition = scrollPosition + scrollAmount;
        setScrollPosition(newScrollPosition);
        containerRef.current.scrollLeft = newScrollPosition;
    };

    useEffect(() => {
        const fetchData = async () => {
            const cachedData: TrainCategory[] | undefined = categoryCache.get('categories');
            if (cachedData) {
                setGetcategory(cachedData);
                setLoading(false);
            } else {
                try {
                    const { data } = await axios.get('/api/challenge-exercise/challengCateGet');
                    const categories = data.challengeCategory.map(({ _id, name, slug, imgUrl }: TrainCategory) => ({
                        _id,
                        name,
                        slug,
                        imgUrl, // Only fetching necessary fields
                    }));
                    setGetcategory(categories);
                    categoryCache.set('categories', categories); // Cache the data
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    const SkeletonCard = () => (
        <div className="relative w-[190px] h-[170px] md:w-[220px] md:h-[200px] sm:w-[200px] sm:h-[190px] animate-pulse">
            <div className="w-full h-full bg-[#f0ecff] rounded-[28px]"></div>
        </div>
    );

    return (
        <>
            <div className="flex justify-between items-center mt-[10px] md:mt-[26px] sm:mt-[14px]">
                <h5 className="font-bold text-lg text-gray-800">Challenge Workout</h5>
                <div className="flex">
                    <span onClick={() => handleScroll(-CARD_WIDTH)} className="w-7 md:w-8 h-7 md:h-8 mr-2 sm:mr-3 md:mr-4 cursor-pointer rounded-full bg-[#f0ecff] flex justify-center items-center text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]"><FaAngleLeft /></span>
                    <span onClick={() => handleScroll(CARD_WIDTH)} className="w-7 md:w-8 h-7 md:h-8 rounded-full cursor-pointer bg-[#f0ecff] flex justify-center items-center text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]"><FaAngleRight /></span>
                </div>
            </div>
            <section className='myScrollBar overflow-x-scroll mt-4' ref={containerRef} style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
                <div className="flex flex-nowrap items-center gap-[10px] md:gap-[20px] sm:gap-[15px]" style={{ width: 'max-content' }}>
                    {
                        loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))
                        ) : (
                            getcategory.map((curElm) => (
                                <Link href={`/workoutLevelExse/${curElm.slug}`} key={curElm._id} className="relative w-[190px] h-[170px] md:w-[220px] md:h-[200px] sm:w-[200px] sm:h-[190px] rounded-[20px] bg-[#f0ecff] overflow-hidden">
                                    <div className='relative w-full h-full'>
                                        <Image
                                            src={curElm.imgUrl}
                                            fill
                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                            className='object-cover'
                                            alt='fit-img'
                                            priority
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-black to-transparent opacity-75"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-[70%] flex flex-col items-center justify-center ">
                                        <h3 className='text-white text-base md:text-lg sm:text-[16px] font-[500]'>{curElm.name}</h3>
                                        <span className='text-white text-xs md:text-sm md:text-[13px]'>Workout | 10</span>
                                    </div>
                                </Link>
                            ))
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default HorizontalScrolling;
