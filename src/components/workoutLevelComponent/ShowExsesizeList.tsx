"use client";

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { MdTimer } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrCircleQuestion } from "react-icons/gr";
import trophy from '../../../public/images/trophy.png';
import { IoArrowBack } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { PiSpeakerSimpleHighBold, PiSpeakerSimpleSlashBold } from "react-icons/pi";
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false });
import { addUserHistory } from '@/features/historySlice';
import { useAppDispatch } from "@/hooks/hooks";
import { incrementWorkout } from '@/features/weekHistorySlice';

interface ParamsProps {
    paramsId: string,
}

interface trainigExercise {
    _id: string,
    name: string;
    imgUrl: string;
    duration: number;
    reps: number;
}

const ShowExsesizeList: React.FC<ParamsProps> = ({ paramsId }) => {
    const [categoryData, setCategoryData] = useState<any>({});
    const [workoutList, setWorkoutList] = useState<trainigExercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [pushHnadleModel, setPushHnadleModel] = useState(false);
    const [isRestPeriod, setIsRestPeriod] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [takeId, setTakeId] = useState('');
    const dispatch = useAppDispatch();
    const [settingCountdown, setSettingCountdown] = useState<number>(3);
    const [settingrestPeriod, setSettingRestPeriod] = useState<number>(5);
    const [ismute, setIsmute] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startAudio = useRef<HTMLAudioElement | null>(null);
    const stopAudio = useRef<HTMLAudioElement | null>(null);
    const readyAudio = useRef<HTMLAudioElement | null>(null);
    const congratulationAudio = useRef<HTMLAudioElement | null>(null);
    const goAudio = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {
        const fetchDataByCat = async () => {
            try {
                const { data } = await axios.get(`/api/challenge-exercise/challenGetByCate/${paramsId}`);
                setCategoryData(data.category);
                setWorkoutList(data.challengeCategoryExso);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchDataByCat();
    }, [paramsId]);

    // start model logic
    useEffect(() => {
        if (isModalOpen && workoutList.length > 0) {
            if (isRestPeriod) {
                setRemainingTime(settingrestPeriod);
                timerRef.current = setInterval(() => {
                    setRemainingTime(prevTime => {
                        if (prevTime <= 1) {
                            clearInterval(timerRef.current!);
                            timerRef.current = null;
                            setIsRestPeriod(false);
                            ismute ? startAudio.current?.play() : startAudio.current?.pause()
                            handleNext();
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, 1000);
            } else {
                const currentWorkout = workoutList[currentWorkoutIndex];
                const duration = currentWorkout.duration > 0 ? currentWorkout.duration : 0;

                setRemainingTime(duration);

                if (duration > 0) {
                    timerRef.current = setInterval(() => {
                        setRemainingTime(prevTime => {
                            if (prevTime <= 1) {
                                clearInterval(timerRef.current!);
                                timerRef.current = null;
                                ismute ? stopAudio.current?.play() : stopAudio.current?.pause()
                                setIsRestPeriod(true);
                                return 0;
                            }
                            return prevTime - 1;
                        });
                    }, 1000);
                }
            }
        }
        return () => clearInterval(timerRef.current!);
    }, [isModalOpen, currentWorkoutIndex, workoutList, isRestPeriod]);

    const handleStart = () => {
        setIsCompleted(false);
        ismute ? readyAudio.current?.play() : readyAudio.current?.pause()
        setCountdown(settingCountdown); // Start countdown at 3

        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev !== null && prev > 1) {
                    return prev - 1;
                } else {
                    ismute ? goAudio.current?.play() : goAudio.current?.pause()
                    clearInterval(countdownInterval);
                    setCountdown(null); // Hide countdown after it finishes
                    setCurrentWorkoutIndex(0);
                    setIsModalOpen(true);
                    return null;
                }
            });
        }, 1000); // Update every second
    };


    const handleNext = () => {
        if (currentWorkoutIndex < workoutList.length - 1) {
            setCurrentWorkoutIndex(currentWorkoutIndex + 1);
        } else {
            if (!startAudio.current?.paused) {
                startAudio.current?.pause();
            }
            ismute ? congratulationAudio.current?.play() : congratulationAudio.current?.pause()
            setIsModalOpen(false);
            setIsCompleted(true);
        }
    };

    const handlePush = () => {
        if (isPaused) {
            const currentWorkout = workoutList[currentWorkoutIndex];
            const duration = currentWorkout.duration > 0 ? currentWorkout.duration : 0;
            console.log(duration)
            if (duration > 0) {
                timerRef.current = setInterval(() => {
                    setRemainingTime(prevTime => {
                        if (prevTime <= 1) {
                            clearInterval(timerRef.current!);
                            timerRef.current = null;
                            ismute ? stopAudio.current?.play() : stopAudio.current?.pause()
                            setIsRestPeriod(true);
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, 1000);
            }
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
        setIsPaused(!isPaused);
    };

    const pushHandler = () => {
        handlePush();
        setPushHnadleModel(true)
    }

    const handleBack = (id: string) => {
        console.log(id)
        setTakeId(id)
        setIsSecondModalOpen(true)
    }
    const handleToHard = () => {
        setIsSecondModalOpen(false);
        toast.success("Thanks for your feedback! we'll do our best to bring a batter user experience.", {
            style: {
                padding: '16px',
                borderRadius: '8px',
                fontSize: '13px'
            },
        });

    }
    const handleGoToList = () => {
        setIsSecondModalOpen(false);
        setIsModalOpen(false)
    }

    const calculateOverallProgress = () => {
        return ((currentWorkoutIndex + 1) / workoutList.length) * 100;
    };

    const handleDone = () => {
        setIsCompleted(false);
        dispatch(addUserHistory({
            history: {
                workoutHis: 1,
                caloriesHis: 10,
                TimeHis: 30
            }
        }));
        dispatch(incrementWorkout(workoutList.length));
    }

    // handle setting value

    const incrementCountdown = () => {
        setSettingCountdown(prev => (prev < 10 ? prev + 1 : prev));
    };

    const decrementCountdown = () => {
        setSettingCountdown(prev => (prev > 3 ? prev - 1 : prev));
    };

    const incrementRestPeriod = () => {
        setSettingRestPeriod(prev => (prev < 60 ? prev + 1 : prev));
    };

    const decrementRestPeriod = () => {
        setSettingRestPeriod(prev => (prev > 5 ? prev - 1 : prev));
    };

    return (
        <>
            <div className='md:px-4 mt-[0px] sm:mt-[4px] md:mt-[25px]'>
                <h2 className='text-[18px] md:text-[24px] sm:text-[21px] font-semibold capitalize mb-[10px] sm:mb-[12px] md:mb-[13px]'>{categoryData.name}</h2>
                <div className='flex justify-between mb-[20px] md:mb-[28px] sm:mb-[25px]'>
                    <div className='flex'>
                        <span className='h-[1.6rem] sm:h-[1.8rem] md:h-[1.9rem] w-24 sm:w-28 md:w-32 flex justify-center cursor-text items-center text-[12px] md:text-[13px] bg-[#f0ecff] text-[#6842ff] font-semibold capitalize rounded-full'>
                            <span className='mr-[5px]'><MdTimer /></span> 10 minutes
                        </span>
                        <span className='ml-3 sm:ml-4 h-[1.6rem] sm:h-[1.8rem] md:h-[1.9rem] w-24 sm:w-28 md:w-32 flex justify-center cursor-text items-center text-[12px] md:text-[13px] bg-[#f0ecff] text-[#6842ff] font-semibold capitalize rounded-full '>
                            <span className='mr-[5px]'><GiWeightLiftingUp /></span> {workoutList.length} workout
                        </span>
                    </div>
                    <div>
                        <button onClick={() => setIsSettingsModalOpen(true)} className='py-2 px-2 text-[14px] sm:text-[16px] md:text-[17px] mr-2 bg-[#f0ecff] text-[#6842ff] font-semibold capitalize rounded-full ease-in-out duration-300 hover:bg-[#6842ff] hover:text-[#fff]'><IoSettingsSharp /></button>
                        <button onClick={() => setIsmute(!ismute)} className={`py-2 px-2 text-[14px] sm:text-[16px] md:text-lg font-semibold capitalize rounded-full ease-in-out duration-300 hover:bg-[#6842ff] hover:text-[#fff] ${ismute ? 'bg-[#6842ff] text-[#fff]' : 'bg-[#f0ecff] text-[#6842ff]'}`}>  {ismute ? <PiSpeakerSimpleHighBold /> : <PiSpeakerSimpleSlashBold />}</button>
                    </div>
                </div>
                <hr />
            </div>
            <div className='mt-7 sm:mt-8 md:mt-10 px-1 sm:px-2 md:px-4 mb-[82px] sm:mb-[85px] md:mb-[98px]'>
                {
                    loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className='overflow-hidden flex h-[16vh] sm:h-[18vh] md:h-[20vh] rounded-xl md:rounded-2xl mb-[10px] sm:mb-[15px] md:mb-[20px] bg-[#f0ecff] animate-pulse'></div>
                        ))
                    ) : (
                        workoutList.map((curElm: any, index: number) => (
                            <Link href={`/singleWorkoutLevelExse/${curElm._id}`} className='mt-[5px] md:mt-4 sm:mt-2' key={index}>
                                <div className='my-shadow overflow-hidden flex h-[16vh] sm:h-[18vh] md:h-[20vh] rounded-xl md:rounded-2xl mb-[10px] sm:mb-[15px] md:mb-[20px]'>
                                    <div className='relative h-full w-[120px] sm:w-[140px] md:w-[170px]'>
                                        <Image
                                            src={curElm.imgUrl}
                                            fill
                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                            className='object-contain'
                                            alt='fit-img'
                                            priority
                                        />
                                    </div>
                                    <div className='h-full flex flex-col items-start justify-center ml-3 sm:ml-4 md:ml-10'>
                                        <h5 className='text-[14px] sm:text-[15px] md:text-lg font-semibold capitalize flex items-center'>
                                            {curElm.name} <span className='ml-2'><GrCircleQuestion /></span>
                                        </h5>
                                        {curElm.duration === 0 ? (
                                            <span className='text-[12px] sm:text-[13px] md:text-sm'>{curElm.reps} reps</span>
                                        ) : (
                                            <span className='text-[12px] sm:text-[13px] md:text-sm'>{curElm.duration} sec</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>

            <footer className="fixed left-0 z-10 border border-b bottom-0 w-full flex justify-center items-center h-[80px] md:h-[90px] bg-white">
                <button className="btn w-60 sm:w-64 md:w-72 rounded-full" type="button" onClick={handleStart}>
                    Start
                </button>
            </footer>

            {/* ALL MODAL ARE START HARE */}

            {countdown !== null && (
                <div className='no-select fixed inset-0 flex flex-col items-center justify-center z-50'>
                    <h1 className='text-lg sm:text-xl md:text-2xl font-bold md:font-semibold text-[#6842ff]'>
                        Ready!
                    </h1>
                    <h1 className='text-6xl sm:text-7xl md:text-8xl font-semibold text-[#6842ff] mt-2 transition-all duration-500 ease-in-out transform animate-[countdownAnimation_1s_ease-in-out]'>
                        {countdown}
                    </h1>
                </div>

            )}

            {isModalOpen && workoutList[currentWorkoutIndex] && (
                <div className='no-select fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='bg-white p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center w-[90%] sm:w-[80%] md:w-[70%] max-w-[400px]'>
                        <div className='w-full mb-1 sm:mb-[2px]'>
                            <span
                                onClick={() => handleBack(workoutList[currentWorkoutIndex]._id)}
                                className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 cursor-pointer rounded-full bg-[#f0ecff] flex justify-center items-center text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]"
                            >
                                <IoArrowBack />
                            </span>
                        </div>
                        <div className='h-[250px] sm:h-[300px] md:h-[320px] w-[250px] sm:w-[300px] md:w-[350px]'>
                            <Image
                                src={workoutList[currentWorkoutIndex].imgUrl}
                                width={300}
                                height={300}
                                className='w-full h-full object-contain'
                                alt='workout-img'
                                priority={true}
                            />
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-[3px] sm:h-[4px]">
                            <div
                                className="bg-[#6842ff] h-[3px] sm:h-[4px] rounded-full"
                                style={{ width: `${calculateOverallProgress()}%` }}
                            ></div>
                        </div>
                        <p className='mt-4 text-md sm:text-lg md:text-xl font-semibold capitalize text-gray-800'>
                            {isRestPeriod ? 'Rest' : workoutList[currentWorkoutIndex].name}
                        </p>
                        {isRestPeriod ? (
                            <div className='flex flex-col items-center justify-center'>
                                <p className='mt-2 text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-center'>Rest: 00:{remainingTime}</p>
                                <button
                                    className='mt-4 py-1 sm:py-2 px-4 sm:px-6 font-semibold text-sm bg-[#f0ecff] text-[#6842ff] rounded-full'
                                    onClick={() => { setIsRestPeriod(false); handleNext(); }}
                                >
                                    Skip
                                </button>
                            </div>
                        ) : workoutList[currentWorkoutIndex].duration > 0 ? (
                            <div className='w-full'>
                                <p className='mt-2 text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-center'>00:{remainingTime}</p>
                                <div className='mt-4 flex justify-between items-center w-full'>
                                    <button
                                        className='py-1 sm:py-2 px-4 sm:px-6 font-semibold text-sm bg-[#f0ecff] text-[#6842ff] rounded-full'
                                        onClick={() => setCurrentWorkoutIndex(prev => prev > 0 ? prev - 1 : 0)}
                                    >
                                        Last
                                    </button>
                                    <button className='btn w-32 sm:w-36 md:w-40 rounded-full' onClick={pushHandler}>
                                        {isPaused ? 'Resume' : 'Pause'}
                                    </button>
                                    <button
                                        disabled={currentWorkoutIndex === workoutList.length - 1}
                                        className='py-1 sm:py-2 px-4 sm:px-6 font-semibold text-sm bg-[#f0ecff] text-[#6842ff] rounded-full'
                                        onClick={handleNext}
                                    >
                                        Skip
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className='mt-2 text-[18px] sm:text-[20px] md:text-[22px] font-semibold'>{workoutList[currentWorkoutIndex].reps}x</p>
                        )}
                        {workoutList[currentWorkoutIndex].duration === 0 && !isRestPeriod && (
                            <div className='mt-4 w-full flex justify-between items-center'>
                                <button
                                    className='py-1 sm:py-2 px-4 sm:px-6 font-semibold text-sm bg-[#f0ecff] text-[#6842ff] rounded-full'
                                    onClick={() => setCurrentWorkoutIndex(prev => prev > 0 ? prev - 1 : 0)}
                                >
                                    Last
                                </button>
                                <button className='btn w-32 sm:w-36 md:w-40 rounded-full' onClick={() => setIsRestPeriod(true)}>Done</button>
                                <button
                                    disabled={currentWorkoutIndex === workoutList.length - 1}
                                    className='py-1 sm:py-2 px-4 sm:px-6 font-semibold text-sm bg-[#f0ecff] text-[#6842ff] rounded-full'
                                    onClick={handleNext}
                                >
                                    Skip
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isSecondModalOpen && (
                <div className='no-select fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='bg-white p-4 sm:p-6 rounded-lg modal-content w-[90%] sm:w-[350px]'>
                        <h2 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4'>Quit</h2>
                        <ul className='w-full sm:w-[300px]'>
                            <Link href={`/singleWorkoutLevelExse/${takeId}`}>
                                <li className='border text-[12px] sm:text-[13px] py-3 sm:py-4 px-2 sm:px-3 cursor-pointer mt-3 sm:mt-4 font-semibold rounded-lg bg-[#f0ecff] text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]'>
                                    Don't know how to do it
                                </li>
                            </Link>
                            <li onClick={handleToHard} className='border text-[12px] sm:text-[13px] py-3 sm:py-4 px-2 sm:px-3 cursor-pointer mt-3 sm:mt-4 font-semibold rounded-lg bg-[#f0ecff] text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]'>
                                Too hard
                            </li>
                            <li onClick={handleGoToList} className='border text-[12px] sm:text-[13px] py-3 sm:py-4 px-2 sm:px-3 cursor-pointer mt-3 sm:mt-4 font-semibold rounded-lg bg-[#f0ecff] text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]'>
                                Go to list
                            </li>
                        </ul>
                    </div>
                </div>

            )}

            {pushHnadleModel && (
                <div className='no-select fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='bg-white p-4 sm:p-6 rounded-lg modal-content w-[90%] sm:w-[350px]'>
                        <h2 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4'>Pause</h2>
                        <ul className='w-full sm:w-[300px]'>
                            <Link href={`/homepage`}>
                                <li className='border text-[12px] sm:text-[13px] py-3 sm:py-4 px-2 sm:px-3 cursor-pointer mt-3 sm:mt-4 font-semibold rounded-lg bg-[#f0ecff] text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]'>
                                    Quit
                                </li>
                            </Link>
                            <li onClick={() => { handlePush(); setPushHnadleModel(false) }} className='border text-[12px] sm:text-[13px] py-3 sm:py-4 px-2 sm:px-3 cursor-pointer mt-3 sm:mt-4 font-semibold rounded-lg bg-[#f0ecff] text-[#714dff] ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]'>
                                Resume
                            </li>
                        </ul>
                    </div>
                </div>

            )}

            {isCompleted && (
                <div className='no-select fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='bg-white p-4 sm:p-6 rounded-lg w-[90%] sm:w-[400px]'>
                        <div className='flex flex-col items-center'>
                            <div className='relative w-36 h-24 sm:w-48 sm:h-32'>
                                <Image
                                    src={trophy}
                                    fill
                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    className='object-contain'
                                    alt='fit-img'
                                    priority
                                />
                            </div>
                            <div className='mt-4 text-center'>
                                <h2 className='text-md sm:text-lg font-semibold text-[#6842ff]'>Congratulations!</h2>
                                <p className='text-xs sm:text-sm text-gray-500 font-medium'>You have completed all workouts!</p>
                            </div>
                        </div>
                        <div className="mt-5 py-1 flex justify-between items-center">
                            <div className="w-[30%] flex justify-center items-center flex-col">
                                <h2 className="text-[18px] sm:text-[20px] font-semibold">{workoutList.length}</h2>
                                <h5 className="text-[10px] sm:text-[12px] text-gray-700">Workouts</h5>
                            </div>
                            <div className="w-[30%] flex justify-center items-center flex-col">
                                <h2 className="text-[18px] sm:text-[20px] font-semibold">10</h2>
                                <h5 className="text-[10px] sm:text-[12px] text-gray-700">Kcal</h5>
                            </div>
                            <div className="w-[30%] flex justify-center items-center flex-col">
                                <h2 className="text-[18px] sm:text-[20px] font-semibold">30</h2>
                                <h5 className="text-[10px] sm:text-[12px] text-gray-700">Times</h5>
                            </div>
                        </div>
                        <div className='text-center mt-5 sm:mt-7'>
                            <button onClick={handleDone} className='py-[8px] sm:py-[10px] px-10 sm:px-14 cursor-pointer rounded-full font-medium text-white text-[12px] sm:text-[14px] bg-[#714dff] ease-in duration-300'>Done</button>
                        </div>
                    </div>
                    <ReactConfetti width={2000} height={2000} />
                </div>

            )}

            {isSettingsModalOpen && (
                <div className='no-select fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg modal-content w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]'>
                        <div className='mb-8'>
                            <h3 className='text-[13px] sm:text-[15px] font-semibold text-center mb-4 text-gray-600'>
                                Countdown time (3 ~ 15 sec)
                            </h3>
                            <div className='flex items-center justify-between w-[70%] mx-auto'>
                                <button onClick={decrementCountdown} className='text-sm font-semibold'>
                                    <FaAngleLeft />
                                </button>
                                <span className='text-3xl sm:text-4xl font-semibold'>
                                    {settingCountdown}
                                </span>
                                <button onClick={incrementCountdown} className='text-sm font-semibold'>
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <h3 className='text-[13px] sm:text-[15px] font-semibold text-center mb-4 text-gray-600'>
                                Training rest time (5 ~ 60 sec)
                            </h3>
                            <div className='flex items-center justify-between w-[70%] mx-auto'>
                                <button onClick={decrementRestPeriod} className='text-sm font-semibold'>
                                    <FaAngleLeft />
                                </button>
                                <span className='text-3xl sm:text-4xl font-semibold'>
                                    {settingrestPeriod}
                                </span>
                                <button onClick={incrementRestPeriod} className='text-sm font-semibold'>
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSettingsModalOpen(false)}
                            className='text-sm text-[#6842ff] float-right'>
                            SET
                        </button>
                    </div>
                </div>

            )}

            <audio ref={startAudio} src="/sounds/start.mp3" />
            <audio ref={stopAudio} src="/sounds/stop.mp3" />
            <audio ref={readyAudio} src="/sounds/ready.mp3" />
            <audio ref={congratulationAudio} src="/sounds/congratulation.mp3" />
            <audio ref={goAudio} src="/sounds/go.mp3" />

        </>
    );
}

export default ShowExsesizeList;



