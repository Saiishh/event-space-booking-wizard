
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const About = () => {
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
              About Shree Swami Samarth Krupa Hall
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              A premier venue for all your special occasions in Kolhapur
            </motion.p>
          </div>
        </motion.div>
        
        {/* About Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="/placeholder.svg" 
                    alt="Shree Swami Samarth Krupa Hall" 
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Established with a vision to provide an elegant venue for celebrations in the Kolhapur region, Shree Swami Samarth Krupa Hall has been serving the community with distinction.
                </p>
                <p className="text-gray-700 mb-4">
                  Our hall is owned and managed by Mr. Vijay Chougule, who has dedicated himself to ensuring that every event hosted at our venue is a resounding success. With his team of experienced professionals, Mr. Chougule personally oversees the arrangements to ensure everything meets the highest standards.
                </p>
                <p className="text-gray-700">
                  Located in the serene surroundings of Bambawade, Shahuwadi, our hall combines traditional values with modern amenities to create the perfect setting for your special occasions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Owner Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet the Owner</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                The driving force behind Shree Swami Samarth Krupa Hall
              </p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <motion.div 
                  className="md:flex-shrink-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <img 
                    className="h-48 w-full md:w-48 object-cover md:h-full" 
                    src="/placeholder.svg" 
                    alt="Vijay Chougule" 
                  />
                </motion.div>
                <motion.div 
                  className="p-8"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="uppercase tracking-wide text-sm text-hall-600 font-semibold">Owner</div>
                  <h3 className="text-xl font-bold mt-1">Mr. Vijay Chougule</h3>
                  <p className="mt-4 text-gray-600">
                    With over 15 years of experience in event management and hospitality, Mr. Vijay Chougule has built Shree Swami Samarth Krupa Hall with a commitment to excellence. His attention to detail and dedication to customer satisfaction has made our venue one of the most sought-after in the region.
                  </p>
                  <p className="mt-2 text-gray-600">
                    "My goal is to make your special occasions truly memorable by providing the perfect venue with impeccable service." - Vijay Chougule
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                The principles that guide us in delivering exceptional experiences
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description: "We strive for excellence in every aspect of our service, from the maintenance of our facilities to the coordination of your events.",
                  icon: "🏆"
                },
                {
                  title: "Hospitality",
                  description: "Traditional Indian hospitality is at the heart of everything we do, ensuring your guests feel welcomed and valued.",
                  icon: "🙏"
                },
                {
                  title: "Attention to Detail",
                  description: "We believe that the small details make a big difference, and we pay attention to every aspect of your event.",
                  icon: "✨"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
