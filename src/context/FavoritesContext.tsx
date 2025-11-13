import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === item.id);
      let newFavorites;
      
      if (isAlreadyFavorite) {
        newFavorites = prevFavorites.filter(fav => fav.id !== item.id);
      } else {
        newFavorites = [...prevFavorites, item];
      }
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  const removeFavorite = (id: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.filter(fav => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        removeFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}