import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import TainingExerciseModel from "@/libs/models/trainExercies/TrainExerciseModel";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await req.json();
    const {
      name,
      category,
      interactions,
      mistakes,
      brathings,
      imgUrl,
      focusImg,
      focusArea,
      duration,
      reps,
    } = reqBody;

    const newTrainExercises = await new TainingExerciseModel({
      name,
      category,
      interactions,
      mistakes,
      brathings,
      imgUrl,
      focusImg,
      focusArea,
      duration,
      reps,
    }).save();

    return NextResponse.json({
      status: 200,
      message: "New training exercises created",
      newTrainExercises,
    });
    
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
