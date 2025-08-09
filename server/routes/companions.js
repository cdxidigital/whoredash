import express from 'express';

const router = express.Router();

// Mock companions data
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

// Get all companions
router.get('/api/companions', (req, res) => {
  const { category, available } = req.query;
  
  let filteredCompanions = mockCompanions;
  
  if (category) {
    filteredCompanions = filteredCompanions.filter(c => c.category === category);
  }
  
  if (available === 'true') {
    filteredCompanions = filteredCompanions.filter(c => c.available === true);
  }
  
  res.json(filteredCompanions);
});

// Get companion by ID
router.get('/api/companions/:id', (req, res) => {
  const companion = mockCompanions.find(c => c.id === req.params.id);
  
  if (!companion) {
    return res.status(404).json({ error: 'Companion not found' });
  }
  
  res.json(companion);
});

export default router;