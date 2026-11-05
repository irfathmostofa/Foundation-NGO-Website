import { handlePaymentCallback } from "@/app/api/payment/route-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return handlePaymentCallback(request, "failed");
}

export async function POST(request: Request) {
  return handlePaymentCallback(request, "failed");
}
