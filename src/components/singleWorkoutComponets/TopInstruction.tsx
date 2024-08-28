"use client"

import React, { useState, useEffect } from 'react';
import VideoWorkout from './VideoWorkout';
import Image from 'next/image';
import axios from 'axios';

interface ParamsProps {
    paramsId: string;
}

interface ChallengeExercise {
    name: string;
    interactions: { interaction: string }[];
    mistakes: { mistake: string }[];
    brathings: { tips: string }[];
    imgUrl: string;
    focusImg: string;
    focusArea: string[];
    duration: number;
    reps: number;
}

const TopInstruction: React.FC<ParamsProps> = ({ paramsId }) => {
    const [singleChalengExso, setSingleChalengExso] = useState<ChallengeExercise | null>(null);
    const [seeVideo, setSeeVideo] = useState(true);

    useEffect(() => {
        const fetchDataByWorkout = async () => {
            try {
                const { data } = await axios.get(`/api/challenge-exercise/getSingleChallenge/${paramsId}`);
                console.log(data.getSingleChalengExso);
                setSingleChalengExso(data.getSingleChalengExso);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDataByWorkout();
    }, [paramsId]);

    if (!singleChalengExso) {
        return <>
            <div className='flex justify-between items-center flex-col mt-[23px] animate-pulse'>
                <div className='text-lg font-semibold text-center mb-[6px] bg-[#f0ecff] animate-pulse w-20 h-3 rounded-md'></div>
                <div className='text-2xl font-semibold text-center mb-[28px] bg-[#f0ecff] animate-pulse w-24 h-3 rounded-md'></div>
                <div className='h-[280px] border rounded-xl w-full bg-[#f0ecff] animate-pulse'></div>
                <div className='flex justify-center bg-[#f0ecff] rounded-full mt-[20px] animate-pulse w-32 h-6'></div>
            </div>
        </>
    }

    return (
        <>
            <div className='flex justify-between items-center flex-col md:mt-[23px]'>
                <h3 className='text-base md:text-lg font-semibold text-center mb-0 md:mb-[6px] text-[#242424]'>Instruction</h3>
                <h2 className='text-xl md:text-2xl font-semibold text-center mb-[20px] md:mb-[28px] text-[#242424] capitalize'>{singleChalengExso.name}</h2>
                <div className='overflow-hidden h-[220px] md:h-[280px] border rounded-2xl w-full'>
                    {seeVideo ? (
                        <div className='relative h-full w-full bg-[#fdfdfd]'>
                            <Image
                                src={singleChalengExso.imgUrl}
                                fill
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                className='object-contain'
                                alt='fit-img'
                                priority
                            />
                        </div>
                    ) : (
                        <VideoWorkout exsoname={singleChalengExso.name} />
                    )}
                </div>
                <div className='flex justify-center bg-[#f0ecff] rounded-full mt-[20px]'>
                    <button
                        onClick={() => setSeeVideo(true)}
                        className={`rounded-full py-[5px] md:py-[6px] px-4 text-[12px] font-semibold ${seeVideo ? 'bg-[#6842ff] text-white' : 'bg-transparent text-[#6842ff]'}`}>
                        By animation
                    </button>
                    <button
                        onClick={() => setSeeVideo(false)}
                        className={`rounded-full py-[5px] md:py-[6px] px-4 text-[12px] ml-4 font-semibold ${!seeVideo ? 'bg-[#6842ff] text-white' : 'bg-transparent text-[#6842ff]'}`}>
                        How to do
                    </button>
                </div>
            </div>
            <div className='mt-[20px] sm:mt-[24px] md:mt-[24px]'>
                <div className='flex justify-between'>
                    <span className='uppercase text-lg font-semibold text-[#6842ff]'>Repeats</span>
                    {singleChalengExso.duration === 0 ? <span className='text-[16px] font-semibold text-gray-600'>{singleChalengExso.reps} reps</span> : <span className='text-[16px] font-semibold text-gray-600'>{singleChalengExso.duration} sec</span>}
                </div>
            </div>
            <div className='mt-[21px] sm:mt-[32px] md:mt-[32px]'>
                <div>
                    <h2 className='uppercase text-[17px] sm:text-lg md:text-lg font-semibold text-[#6842ff] mb-[14px] md:mb-[18px]'>Instructions</h2>
                    {
                        singleChalengExso.interactions.map((curElm, index) => (<p key={index} className='mb-3 md:mb-4 text-base md:text-[17px] leading-[22px] md:leading-[25px] tracking-[-0.003em]'>{curElm.interaction}</p>))
                    }
                </div>
            </div>
            <div className='mt-[21px] sm:mt-[32px] md:mt-[32px]'>
                <div className=''>
                    <h2 className='uppercase text-[17px] sm:text-lg md:text-lg font-semibold text-[#6842ff] mb-[14px] md:mb-[18px]'>focus area</h2>
                    <div className='w-[80%] flex flex-wrap md:w-full'>
                        {
                            singleChalengExso.focusArea.map((curElm, index) => (<div key={index} className='mb-2 md:mb-4 text-[12px] md:text-[13px] font-medium px-4 md:px-5 py-[6px] md:py-2 mr-2 rounded-full text-[#6842ff] bg-[#f0ecff] uppercase'>{curElm}</div>))
                        }
                    </div>
                    <div className='relative h-[300px] md:h-[350px] w-[320px] md:w-[380px] bg-[#fdfdfd] mt-[12px]'>
                        <Image
                            src={singleChalengExso.focusImg}
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='object-contain'
                            alt='fit-img'
                            priority
                        />
                    </div>
                </div>
            </div>
            <div className='mt-[21px] sm:mt-[32px] md:mt-[32px]'>
                <div>
                    <h2 className='uppercase text-[17px] sm:text-lg font-semibold text-[#6842ff] mb-[14px] md:mb-[18px]'>common mistakes</h2>
                    {
                        singleChalengExso.mistakes.map((curElm, index) => (<p key={index} className='mb-3 md:mb-4 text-base md:text-[17px] leading-[22px] md:leading-[25px] tracking-[-0.003em]'>{curElm.mistake}</p>))
                    }
                </div>
            </div>
            <div className='mt-[21px] sm:mt-[32px] md:mt-[32px]'>
                <div>
                    <h2 className='uppercase text-[17px] sm:text-lg font-semibold text-[#6842ff] mb-[14px] md:mb-[18px]'>breathing tips</h2>
                    {
                        singleChalengExso.brathings.map((curElm, index) => (<p key={index} className='mb-3 md:mb-4 text-base md:text-[17px] leading-[22px] md:leading-[25px] tracking-[-0.003em]'>{curElm.tips}</p>))
                    }
                </div>
            </div>
        </>
    );
}

export default TopInstruction;
