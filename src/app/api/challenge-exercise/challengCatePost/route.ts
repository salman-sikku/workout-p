import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import ChallengeCategoryModel from "@/libs/models/challengeExercise/challengeCategory";


export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await req.json();
    const { name, slug, imgUrl, totalWorkout } = reqBody;

    const newChalgeCategory = new ChallengeCategoryModel({
      name,
      slug,
      imgUrl,
      totalWorkout
    }).save();

    return NextResponse.json({
        status : 200 , 
        massage : 'New challenge category created',
        newChalgeCategory
    })
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
