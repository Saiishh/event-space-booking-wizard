
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { motion } from "framer-motion";

interface HallDetailProps {
  hallId?: string;
}

const HallDetail = ({ hallId }: HallDetailProps) => {
  const params = useParams<{ id: string }>();
  const id = hallId || params.id;
  const [hall, setHall] = useState(halls.find((h) => h.id === id));

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find the hall with the matching ID
    const foundHall = halls.find((h) => h.id === id);
    setHall(foundHall || halls[0]); // Default to the first hall if not found
  }, [id]);

  if (!hall) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Hall Not Found</h1>
          <p className="mb-6">Sorry, the hall you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row mb-6 items-center">
          <div>
            <Link to="/" className="text-hall-600 hover:text-hall-700 mb-2 inline-block">
              ← Back to Home
            </Link>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {hall.name}
            </motion.h1>
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
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
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
                          <p className="text-gray-600">₹{hall.pricePerHour} per hour</p>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Amenities & Features</h3>
                    <motion.div 
                      className="grid grid-cols-2 md:grid-cols-3 gap-4"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {hall.features.map((feature, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center"
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            show: { opacity: 1, y: 0 }
                          }}
                        >
                          <svg className="h-5 w-5 text-hall-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Hall Location</h3>
                    <p className="text-gray-600 mb-4">{hall.location}</p>
                    <motion.div 
                      className="bg-gray-200 rounded-lg h-[300px] flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-gray-500">Map Placeholder</p>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BookingCalendar hall={hall} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default HallDetail;
