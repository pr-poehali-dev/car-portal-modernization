import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import SearchFilters from './SearchFilters';
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

interface HomePageProps {
  selectedBrand: string;
  selectedRegion: string;
  priceRange: number[];
  onBrandChange: (brand: string) => void;
  onRegionChange: (region: string) => void;
  onPriceRangeChange: (range: number[]) => void;
  carBrands: string[];
  regions: string[];
  filteredCars: Car[];
  favorites: number[];
  onToggleFavorite: (carId: number) => void;
  onTabChange: (tab: string) => void;
}

export default function HomePage({
  selectedBrand,
  selectedRegion,
  priceRange,
  onBrandChange,
  onRegionChange,
  onPriceRangeChange,
  carBrands,
  regions,
  filteredCars,
  favorites,
  onToggleFavorite,
  onTabChange
}: HomePageProps) {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-12 text-primary-foreground animate-fade-in">
        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="text-5xl font-heading font-bold leading-tight">
            Найдите автомобиль вашей мечты
          </h2>
          <p className="text-xl opacity-90">
            Крупнейший автопортал России с тысячами предложений по всем регионам
          </p>
          <div className="flex gap-4">
            <Button size="lg" variant="secondary" onClick={() => onTabChange('catalog')}>
              <Icon name="Search" size={20} className="mr-2" />
              Каталог авто
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20" onClick={() => onTabChange('credit')}>
              <Icon name="Calculator" size={20} className="mr-2" />
              Рассчитать кредит
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <img src="https://cdn.poehali.dev/projects/cf958802-3b4b-4ad6-897e-d55d7cf2ff41/files/bfda7477-a262-4ed7-b104-d67ace8bcea8.jpg" alt="Hero" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-3xl font-heading font-bold">Быстрый поиск</h3>
        <SearchFilters
          selectedBrand={selectedBrand}
          selectedRegion={selectedRegion}
          priceRange={priceRange}
          onBrandChange={onBrandChange}
          onRegionChange={onRegionChange}
          onPriceRangeChange={onPriceRangeChange}
          carBrands={carBrands}
          regions={regions}
        />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-heading font-bold">Популярные автомобили</h3>
          <Button variant="ghost" onClick={() => onTabChange('catalog')}>
            Смотреть все
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredCars.slice(0, 4).map(car => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={favorites.includes(car.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
