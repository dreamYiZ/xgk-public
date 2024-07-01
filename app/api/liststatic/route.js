"use server";

import { NextResponse } from "next/server";
import promises from "node:fs/promises";

export async function POST(req, res) {
  try {
    const directoryPath = './public/static';

    // Use the promise version of readdir
    const files = await promises.readdir(directoryPath);

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
