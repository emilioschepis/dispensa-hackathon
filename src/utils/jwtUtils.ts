import { Buffer } from "buffer";

export function getJwtPayload(jwt: string): Record<string, any> | null {
  const parts = jwt.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const payloadString = parts[1];

  try {
    const buffer = Buffer.from(payloadString, "base64");
    return JSON.parse(buffer.toString());
  } catch (error) {
    return null;
  }
}
