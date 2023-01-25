This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Prerequisite
Have the Metamask plugin installed in you browser
## Getting Started
First install the packages :
npm install
Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Things I planned to do
Securing the backend api with some auth0
Schema validation on the backend api
Refining types
Add some colors and responsive features to the UI
Create an install script to initialize the SQLite database
Add subscription to the new transactions and transaction states for auto refreshing instead of polling
fix errors "API resolved without sending a response for /api/transaction, this may result in stalled requests"
