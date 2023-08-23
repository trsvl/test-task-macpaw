import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/votes`,
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
      }
    );
    const votes = response.data;

    return NextResponse.json({ votes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sub_id, image_id, value } = body;
     await axios.post(
      `${process.env.API_URL}/votes`,
      {
        image_id,
        sub_id,
        value,
      },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
      }
    );
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
     await axios.delete(
      `${process.env.API_URL}/votes/${id}`,
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
      }
    );
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
