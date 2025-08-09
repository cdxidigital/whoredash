import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Category = 'female' | 'male' | 'trans';

interface CategoryContextType {
  category: Category;
  setCategory: (category: Category) => void;
  categoryConfig: {
    title: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    gradients: {
      hero: string;
      card: string;
    };
  };
}

const categoryConfigs = {
  female: {
    title: 'Premium Female Companions',
    colors: {
      primary: 'from-pink-500 to-rose-500',
      secondary: 'from-pink-100 to-rose-100',
      accent: 'pink-500'
    },
    gradients: {
      hero: 'from-pink-50 via-rose-50 to-pink-100',
      card: 'from-pink-50 to-rose-50'
    }
  },
  male: {
    title: 'Premium Male Companions',
    colors: {
      primary: 'from-blue-500 to-indigo-500',
      secondary: 'from-blue-100 to-indigo-100',
      accent: 'blue-500'
    },
    gradients: {
      hero: 'from-blue-50 via-indigo-50 to-blue-100',
      card: 'from-blue-50 to-indigo-50'
    }
  },
  trans: {
    title: 'Premium Trans Companions',
    colors: {
      primary: 'from-purple-500 to-violet-500',
      secondary: 'from-purple-100 to-violet-100',
      accent: 'purple-500'
    },
    gradients: {
      hero: 'from-purple-50 via-violet-50 to-purple-100',
      card: 'from-purple-50 to-violet-50'
    }
  }
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category>('female');
  
  const categoryConfig = categoryConfigs[category];

  return (
    <CategoryContext.Provider value={{ category, setCategory, categoryConfig }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}