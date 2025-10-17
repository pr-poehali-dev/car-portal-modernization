import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (carId: number) => void;
  showDealership?: boolean;
}

export default function CarCard({ car, isFavorite, onToggleFavorite, showDealership = false }: CarCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl animate-scale-in">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={car.image} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
        <Badge className="absolute top-3 right-3" variant={car.status === 'new' ? 'default' : 'secondary'}>
          {car.status === 'new' ? 'Новый' : 'С пробегом'}
        </Badge>
        <button
          onClick={() => onToggleFavorite(car.id)}
          className="absolute top-3 left-3 rounded-full bg-white/90 p-2 backdrop-blur transition-all hover:bg-white"
        >
          <Icon name="Heart" size={18} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
        </button>
      </div>
      <CardHeader>
        <CardTitle className="font-heading">{car.brand} {car.model}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Icon name="MapPin" size={14} />
          {car.location}{showDealership && ` • ${car.dealership}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{car.year} год</span>
            <span>{car.mileage.toLocaleString()} км</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-heading font-bold text-primary">
              {car.price.toLocaleString()} ₽
            </span>
          </div>
          <Button className="w-full" variant="outline">
            Подробнее
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
