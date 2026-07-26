# Cricket Scores MVP

A small full-stack cricket scores demo built with **React Native (Expo) + TypeScript** and a **Node.js + Express + TypeScript** mock API.

```text
React Native Mobile App
          ↓
      API Service
          ↓
Node.js + Express.js API
          ↓
      Controllers
          ↓
       Services
          ↓
      Mock Data
```

## Features

- Match list with Live / Upcoming / Completed filters
- Match details (teams, scores, status, venue, date)
- Basic scorecard
- Ball-by-ball commentary
- Loading, error, empty, retry, and pull-to-refresh states
- Typed API models end to end

## Documentation

- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) — Task 1 requirements analysis (architecture, data/API design, phases, testing, README plan)

## Project structure

```text
OneStopDemo/
├── README.md
├── IMPLEMENTATION_PLAN.md   # Task 1 implementation plan
├── backend/                 # Express + TypeScript API
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── data/            # Mock data split by domain
│       ├── errors/          # ErrorCode enum + messages
│       ├── types/
│       └── middleware/
└── mobile/                  # Expo React Native app
    └── src/
        ├── api/
        ├── components/
        ├── constants/       # Config + client error messages
        ├── hooks/
        ├── navigation/
        ├── screens/
        ├── types/
        ├── theme/
        └── utils/
```

## Prerequisites

- Node.js 20+ (Node 22 works)
- npm
- Expo Go on a phone, or an iOS Simulator / Android Emulator

## Getting started

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

API listens on `http://0.0.0.0:3000`.

Health check:

```bash
curl http://localhost:3000/health
```

### 2. Start the mobile app

```bash
cd mobile
npm install
npm start
```

Then press `i` / `a`, or scan the QR code with Expo Go.

### API base URL

The app reads `EXPO_PUBLIC_API_URL` from `mobile/.env` when set.

1. Copy the example file (already done if `.env` exists):

```bash
cp mobile/.env.example mobile/.env
cp backend/.env.example backend/.env
```

2. Defaults:

| Platform | Default / example value |
|----------|-------------------------|
| iOS Simulator / web | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Physical device | `http://YOUR_LAN_IP:3000` |

`.env` is gitignored (local only). `.env.example` is committed as the template.

See `mobile/.env.example` and `backend/.env.example`.

## REST API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/matches` | All matches |
| `GET` | `/api/matches?status=LIVE` | Filter by `LIVE`, `UPCOMING`, or `COMPLETED` |
| `GET` | `/api/matches/:matchId` | Match details |
| `GET` | `/api/matches/:matchId/scorecard` | Basic scorecard |
| `GET` | `/api/matches/:matchId/commentary` | Ball-by-ball commentary |

### Examples

```bash
curl http://localhost:3000/api/matches
curl 'http://localhost:3000/api/matches?status=LIVE'
curl http://localhost:3000/api/matches/m1
curl http://localhost:3000/api/matches/m1/scorecard
curl http://localhost:3000/api/matches/m1/commentary
```

Responses are wrapped as `{ "data": ... }`. Errors return `{ "message": "..." }` with an appropriate HTTP status.

Upcoming matches may return `404` for scorecard/commentary because that data is not available yet.

## Architecture notes

### Backend

- **Routes** define HTTP paths
- **Controllers** parse requests and shape responses
- **Services** apply filters and lookups
- **Mock data** holds matches, scorecards, and commentary in memory

No database, authentication, or WebSockets — intentional for MVP scope.

### Mobile

- **Screens**: match list + match detail
- **Reusable components**: cards, filters, scorecard, commentary, loading/error/empty/retry
- **Hooks**: `useMatches`, `useMatchDetail` own loading/error/refresh state
- **API layer**: typed `fetch` client + `matchesApi`
- **Lists**: `FlatList` for matches and commentary

## Assumptions and limitations

- Mock data only (8 sample matches); not connected to a live cricket feed
- No realtime updates (pull to refresh instead of WebSockets)
- No authentication or admin UI
- Scorecard/commentary unavailable for upcoming fixtures
- Screen recording for the submission walkthrough is recorded separately (see checklist below)

## Screen recording checklist (5–10 minutes)

Record a walkthrough that covers:

1. **Application** — open the app, show list filters, open a live match, switch scorecard/commentary
2. **Technical decisions** — Expo + TS, Express layered architecture, typed models, fetch hooks
3. **Project structure** — briefly walk `backend/src` and `mobile/src`
4. **Important code** — route → controller → service; API client; `FlatList` + state components
5. **Assumptions / limitations** — mock data, no auth/realtime/DB

## Scripts

### Backend

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start API with hot reload (`tsx watch`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled `dist/index.js` |

### Mobile

| Script | Purpose |
|--------|---------|
| `npm start` | Start Expo dev server |
| `npm run android` | Open on Android |
| `npm run ios` | Open on iOS (macOS) |
| `npm run web` | Open in browser |

## License

MIT
