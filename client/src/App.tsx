import React, { useState } from 'react';
import { Router, Route, Switch } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import CompanionsPage from '@/pages/CompanionsPage';
import CompanionProfilePage from '@/pages/CompanionProfilePage';
import BookingPage from '@/pages/BookingPage';
import AuthPage from '@/pages/AuthPage';
import { CategoryProvider } from '@/contexts/CategoryContext';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/companions" component={CompanionsPage} />
                <Route path="/companion/:id" component={CompanionProfilePage} />
                <Route path="/booking/:companionId" component={BookingPage} />
                <Route path="/auth" component={AuthPage} />
                <Route>
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
                  </div>
                </Route>
              </Switch>
            </main>
            <Toaster />
          </div>
        </Router>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;