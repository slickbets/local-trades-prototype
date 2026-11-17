# Local Trades (working name) – clickable prototype

A demo of a review site for home-service contractors in Springfield, MO. It's meant to be shown to local contractors, not used for real.

- Reviews come from neighbors, free for homeowners, no ads, no paid placement.
- Every name, review, and phone number is made up (phones are 417-555 numbers).
- No backend and no real login. Reviews and nominations you submit are saved in your browser's localStorage only. The footer has a "Reset demo" link.

**Live demo:** https://slickbets.github.io/local-trades-prototype/

## Screens

Use the "Demo menu" in the footer to jump to any of them.

1. Home and search (trade and area filters)
2. Contractor profile (trust stats, verified/invited reviews, a disputed review with a contractor reply, contact sheet)
3. Leave a review
4. Contractor side: job confirmation, and "claim your page"
5. Nominate a contractor

## Run it

```
npm install
npm run dev     # local dev
npm run build   # type-check and build to dist/
```

Stack: Vite, React, TypeScript, Tailwind, hash routing. The built `dist/` is published to the `gh-pages` branch.
