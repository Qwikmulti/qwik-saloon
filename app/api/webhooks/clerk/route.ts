import { clerkClient } from "@clerk/nextjs/api";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { syncUserFromClerk } from "@/actions/user-actions";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  };

  const wh = new Webhook(webhookSecret);
  let event: any;

  try {
    event = wh.verify(body, svixHeaders);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Webhook verification failed", { status: 400 });
  }

  const { type, data } = event;

  try {
    if (type === "user.created" || type === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url, phone_numbers } = data;
      
      const email = email_addresses[0]?.email_address;
      const fullName = `${first_name || ""} ${last_name || ""}`.trim();
      const avatarUrl = image_url;
      const phone = phone_numbers?.[0]?.phone_number;

      if (email) {
        await syncUserFromClerk(id, { email, fullName, avatarUrl, phone });
      }
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new NextResponse("Webhook processing failed", { status: 500 });
  }
}