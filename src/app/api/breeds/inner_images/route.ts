import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requset: NextRequest) {
  try {
    const url = new URL(requset.url);

    const id = url.searchParams.get("id");

    interface dataI {
      id: string;
      breeds: { name: string }[];
      url: string;
    }

      const response = await axios.get(
        `${process.env.API_URL}/images/search?limit=5&breed_ids=${id}`,
        {
          headers: {
            "x-api-key": process.env.API_KEY || "",
          },
        }
      );
      const innerImages = response.data
     
        return NextResponse.json({ innerImages });
     
      
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
