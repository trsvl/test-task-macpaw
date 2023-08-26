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
        `${process.env.API_URL}/breeds/${id}`,
        {
          headers: {
            "x-api-key": process.env.API_KEY || "",
          },
        }
      );
      const breedInfo = response.data
     
        return NextResponse.json({ breedInfo });
     
      
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
