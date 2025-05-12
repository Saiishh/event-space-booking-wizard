
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
    name: "Shree Swami Samarth Krupa Hall",
    description: "Our elegant and spacious hall is perfect for weddings, family functions, and social gatherings. The hall features beautiful décor, modern amenities, and a welcoming atmosphere to make your special occasions truly memorable.",
    capacity: 500,
    pricePerHour: 15000,
    features: [
      "Air conditioning", 
      "Professional sound system", 
      "Stage with decorative backdrop", 
      "Modern lighting system", 
      "Spacious parking",
      "Separate dining area",
      "Bridal room",
      "Kitchen facilities"
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    location: "Bambawade, Shahuwadi, Kolhapur-416213, Maharashtra",
    available: true
  }
];
