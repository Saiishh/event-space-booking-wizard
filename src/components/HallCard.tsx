
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hall } from "@/data/halls";

interface HallCardProps {
  hall: Hall;
}

const HallCard = ({ hall }: HallCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={hall.images[0]}
          alt={hall.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-3 right-3">
          {hall.available ? (
            <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
          ) : (
            <Badge variant="destructive">Unavailable</Badge>
          )}
        </div>
      </div>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{hall.name}</h3>
          <span className="text-hall-600 font-semibold">${hall.pricePerHour}/hr</span>
        </div>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{hall.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 text-hall-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Up to {hall.capacity} guests
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {hall.features.slice(0, 3).map((feature, index) => (
            <Badge variant="outline" key={index} className="text-xs">
              {feature}
            </Badge>
          ))}
          {hall.features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{hall.features.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 pb-4">
        <Link to={`/halls/${hall.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        <Link to={`/booking?hall=${hall.id}`}>
          <Button size="sm">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HallCard;
