import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import ChallengeExerciseModel from "@/libs/models/challengeExercise/challengeExerciseModel";


export async function GET(req: Request, route: { params: { id: string } }) {
  await dbConnect();
  
  try {
    const id: string = route.params.id;

    if (!id) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "Items _id is required",
      });
    }

    const getSingleChalengExso = await ChallengeExerciseModel.findById({_id : id}) ;

    return NextResponse.json({
      status: 200,
      getSingleChalengExso,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
