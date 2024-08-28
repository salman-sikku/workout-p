import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import TrainExerciseModel from "@/libs/models/trainExercies/TrainExerciseModel";


export async function GET() {
  await dbConnect();
  
  try {
    const TrainExercise = await TrainExerciseModel.find({});
    return NextResponse.json({
        status : 200 , 
        TrainExercise
    })
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
