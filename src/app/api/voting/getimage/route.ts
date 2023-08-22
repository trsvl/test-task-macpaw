import axios from "axios";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search', {headers:{
            "x-api-key": process.env.API_KEY || "",
        }})
          const currentImage = response.data[0];
          
         return NextResponse.json({currentImage})
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
