import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import DiscoverExerciseModel from "@/libs/models/discoverExercise/discoverExerciseModel";


export async function GET() {
  await dbConnect();

  try {
    const DiscoverExercise = await DiscoverExerciseModel.find({});
    return NextResponse.json({
        status : 200 , 
        DiscoverExercise
    })
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
