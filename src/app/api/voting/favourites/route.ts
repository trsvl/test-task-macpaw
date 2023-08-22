import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/favourites", {
      headers: {
        "x-api-key": process.env.API_KEY || "",
      },
    });
    const votes = response.data;

    return NextResponse.json({ votes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {sub_id, image_id} = await body;
    const votes = await axios.post("https://api.thecatapi.com/v1/favourites", {
      sub_id,
      image_id
    }, {
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.API_KEY || "",
      },
    });
    return NextResponse.json({ votes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
