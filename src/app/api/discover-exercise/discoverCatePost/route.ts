import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/mogoConfig/dbconfig";
import DiscoverCategoryModel from "@/libs/models/discoverExercise/discoverCategory";


export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await req.json();
    const { name, slug, imgUrl } = reqBody;

    const DiscoverInetrCategory = new DiscoverCategoryModel({
      name,
      slug,
      imgUrl
    }).save();

    return NextResponse.json({
        status : 200 , 
        massage : 'New discover category created',
        DiscoverInetrCategory
    })
  } catch (err: any) {
    NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
