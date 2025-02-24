"use client";
import { motion } from "framer-motion";
import Sidebar from "./_Components/sidebar";

const Page = () => {
  const allPosts = [
    {
      id: 1,
      title: "Coffee Shop Encounter",
      excerpt: "We met at Starbucks downtown last Tuesday morning...",
      date: "2h ago",
      location: "California",
      category: "Romantic",
    },
    {
      id: 2,
      title: "Subway Musician Connection",
      excerpt: "You were playing guitar on the 14th Street station...",
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
        <div className="max-w-5xl w-full h-full">{/* Posts go here */}</div>
      </div>
    </motion.div>
  );
};

export default Page;
