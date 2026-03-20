# Plan & Grow

A calm, lightly game-like AI daily planner:
- AI plans your day (Morning / Afternoon / Evening)
- Completing tasks grows a virtual garden (Seed → Small plant → Bigger plant → Tree → Garden)
- Daily streak + local progress saving

## Setup

```bash
npm install
```

If you want real AI plans, create `plan-and-grow/.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Then set:
- `OPENAI_API_KEY`

If `OPENAI_API_KEY` is not set, the app still runs using a built-in fallback planner.

## Run

```bash
npm run dev
```

Open:
- Landing page: `/`
- App: `/dashboard`

## Notes

- Task completion is saved in `localStorage` for the current day.
- Use `Reset day` to clear the garden and start fresh.

