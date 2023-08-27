import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const file = body.get("file");

    const formDataSend = new FormData();
    if (file) {
      formDataSend.append("file", file);
    }

    const response = await axios.post(
      `${process.env.API_URL}/images/upload`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": process.env.API_KEY || "",
        },
        timeout: 8000,
      }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
