"use client";
import { useEffect, useState } from 'react';
import { getAllPosts } from '@/libs/firebase/post/read_server_post';
import Image from 'next/image';
import Link from 'next/link';


const DisplayBlogsC = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const postsData: any = await getAllPosts();
    //             console.log(postsData)
    //             setPosts(postsData);
    //         } catch (err) {
    //             setError((err as Error).message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchPosts();
    // }, []);
    
    const SkeletonCard = () => (<div className='overflow-hidden flex h-[25vh] mb-8 mt-[28px]'>
        <div className='h-full md:w-[180px] rounded-md w-[180px] overflow-hidden'>
            <div className='w-full h-full animate-pulse bg-gray-300'></div>
        </div>
        <div className='w-[60%] h-full flex flex-col items-start justify-center md:ml-10 ml-4'>
            <div className='h-[13px] w-[20%] mb-4 animate-pulse bg-gray-300 rounded-md'></div>
            <div className='h-[13px] w-[60%] mb-4 animate-pulse bg-gray-300 rounded-md'></div>
            <div className='text-[12px] px-[14px] py-[7px] rounded-md animate-pulse bg-gray-300'></div>
        </div>
    </div>)


    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <section className='mt-[28px] grid grid-cols-2 gap-[24px]'>
                {
                    loading ? (
                        Array.from({ length: 2 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : (
                        <div>
                        <div className="w-[300px]">
                            <figure className='relative w-[300px] h-[180px] rounded-lg overflow-hidden'>
                                <Image
                                    src='https://img.freepik.com/free-photo/top-view-tomato-branch-broccoli-red-hot-pepper-wooden-spoons-garlic-mushroom-wooden-spoons-grey-background_140725-145760.jpg?t=st=1724652056~exp=1724655656~hmac=ca2bf0047914b628da286f68f8131a4836086e78c0370615cfdaca75f97f44cf&w=740'
                                    layout='fill'
                                    objectFit='cover'
                                    className='object-cover'
                                    alt='fit-img'
                                    priority
                                />
                            </figure>
                            <div className="mt-6">
                                
                                <h2 className="leading-[24px] font-[700] text-[20px] mt-4 text-[#242424]">Plant-Based Protein Sources Nourishing Your Body Naturally</h2>
                                <h3 className='leading-[20px] font-[400] text-[15px] text-[#6B6B6B] mt-[8px]'>If a dog chews shoes whose shoes does he choose?</h3>
                            </div>
                            <h5 className='text-[13px] text-[#6B6B6B] mt-4'>Posted on <span className="font-semibold">May 24</span></h5>
                        </div>
                    </div>
                    )
                }
            </section>
        </>
    );
};

export default DisplayBlogsC;


{/* <div className='overflow-hidden flex h-[25vh] mb-8'>
                                    <div className='h-full md:w-[180px] rounded-md w-[180px] overflow-hidden'>
                                        <Image
                                            src={curElm.imageUrl}
                                            width={170}
                                            height={200}
                                            className='w-full h-full object-cover' alt='fit-img'
                                            priority={true}
                                        />
                                    </div>
                                    <div className='w-[60%] h-full flex flex-col items-start justify-center md:ml-10 ml-4'>
                                        <h5 className='text-[13px] mb-4'>  {curElm.timestamp.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</h5>
                                        <h2 className='text-lg leading-[-0.016em] text-[24px] font-bold mb-4'>{curElm.tital}</h2>
                                        <button className='text-[12px] px-[14px] py-[7px] rounded-md font-semibold bg-[#6842ff] text-[#fff]'>Read More</button>
                                    </div>
                                </div> */}



                                // posts.length > 0 ? posts.map((curElm: any) => (
                                    // <Link href={`blogpost/${curElm?.id}`} key={curElm?.id}>
                                    //     <div className="w-[300px]">
                                    //         <figure className='relative w-[300px] h-[180px] rounded-lg overflow-hidden'>
                                    //             <Image
                                    //                 src='https://img.freepik.com/free-photo/top-view-tomato-branch-broccoli-red-hot-pepper-wooden-spoons-garlic-mushroom-wooden-spoons-grey-background_140725-145760.jpg?t=st=1724652056~exp=1724655656~hmac=ca2bf0047914b628da286f68f8131a4836086e78c0370615cfdaca75f97f44cf&w=740'
                                    //                 layout='fill'
                                    //                 objectFit='cover'
                                    //                 className='object-cover'
                                    //                 alt='fit-img'
                                    //                 priority
                                    //             />
                                    //         </figure>
                                    //         <div className="mt-6">
                                                
                                    //             <h2 className="leading-[24px] font-[700] text-[20px] mt-4 text-[#242424]">{curElm.tital}</h2>
                                    //             <h3 className='leading-[20px] font-[400] text-[15px] text-[#6B6B6B] mt-[8px]'>If a dog chews shoes whose shoes does he choose?</h3>
                                    //         </div>
                                    //         <h5 className='text-[13px] text-[#6B6B6B] mt-4'>Posted on <span className="font-semibold">{curElm.timestamp.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span></h5>
                                    //     </div>
                                    // </Link>
                                // )) : <p>No posts available</p>