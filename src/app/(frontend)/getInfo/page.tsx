"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFormData } from '@/utils/useFormData';
import { FaCheck } from "react-icons/fa";
import fitMan from '../../../../public/images/fit-man.png';
import weightHold from '../../../../public/images/holding-weight.png';
import musclesMan from '../../../../public/images/bulid-removebg-preview.png';
import { useState } from "react";



export default function Page() {
  const [isSkip, setIsSkip] = useState(false);
  const router = useRouter();
  const { step, formData, handleChange, handleNext, handleForm, errorMsg, handleSkip } = useFormData();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="md:py-[24px] md:px-[16px]">
            <div className="flex justify-center items-center flex-col">
              <h2 className="md:text-[32px] text-[24px] text-center leading-[40px] font-semibold mb-[8px] capitalize">Physical Activity Level?</h2>
              <p className="text-center text-[15px] md:mb-[28px] mb-[24px] md:w-96">Select your usual activity level. This will help us suggest the right workouts for you.</p>
            </div>
            <ul className="mb-24 md:mb-[5px] lg:mb-[20px]">
              <li className="flex justify-center items-center h-[88px] mb-[14px] text-[17px] font-semibold rounded-xl my-shadow" onClick={() => handleChange('fitnessLevel', 'beginner')} style={{ cursor: 'pointer', background: formData.fitnessLevel === 'beginner' ? '#8162ff' : 'white', color: formData.fitnessLevel === 'beginner' ? 'white' : '#1f2937' }}>
                👆 Beginner
              </li>
              <li className="flex justify-center items-center h-[88px] mb-[14px] text-[17px] font-semibold rounded-xl my-shadow" onClick={() => handleChange('fitnessLevel', 'intermediate')} style={{ cursor: 'pointer', background: formData.fitnessLevel === 'intermediate' ? '#8162ff' : 'white', color: formData.fitnessLevel === 'intermediate' ? 'white' : '#1f2937' }}>
                ✌️ Intermediate
              </li>
              <li className="flex justify-center items-center h-[88px] mb-[14px] text-[17px] font-semibold rounded-xl my-shadow" onClick={() => handleChange('fitnessLevel', 'advanced')} style={{ cursor: 'pointer', background: formData.fitnessLevel === 'advanced' ? '#8162ff' : 'white', color: formData.fitnessLevel === 'advanced' ? 'white' : '#1f2937' }}>
                👍 Advanced
              </li>
            </ul>
          </div>
        );
      case 2:
        return (
          <div className="md:py-[24px] md:px-[16px]">
            <div className="flex justify-center items-center flex-col">
              <h2 className="md:text-[32px] text-[24px] text-center leading-[40px] font-semibold mb-[8px] capitalize">What is your goal?</h2>
              <p className="text-center text-[15px] md:mb-[28px] mb-[24px] md:w-96">Select your goal. This will help us recommend the best workouts for you.</p>
            </div>
            <ul className="mb-24 md:mb-[5px] lg:mb-[20px]">
              <li className="overflow-hidden h-[88px] text-center flex justify-between mb-[14px] text-[17px] font-semibold rounded-xl my-shadow" onClick={() => handleChange('goal', 'Lose')} style={{ cursor: 'pointer', background: formData.goal === 'Lose' ? '#8162ff' : 'white', color: formData.goal === 'Lose' ? 'white' : '#1f2937' }}>
                <div className="flex justify-center items-center">
                  <span className="px-4">Lose weight</span>
                </div>
                <div className="relative w-[84px] mr-3 h-full">
                  <Image
                    src={weightHold}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                    alt="image_banner" priority />
                </div>
              </li>
              <li className="overflow-hidden h-[88px] text-center flex justify-between mb-[14px] text-[17px] font-semibold rounded-xl my-shadow" onClick={() => handleChange('goal', 'Muscle')} style={{ cursor: 'pointer', background: formData.goal === 'Muscle' ? '#8162ff' : 'white', color: formData.goal === 'Muscle' ? 'white' : '#1f2937' }}>
                <div className="flex justify-center items-center">
                  <span className="px-4">Build muscle</span>
                </div>
                <div className="relative w-[84px] mr-3 h-full">
                  <Image
                    src={musclesMan}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                    alt="image_banner" priority />
                </div>
              </li>
              <li className="overflow-hidden h-[88px] text-center flex justify-between mb-[14px] text-[17px] font-semibold rounded-xl  my-shadow" onClick={() => handleChange('goal', 'Fit')} style={{ cursor: 'pointer', background: formData.goal === 'Fit' ? '#8162ff' : 'white', color: formData.goal === 'Fit' ? 'white' : '#1f2937' }}>
                <div className="flex justify-center items-center">
                  <span className="px-4">Keep fit</span>
                </div>
                <div className="relative w-[84px] mr-3 h-full">
                  <Image
                    src={fitMan}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                    alt="image_banner" priority />
                </div>
              </li>
            </ul>
          </div>
        );
      case 3:
        return (
          <div className="md:py-[24px] md:px-[16px]">
            <div className="flex justify-center items-center flex-col">
              <h2 className="md:text-[32px] text-[24px] text-center leading-[40px] font-semibold mb-[8px] capitalize">How tall are you?</h2>
              <p className="text-center text-[15px] md:mb-[28px] mb-[24px] md:w-96">Enter your height. This will help us recommend suitable workouts for you.</p>
            </div>
            <div className="flex justify-center">
              <label>
                <input type="text" maxLength={3} pattern="\d{1,3}" placeholder="0" name="height" value={formData.height} onChange={(e) => handleChange('height', e.target.value)} className="max-w-[99.99%] w-[3ch] md:text-[50px] text-[48px] bg-transparent outline-none border-none text-center font-semibold" />
                <span className="text-[16px] pb-[5px] leading-6 font-semibold">cm</span>
              </label>
            </div>
            <p className="text-[12px] text-center font-[600] text-red-600 leading-[16px] mb-[14px]">{errorMsg}</p>
            <div className="py-4 rounded-[14px] my-shadow text-center">
              <p className="md:font-medium font-semibold md:text-[15px] text-[12px]">✌️ Calculating your body mass index</p>
              <p className="md:text-[13px] text-[12px] mt-1 md:px-4 px-3">Body Mass Index (BMI) is a measure that uses height and weight to estimate a person's body fat.</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="md:py-[24px] md:px-[16px]">
            <div className="flex justify-center items-center flex-col">
              <h2 className="md:text-[32px] text-[24px] text-center leading-[40px] font-semibold mb-[8px] capitalize">What is your weight?</h2>
              <p className="text-center text-[15px] md:mb-[28px] mb-[24px] md:w-96">Enter your weight. This will help us suggest the right workouts for you.</p>
            </div>
            <div className="flex justify-center">
              <label>
                <input type="text" maxLength={3} pattern="\d{1,3}" placeholder="0" name="weight" value={formData.weight} onChange={(e) => handleChange('weight', e.target.value)} className="max-w-[99.99%] w-[3ch] md:text-[50px] text-[48px] bg-transparent outline-none border-none text-center font-semibold" />
                <span className="text-[16] pb-[5px] leading-6 font-semibold">kg</span>
              </label>
            </div>
            <p className="text-[12px] text-center font-[600] text-red-600 leading-[16px] mb-[14px]">{errorMsg}</p>
            <div className="py-4 rounded-[14px] my-shadow text-center">
              <p className="md:font-medium font-semibold md:text-[15px] text-[12px]">✌️ Calculating your body mass index</p>
              <p className="md:text-[13px] text-[12px] mt-1 md:px-4 px-3">Body Mass Index (BMI) is a measure that uses height and weight to estimate a person's body fat.</p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="py-8 px-4 md:py-10 md:px-6 lg:py-12 lg:px-8">
            <div className="flex justify-center items-start">
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-6 md:mb-8 lg:mb-10 flex justify-center items-center bg-[#6d49ff] rounded-full">
                <span className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-base md:text-lg lg:text-xl flex justify-center items-center bg-white rounded-lg">
                  <FaCheck />
                </span>
              </div>
            </div>
            <p className="text-[#6d49ff] font-semibold text-center mb-2 text-lg md:text-xl lg:text-2xl">
              Congratulations!
            </p>
            <p className="text-center text-sm md:text-base lg:text-lg mt-2 text-slate-600">
              Your fitness adventure starts here
            </p>
          </div>

        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mx-auto max-w-[560px]">
        {
          step < 5 ? <div className="text-center">
            <button onClick={() => setIsSkip(true)} className="md:absolute right-24 text-[12px] md:text-sm font-semibold text-[#714dff]">Skip</button>
          </div> : null
        }
        <form onSubmit={(e) => handleForm(e, router)}>
          {renderStep()}
          {step === 5 && (
            <div className="flex justify-center items-center">
              <button className="btn w-80 rounded-full mt-4" type="submit">
                Go to Homepage
              </button>
            </div>
          )}
        </form>
      </div>
      {step < 5 && (
        <footer className="fixed left-0 z-10 bottom-0 w-full flex justify-center items-center md:h-[118px] h-[70px] bg-white">
          <button className="btn w-72 border-none rounded-full" type="button" onClick={handleNext}>
            Continue
          </button>
        </footer>
      )}

      {isSkip && (
        <div className='no-select fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50'>
          <div className='bg-white p-4 md:p-6 lg:p-8 rounded-xl flex flex-col justify-center items-center modal-content w-[90%] md:w-[60%] lg:w-[40%]'>
            <h2 className='text-[18px] md:text-[20px] lg:text-[22px] font-semibold mb-2 text-center'>
              Are you sure?
            </h2>
            <p className="text-center text-[12px] md:text-[14px] lg:text-[16px] text-slate-600 w-[90%] md:w-[80%] lg:w-[75%]">
              We need your info to generate accurate reports for you.
            </p>
            <div className="mt-6 md:mt-8 lg:mt-10 flex space-x-4">
              <button
                onClick={() => setIsSkip(false)}
                className="px-6 py-2 text-[10px] md:text-[12px] lg:text-[14px] font-semibold text-[#714dff] bg-[#f0ecff] rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSkip(router)}
                className="px-6 py-2 text-[10px] md:text-[12px] lg:text-[14px] font-semibold bg-[#714dff] text-white rounded-full"
              >
                Skip
              </button>
            </div>
          </div>
        </div>

      )}
    </>
  );
}
