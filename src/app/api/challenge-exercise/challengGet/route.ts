import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import ChallengeExerciseModel from "@/libs/models/challengeExercise/challengeExerciseModel";


export async function GET() {
  await dbConnect();

  try {
    const challengeExercise = await ChallengeExerciseModel.find({});
    return NextResponse.json({
        status : 200 , 
        challengeExercise
    })
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
