import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import TrainExerciseModel from "@/libs/models/trainExercies/TrainExerciseModel";


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

    const getSingleTrainExso = await TrainExerciseModel.findById({_id : id}) ;

    return NextResponse.json({
      status: 200,
      getSingleTrainExso,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
