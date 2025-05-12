
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HallCard from "@/components/HallCard";
import BookingCalendar from "@/components/BookingCalendar";
import { halls } from "@/data/halls";
import { services } from "@/data/services";

const Index = () => {
  // Get featured halls (first 3)
  const featuredHalls = halls.slice(0, 3);

  // Group services by category
  const serviceCategories = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Find the Perfect Venue for Your Next Event
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Browse our collection of premium multipurpose halls for any occasion - weddings, corporate events, conferences, and celebrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/halls">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Halls
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Make a Booking
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg"
                  alt="Featured Event Hall"
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <p className="font-semibold">Featured Venue</p>
                    <h3 className="text-2xl font-bold">Grand Ballroom</h3>
                    <p>Perfect for weddings and galas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Halls Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Halls</h2>
            <Link to="/halls" className="text-hall-600 hover:text-hall-700 font-medium text-sm">
              View All Halls →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHalls.map((hall) => (
              <HallCard key={hall.id} hall={hall} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Quick Booking</h2>
              <p className="text-gray-600 mb-8">
                Check availability and book your venue with just a few clicks. Our streamlined booking process makes it easy to secure the perfect space for your event.
              </p>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <BookingCalendar />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-gray-600 mb-8">
                We offer a wide range of services to make your event unforgettable. From catering to decoration, we've got you covered.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(serviceCategories).slice(0, 4).map(([category, services]) => (
                  <div key={category} className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg mb-2">{category}</h3>
                    <ul className="text-gray-600 text-sm space-y-2">
                      {services.slice(0, 2).map(service => (
                        <li key={service.id} className="flex items-center">
                          <span className="w-2 h-2 bg-hall-500 rounded-full mr-2"></span>
                          {service.name}
                        </li>
                      ))}
                    </ul>
                    <Link to="/services" className="text-hall-600 hover:text-hall-700 text-sm mt-3 inline-block">
                      Learn more →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The Grand Ballroom was the perfect venue for our wedding. The staff was incredibly helpful throughout the planning process and on our special day.",
                author: "Sarah & Michael",
                event: "Wedding"
              },
              {
                text: "We host our annual conference at the Executive Center every year. The facilities are top-notch and the technical support is excellent. Highly recommended!",
                author: "John Smith",
                event: "Corporate Conference"
              },
              {
                text: "The Garden Pavilion created the perfect atmosphere for our charity gala. Our guests were impressed with both the venue and the service.",
                author: "Emily Johnson",
                event: "Charity Gala"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-hall-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Book Your Perfect Venue?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Our team of event specialists is ready to help you find and book the perfect space for your next event.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking">
              <Button size="lg" variant="default" className="bg-white text-hall-700 hover:bg-gray-100">
                Book Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-hall-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
