import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Shield, Clock, Heart } from 'lucide-react';
import { useCategory } from '@/contexts/CategoryContext';

export default function HomePage() {
  const { categoryConfig } = useCategory();

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Verified Professionals',
      description: 'All companions are thoroughly verified for your peace of mind.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7 Availability',
      description: 'Book premium companions any time, day or night.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Only the highest quality companions make it to our platform.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Discreet Service',
      description: 'Your privacy and discretion are our top priorities.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${categoryConfig.gradients.hero} py-20`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {categoryConfig.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whoredash delivers premium companion booking services with a focus on discretion, 
            professionalism, and exceptional experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/companions">
              <Button size="lg" className={`bg-gradient-to-r ${categoryConfig.colors.primary} text-white px-8 py-4 text-lg`}>
                Browse Companions
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Whoredash?
            </h2>
            <p className="text-xl text-gray-600">
              Experience premium companion services with unmatched quality and discretion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`bg-gradient-to-br ${categoryConfig.gradients.card} border-none`}>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${categoryConfig.colors.primary} flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-r ${categoryConfig.colors.primary}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Premium Companionship?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied clients who trust Whoredash for their companion needs.
          </p>
          <Link href="/companions">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}