"use client"
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { FaInfoCircle } from "react-icons/fa";

interface User {
  fitnessLevel: string;
  goal: string;
  height: number | string;
  weight: number | string;
}

function BMIcomponets() {
  const user = useAppSelector((state: { auth: { user: User | null } }) => state.auth.user);

  const [height, setHeight] = useState<number | string | undefined>(user?.height);
  const [weight, setWeight] = useState<number | string | undefined>(user?.weight);
  const [bmi, setBmi] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [inColor, setInColor] = useState('');
  const [advice, setAdvice] = useState('');
  const [advicePopUp, setAdvicePopUp] = useState(false);

  const handleBmi = () => {
    if (height && weight) {
      // Provide a fallback value if height or weight is undefined
      const heightInMeters = Number(height ?? 0) / 100;
      const weightInKg = Number(weight ?? 0);

      // Calculate BMI
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      const roundedBmiValue = Number(bmiValue.toFixed(2)); // Convert to a number

      setBmi(roundedBmiValue);

      let BmiMsg = '';
      let BmiColor = '';
      let BmiAdvice = '';
      let BmiInFoColor = '';

      if (roundedBmiValue < 18.5) {
        BmiMsg = 'Underweight';
        BmiColor = 'bg-yellow-500';
        BmiInFoColor= 'text-yellow-500',
        BmiAdvice = 'Consider a balanced diet with more calories and strength training to gain muscle mass.';

      } else if (roundedBmiValue < 24.9) {
        BmiMsg = 'Normal weight';
        BmiColor = 'bg-green-500';
        BmiInFoColor= 'text-green-500',
        BmiAdvice = 'Maintain your healthy weight with regular exercise and a balanced diet.';
      } else if (roundedBmiValue < 29.9) {
        BmiMsg = 'Overweight';
        BmiColor = 'bg-orange-500';
        BmiInFoColor= 'text-orange-500',
        BmiAdvice = 'Incorporate more cardio exercises and watch your calorie intake to lose excess weight.';
      } else {
        BmiMsg = 'Obesity';
        BmiColor = 'bg-red-500';
        BmiInFoColor= 'text-red-500',
        BmiAdvice = 'Focus on a low-calorie diet and regular physical activity. Consider consulting a healthcare professional.';
      }

      setMessage(BmiMsg);
      setColor(BmiColor);
      setAdvice(BmiAdvice)
      setInColor(BmiInFoColor)
    }
  };

  useEffect(() => {
    handleBmi();
  }, [weight, height]);

  if (!user) {
    return null
  }

  return (
    <>
      <div className="bg-white p-6 sm:p-8 rounded-lg my-shadow w-full mt-6 sm:mt-8 mb-10 sm:mb-12">
        <h1 className="text-xl sm:text-[22px] font-bold mb-4 text-center">Current BMI</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e: any) => setWeight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e: any) => setHeight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {bmi && (
          <div className="mt-6 text-center">
            <div className='flex justify-between items-center'>
              <div className='text-sm flex items-center sm:mb-0'>
                <span>Your BMI:</span>
                <span className="font-bold ml-1">{bmi}</span>
              </div>
              <div className='flex justify-between items-center'>
                <div onClick={() => setAdvicePopUp(true)} className={`hover:cursor-pointer text-sm md:text-[15px] mr-2 ${inColor}`}><FaInfoCircle /></div>
                <p className="text-gray-700 text-sm">{message}</p>
              </div>
            </div>

            <div className="w-full overflow-hidden bg-gray-300 rounded-full h-2.5 dark:bg-gray-700 mt-2">
              <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${(bmi / 40) * 100}%` }}></div>
            </div>
          </div>
        )}
      </div>
      {advicePopUp && (
        <div className='no-select fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50'>
          <div className='bg-white p-4 sm:p-6 rounded-xl flex flex-col justify-center items-center modal-content max-w-[90%] sm:max-w-[40%]'>
            <p className="text-center text-[13px] sm:text-[14px] text-slate-600 ">{advice}</p>
            <div className="mt-6 sm:mt-8">
              <button onClick={() => setAdvicePopUp(false)} className="px-6 sm:px-8 py-2 text-[11px] sm:text-[12px] font-semibold text-[#714dff] bg-[#f0ecff] rounded-full duration-300 ease-in-out hover:bg-[#714dff] hover:text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BMIcomponets;
