
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";


export const runtime = 'edge';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    "use server"
    const fs = require('fs')


    // Ensure the 'upload' directory exists
    await fs.mkdir('./public/upload', { recursive: true });

    await fs.writeFile(`./public/upload/${file.name}`, buffer);

    revalidatePath("/");

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
