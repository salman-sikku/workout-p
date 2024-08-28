"use client"
import React, { useEffect, useState } from 'react';
import { BsLightningChargeFill } from "react-icons/bs";
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { useAppSelector } from "@/hooks/hooks";

interface TrainCategory {
    _id: string;
    name: string;
    slug: string;
    imgUrl: string;
    categoryType: string;
}

function WorkoutLevel() {
    const user = useAppSelector((state) => state.auth.user);
    const [getcategory, setGetcategory] = useState<TrainCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectLevel, setSelectLevel] = useState(user?.fitnessLevel || 'beginner');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/train-exercise/trainCateGet');
                setGetcategory(data.TrainCategory);
            } catch (err) {
                setError('Failed to load categories.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSelectValue = (value: string) => {
        setSelectLevel(value);
    };

    const filterData = getcategory.filter((elmData) => elmData.categoryType === selectLevel);

    return (
        <div>
            <p className="font-bold text-lg text-gray-800 mt-5 md:mt-7">Training Workout</p>
            <div className='mt-4 md:mt-6 flex justify-between'>
                {['beginner', 'intermediate', 'advanced'].map((curElm, index) => (
                    <button
                        onClick={() => handleSelectValue(curElm)}
                        key={index}
                        className={`rounded-full px-5 py-[7px] sm:px-8 sm:py-2 md:px-8 md:py-2 font-medium text-[12px] sm:text-base md:text-[17px] border border-[#714dff] capitalize ease-in-out duration-300 ${selectLevel === curElm ? 'bg-[#714dff] text-white' : 'text-[#714dff] bg-white'} hover:bg-[#714dff] hover:text-white`}
                    >
                        {curElm}
                    </button>
                ))}
            </div>

            <div className='mt-4 mb-7 sm:mb-8'>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="relative w-full h-[130px] md:h-36 sm:h-32 animate-pulse mb-[5px] md:mb-[24px] sm:mb-[20px]">
                            <div className="w-full h-full bg-[#f0ecff] rounded-[28px]"></div>
                        </div>
                    ))
                ) : filterData.length > 0 ? (
                    filterData.map((curElm) => (
                        <div
                            key={curElm._id}
                            className='relative bg-[#f0ecff] h-[130px] md:h-36 sm:h-32 w-full overflow-hidden rounded-[20px] mb-[5px] md:mb-[24px] sm:mb-[20px]'
                        >
                            <Link href={`/workoutTrainigList/${curElm.slug}`}>
                                <div className='relative w-full h-full'>
                                    <Image
                                        src={curElm.imgUrl}
                                        className='object-cover'
                                        fill
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        alt={curElm.name}
                                        priority
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-full bg-black opacity-35"></div>
                                <div className="absolute bottom-0 left-0 w-full h-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
                                    <div className='flex justify-end'>
                                        <div className='flex text-gray-200'>
                                            <span><BsLightningChargeFill /></span>
                                            <span><BsLightningChargeFill /></span>
                                            <span><BsLightningChargeFill /></span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='text-white text-[20px] w-[80%] md:w-full leading-6 sm:text-[22px] md:text-2xl md:font-[700] font-bold uppercase'>{curElm.name}</h3>
                                        <span className='text-white text-xs md:text-[13px] uppercase'>Exercises | 10</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No workouts available for the selected level.</p>
                )}
            </div>
        </div>
    );
}

export default WorkoutLevel;
