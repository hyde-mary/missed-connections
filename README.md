# 📌 Missed Connection

**Missed Connection** is a web application inspired by the "Missed Connections" section on Craigslist. It allows users to post and browse anonymous messages about fleeting encounters and lost opportunities to connect with someone they met in passing.

## ✨ Current Features

- 🔐 **User Authentication**: Authentication.
- 🎨 **User Interface (UI)**: Design for core pages.


## 🛠 Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Next.js API Routes
- **Database**: <ins>To be decided</ins> (Probably: PostgreSQL with Prisma as the ORM)
- **Authentication**: Clerk's Custom Flow
- **Styling**: Tailwind CSS / ShadcnUI
- **Hosting**: <ins>To be decided</ins>


## 🚀 Installation

1. Clone the repository:

```sh
git clone https://github.com/hyde-mary/missed-connection.git
cd missed-connection
```

2. Install dependencies:

```sh
npm install
```

3. Set up environment variables in a .env.local file:

```.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

4. Run the development server:

```sh
npm run dev
```

5. Open `http://localhost:3000` in your browser.


## 🔮 Intended Features / To-Do List

- 🗄 Connect Database: Integrate a database for storing posts.
- 📝 Create Posts Functionality: Allow users to submit descriptions of missed encounters.
- 🔍 Filter Posts: Implement search and filter functionality for better browsing.


## 🤝 Contributing

Feel free to submit pull requests or report issues!

