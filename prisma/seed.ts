import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = process.env.USER_ID;

  if (!userId) {
    throw new Error("USER_ID environment variable is required");
  }

  console.log("Deleting Posts...");
  await prisma.post.deleteMany();
  console.log("Successfully Deleted All Posts.");

  console.log("Seeding new posts...");

  await prisma.post.createMany({
    data: [
      {
        userId,
        title: "A Coffee Shop Smile",
        slug: "a-coffee-shop-smile",
        category: "ROMANTIC",
        content:
          "The rain poured heavily as I took shelter in a small coffee shop on the corner of the city. The aroma of fresh coffee filled the air, and as I looked up, I saw her—a gentle smile, warm eyes, and a presence that turned a simple rainy day into something unforgettable...",
        date: new Date("2025-03-21T00:00:00.000Z"),
        location: "Central Park",
      },
      {
        userId,
        title: "Lost in the City, Found a Friend",
        slug: "lost-in-the-city-found-a-friend",
        category: "FRIENDSHIP",
        content:
          "Walking through the bustling streets of Manila, I realized I had taken the wrong turn. Lost and uncertain, I met a stranger who not only helped me find my way but also shared a conversation that made the city feel a little less lonely...",
        date: new Date("2025-03-22T00:00:00.000Z"),
        location: "City Plaza",
      },
      {
        userId,
        title: "A Letter Left on the Train",
        slug: "a-letter-left-on-the-train",
        category: "MISCELLANEOUS",
        content:
          "The letter was neatly folded, left on the empty seat beside me. Curiosity got the best of me as I picked it up. 'To the one who finds this,' it began, leading me into a story that I never expected to be a part of...",
        date: new Date("2025-03-23T00:00:00.000Z"),
        location: "Grand Station",
      },
      {
        userId,
        title: "Sunset Conversations",
        slug: "sunset-conversations",
        category: "FRIENDSHIP",
        content:
          "Sitting by the beach, watching the waves roll in, I struck up a conversation with an old man who had seen the world. His stories of love, loss, and hope changed the way I looked at life forever...",
        date: new Date("2025-03-24T00:00:00.000Z"),
        location: "Sunset Bay",
      },
      {
        userId,
        title: "The Missed Train Ride",
        slug: "the-missed-train-ride",
        category: "ROMANTIC",
        content:
          "I barely missed my train that night, frustrated and tired. Little did I know that staying behind would lead to an encounter that would change my life forever...",
        date: new Date("2025-03-25T00:00:00.000Z"),
        location: "Metro Central",
      },
    ],
  });

  console.log("Seed data inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
