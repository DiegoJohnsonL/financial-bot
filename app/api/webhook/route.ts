import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { sendWhatsAppMessage } from "@/lib/whatsapp";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (!mode || !token) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  if (mode === "subscribe" && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Invalid verify token", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    if (body.object !== "whatsapp_business_account") {
      return new NextResponse("Invalid request", { status: 400 });
    }
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!messages) {
      return new NextResponse("No messages found", { status: 400 });
    }

    const message = messages[0];
    const userPhoneNumber = message.from;
    const userMessage = message.text?.body;

    if (!userMessage) {
      return new NextResponse("No message body", { status: 400 });
    }

    const result = await generateText({
      model: openai("gpt-4o"),
      messages,
      maxSteps: 5,
      system: `
    You are a helpful financial assistant. Keep responses concise and focused on personal finance topics.
    `,
    });
    console.log(result);
    await sendWhatsAppMessage(userPhoneNumber, result.text);
    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
