import { NextResponse } from "next/server";
import  dbConnect  from "@/libs/mogoConfig/dbconfig";
import DiscoverCategoryModel from "@/libs/models/discoverExercise/discoverCategory";
import DiscoverExerciseModel from "@/libs/models/discoverExercise/discoverExerciseModel";


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
       const category = await DiscoverCategoryModel.findOne({ slug : id});
       const DiscoverCategoryExso = await DiscoverExerciseModel.find({ category }).populate("category");

       return NextResponse.json({
         status : 200,
         category,
         DiscoverCategoryExso
       });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
