"use server";

import { NextResponse } from "next/server";
import promises from "node:fs/promises";
import path from "node:path";


export async function POST(req) {
  try {
    const { image } = await req.json();
    const filePath = path.join('./public', image);

    // Delete the file
    await promises.unlink(filePath);

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
