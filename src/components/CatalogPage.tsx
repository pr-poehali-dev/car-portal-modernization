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

interface CatalogPageProps {
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
}

export default function CatalogPage({
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
  onToggleFavorite
}: CatalogPageProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-heading font-bold">Каталог автомобилей</h2>
        <p className="text-muted-foreground">Найдено: {filteredCars.length} авто</p>
      </div>

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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCars.map(car => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={favorites.includes(car.id)}
            onToggleFavorite={onToggleFavorite}
            showDealership
          />
        ))}
      </div>
    </div>
  );
}
