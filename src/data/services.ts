
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export const services: Service[] = [
  {
    id: "1",
    name: "Basic Catering Package",
    description: "Selection of appetizers, main course options, and desserts for your guests. Includes setup and service staff.",
    price: 45,
    category: "Catering",
    available: true
  },
  {
    id: "2",
    name: "Premium Catering Package",
    description: "Gourmet selection of international cuisines, premium beverages, and dessert stations. Includes chef stations and full service staff.",
    price: 75,
    category: "Catering",
    available: true
  },
  {
    id: "3",
    name: "Basic AV Package",
    description: "Includes projector, screen, basic sound system, and microphone. Technical support available on call.",
    price: 250,
    category: "Equipment",
    available: true
  },
  {
    id: "4",
    name: "Premium AV Package",
    description: "Professional-grade audio-visual equipment with dedicated technician throughout your event. Includes multiple screens, surround sound, and lighting control.",
    price: 500,
    category: "Equipment",
    available: true
  },
  {
    id: "5",
    name: "Basic Decoration Package",
    description: "Standard table settings, chair covers, and minimal floral arrangements to enhance your event space.",
    price: 300,
    category: "Decoration",
    available: true
  },
  {
    id: "6",
    name: "Premium Decoration Package",
    description: "Custom theme decorations, premium floral arrangements, mood lighting, and personalized touches throughout the venue.",
    price: 750,
    category: "Decoration",
    available: true
  },
  {
    id: "7",
    name: "Photography Service",
    description: "Professional photographer to capture your special event. Includes edited digital photos delivered within one week.",
    price: 600,
    category: "Additional Services",
    available: true
  },
  {
    id: "8",
    name: "Valet Parking",
    description: "Professional valet service for your guests. Includes parking attendants and coordination.",
    price: 350,
    category: "Additional Services",
    available: true
  },
  {
    id: "9",
    name: "Security Personnel",
    description: "Trained security staff to ensure the safety of your event and guests. Minimum 4-hour booking.",
    price: 45,
    category: "Additional Services",
    available: true
  },
  {
    id: "10",
    name: "Event Coordinator",
    description: "Professional coordinator to oversee the logistics of your event and ensure everything runs smoothly.",
    price: 500,
    category: "Additional Services",
    available: true
  }
];
