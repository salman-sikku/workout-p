import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import DiscoverExerciseModel from "@/libs/models/discoverExercise/discoverExerciseModel";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await req.json();
    const { name, category, interactions, mistakes, videoURL, duration, reps } = reqBody;

    const newDiscoverExercises = new DiscoverExerciseModel({
      name,
      category,
      interactions,
      mistakes,
      videoURL,
      duration,
      reps,
    }).save();

    return NextResponse.json({
        status : 200 , 
        massage : 'New discover exercises created',
        newDiscoverExercises
    })
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
