const SECRET = "ini_rahasia_server";

async function hash(text: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text + SECRET);

  const buffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
export async function signValue(value: string) {
  const signature = await hash(value);
  console.log(signature);
  return `${value}|${signature}`;
}
export async function verifySignedValue(cookieValue: string) {
  const [value, signature] = cookieValue.split("|");
  if (!value || !signature) return null;

  const realSignature = await hash(value);

  if (realSignature !== signature) return null;

  return value;
}
