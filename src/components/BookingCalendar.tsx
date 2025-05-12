
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Hall } from "@/data/halls";

interface BookingCalendarProps {
  hall?: Hall;
}

const BookingCalendar = ({ hall }: BookingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>(""); 
  const navigate = useNavigate();

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", 
    "17:00", "18:00", "19:00", "20:00"
  ];

  const handleProceedToBooking = () => {
    if (!date || !time) return;
    
    const params = new URLSearchParams();
    if (hall) params.append("hall", hall.id);
    params.append("date", format(date, "yyyy-MM-dd"));
    params.append("time", time);
    
    navigate(`/booking?${params.toString()}`);
  };

  // Mock function to check if a time slot is available
  const isTimeSlotAvailable = (timeSlot: string) => {
    // Here you would check against your actual bookings data
    return Math.random() > 0.3; // 70% chance of being available for demo purposes
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Check Availability & Book</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
              disabled={(date) => {
                // Disable past dates
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {date && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const available = isTimeSlotAvailable(slot);
              return (
                <Button
                  key={slot}
                  variant={time === slot ? "default" : "outline"}
                  disabled={!available}
                  className={cn(
                    "text-sm py-1",
                    !available && "line-through opacity-50"
                  )}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <Button
        className="w-full"
        disabled={!date || !time}
        onClick={handleProceedToBooking}
      >
        {hall ? "Book This Hall" : "Check Availability"}
      </Button>
    </div>
  );
};

export default BookingCalendar;
