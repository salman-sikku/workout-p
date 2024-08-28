import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import dbConnect from '@/libs/mogoConfig/dbconfig'
import AdminModel from '@/libs/models/adminModel'



export const POST = async (request: NextRequest) => {
  await dbConnect()

  try {
    const { username, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = new AdminModel({
      username,
      password: hashedPassword,
    })
  
    await admin.save()
  
    return NextResponse.json(
      { message: 'Admin has been created' },
      {
        status: 201,
      }
    )
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}
