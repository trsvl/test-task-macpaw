import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  try {
    const response = await axios.get(
      `${process.env.API_URL}/favourites`,
      {
        headers: {
          "x-api-key": process.env.API_KEY || "",
        },
      }
    );
    const checkFav = response.data.filter((item:any)=>item.image.id === id)
    const favourite_id = checkFav;

    return NextResponse.json({ favourite_id });
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
