import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import ChallengeCategoryModel from "@/libs/models/challengeExercise/challengeCategory";


export async function GET() {
  await dbConnect();

  try {
    const challengeCategory = await ChallengeCategoryModel.find({});
    return NextResponse.json({
        status : 200 , 
        challengeCategory
    })
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
