
export interface Hall {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  features: string[];
  images: string[];
  location: string;
  available: boolean;
}

export const halls: Hall[] = [
  {
    id: "1",
    name: "Grand Ballroom",
    description: "Our most elegant and spacious hall, perfect for weddings, galas, and large conferences. Features high ceilings, crystal chandeliers, and a state-of-the-art sound system.",
    capacity: 500,
    pricePerHour: 1500,
    features: [
      "Stage", 
      "Dance floor", 
      "Professional lighting", 
      "Sound system", 
      "Video projector", 
      "Wi-Fi",
      "Catering services",
      "Dedicated staff"
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    location: "Main Building, 1st Floor",
    available: true
  },
  {
    id: "2",
    name: "Executive Conference Center",
    description: "Professional setting for business meetings and conferences. Equipped with modern technology and comfortable seating.",
    capacity: 150,
    pricePerHour: 800,
    features: [
      "Conference tables", 
      "Executive chairs", 
      "Smart boards", 
      "Video conferencing", 
      "High-speed internet", 
      "Presentation equipment",
      "Coffee and refreshment service"
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    location: "Business Wing, 2nd Floor",
    available: true
  },
  {
    id: "3",
    name: "Garden Pavilion",
    description: "Open-air venue surrounded by lush gardens. Perfect for summer parties, outdoor weddings, and social gatherings.",
    capacity: 200,
    pricePerHour: 1200,
    features: [
      "Garden access", 
      "Covered pavilion", 
      "Outdoor lighting", 
      "BBQ area", 
      "Portable heaters", 
      "Private entrance",
      "Decorative water features"
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    location: "South Garden, Ground Level",
    available: true
  },
  {
    id: "4",
    name: "Cultural Event Space",
    description: "Versatile space designed for art exhibitions, cultural performances, and community events.",
    capacity: 300,
    pricePerHour: 1000,
    features: [
      "Adjustable staging", 
      "Gallery lighting", 
      "Exhibition walls", 
      "Performance area", 
      "Backstage facilities",
      "Acoustic treatments",
      "Exhibition supports"
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    location: "Cultural Wing, Ground Floor",
    available: true
  },
  {
    id: "5",
    name: "Intimate Reception Hall",
    description: "Cozy and elegant space perfect for smaller gatherings, intimate weddings, and private parties.",
    capacity: 80,
    pricePerHour: 600,
    features: [
      "Private bar", 
      "Lounge seating", 
      "Fireplace", 
      "Private restrooms", 
      "Customizable lighting", 
      "Separate entrance",
      "Private outdoor terrace"
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    location: "West Wing, 1st Floor",
    available: true
  }
];
