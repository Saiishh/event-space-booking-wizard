
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock data for bookings
const bookings = [
  {
    id: "B001",
    customerName: "John Smith",
    hall: "Grand Ballroom",
    date: "2025-06-15",
    startTime: "14:00",
    endTime: "19:00",
    attendees: 200,
    status: "confirmed",
    total: 7500,
  },
  {
    id: "B002",
    customerName: "Emily Johnson",
    hall: "Executive Conference Center",
    date: "2025-06-20",
    startTime: "09:00",
    endTime: "17:00",
    attendees: 75,
    status: "pending",
    total: 6400,
  },
  {
    id: "B003",
    customerName: "Robert Williams",
    hall: "Garden Pavilion",
    date: "2025-06-25",
    startTime: "18:00",
    endTime: "23:00",
    attendees: 150,
    status: "confirmed",
    total: 6000,
  },
  {
    id: "B004",
    customerName: "Sarah Davis",
    hall: "Cultural Event Space",
    date: "2025-07-01",
    startTime: "10:00",
    endTime: "15:00",
    attendees: 120,
    status: "cancelled",
    total: 5000,
  },
  {
    id: "B005",
    customerName: "Michael Brown",
    hall: "Intimate Reception Hall",
    date: "2025-07-05",
    startTime: "18:00",
    endTime: "22:00",
    attendees: 50,
    status: "confirmed",
    total: 2400,
  },
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter bookings for the selected date
  const dateBookings = bookings.filter(booking => {
    return booking.date === (selectedDate ? format(selectedDate, "yyyy-MM-dd") : "");
  });

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    // Here you would update your booking status in a real app
    toast.success(`Booking #${bookingId} status updated to ${newStatus}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage bookings, halls, and services</p>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "Total Bookings", value: "128", color: "bg-blue-50 text-blue-700" },
                { title: "Pending Approvals", value: "12", color: "bg-yellow-50 text-yellow-700" },
                { title: "Revenue This Month", value: "$24,500", color: "bg-green-50 text-green-700" },
                { title: "Avg. Booking Value", value: "$1,250", color: "bg-purple-50 text-purple-700" },
              ].map((stat, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="text-muted-foreground text-sm">{stat.title}</div>
                    <div className={`text-2xl font-bold mt-1 ${stat.color.split(' ')[1]}`}>{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Hall</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.slice(0, 5).map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{booking.hall}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>
                          <Badge
                            className={`
                              ${booking.status === 'confirmed' ? 'bg-green-500' : ''}
                              ${booking.status === 'pending' ? 'bg-yellow-500' : ''}
                              ${booking.status === 'cancelled' ? 'bg-red-500' : ''}
                            `}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${booking.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Hall</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{booking.hall}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.startTime} - {booking.endTime}</TableCell>
                        <TableCell>{booking.attendees}</TableCell>
                        <TableCell>
                          <Badge
                            className={`
                              ${booking.status === 'confirmed' ? 'bg-green-500' : ''}
                              ${booking.status === 'pending' ? 'bg-yellow-500' : ''}
                              ${booking.status === 'cancelled' ? 'bg-red-500' : ''}
                            `}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${booking.total}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm" onClick={() => toast.success(`Viewing details for booking #${booking.id}`)}>
                              View
                            </Button>
                            {booking.status === 'pending' && (
                              <Button size="sm" onClick={() => handleStatusChange(booking.id, 'confirmed')}>
                                Approve
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardContent className="pt-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    Bookings for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dateBookings.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No bookings for this date
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Hall</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dateBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.customerName}</TableCell>
                            <TableCell>{booking.hall}</TableCell>
                            <TableCell>{booking.startTime} - {booking.endTime}</TableCell>
                            <TableCell>
                              <Badge
                                className={`
                                  ${booking.status === 'confirmed' ? 'bg-green-500' : ''}
                                  ${booking.status === 'pending' ? 'bg-yellow-500' : ''}
                                  ${booking.status === 'cancelled' ? 'bg-red-500' : ''}
                                `}
                              >
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => toast.success(`Viewing details for booking #${booking.id}`)}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
