
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HallCard from "@/components/HallCard";
import { halls } from "@/data/halls";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const HallListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityRange, setCapacityRange] = useState([0, 500]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Extract all unique features from halls
  const allFeatures = Array.from(
    new Set(halls.flatMap((hall) => hall.features))
  ).sort();

  // Filter halls based on search term, capacity, price, and features
  const filteredHalls = halls.filter((hall) => {
    const matchesSearch = hall.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || hall.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCapacity =
      hall.capacity >= capacityRange[0] && hall.capacity <= capacityRange[1];
    const matchesPrice =
      hall.pricePerHour >= priceRange[0] && hall.pricePerHour <= priceRange[1];
    const matchesFeatures =
      selectedFeatures.length === 0 ||
      selectedFeatures.every((feature) => hall.features.includes(feature));

    return matchesSearch && matchesCapacity && matchesPrice && matchesFeatures;
  });

  // Sort halls based on selected sort option
  const sortedHalls = [...filteredHalls].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.pricePerHour - b.pricePerHour;
      case "price-desc":
        return b.pricePerHour - a.pricePerHour;
      case "capacity-asc":
        return a.capacity - b.capacity;
      case "capacity-desc":
        return b.capacity - a.capacity;
      case "name-asc":
        return a.name.localeCompare(b.name);
      default:
        // Recommended - prioritize available venues
        return b.available ? 1 : -1;
    }
  });

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-hall-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Hall</h1>
          <p className="text-lg max-w-2xl">
            Browse our collection of multipurpose halls for your next event. 
            Use the filters to find the perfect match for your needs.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search halls by name or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="capacity-asc">Capacity (Low to High)</SelectItem>
                <SelectItem value="capacity-desc">Capacity (High to Low)</SelectItem>
                <SelectItem value="name-asc">Name (A to Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-6">Filters</h2>

              {/* Capacity Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Capacity</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={capacityRange}
                    min={0}
                    max={500}
                    step={10}
                    onValueChange={setCapacityRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{capacityRange[0]} guests</span>
                    <span>{capacityRange[1]} guests</span>
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Per Hour</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={2000}
                    step={50}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Features Filter */}
              <div>
                <h3 className="font-medium mb-3">Features</h3>
                <div className="space-y-2">
                  {allFeatures.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <label
                        htmlFor={`feature-${feature}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={() => {
                  setSearchTerm("");
                  setCapacityRange([0, 500]);
                  setPriceRange([0, 2000]);
                  setSelectedFeatures([]);
                  setSortBy("recommended");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Hall Listings */}
          <div className="lg:col-span-3">
            {sortedHalls.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No halls found</h3>
                <p className="text-gray-500">
                  Try adjusting your search filters or criteria.
                </p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-500">
                  Showing {sortedHalls.length} {sortedHalls.length === 1 ? "hall" : "halls"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedHalls.map((hall) => (
                    <HallCard key={hall.id} hall={hall} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HallListing;
