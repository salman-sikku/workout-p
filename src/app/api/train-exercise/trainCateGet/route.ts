import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import TrainCategoryModel from "@/libs/models/trainExercies/TrainCategory";

export async function GET() {
  await dbConnect();

  try {
    const TrainCategory = await TrainCategoryModel.find({});
    return NextResponse.json({
        status : 200 , 
        TrainCategory
    })
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
