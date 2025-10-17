import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import CatalogPage from '@/components/CatalogPage';
import DealershipsPage from '@/components/DealershipsPage';
import CreditPage from '@/components/CreditPage';
import FavoritesPage from '@/components/FavoritesPage';

const carBrands = [
  'Lada', 'Toyota', 'Kia', 'Hyundai', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen',
  'Haval', 'Geely', 'Chery', 'Genesis', 'Nissan', 'Mazda', 'Honda', 'Ford'
];

const regions = [
  'Москва', 'Санкт-Петербург', 'Московская область', 'Краснодарский край',
  'Новосибирская область', 'Екатеринбург', 'Казань', 'Нижний Новгород'
];

const carCatalog = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    price: 3200000,
    year: 2024,
    mileage: 0,
    image: 'https://cdn.poehali.dev/projects/cf958802-3b4b-4ad6-897e-d55d7cf2ff41/files/e928c817-8f49-4610-b1ac-180f61dca4dd.jpg',
    location: 'Москва',
    dealership: 'ТойотаЦентр Москва',
    status: 'new' as const
  },
  {
    id: 2,
    brand: 'BMW',
    model: 'X5',
    price: 6500000,
    year: 2023,
    mileage: 15000,
    image: 'https://cdn.poehali.dev/projects/cf958802-3b4b-4ad6-897e-d55d7cf2ff41/files/bfda7477-a262-4ed7-b104-d67ace8bcea8.jpg',
    location: 'Санкт-Петербург',
    dealership: 'БМВ Премиум',
    status: 'used' as const
  },
  {
    id: 3,
    brand: 'Lada',
    model: 'Vesta',
    price: 1450000,
    year: 2024,
    mileage: 0,
    image: 'https://cdn.poehali.dev/projects/cf958802-3b4b-4ad6-897e-d55d7cf2ff41/files/e928c817-8f49-4610-b1ac-180f61dca4dd.jpg',
    location: 'Екатеринбург',
    dealership: 'АвтоВАЗ Урал',
    status: 'new' as const
  },
  {
    id: 4,
    brand: 'Hyundai',
    model: 'Tucson',
    price: 2800000,
    year: 2024,
    mileage: 0,
    image: 'https://cdn.poehali.dev/projects/cf958802-3b4b-4ad6-897e-d55d7cf2ff41/files/e928c817-8f49-4610-b1ac-180f61dca4dd.jpg',
    location: 'Казань',
    dealership: 'Хендэ Центр',
    status: 'new' as const
  }
];

const dealerships = [
  {
    id: 1,
    name: 'ТойотаЦентр Москва',
    region: 'Москва',
    brands: ['Toyota', 'Lexus'],
    phone: '+7 (495) 123-45-67',
    email: 'info@toyotacenter.ru',
    website: 'toyotacenter.ru'
  },
  {
    id: 2,
    name: 'БМВ Премиум',
    region: 'Санкт-Петербург',
    brands: ['BMW', 'Mini'],
    phone: '+7 (812) 987-65-43',
    email: 'sales@bmw-spb.ru',
    website: 'bmw-premium.ru'
  },
  {
    id: 3,
    name: 'АвтоВАЗ Урал',
    region: 'Екатеринбург',
    brands: ['Lada'],
    phone: '+7 (343) 555-12-34',
    email: 'info@lada-ural.ru',
    website: 'lada-ekb.ru'
  }
];

export default function Index() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [downPayment, setDownPayment] = useState(600000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate] = useState(12.5);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleFavorite = (carId: number) => {
    setFavorites(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  const calculateLoan = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const overpayment = totalPayment - principal;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      overpayment: Math.round(overpayment)
    };
  };

  const loanCalc = calculateLoan();

  const filteredCars = carCatalog.filter(car => {
    const brandMatch = !selectedBrand || car.brand === selectedBrand;
    const regionMatch = !selectedRegion || car.location === selectedRegion;
    const priceMatch = car.price >= priceRange[0] && car.price <= priceRange[1];
    return brandMatch && regionMatch && priceMatch;
  });

  const favoriteCars = carCatalog.filter(car => favorites.includes(car.id));

  return (
    <div className="min-h-screen bg-background">
      <Header
        theme={theme}
        activeTab={activeTab}
        favoritesCount={favorites.length}
        onTabChange={setActiveTab}
        onThemeToggle={toggleTheme}
      />

      <main className="container py-8">
        {activeTab === 'home' && (
          <HomePage
            selectedBrand={selectedBrand}
            selectedRegion={selectedRegion}
            priceRange={priceRange}
            onBrandChange={setSelectedBrand}
            onRegionChange={setSelectedRegion}
            onPriceRangeChange={setPriceRange}
            carBrands={carBrands}
            regions={regions}
            filteredCars={filteredCars}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onTabChange={setActiveTab}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogPage
            selectedBrand={selectedBrand}
            selectedRegion={selectedRegion}
            priceRange={priceRange}
            onBrandChange={setSelectedBrand}
            onRegionChange={setSelectedRegion}
            onPriceRangeChange={setPriceRange}
            carBrands={carBrands}
            regions={regions}
            filteredCars={filteredCars}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'dealerships' && (
          <DealershipsPage dealerships={dealerships} />
        )}

        {activeTab === 'credit' && (
          <CreditPage
            loanAmount={loanAmount}
            downPayment={downPayment}
            loanTerm={loanTerm}
            interestRate={interestRate}
            onLoanAmountChange={setLoanAmount}
            onDownPaymentChange={setDownPayment}
            onLoanTermChange={setLoanTerm}
            monthlyPayment={loanCalc.monthlyPayment}
            totalPayment={loanCalc.totalPayment}
            overpayment={loanCalc.overpayment}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesPage
            favoriteCars={favoriteCars}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onTabChange={setActiveTab}
          />
        )}
      </main>

      <Footer onTabChange={setActiveTab} />
    </div>
  );
}
