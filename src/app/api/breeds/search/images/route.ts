import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requset: NextRequest) {
  try {
    const url = new URL(requset.url);

    const page = url.searchParams.get("page");
    const breed_ids = url.searchParams.get("breed_ids");
    console.log(breed_ids);
    console.log(page);

    const response = await axios.get(
      `${process.env.API_URL}/images/search?limit=5&page=${page}$order=ASC&has_breeds=1&breed_ids=${breed_ids}`,
      {
        headers: {
          "x-api-key": process.env.API_KEY || "",
        },
      }
    );
    const searchImages = response.data;

    return NextResponse.json({ searchImages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
