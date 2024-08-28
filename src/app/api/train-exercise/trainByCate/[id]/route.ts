import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import TrainCategoryModel from "@/libs/models/trainExercies/TrainCategory";
import TrainExerciseModel from "@/libs/models/trainExercies/TrainExerciseModel";


export async function GET(req: Request, route: { params: { id: string } }) {
  await dbConnect();

  try {
    const id: string = route.params.id;
    console.log(id);

    if (!id) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "Item _id is required",
      });
    }
       const category = await TrainCategoryModel.findOne({ slug : id}); 
       const TrainCategoryExso = await TrainExerciseModel.find({ category }).populate("category");

       return NextResponse.json({
         status : 200,
         category,
         TrainCategoryExso
       });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
