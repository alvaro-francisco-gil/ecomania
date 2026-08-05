/**
 * The only place client code imports the Firestore SDK. Both apps read Firestore through here;
 * nothing else in `apps/` may import `firebase/firestore` or `@react-native-firebase/firestore`
 * directly.
 *
 * Empty until the first collection exists (blocked on the models — `docs/architecture.md` §10).
 * When adding one, follow `touch-service` and register it in `_services-map.md`.
 *
 * Economy fields (`xp`, `level`, `avatarState`, `aspects`, `counters`, the value vector) are
 * never written from here — those go through Cloud Functions callables.
 */
export {};
