import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(`${process.env.API_URL}/favourites`, {
      headers: {
        "x-api-key": process.env.API_KEY || "",
      },
    });
    const favourites = response.data;

    return NextResponse.json({ favourites });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sub_id, image_id } = body;
    await axios.post(
      `${process.env.API_URL}/favourites`,
      {
        sub_id,
        image_id,
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
    await axios.delete(`${process.env.API_URL}/favourites/${id}`, {
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.API_KEY || "",
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
