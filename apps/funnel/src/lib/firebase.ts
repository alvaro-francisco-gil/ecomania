import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';

/**
 * Firebase client init for the funnel.
 *
 * `NEXT_PUBLIC_*` vars are inlined at build time, so each one is read as a literal property
 * access — a dynamic lookup would silently produce `undefined` in the browser bundle.
 *
 * A missing variable throws rather than defaulting. A funnel pointed at the wrong project by a
 * silent fallback would write survey results into the void, and we would find out from the
 * conversion numbers weeks later.
 */
const REQUIRED_ENV = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

function readFirebaseConfig(): Record<keyof typeof REQUIRED_ENV, string> {
  const missing = Object.entries(REQUIRED_ENV)
    .filter(([, value]) => value === undefined || value === '')
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Firebase config incomplete — missing: ${missing.join(', ')}. ` +
        'Copy .env.example to .env.local and fill it in.',
    );
  }

  return REQUIRED_ENV as Record<keyof typeof REQUIRED_ENV, string>;
}

export function getFirebaseApp(): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(readFirebaseConfig());
}
