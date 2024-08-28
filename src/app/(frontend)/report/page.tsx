"use client";

import { LiaMedalSolid } from "react-icons/lia";
import { HiFire } from "react-icons/hi";
import { IoMdTimer } from "react-icons/io";
import BMIcomponets from "@/components/reportComponets/BMIcomponets";
import { useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import ChartData from "@/components/reportComponets/ChartData";

export default function Page() {
    const [totals, setTotals] = useState({ workout: 0, kcal: 0, times: 0 });
    const history = useAppSelector((state) => state.userHistory);

    useEffect(() => {
        if (history && history.history) {
            let totleWorkout = 0;
            let totleKcal = 0;
            let totleTimes = 0;

            history.history.forEach((value) => {
                totleWorkout += value.workoutHis;
                totleKcal += value.caloriesHis;
                totleTimes += value.TimeHis;
            });

            setTotals({ workout: totleWorkout, kcal: totleKcal, times: totleTimes });
        }
    }, [history]);

    return (
        <div className='mx-auto max-w-[530px] border border-transparent'>
            <h2 className="text-xl sm:text-2xl font-bold md:mt-8">Report 🏋️‍♀️🤸‍♂️</h2>
            <div className="mt-4 my-shadow rounded-lg w-full bg-white py-5 sm:py-7 flex justify-between items-center">
                <div className="w-full sm:w-[30%] flex justify-center items-center flex-col mb-4 sm:mb-0">
                    <h5 className="text-lg mb-2 text-[#6842ff]"><LiaMedalSolid /></h5>
                    <h2 className="text-2xl sm:text-[30px] font-semibold">{totals.workout}</h2>
                    <h5 className="text-[13px] text-gray-700 mt-1">Workouts</h5>
                </div>
                <div className="w-full sm:w-[30%] flex justify-center items-center flex-col mb-4 sm:mb-0">
                    <h5 className="text-lg mb-2 text-[#6842ff]"><HiFire /></h5>
                    <h2 className="text-2xl sm:text-[30px] font-semibold">{totals.kcal}</h2>
                    <h5 className="text-[13px] text-gray-700 mt-1">Kcal</h5>
                </div>
                <div className="w-full sm:w-[30%] flex justify-center items-center flex-col">
                    <h5 className="text-lg mb-2 text-[#6842ff]"><IoMdTimer /></h5>
                    <h2 className="text-2xl sm:text-[30px] font-semibold">{totals.times}</h2>
                    <h5 className="text-[13px] text-gray-700 mt-1">Times</h5>
                </div>
            </div>
            <ChartData />
            <BMIcomponets />
        </div>

    );
}
