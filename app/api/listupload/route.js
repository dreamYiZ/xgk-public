import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Your code...

export const runtime = 'edge';



export async function POST(req, res) {

  try {
    "use server"
    const fs = require('fs')

    const directoryPath = './public/upload';

    // Use the promise version of fs.readdir
    const files = await fs.promises.readdir(directoryPath);

    // Filter out non-image files
    // const imageFiles = files.filter(file => file.endsWith('.jpg'));
    const imageFiles = files;

    // Return the list of files
    return NextResponse.json({ status: "success", files: imageFiles });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
