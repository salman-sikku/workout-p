"use client"
import RenderAdminLogin from '@/components/adminComponets/RenderAdminLogin';
import { UploadButton } from "@/utils/uploadthing";
import CreateTrainigExso from '@/components/adminComponets/CreateTrainigExso';
import ChallengeExerciseForm from '@/components/adminComponets/ChallengeExerciseForm';
import CreateBlogPost from '@/components/adminComponets/blogR/CreateBlogPost';
import AllBlogsDisplay from '@/components/adminComponets/blogR/AllBlogsDisplay';
import { useState } from 'react';

export default function page() {
  const [selectedFrom, setSelectedFrom] = useState('challenge');
  const [selectedBlog, setSelectedBlog] = useState('Cblog');
  const [isblock, setIsBlock] = useState(true);

  const buttonStyles = (level: string) => {
    return selectedFrom === level
      ? 'p-4 bg-[#6842ff] hover:font-semibold text-white cursor-pointer'
      : 'p-4  hover:font-semibold cursor-pointer'
  };

  const blogButtosStyle = (level: string) => {
    return selectedBlog === level ? 'p-4 bg-[#6842ff] hover:font-semibold text-white cursor-pointer' : 'p-4  hover:font-semibold cursor-pointer'
  }
  return (
    <>
      <RenderAdminLogin />
      {
        isblock ? <div className='w-full h-full border flex justify-center relative'>
          <div className="w-64 h-[84vh] bg-[#f0ecff] fixed left-16">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Admin</h1>
            </div>
            <nav>
              <ul className='text-[#6842ff]'>
                <li className={buttonStyles('challenge')} onClick={() => setSelectedFrom('challenge')}>Craete challenge</li>
                <li className={buttonStyles('training')} onClick={() => setSelectedFrom('training')}>Craete training</li>
                <li className={buttonStyles('dicover')} onClick={() => setSelectedFrom('dicover')}>Craete dicover</li>
                <li className='p-4 hover:font-semibold text-[#6842ff] cursor-pointer' onClick={() => setIsBlock(false)}>Craete blog</li>
              </ul>
            </nav>
          </div>
          <div className='w-[80vw] flex justify-center items-center'>
            {selectedFrom === 'challenge' && (<div className="p-8 bg-[#f0ecff] rounded-xl"><ChallengeExerciseForm /></div>)}
            {selectedFrom === 'training' && (<div className="p-8 bg-[#f0ecff] rounded-xl"><CreateTrainigExso /></div>)}
            {selectedFrom === 'dicover' && (<div><div>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />

            </div></div>)}

          </div>
        </div> : <div className='w-full h-full border flex justify-center'>
          <div className="w-64 h-[84vh] bg-[#f0ecff]">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Admin</h1>
            </div>
            <nav>
              <ul className='text-[#6842ff]'>
                <li className={blogButtosStyle('Cblog')} onClick={() => setSelectedBlog("Cblog")}>Craete blog</li>
                <li className={blogButtosStyle('All')} onClick={() => setSelectedBlog("All")}>All blog</li>
              </ul>
            </nav>
          </div>
          <div className='w-[80vw] flex justify-center items-center'>
            {selectedBlog === 'Cblog' && <div><CreateBlogPost/></div>}
            {selectedBlog === 'All' && <div className="p-8 bg-[#f0ecff] rounded-xl"><AllBlogsDisplay/></div>}
          </div>
        </div>
      }

    </>
  )
}
