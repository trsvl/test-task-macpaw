import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requset: NextRequest) {
  try {
    const url = new URL(requset.url);

    const limit = url.searchParams.get("limit");
    const page = url.searchParams.get("page");
    const breed_ids = url.searchParams.get("breed_ids");
    const order = url.searchParams.get("order");

    interface dataI {
      id: string;
      breeds: { name: string }[];
      url: string;
    }

      const response = await axios.get(
        `${process.env.API_URL}/images/search?limit=${limit}&page=${page}&order=${order}&has_breeds=1&breed_ids=${breed_ids}`,
        {
          headers: {
            "x-api-key": process.env.API_KEY || "",
          },
        }
      );
      const breedsImages = response.data
     
        return NextResponse.json({ breedsImages });
     
      
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
