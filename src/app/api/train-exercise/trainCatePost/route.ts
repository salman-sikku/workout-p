import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import TrainCategoryModel from "@/libs/models/trainExercies/TrainCategory";


export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await req.json();
    const { name, slug, imgUrl, totalWorkout, categoryType, totalCalorie } = reqBody;

    const newTrainCategory = new TrainCategoryModel({
      name,
      slug,
      imgUrl,
      totalWorkout,
      categoryType,
      totalCalorie
    }).save();

    return NextResponse.json({
      status: 200,
      massage: "New training category created",
      newTrainCategory,
    });
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
