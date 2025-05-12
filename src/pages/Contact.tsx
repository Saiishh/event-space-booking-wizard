
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <motion.div
          className="bg-hall-700 text-white py-12 md:py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              {...fadeIn}
            >
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              Get in touch with us to book our hall or for any inquiries
            </motion.p>
          </div>
        </motion.div>
        
        {/* Contact Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your event, inquiries, or questions"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-hall-100 rounded-full p-3 mr-4">
                          <MapPin className="h-6 w-6 text-hall-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Address</h3>
                          <p className="text-gray-600 mt-1">
                            Bambawade, Shahuwadi,<br />
                            Kolhapur-416213,<br />
                            Maharashtra, India
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-hall-100 rounded-full p-3 mr-4">
                          <Phone className="h-6 w-6 text-hall-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Phone</h3>
                          <p className="text-gray-600 mt-1">+91 98765 43210</p>
                          <p className="text-gray-500 text-sm">Available 9:00 AM - 8:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-hall-100 rounded-full p-3 mr-4">
                          <Mail className="h-6 w-6 text-hall-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Email</h3>
                          <p className="text-gray-600 mt-1">info@swamisamarthkrupa.com</p>
                          <p className="text-gray-500 text-sm">We reply within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-hall-100 rounded-full p-3 mr-4">
                          <Clock className="h-6 w-6 text-hall-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Business Hours</h3>
                          <p className="text-gray-600 mt-1">
                            Monday - Sunday: 9:00 AM - 8:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-64 bg-gray-200">
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      <p>Map Location</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
