export const SSLCOMMERZ_SANDBOX_STORE_ID = "testbox";
export const SSLCOMMERZ_SANDBOX_STORE_PASSWORD = "qwerty";

export const SSLCOMMERZ_SANDBOX_CREDENTIALS = {
  storeId: SSLCOMMERZ_SANDBOX_STORE_ID,
  storePassword: SSLCOMMERZ_SANDBOX_STORE_PASSWORD,
  isLive: false,
} as const;

export const SSLCOMMERZ_SANDBOX_OTP = "111111 or 123456";

export const SSLCOMMERZ_SANDBOX_CARDS = [
  {
    brand: "VISA",
    number: "4111111111111111",
    exp: "12/26",
    cvv: "111",
  },
  {
    brand: "Mastercard",
    number: "5111111111111111",
    exp: "12/26",
    cvv: "111",
  },
  {
    brand: "American Express",
    number: "371111111111111",
    exp: "12/26",
    cvv: "111",
  },
] as const;

export function isSandboxStoreId(storeId: string | null | undefined) {
  return (storeId || "").trim().toLowerCase() === SSLCOMMERZ_SANDBOX_STORE_ID;
}
