
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format, parse, addHours } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { halls } from "@/data/halls";
import { services } from "@/data/services";
import ServiceOption from "@/components/ServiceOption";
import { CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Define form schema
const bookingFormSchema = z.object({
  hallId: z.string().min(1, "Please select a hall"),
  date: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string().min(1, "Please select a start time"),
  duration: z.number().min(1, "Minimum duration is 1 hour"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  attendees: z.number().min(1, "Number of attendees is required"),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  // Initialize form with values from URL if available
  const hallIdFromUrl = searchParams.get("hall") || "";
  const dateFromUrl = searchParams.get("date") || "";
  const timeFromUrl = searchParams.get("time") || "";

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      hallId: hallIdFromUrl,
      date: dateFromUrl ? parse(dateFromUrl, "yyyy-MM-dd", new Date()) : undefined,
      startTime: timeFromUrl,
      duration: 3,
      name: "",
      email: "",
      phone: "",
      attendees: 50,
      specialRequests: "",
    },
  });

  const watchHallId = form.watch("hallId");
  const watchDate = form.watch("date");
  const watchStartTime = form.watch("startTime");
  const watchDuration = form.watch("duration");
  
  // Calculate booking summary
  const selectedHall = halls.find(hall => hall.id === watchHallId);
  const selectedDate = watchDate ? format(watchDate, "EEEE, MMMM d, yyyy") : "-";
  const startTime = watchStartTime || "-";
  const endTime = watchStartTime 
    ? format(addHours(parse(watchStartTime, "HH:mm", new Date()), watchDuration || 0), "HH:mm") 
    : "-";
  
  // Calculate costs
  const hallCost = selectedHall ? selectedHall.pricePerHour * (watchDuration || 0) : 0;
  const selectedServiceItems = services.filter(service => selectedServices.includes(service.id));
  const servicesCost = selectedServiceItems.reduce((acc, service) => acc + service.price, 0);
  const totalCost = hallCost + servicesCost;

  const handleServiceToggle = (service: any, selected: boolean) => {
    if (selected) {
      setSelectedServices([...selectedServices, service.id]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== service.id));
    }
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate first step fields
      form.trigger(["hallId", "date", "startTime", "duration"]).then((valid) => {
        if (valid) setStep(2);
      });
    } else if (step === 2) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data: BookingFormValues) => {
    console.log("Form data:", data);
    console.log("Selected services:", selectedServices);
    
    // Here you would normally send this to your backend
    toast.success("Booking submitted successfully!", {
      description: "A confirmation email has been sent to your inbox.",
    });
    
    // Reset form and go back to step 1
    form.reset();
    setSelectedServices([]);
    setStep(1);
  };

  // Time slot options
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", 
    "17:00", "18:00", "19:00", "20:00"
  ];

  // Services grouped by category
  const servicesByCategory = services.reduce((acc: any, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  // Duration options
  const durationOptions = [1, 2, 3, 4, 5, 6, 8, 12, 24];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Book a Hall</h1>
        <p className="text-gray-600 mb-8">Fill out the form below to make a reservation for your event.</p>

        {/* Progress Steps */}
        <div className="mb-8">
          <ol className="flex items-center w-full">
            <li className={`flex items-center ${step >= 1 ? 'text-hall-600' : 'text-gray-500'} space-x-2.5`}>
              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-hall-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </span>
              <span>Venue & Date</span>
              <span className="flex-grow border-t border-gray-300 mx-4"></span>
            </li>
            <li className={`flex items-center ${step >= 2 ? 'text-hall-600' : 'text-gray-500'} space-x-2.5`}>
              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-hall-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </span>
              <span>Services</span>
              <span className="flex-grow border-t border-gray-300 mx-4"></span>
            </li>
            <li className={`flex items-center ${step >= 3 ? 'text-hall-600' : 'text-gray-500'} space-x-2.5`}>
              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-hall-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </span>
              <span>Contact & Review</span>
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    {/* Hall Selection */}
                    <FormField
                      control={form.control}
                      name="hallId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Hall</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a hall" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {halls.map((hall) => (
                                <SelectItem key={hall.id} value={hall.id}>
                                  {hall.name} (up to {hall.capacity} guests)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the hall that best fits your event needs.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date Selection */}
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Event Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => {
                                  // Disable past dates
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  return date < today;
                                }}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Select the date when you want to hold your event.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Time Selection */}
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose when your event will start.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Duration Selection */}
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (hours)</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(parseInt(value))}
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {durationOptions.map((hours) => (
                                <SelectItem key={hours} value={hours.toString()}>
                                  {hours} {hours === 1 ? "hour" : "hours"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How long do you need the venue for?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Attendees */}
                    <FormField
                      control={form.control}
                      name="attendees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Guests</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter number of guests"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Please provide an accurate estimate of attendees.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Additional Services</h2>
                    <p className="text-gray-600 mb-6">Enhance your event with our additional services.</p>

                    {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                      <div key={category} className="mb-8">
                        <h3 className="text-lg font-semibold mb-3">{category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(categoryServices as any).map((service: any) => (
                            <ServiceOption
                              key={service.id}
                              service={service}
                              onSelect={handleServiceToggle}
                              selected={selectedServices.includes(service.id)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Contact Information */}
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Special Requests</h2>
                        <FormField
                          control={form.control}
                          name="specialRequests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes or Requirements</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Any special requirements or notes for your booking?" 
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <dl className="divide-y divide-gray-200">
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Hall</dt>
                            <dd className="text-sm font-semibold text-gray-900">{selectedHall?.name || "-"}</dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Date</dt>
                            <dd className="text-sm font-semibold text-gray-900">{selectedDate}</dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Time</dt>
                            <dd className="text-sm font-semibold text-gray-900">{startTime} - {endTime}</dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Duration</dt>
                            <dd className="text-sm font-semibold text-gray-900">
                              {watchDuration} {watchDuration === 1 ? "hour" : "hours"}
                            </dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Hall Cost</dt>
                            <dd className="text-sm font-semibold text-gray-900">${hallCost}</dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Additional Services</dt>
                            <dd className="text-sm font-semibold text-gray-900">${servicesCost}</dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-lg font-bold text-gray-900">Total Cost</dt>
                            <dd className="text-lg font-bold text-hall-600">${totalCost}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                  <div className="ml-auto">
                    {step < 3 ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit">
                        Complete Booking
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Booking Information</h3>
              
              {/* Need Help */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our team is here to assist you with any questions about your booking.
                </p>
                <div className="text-sm">
                  <p className="mb-1">
                    <span className="font-medium">Email:</span> bookings@venuehub.com
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> (123) 456-7890
                  </p>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h4 className="font-medium mb-2">FAQ</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/faq" className="text-hall-600 hover:underline">
                      What is your cancellation policy?
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-hall-600 hover:underline">
                      Can I bring my own catering?
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-hall-600 hover:underline">
                      Do you offer discounts for regular clients?
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-hall-600 hover:underline">
                      What amenities are included in the basic hall rental?
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
