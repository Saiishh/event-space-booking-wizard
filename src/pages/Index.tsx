
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { halls } from "@/data/halls";
import { services } from "@/data/services";
import { motion } from "framer-motion";

const Index = () => {
  // Get the hall
  const hall = halls[0];

  // Group services by category
  const serviceCategories = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <motion.div 
        className="hero-gradient py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
              {...fadeIn}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Shree Swami Samarth Krupa Hall
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                The perfect venue for your weddings, celebrations, and special events in Kolhapur. Owned by Mr. Vijay Chougule.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/hall">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="w-full sm:w-auto">
                      View Hall
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/booking">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Book Now
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg"
                  alt="Shree Swami Samarth Krupa Hall"
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <p className="font-semibold">Premier Venue in Kolhapur</p>
                    <h3 className="text-2xl font-bold">Shree Swami Samarth Krupa Hall</h3>
                    <p>Perfect for weddings and special events</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section 
        className="py-12 md:py-16 bg-white"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            variants={fadeIn}
          >
            Why Choose Our Hall?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Amenities",
                description: "Our hall features state-of-the-art sound systems, air conditioning, and modern lighting to make your event perfect.",
                icon: "✨"
              },
              {
                title: "Spacious Interior",
                description: "With capacity for up to 500 guests, our venue provides ample space for all types of gatherings.",
                icon: "🏛️"
              },
              {
                title: "Prime Location",
                description: "Conveniently located in Bambawade, Shahuwadi, with ample parking space for your guests.",
                icon: "📍"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
                variants={fadeIn}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-12 md:py-16 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-4"
            variants={fadeIn}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
            variants={fadeIn}
          >
            We offer a wide range of services to make your event unforgettable. From catering to decoration, we've got you covered.
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(serviceCategories).slice(0, 4).map(([category, services], index) => (
              <motion.div 
                key={category} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                variants={fadeIn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-3">{category}</h3>
                <ul className="text-gray-600 space-y-3">
                  {services.slice(0, 3).map(service => (
                    <li key={service.id} className="flex items-center">
                      <span className="w-2 h-2 bg-hall-500 rounded-full mr-2"></span>
                      <span>{service.name}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="text-hall-600 hover:text-hall-700 text-sm mt-4 inline-block font-medium">
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-12 md:py-16 bg-white"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            variants={fadeIn}
          >
            What Our Clients Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The hall was the perfect venue for our wedding. Mr. Chougule and his staff were incredibly helpful throughout the planning process and on our special day.",
                author: "Priya & Rajesh",
                event: "Wedding"
              },
              {
                text: "We had our corporate event here and were very impressed with the facilities and service. Everything was perfectly arranged as per our requirements.",
                author: "Amit Desai",
                event: "Corporate Event"
              },
              {
                text: "The ambiance of Shree Swami Samarth Krupa Hall made our family function truly special. We received many compliments from our guests.",
                author: "Sunita Patil",
                event: "Family Function"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={fadeIn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-12 md:py-16 bg-hall-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Book Our Beautiful Venue?
          </motion.h2>
          <motion.p 
            className="text-lg mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Contact us today to check availability and reserve Shree Swami Samarth Krupa Hall for your special occasion.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/booking">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="default" className="bg-white text-hall-700 hover:bg-gray-100">
                  Book Now
                </Button>
              </motion.div>
            </Link>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-hall-600">
                  Contact Us
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Index;
