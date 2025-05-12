
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How far in advance should I book a hall?",
    answer: "For weekends and peak season dates (May-September, December), we recommend booking at least 6 months in advance. For weekday events or off-peak seasons, 2-3 months advance booking is usually sufficient. Last-minute bookings are occasionally possible but selection may be limited.",
    category: "Booking"
  },
  {
    id: "2",
    question: "What is the payment structure?",
    answer: "We require a 25% deposit to secure your booking date. An additional 25% is due 90 days before your event, and the remaining balance is due 14 days before the event date. We accept credit cards, bank transfers, and cashier's checks.",
    category: "Payment"
  },
  {
    id: "3",
    question: "Do you offer discounts for regular clients?",
    answer: "Yes! Our loyalty program offers 10% off after your third booking within a 12-month period. Corporate clients with quarterly bookings receive a 15% discount on hall rentals. Additionally, non-profit organizations may qualify for special rates with proper documentation.",
    category: "Pricing"
  },
  {
    id: "4",
    question: "What is your cancellation policy?",
    answer: "Cancellations more than 90 days before event: full refund minus a $100 processing fee. Cancellations 30-90 days before: 50% refund of your deposit. Cancellations less than 30 days before: no refund. Rescheduling is possible subject to availability and may incur a change fee.",
    category: "Booking"
  },
  {
    id: "5",
    question: "Can I bring my own catering?",
    answer: "Yes, we allow outside catering with approved vendors. There is a kitchen usage fee of $350 for outside catering. Our preferred caterers list includes options for various cuisines and budget ranges. All outside caterers must provide proof of insurance and meet our facility requirements.",
    category: "Services"
  },
  {
    id: "6",
    question: "Are there any noise restrictions?",
    answer: "Events must maintain reasonable noise levels after 10:00 PM on weekdays and 11:00 PM on weekends in accordance with local ordinances. Our halls are equipped with sound limiters to help monitor levels. Amplified music must be played indoors after these hours with doors and windows closed.",
    category: "Regulations"
  },
  {
    id: "7",
    question: "Is there a discount for booking multiple days?",
    answer: "Yes, we offer a 15% discount on the hall rental fee for multi-day bookings. For conferences or exhibitions running 3+ days, we offer a 20% discount. Setup and teardown days can be added at a reduced rate of 50% of the standard daily fee.",
    category: "Pricing"
  },
  {
    id: "8",
    question: "What amenities are included in the basic hall rental?",
    answer: "Basic rentals include the space, standard tables and chairs, basic room setup according to your floor plan, cleaning before and after your event, on-site event manager, use of service elevators, and access to restrooms. Additional equipment, decor, and services are available at extra cost.",
    category: "Services"
  },
  {
    id: "9",
    question: "Do you provide AV equipment?",
    answer: "Yes, we offer various AV packages ranging from basic setups to comprehensive systems with technician support. Basic systems include a projector, screen, and simple sound system. Advanced options include multi-screen displays, professional sound systems, stage lighting, and dedicated technical staff.",
    category: "Services"
  },
  {
    id: "10",
    question: "How do I check if my preferred date is available?",
    answer: "You can check date availability on our online booking calendar, call our booking office directly at (123) 456-7890, or submit an inquiry through our contact form. We recommend having alternative dates in mind, especially for peak seasons.",
    category: "Booking"
  }
];
