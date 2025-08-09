import express from 'express';

const router = express.Router();

// Mock bookings storage
let mockBookings = [];

// Create a new booking
router.post('/api/bookings', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { companionId, startTime, endTime, totalAmount, notes } = req.body;
  
  const booking = {
    id: `booking_${Date.now()}`,
    clientId: req.session.user.id,
    companionId,
    startTime,
    endTime,
    totalAmount,
    status: 'pending',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };
  
  mockBookings.push(booking);
  
  res.status(201).json({
    ...booking,
    message: 'Booking created successfully'
  });
});

// Get user's bookings
router.get('/api/bookings', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const userBookings = mockBookings.filter(b => 
    b.clientId === req.session.user.id || b.companionId === req.session.user.id
  );
  
  res.json(userBookings);
});

// Get booking by ID
router.get('/api/bookings/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const booking = mockBookings.find(b => 
    b.id === req.params.id && 
    (b.clientId === req.session.user.id || b.companionId === req.session.user.id)
  );
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  res.json(booking);
});

export default router;