import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import dbConnect from '@/libs/mogoConfig/dbconfig'
import AdminModel from '@/libs/models/adminModel'


export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid user",
        },
        { status: 200 }
      );
    }

    const admin = await AdminModel.findOne({ username });
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          msg: "Admin is not registered",
        },
        { status: 200 }
      );
    }

    const checkPassword = await bcrypt.compare(password, admin.password)
    if (!checkPassword) {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid password",
        },
        { status: 200 }
      );
    }
    
    
    const response = NextResponse.json({
      success : true,
      admin : {
         username : admin.username 
      }
    })
    

    return response

  } catch (error: any) {
    NextResponse.json(
      {
        success: false,
        msg: "Something went wrong in login",
        error,
      },
      { status: 502 }
    );
  }
}