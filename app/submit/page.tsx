"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Lock } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center relative overflow-hidden"
    >
      <div className="w-full max-w-2xl mx-4 bg-white rounded-xl shadow-lg p-8 sm:p-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center"
        >
          Share Your Missed Connection
        </motion.h1>

        <form className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700">
              Encounter Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 'Coffee Shop Smile' or 'Subway Book Reader'"
              className="rounded-lg h-12 text-base"
            />
          </div>

          {/* Story Textarea */}
          <div className="space-y-2">
            <Label htmlFor="story" className="text-gray-700">
              Your Story
            </Label>
            <Textarea
              id="story"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your encounter in detail..."
              className="rounded-lg min-h-[150px] max-h-[300px] overflow-y-auto text-base"
            />
          </div>

          {/* Location & Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Central Park, Starbucks Downtown"
                className="rounded-lg h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-700">
                Approximate Date
              </Label>
              <div className="relative">
                <Input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-lg h-12 pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-700">
              Connection Type
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-lg h-12">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="romantic">Romantic</SelectItem>
                <SelectItem value="friendship">Friendship</SelectItem>
                <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-4"
          >
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold rounded-lg"
            >
              Share Your Story
            </Button>
          </motion.div>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <Lock className="h-4 w-4 mt-6" />
          <p className="text-sm text-gray-500 mt-6 text-center">
            All submissions are anonymous. Please be respectful and truthful in
            your account.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
