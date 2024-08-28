import Image from 'next/image';
import Link from 'next/link';
import RenderctHandler from '@/components/RenderctHandler'

const Home = () => {
  return (
    <>
      <RenderctHandler />
      <div className="mx-auto md:max-w-3xl w-full text-center px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-normal mt-4 md:mt-6">Strong Today, Stronger Tomorrow Keep Going!</h1>
        <div className="flex justify-center">
          <div className="mt-6 md:mt-8 w-auto h-[400px] md:h-[348px] lg:h-[378px] flex justify-center">
            <Image src="/images/fitness.png" className="w-full h-full object-contain" height={320} width={210} alt="image_banner" priority />
          </div>
        </div>
        <footer className='fixed left-0 z-1 bottom-0 w-full flex justify-center items-center md:h-[148px] h-[70px]'>
          <Link href="/getInfo">
            <button className="btn border-none w-72 md:w-56 lg:w-64 rounded-full my-6 md:mt-8 lg:mt-10">Continue</button>
          </Link>
        </footer>
      </div>
      <div className="blob w-[300px] h-[150px] md:w-[500px] md:h-[250px] lg:w-[700px] lg:h-[360px] rounded-[999px] absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] -z-10 blur-3xl bg-[#e3ddfc]"></div>
    </>
  );
};

export default Home;
