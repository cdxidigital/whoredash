import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useCategory, Category } from '@/contexts/CategoryContext';

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: 'female', label: 'Female', emoji: '💃' },
  { value: 'male', label: 'Male', emoji: '🕺' },
  { value: 'trans', label: 'Trans', emoji: '🌈' },
];

export default function CategorySwitcher() {
  const { category, setCategory } = useCategory();
  
  const currentCategory = categories.find(cat => cat.value === category);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <span>{currentCategory?.emoji}</span>
          <span className="hidden sm:inline">{currentCategory?.label}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {categories.map((cat) => (
          <DropdownMenuItem
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={category === cat.value ? 'bg-gray-100' : ''}
          >
            <span className="mr-2">{cat.emoji}</span>
            {cat.label} Companions
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}