"use client";
import { motion } from "framer-motion";
import Sidebar from "./_Components/sidebar";
import PostCard from "./_Components/post-card";

const Page = () => {
  const allPosts = [
    {
      id: 1,
      title: "Coffee Shop Encounter",
      content:
        "We met at Starbucks downtown last Tuesday morning. You were sitting by the window, sipping a caramel macchiato, completely lost in your book. I stood behind you in line, debating whether to order my usual or try something new. I hope you are here.",
      date: "2h ago",
      location: "California",
      category: "Romantic",
    },
    {
      id: 2,
      title: "Subway Musician Connection",
      content:
        "You were playing guitar on the 14th Street station in Texas, and your voice filled the entire platform. I was rushing to catch my train but stopped when I heard you strumming an old folk song that reminded me of my childhood. You smiled at everyone who dropped a few coins into your case, but you never looked up long enough to see me staring in admiration. I wanted to say something, maybe even request a song, but I hesitated. Instead, I stood near the column, listening, wondering about the stories behind your songs. The train arrived, and I had to leave. But as I sat by the window, watching the platform fade into the distance, I regretted not staying a little longer. If you ever see this, I just wanted to say—your music made my day, and I hope you're still out there, sharing your gift with the world.",
      date: "5h ago",
      location: "Texas",
      category: "Friendship",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-br from-purple-50 to-blue-50 flex relative"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-40 h-40 sm:w-72 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob opacity-40 animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-40 h-40 sm:w-72 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob opacity-40 animation-delay-4000"></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content would go here */}
      <div className="w-full pt-[64px] flex items-start justify-center">
        <div className="max-w-5xl w-full h-full">
          {allPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
