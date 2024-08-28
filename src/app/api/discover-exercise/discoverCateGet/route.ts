import { NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import DiscoverCategoryModel from "@/libs/models/discoverExercise/discoverCategory";


export async function GET() {
  await dbConnect();

  try {
    const DiscoverCategory = await DiscoverCategoryModel.find({});
    return NextResponse.json({
        status : 200 , 
        DiscoverCategory
    })
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
