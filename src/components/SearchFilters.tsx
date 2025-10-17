import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface SearchFiltersProps {
  selectedBrand: string;
  selectedRegion: string;
  priceRange: number[];
  onBrandChange: (brand: string) => void;
  onRegionChange: (region: string) => void;
  onPriceRangeChange: (range: number[]) => void;
  carBrands: string[];
  regions: string[];
}

export default function SearchFilters({
  selectedBrand,
  selectedRegion,
  priceRange,
  onBrandChange,
  onRegionChange,
  onPriceRangeChange,
  carBrands,
  regions
}: SearchFiltersProps) {
  return (
    <Card className="p-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Марка</label>
          <Select value={selectedBrand} onValueChange={onBrandChange}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите марку" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все марки</SelectItem>
              {carBrands.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Регион</label>
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите регион" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все регионы</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">
            Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
          </label>
          <Slider
            min={0}
            max={10000000}
            step={100000}
            value={priceRange}
            onValueChange={onPriceRangeChange}
            className="mt-2"
          />
        </div>
      </div>
    </Card>
  );
}