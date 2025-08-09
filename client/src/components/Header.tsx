import React from 'react';
import { Link, useLocation } from 'wouter';
import { Heart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import CategorySwitcher from '@/components/CategorySwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { useCategory } from '@/contexts/CategoryContext';

export default function Header() {
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { categoryConfig } = useCategory();

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryConfig.colors.primary}`}>
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Whoredash</h1>
              <p className="text-xs text-gray-500">Premium Companions</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-${categoryConfig.colors.accent} ${
                location === '/' ? `text-${categoryConfig.colors.accent}` : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/companions" 
              className={`text-sm font-medium transition-colors hover:text-${categoryConfig.colors.accent} ${
                location === '/companions' ? `text-${categoryConfig.colors.accent}` : 'text-gray-700'
              }`}
            >
              Browse Companions
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <CategorySwitcher />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      {user?.avatarUrl ? (
                        <img 
                          src={user.avatarUrl} 
                          alt={user.name || user.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium">{user?.name || user?.username}</p>
                      <Badge variant="secondary" className="text-xs">
                        {user?.role}
                      </Badge>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}