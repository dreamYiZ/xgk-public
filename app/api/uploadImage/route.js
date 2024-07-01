"use server"
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Check the file extension
    const ext = path.extname(file.name).toLowerCase();
    if (!['.png', '.jpeg', '.jpg', '.mp4'].includes(ext)) {
      return NextResponse.json({ status: "fail", error: "Invalid file type" });
    }

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
