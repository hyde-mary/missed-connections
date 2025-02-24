"use client";
import { motion } from "framer-motion";
import { MapPin, Heart, MessageCircle, Clock, Send } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    date: string;
    location: string;
    category: string;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const maxPreviewLength = 300;

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const handleMessage = () => {
    // Add your message functionality here
    console.log("Initiate message with post author:", post.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="shadow-sm hover:shadow-md transition-shadow border-b border-gray-300 px-8 py-4 sticky top-0"
    >
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
          {post.category}
        </span>
        <div className="flex items-center justify-center space-x-2 text-sm">
          <Clock className="h-3 w-3" />
          <p>{post.date}</p>
        </div>
      </div>

      <h1 className="text-xl font-semibold mb-2 text-gray-800 mt-2 underline">
        {post.title}
      </h1>
      <p className="text-gray-600 mb-4">
        {expanded || post.content.length <= maxPreviewLength
          ? post.content
          : `${post.content.slice(0, maxPreviewLength)}...`}
      </p>
      {post.content.length > maxPreviewLength && (
        <button
          onClick={toggleExpanded}
          className="text-blue-500 text-sm font-medium mt-2 hover:cursor-pointer"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          {post.location}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleMessage}
            className="flex items-center text-gray-500 hover:text-purple-600 transition-colors"
          >
            <Send className="h-4 w-4 mr-1" />
            <span className="text-sm">Message</span>
          </button>
          <button className="flex items-center text-gray-500 hover:text-purple-600 transition-colors">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-sm">24</span>
          </button>
          <button className="flex items-center text-gray-500 hover:text-purple-600 transition-colors">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">8</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
