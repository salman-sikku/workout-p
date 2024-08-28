import React from 'react'
import Image from 'next/image'

function PostureCorrection() {
    return (
        <>
            <h5 className="font-bold text-lg text-gray-800 mt-[26px]">Posture Correction</h5>
            <section className="grid grid-cols-2 sm:grid-cols-3 gap-[10px] md:gap-[20px] mt-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="relative w-full pt-[100%] rounded-xl bg-[#f0ecff] overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="relative w-full h-full">
                                <Image
                                    src="https://utfs.io/f/bdb5761f-a50c-419b-8a4e-f75cbd017441-7erest.com-resize.webp"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                    alt="fit-img"
                                    priority
                                />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-[70%] bg-gradient-to-b from-black to-transparent opacity-45"></div>
                            <div className="absolute top-0 left-0 w-full h-[70%] p-3 sm:p-4 md:p-5">
                                <h3 className="text-white text-[17px] md:text-lg font-bold leading-[1.10rem] md:leading-[1.20rem] md:w-[80%]">Back Stretching</h3>
                                <div className="absolute bottom-[-30px] sm:bottom-[-35px] md:bottom-[-40px] right-2 sm:right-3 md:right-4 bg-white px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-[11px] md:text-[12px] font-medium">Exercise</div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default PostureCorrection
