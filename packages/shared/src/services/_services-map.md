# Services map

The index of every service in `packages/shared/src/services/`. Grep this before adding a query
— it is faster than searching the tree, and it is how we avoid two services owning the same
collection.

Keep one row per service module. Update it in the same commit that adds or changes a service
(see `touch-service`); a stale row is worse than no row.

| Service | Collection(s) | Exports | Written by | Consumers |
|---|---|---|---|---|
| _none yet_ | | | | |

**Written by** records the trust boundary: `client` for reads and user-owned writes, `function`
for anything the client may not be trusted with. Economy fields (`xp`, `level`, `avatarState`,
`counters`, the eco-value vector) are always `function`.
