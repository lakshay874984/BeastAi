# BeastAI

BeastAI is an AI workspace for conversations, coding assistance, document analysis, image understanding, web search, presentations, and generated artifacts.

The project is organized as a React frontend and a Node.js microservice backend. Users authenticate with Google, send prompts through the API gateway, and can view generated code, previews, documents, images, and other agent output in the workspace.

## Features

- Google authentication with Firebase
- Chat-based AI workspace
- Agent modes for chat, coding, PDF, presentations, vision, and search
- Markdown and syntax-highlighted code responses
- Generated artifact files with code and live preview tabs
- PDF and image uploads
- Credit-based plans with Razorpay billing
- Redis-backed shared services
- MongoDB persistence
- Optional S3 and Qdrant integrations

## Project Structure

```text
.
├── frontend/                 React + Vite client
├── backend/
│   ├── gateway/              API gateway and authentication middleware
│   ├── services/
│   │   ├── auth/             Firebase login and user credits/plans
│   │   ├── chat/             Conversations and messages
│   │   ├── agent/            AI agents, files, artifacts, and generation
│   │   └── billing/          Razorpay orders and plan upgrades
│   ├── shared/               Shared Redis helpers
│   └── docker-compose.yml    Local Redis service
└── README.md
```

## Requirements

- Node.js 18 or newer
- npm
- Docker Desktop, for local Redis
- MongoDB
- Firebase project with Google sign-in enabled
- Provider credentials required by the agents you plan to use

## Installation

Install dependencies in each application that you run:

```bash
cd frontend
npm install

cd ../backend/gateway
npm install

cd ../services/auth
npm install

cd ../services/chat
npm install

cd ../services/agent
npm install

cd ../services/billing
npm install
```

Start Redis from the backend directory:

```bash
cd backend
docker compose up -d redis
```

## Configuration

Create `.env` files for the gateway and services. Keep secrets out of source control.

### Gateway variables

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
AUTH_SERVICE=http://localhost:<auth-port>
CHAT_SERVICE=http://localhost:<chat-port>
AGENT_SERVICE=http://localhost:<agent-port>
BILLING_SERVICE=http://localhost:<billing-port>
```

### Shared service variables

```env
PORT=<service-port>
MONGODB_URI=<mongodb-connection-string>
REDIS_URL=redis://localhost:6379
```

The legacy helper at `backend/shared/redis.js` currently reads `REDID_URL` instead of `REDIS_URL`. Use the variable expected by the specific service/helper being started, or standardize it before deployment.

### Authentication variables

The auth service also requires Firebase Admin credentials. Configure the Firebase service account using the method expected by your deployment environment and provide the relevant MongoDB and Redis variables.

### Agent variables

The agent service may require credentials for the selected providers and integrations:

```env
CHAT_SERVICE=http://localhost:<chat-port>
AUTH_SERVICE=http://localhost:<auth-port>
MONGODB_URI=<mongodb-connection-string>
QDRANT_URL=<qdrant-url>
AWS_REGION=<aws-region>
AWS_ACCESS_KEY_ID=<aws-access-key>
AWS_SECRET_KEY=<aws-secret-key>
AWS_BUCKET_NAME=<s3-bucket>
```

Additional model and search credentials may be required by the provider configurations in `backend/services/agent/config/`.

### Billing variables

```env
MONGODB_URI=<mongodb-connection-string>
RAZORPAY_KEY_ID=<razorpay-key-id>
RAZORPAY_KEY_SECRET=<razorpay-key-secret>
```

The frontend billing flow also reads:

```env
VITE_RAZORPAY_KEY_ID=<razorpay-key-id>
```

## Running Locally

Start each backend process from its service directory:

```bash
cd backend/gateway
npm start
```

```bash
cd backend/services/auth
npm run dev
```

```bash
cd backend/services/chat
npm run dev
```

```bash
cd backend/services/agent
npm run dev
```

```bash
cd backend/services/billing
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Frontend Scripts

Run these commands from `frontend/`:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Backend Scripts

The gateway uses `npm start`. The auth, chat, agent, and billing services provide both `npm start` and `npm run dev` scripts.

## Notes

- The gateway forwards authenticated chat, agent, and billing requests to their respective services.
- The frontend expects the gateway API to be available through the configured Axios base URL.
- Do not commit Firebase service account files, API keys, cloud credentials, or `.env` files.
- Ports and service URLs are intentionally represented as placeholders because they depend on the local or deployment environment.

## License

This project currently does not declare a project-specific open-source license.
