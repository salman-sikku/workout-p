import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import ChallengeExerciseModel from "@/libs/models/challengeExercise/challengeExerciseModel";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await req.json();
    const { name, category, interactions, mistakes, imgUrl, focusImg, focusArea, brathings, duration, reps } = reqBody;

    const newTrainExercises = await new ChallengeExerciseModel({
      name,
      category,
      interactions,
      mistakes,
      imgUrl,
      focusImg,
      focusArea,
      brathings,
      duration,
      reps,
    }).save();

    return NextResponse.json({
      status: 200,
      message: 'New challenge exercise created',
      newTrainExercises,
    });
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
