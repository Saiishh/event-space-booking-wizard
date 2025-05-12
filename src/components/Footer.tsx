
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link to="/" className="text-xl font-bold">
                Shree Swami Samarth Krupa Hall
              </Link>
            </motion.div>
            <p className="mt-3 text-gray-300 text-sm">
              A premier venue for all your special occasions in Kolhapur, providing exceptional service and memorable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Hall", path: "/hall" },
                { name: "Booking", path: "/booking" },
                { name: "FAQ", path: "/faq" },
              ].map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link to={link.path} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <address className="not-italic">
                  Bambawade, Shahuwadi,<br />
                  Kolhapur-416213,<br />
                  Maharashtra
                </address>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <a href="mailto:info@swamisamarthkrupa.com" className="hover:text-white transition-colors">
                  info@swamisamarthkrupa.com
                </a>
              </motion.li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Monday - Sunday:</li>
              <li>9:00 AM - 8:00 PM</li>
            </ul>
            <div className="mt-4">
              <Link to="/contact" className="text-hall-400 hover:text-hall-300 font-medium">
                Get in touch →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Shree Swami Samarth Krupa Hall. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Owned by Mr. Vijay Chougule
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
