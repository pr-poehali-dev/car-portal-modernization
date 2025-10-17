import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import CarCard from './CarCard';

interface Car {
  id: number;
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  image: string;
  location: string;
  dealership: string;
  status: 'new' | 'used';
}

interface FavoritesPageProps {
  favoriteCars: Car[];
  favorites: number[];
  onToggleFavorite: (carId: number) => void;
  onTabChange: (tab: string) => void;
}

export default function FavoritesPage({ favoriteCars, favorites, onToggleFavorite, onTabChange }: FavoritesPageProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-4xl font-heading font-bold">Избранное</h2>
      
      {favoriteCars.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="mb-2 text-2xl font-heading font-bold">Пока пусто</h3>
          <p className="mb-6 text-muted-foreground">Добавьте автомобили в избранное, чтобы не потерять их</p>
          <Button onClick={() => onTabChange('catalog')}>
            Перейти в каталог
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={favorites.includes(car.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
