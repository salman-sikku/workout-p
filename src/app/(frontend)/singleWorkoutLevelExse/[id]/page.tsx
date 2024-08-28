import TopInstruction from "@/components/singleWorkoutComponets/TopInstruction";

interface Props {
  params: {
    id: string;
  };
}
function page({ params: { id } }: Props) {


    return (
      <div className='mx-auto max-w-[500px] border border-transparent'>
         <TopInstruction paramsId={id}/>
      </div>
    )
  }
  
  export default page
  