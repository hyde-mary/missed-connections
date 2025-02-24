import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Calendar, Check, ChevronsUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quickCategory, setQuickCategory] = useState("All");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const categories = ["All", "Romantic", "Friendship", "Miscellaneous"];

  const sortByChoices = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "today", label: "Today" },
    { value: "this_week", label: "This week" },
    { value: "this_month", label: "This month" },
    { value: "this_year", label: "This year" },
    { value: "all", label: "All time" },
  ];

  return (
    <div className="w-full max-w-[320px] min-h-screen pt-[64px] border-r-2 border-gray-200 sticky top-0 h-screen overflow-y-auto px-6">
      <div className="flex flex-col items-start mt-4 space-y-2">
        <h1 className="text-2xl font-semibold">Welcome!</h1>
        <p className="text-sm text-gray-700 text-justify">
          Customize your search effortlessly! Use the search bar to enter
          keywords and refine your results with multiple tags. Let our smart
          filtering do the rest.
        </p>
      </div>

      <Separator className="mt-4 mb-4 bg-slate-300" />

      {/* Search */}
      <div>
        <label className="block text-sm font-medium mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Keywords..."
            className="pl-10"
          />
        </div>
      </div>

      <Separator className="mt-4 mb-4 bg-slate-300" />

      {/* Quick Categories */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Quick Categories
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setQuickCategory(category);
              }}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                quickCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <Separator className="mt-4 mb-4 bg-slate-300" />

      {/* Location */}
      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter specific location..."
            className="pl-10"
          />
        </div>
      </div>

      <Separator className="mt-4 mb-4 bg-slate-300" />

      {/* Sort By */}
      <div className="">
        <label className="block text-sm font-medium mb-2">Sort By</label>
        <div className="relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between border-[1.5px] font-normal text-sm"
              >
                <div className="flex items-center justify-start space-x-4">
                  <Calendar className="opacity-50 mr-2" />
                  {sortBy
                    ? sortByChoices.find((choice) => choice.value === sortBy)
                        ?.label
                    : "Newest"}
                </div>
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search filter..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No filter found.</CommandEmpty>
                  <CommandGroup>
                    {sortByChoices.map((choice) => (
                      <CommandItem
                        key={choice.value}
                        value={choice.value}
                        onSelect={(currentValue) => {
                          setSortBy(
                            currentValue === sortBy ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        {choice.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            sortBy === choice.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Separator className="mt-4 mb-4 bg-slate-300" />

      {/* Active Filters Display */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Active Filters:
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {searchQuery && (
            <span
              onClick={() => setSearchQuery("")}
              className="flex items-center bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full cursor-pointer"
            >
              {searchQuery} ✕
            </span>
          )}
          {quickCategory !== "All" && (
            <span
              onClick={() => setQuickCategory("All")}
              className="flex items-center bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full cursor-pointer"
            >
              {quickCategory} ✕
            </span>
          )}
          {location && (
            <span
              onClick={() => setLocation("")}
              className="flex items-center bg-green-600 text-white text-xs px-3 py-1.5 rounded-full cursor-pointer"
            >
              {location} ✕
            </span>
          )}
          {sortBy !== "newest" && sortBy && (
            <span
              onClick={() => setSortBy("newest")}
              className="flex items-center bg-gray-600 text-white text-xs px-3 py-1.5 rounded-full cursor-pointer"
            >
              {sortByChoices.find((choice) => choice.value === sortBy)?.label} ✕
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
