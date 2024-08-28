import TopTrainInstruction from "@/components/singleWorkoutComponets/TopTrainStruction";

interface Props {
  params: {
    id: string;
  };
}
function page({ params: { id } }: Props) {


    return (
      <div className='mx-auto max-w-[500px] border border-transparent'>
         <TopTrainInstruction paramsId={id}/>
      </div>
    )
  }
  
  export default page
  