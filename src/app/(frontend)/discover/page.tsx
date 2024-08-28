import AiButton from "@/components/AiButton";
import BellyFat from "@/components/discoverComponets/BellyFat";
import DailyTips from "@/components/discoverComponets/DailyTips";
import ForOffice from "@/components/discoverComponets/ForOffice";
import ForYou from "@/components/discoverComponets/ForYou";
import PostureCorrection from "@/components/discoverComponets/PostureCorrection";


export default function page() {
  return (
    <>
      <div className='mx-auto max-w-[590px] border border-transparent'>
        <h2 className="text-xl sm:text-2xl font-bold md:mt-8">Discover 🏋️‍♀️🤸‍♂️</h2>
        <DailyTips />
        <BellyFat />
        <PostureCorrection />
        <ForYou />
        <ForOffice />
      </div>
      <AiButton />
    </>
  )
}
