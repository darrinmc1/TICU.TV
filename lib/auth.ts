const SECRET_KEY = process.env.AUTH_SECRET || 'dev-secret-key-at-least-32-chars-long!!';

async function getDerivedKey() {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SECRET_KEY);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function base64urlEncode(a: Uint8Array) {
  return btoa(String.fromCharCode(...a))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64urlDecode(s: string) {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}

export async function signSession(payload: any): Promise<string> {
  const encoder = new TextEncoder();
  const payloadStr = JSON.stringify(payload);
  const data = encoder.encode(payloadStr);
  const key = await getDerivedKey();
  const signature = await crypto.subtle.sign('HMAC', key, data);

  const b64Payload = base64urlEncode(encoder.encode(payloadStr));
  const b64Signature = base64urlEncode(new Uint8Array(signature));

  return `${b64Payload}.${b64Signature}`;
}

export async function verifySession(token: string): Promise<any | null> {
  try {
    const [b64Payload, b64Signature] = token.split('.');
    if (!b64Payload || !b64Signature) return null;

    const payloadData = base64urlDecode(b64Payload);
    const payloadStr = new TextDecoder().decode(payloadData);
    const payload = JSON.parse(payloadStr);

    const signatureBin = base64urlDecode(b64Signature);
    const key = await getDerivedKey();

    const isValid = await crypto.subtle.verify('HMAC', key, signatureBin, payloadData);
    return isValid ? payload : null;
  } catch {
    return null;
  }
}
