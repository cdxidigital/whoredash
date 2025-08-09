import express from 'express';

const router = express.Router();

// Mock users for demo
const mockUsers = [
  { id: '1', username: 'client1', password: 'demo123', name: 'John Doe', role: 'client' },
  { id: '2', username: 'companion1', password: 'demo123', name: 'Emma Wilson', role: 'companion' },
  { id: '3', username: 'admin1', password: 'demo123', name: 'Admin User', role: 'admin' }
];

// Login endpoint
router.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = mockUsers.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Store user in session
    req.session.user = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };
    
    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get current user
router.get('/api/auth/me', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Logout endpoint
router.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;