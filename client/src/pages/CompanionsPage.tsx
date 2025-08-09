import React, { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Shield } from 'lucide-react';
import { useCategory } from '@/contexts/CategoryContext';

// Mock data - will be replaced with real API calls
const mockCompanions = [
  {
    id: '1',
    name: 'Emma',
    category: 'female',
    age: 25,
    location: 'New York',
    description: 'Elegant and sophisticated companion with a warm personality.',
    hourlyRate: 300,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    verified: true,
    available: true,
    rating: 4.9,
    reviewCount: 47
  },
  {
    id: '2',
    name: 'Alex',
    category: 'male',
    age: 28,
    location: 'Los Angeles',
    description: 'Charming gentleman perfect for any occasion.',
    hourlyRate: 250,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    verified: true,
    available: true,
    rating: 4.8,
    reviewCount: 32
  },
  {
    id: '3',
    name: 'Jordan',
    category: 'trans',
    age: 26,
    location: 'Miami',
    description: 'Beautiful and confident companion with amazing energy.',
    hourlyRate: 350,
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    verified: true,
    available: false,
    rating: 4.95,
    reviewCount: 28
  },
  {
    id: '4',
    name: 'Sophia',
    category: 'female',
    age: 24,
    location: 'Chicago',
    description: 'Intelligent and witty companion who loves good conversation.',
    hourlyRate: 275,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    verified: true,
    available: true,
    rating: 4.7,
    reviewCount: 51
  }
];

export default function CompanionsPage() {
  const { category, categoryConfig } = useCategory();
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'name'>('rating');
  
  // Filter companions by current category
  const filteredCompanions = mockCompanions.filter(companion => companion.category === category);
  
  // Sort companions
  const sortedCompanions = [...filteredCompanions].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.hourlyRate - b.hourlyRate;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{categoryConfig.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-600">
              {sortedCompanions.length} companion{sortedCompanions.length !== 1 ? 's' : ''} available
            </p>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="rating">Rating</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Companions Grid */}
        {sortedCompanions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No companions available in this category yet.</p>
            <p className="text-gray-500 mt-2">Check back soon or try a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCompanions.map((companion) => (
              <Card key={companion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img
                    src={companion.imageUrl}
                    alt={companion.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {companion.verified && (
                      <Badge className={`bg-gradient-to-r ${categoryConfig.colors.primary} text-white`}>
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant={companion.available ? "default" : "secondary"}>
                      <Clock className="w-3 h-3 mr-1" />
                      {companion.available ? 'Available' : 'Busy'}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{companion.name}</h3>
                      <p className="text-sm text-gray-600">{companion.age} years old</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{companion.rating}</span>
                      <span className="text-xs text-gray-500">({companion.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {companion.location}
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {companion.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">${companion.hourlyRate}</span>
                      <span className="text-sm text-gray-600">/hour</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 w-full">
                    <Link href={`/companion/${companion.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                    <Link href={`/booking/${companion.id}`} className="flex-1">
                      <Button 
                        className={`w-full bg-gradient-to-r ${categoryConfig.colors.primary} text-white`}
                        disabled={!companion.available}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}