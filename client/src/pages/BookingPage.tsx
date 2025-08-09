import React, { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, DollarSign, User, MapPin, Shield } from 'lucide-react';
import { useCategory } from '@/contexts/CategoryContext';
import { useAuth } from '@/contexts/AuthContext';

// Mock companion data
const mockCompanion = {
  id: '1',
  name: 'Emma',
  age: 25,
  location: 'New York',
  hourlyRate: 300,
  imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
  verified: true,
  available: true
};

export default function BookingPage() {
  const [match, params] = useRoute('/booking/:companionId');
  const [, setLocation] = useLocation();
  const { categoryConfig } = useCategory();
  const { isAuthenticated } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(2);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!match) {
    return <div>Booking page not found</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>You must be signed in to book a companion.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setLocation('/auth')}
              className={`w-full bg-gradient-to-r ${categoryConfig.colors.primary} text-white`}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalAmount = duration * mockCompanion.hourlyRate;
  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00'
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate booking API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Booking request submitted! You will receive a confirmation shortly.');
      setLocation('/companions');
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Experience</h1>
            <p className="text-gray-600">Complete your booking with {mockCompanion.name}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>Select your preferred date, time, and duration</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleBooking} className="space-y-6">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Select Date
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Select Time
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                              selectedTime === time
                                ? `bg-gradient-to-r ${categoryConfig.colors.primary} text-white border-transparent`
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (hours)
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 12].map((hours) => (
                          <option key={hours} value={hours}>
                            {hours} hour{hours > 1 ? 's' : ''} - ${hours * mockCompanion.hourlyRate}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Any special requests or preferences..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className={`w-full bg-gradient-to-r ${categoryConfig.colors.primary} text-white py-3`}
                      size="lg"
                      disabled={loading || !selectedDate || !selectedTime}
                    >
                      {loading ? 'Processing...' : `Book Now - $${totalAmount}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Companion Info */}
                  <div className="flex items-start gap-3 mb-6">
                    <img
                      src={mockCompanion.imageUrl}
                      alt={mockCompanion.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{mockCompanion.name}</h3>
                        {mockCompanion.verified && (
                          <Badge className={`bg-gradient-to-r ${categoryConfig.colors.primary} text-white text-xs`}>
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{mockCompanion.age} years old</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {mockCompanion.location}
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-3 mb-6">
                    {selectedDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Date:</span>
                        <span className="font-medium">
                          {new Date(selectedDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="font-medium">{duration} hour{duration > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rate:</span>
                      <span className="font-medium">${mockCompanion.hourlyRate}/hour</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold">${totalAmount}</span>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mt-6 text-xs text-gray-500">
                    <p>By booking, you agree to our terms of service and privacy policy. All bookings are subject to companion availability.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}