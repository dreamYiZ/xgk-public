"use server"
import crypto from 'crypto';
import ppplog from "ppplog";


import { NextResponse } from "next/server";


function generatePassword(secret) {
  // 获取当前年份和月份
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;  // JavaScript的月份从0开始，所以需要+1

  // 创建一个哈希
  const hash = crypto.createHash('sha256');
  hash.update(secret + year + month);

  // 返回哈希的十六进制字符串作为密码
  return hash.digest('hex');
}


// 从环境变量中获取secret
const secret = process.env.XGK_SECRET;
const password = generatePassword(secret);






export async function POST(req) {
  try {
    // Get the password from the request
    const { password: receivedPassword } = await req.json();

    // Generate the password
    const secret = process.env.XGK_SECRET;
    const password = generatePassword(secret);


    // Compare the passwords
    if (receivedPassword === password) {
      return NextResponse.json({ status: "success" });
    } else {
      return NextResponse.json({ status: "fail", error: "Incorrect password" });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
