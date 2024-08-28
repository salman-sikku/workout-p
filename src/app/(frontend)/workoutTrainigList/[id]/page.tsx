import ShowTrainingExsoList from "@/components/workoutLevelComponent/ShowTrainigExList";

interface Props {
  params: {
    id: string;
  };
}
function page({ params: { id } }: Props) {
    return (
      <div className='mx-auto max-w-[600px] border border-transparent'> 
         <ShowTrainingExsoList paramsId={id}/>
      </div>
    )
  }
  
  export default page
  