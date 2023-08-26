import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/breeds`,
      {
        headers: {
          "x-api-key": process.env.API_KEY || "",
        },
      }
    );
    const breeds = response.data.map((item: {id: string, name: string})=>({
      id: item.id,
      name: item.name,
    }));

    return NextResponse.json({ breeds });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

