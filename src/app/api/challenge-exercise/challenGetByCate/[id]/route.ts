import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import ChallengeCategoryModel from "@/libs/models/challengeExercise/challengeCategory";
import ChallengeExerciseModel from "@/libs/models/challengeExercise/challengeExerciseModel";


export async function GET(req: Request, route: { params: { id: string } }) {
  await dbConnect();

  try {
    const id: string = route.params.id;
    console.log(id);

    if (!id) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "Items _id is required",
      });
    }
       const category = await ChallengeCategoryModel.findOne({ slug : id});
       const challengeCategoryExso = await ChallengeExerciseModel.find({ category }).populate("category");

       return NextResponse.json({
         status : 200,
         category,
         challengeCategoryExso
       });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
