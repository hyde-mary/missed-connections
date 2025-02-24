"use client";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const MainContent = () => {
  const recentPosts = [
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
    {
      id: 3,
      title: "Park Bench Conversation",
      excerpt: "We shared stories about our dogs in Central Park...",
      date: "1d ago",
      location: "Florida",
      category: "Miscellaneous",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center relative overflow-hidden px-2 sm:px-4 pt-20 sm:pt-28 pb-20 sm:pb-28"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-40 h-40 sm:w-72 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-40 h-40 sm:w-72 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl w-full px-4 space-y-14 sm:space-y-28 relative z-10">
        <div className="space-y-6 sm:space-y-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Find Your Missed Connections
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            Rediscover meaningful encounters and lost connections
          </p>
          <div className="relative w-full max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search locations, descriptions, or keywords..."
              className="w-full h-12 sm:h-14 pl-12 pr-4 text-sm sm:text-lg rounded-xl shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Recent Posts
            </h2>
            <Link
              href="/explore"
              className="flex items-center justify-center hover:cursor-pointer text-blue-400 pb-4"
            >
              <span className="flex items-center border-b border-transparent hover:border-blue-400">
                <p className="">View All</p>
                <ArrowRight className=" ml-2 h-5 w-5 sm:h-6 sm:w-6" />
              </span>
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {recentPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + post.id * 0.1 }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm text-purple-600 font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                  {post.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-light">
                  <span className="text-sm text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {post.location}
                  </span>
                </p>
                <Link
                  href="#"
                  className="mt-2 sm:mt-3 inline-block text-purple-600 hover:text-purple-700 text-xs sm:text-sm font-medium"
                >
                  Read more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MainContent;
