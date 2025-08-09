import React from 'react';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Shield, Calendar, DollarSign, Heart } from 'lucide-react';
import { useCategory } from '@/contexts/CategoryContext';

// Mock data - will be replaced with real API calls
const mockCompanion = {
  id: '1',
  name: 'Emma',
  category: 'female',
  age: 25,
  location: 'New York',
  description: 'Elegant and sophisticated companion with a warm personality. I enjoy fine dining, cultural events, and meaningful conversations. With years of experience in hospitality, I ensure every moment we spend together is memorable and comfortable.',
  hourlyRate: 300,
  imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&crop=face',
  verified: true,
  available: true,
  rating: 4.9,
  reviewCount: 47,
  gallery: [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'
  ],
  services: ['Dinner Dates', 'Social Events', 'Travel Companion', 'Cultural Activities'],
  languages: ['English', 'French', 'Spanish'],
  education: 'Masters in Business Administration',
  interests: ['Art', 'Literature', 'Wine Tasting', 'Travel']
};

const mockReviews = [
  {
    id: '1',
    clientName: 'Michael R.',
    rating: 5,
    comment: 'Emma was absolutely wonderful. Professional, elegant, and charming. Highly recommended!',
    date: '2024-01-15'
  },
  {
    id: '2',
    clientName: 'David K.',
    rating: 5,
    comment: 'Perfect companion for my business dinner. Emma was engaging and made the evening memorable.',
    date: '2024-01-08'
  },
  {
    id: '3',
    clientName: 'James L.',
    rating: 4,
    comment: 'Great experience overall. Emma is very professional and beautiful.',
    date: '2024-01-02'
  }
];

export default function CompanionProfilePage() {
  const [match, params] = useRoute('/companion/:id');
  const { categoryConfig } = useCategory();
  
  if (!match) {
    return <div>Companion not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <div className="relative">
                <img
                  src={mockCompanion.imageUrl}
                  alt={mockCompanion.name}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {mockCompanion.verified && (
                    <Badge className={`bg-gradient-to-r ${categoryConfig.colors.primary} text-white`}>
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant={mockCompanion.available ? "default" : "secondary"}>
                    <Clock className="w-3 h-3 mr-1" />
                    {mockCompanion.available ? 'Available' : 'Busy'}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{mockCompanion.name}</h1>
                    <p className="text-lg text-gray-600">{mockCompanion.age} years old</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {mockCompanion.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-medium">{mockCompanion.rating}</span>
                      <span className="text-sm text-gray-500">({mockCompanion.reviewCount} reviews)</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold">${mockCompanion.hourlyRate}</span>
                      <span className="text-gray-600">/hour</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {mockCompanion.description}
                </p>
                
                {/* Services */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockCompanion.services.map((service) => (
                      <Badge key={service} variant="outline">{service}</Badge>
                    ))}
                  </div>
                </div>
                
                {/* Languages */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockCompanion.languages.map((language) => (
                      <Badge key={language} variant="secondary">{language}</Badge>
                    ))}
                  </div>
                </div>
                
                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Education</h4>
                    <p className="text-gray-600">{mockCompanion.education}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Interests</h4>
                    <p className="text-gray-600">{mockCompanion.interests.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({mockReviews.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.clientName}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book {mockCompanion.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">Hourly Rate</span>
                    </div>
                    <span className="text-lg font-bold">${mockCompanion.hourlyRate}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Link href={`/booking/${mockCompanion.id}`}>
                      <Button 
                        className={`w-full bg-gradient-to-r ${categoryConfig.colors.primary} text-white py-3`}
                        size="lg"
                        disabled={!mockCompanion.available}
                      >
                        {mockCompanion.available ? 'Book Now' : 'Currently Unavailable'}
                      </Button>
                    </Link>
                    
                    <Button variant="outline" className="w-full py-3" size="lg">
                      <Heart className="w-4 h-4 mr-2" />
                      Add to Favorites
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-600 text-center">
                    All bookings are subject to companion availability and our terms of service.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}