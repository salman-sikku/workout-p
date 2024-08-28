import ShowExsesizeList from "@/components/workoutLevelComponent/ShowExsesizeList";


interface Props {
  params: {
    id: string;
  };
}
function page({ params: { id } }: Props) {
    return (
      <div className='mx-auto max-w-[600px] border border-transparent'> 
         <ShowExsesizeList paramsId={id}/>
      </div>
    )
  }
  
  export default page
  