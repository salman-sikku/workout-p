"use client";
import { useAppSelector } from "@/hooks/hooks";

const ChartData = () => {
    const weekHistory = useAppSelector((state) => state.weekHistory);

    if (!weekHistory || weekHistory.length === 0) {
        return null;
    }

    return (
        <div className="w-full mt-6 p-4 sm:p-5 bg-white rounded-lg my-shadow">
            <h2 className="text-[20px] sm:text-[22px] font-bold mb-4 sm:mb-5 text-center">Weekly Workout Distribution</h2>
            <div className="flex justify-between items-end h-56 sm:h-64">
                {weekHistory.map((item, index) => (
                    <div key={index} className="flex flex-col items-center h-full">
                        <div
                            className="overflow-hidden flex items-end w-[30px] sm:w-[40px]"
                            style={{ height: '100%' }}
                        >
                            <span
                                className="bg-[#7452ff] w-full transition-all duration-300 hover:bg-[#6842ff]"
                                style={{ height: `${item.workoutsCompleted * 2}%` }}
                            ></span>
                        </div>
                        <span className="mt-2 text-[12px] sm:text-sm">{item.day}</span>
                        <span className="mt-1 text-[10px] sm:text-xs">{item.workoutsCompleted}</span>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ChartData;
