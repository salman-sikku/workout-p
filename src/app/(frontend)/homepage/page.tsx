import dynamic from 'next/dynamic';
import AiButton from "@/components/AiButton";
import RenderctHandler from "@/components/RenderctHandler";


const HorizontalScrolling = dynamic(() => import('@/components/homeComponets/HorizontalScrolling'), { ssr: false });
const WorkoutLevel = dynamic(() => import('@/components/homeComponets/WorkoutLevel'), { ssr: false });
const ProgramWorkout = dynamic(() => import('@/components/homeComponets/ProgramWorkout'), { ssr: false });

export default function Page() {
  return (
    <>
      <RenderctHandler />
      <div className="mx-auto max-w-[600px] border border-transparent no-select">
        <h2 className="text-2xl font-bold md:mt-8 mt-0">Welcome 🏋️‍♀️🤸‍♂️</h2>
        <HorizontalScrolling />
        <WorkoutLevel />
        <ProgramWorkout/>
      </div>
      <AiButton/>
    </>
  );
}
