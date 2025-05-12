
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { halls } from "@/data/halls";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookingCalendar from "@/components/BookingCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const HallDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [hall, setHall] = useState(halls.find((h) => h.id === id));

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find the hall with the matching ID
    const foundHall = halls.find((h) => h.id === id);
    setHall(foundHall);
  }, [id]);

  if (!hall) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Hall Not Found</h1>
          <p className="mb-6">Sorry, the hall you're looking for doesn't exist.</p>
          <Link to="/halls">
            <Button>Back to Hall Listings</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row mb-6 items-center">
          <div>
            <Link to="/halls" className="text-hall-600 hover:text-hall-700 mb-2 inline-block">
              ← Back to Halls
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">{hall.name}</h1>
          </div>
          <div className="md:ml-auto mt-4 md:mt-0">
            {hall.available ? (
              <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
            ) : (
              <Badge variant="destructive">Unavailable</Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Image Carousel */}
            <div className="mb-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {hall.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={image}
                            alt={`${hall.name} image ${index + 1}`}
                            className="w-full h-[400px] object-cover"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Hall Details Tabs */}
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-gray-600">{hall.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Capacity</h3>
                          <p className="text-gray-600">Up to {hall.capacity} guests</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Price</h3>
                          <p className="text-gray-600">${hall.pricePerHour} per hour</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Amenities & Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hall.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="h-5 w-5 text-hall-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Hall Location</h3>
                    <p className="text-gray-600 mb-4">{hall.location}</p>
                    <div className="bg-gray-200 rounded-lg h-[300px] flex items-center justify-center">
                      <p className="text-gray-500">Map Placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <BookingCalendar hall={hall} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Halls You May Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {halls
              .filter((h) => h.id !== hall.id)
              .slice(0, 3)
              .map((h) => (
                <div key={h.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={h.images[0]}
                    alt={h.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{h.name}</h3>
                      <span className="text-hall-600">${h.pricePerHour}/hr</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {h.description}
                    </p>
                    <Link to={`/halls/${h.id}`}>
                      <Button className="w-full mt-4" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HallDetail;
