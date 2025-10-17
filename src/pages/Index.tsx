import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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
    status: 'new'
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
    status: 'used'
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
    status: 'new'
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
    status: 'new'
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Car" size={32} className="text-primary" />
            <h1 className="text-2xl font-heading font-bold">RegHuB</h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <button onClick={() => setActiveTab('home')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}>
              Главная
            </button>
            <button onClick={() => setActiveTab('catalog')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}>
              Каталог
            </button>
            <button onClick={() => setActiveTab('dealerships')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'dealerships' ? 'text-primary' : 'text-muted-foreground'}`}>
              Автосалоны
            </button>
            <button onClick={() => setActiveTab('credit')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'credit' ? 'text-primary' : 'text-muted-foreground'}`}>
              Кредит
            </button>
            <button onClick={() => setActiveTab('favorites')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'favorites' ? 'text-primary' : 'text-muted-foreground'}`}>
              Избранное {favorites.length > 0 && <Badge className="ml-1">{favorites.length}</Badge>}
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
            </Button>
            <Button>
              <Icon name="Phone" size={16} className="mr-2" />
              Контакты
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {activeTab === 'home' && (
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
                  <Button size="lg" variant="secondary" onClick={() => setActiveTab('catalog')}>
                    <Icon name="Search" size={20} className="mr-2" />
                    Каталог авто
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20" onClick={() => setActiveTab('credit')}>
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
              <Card className="p-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Марка</label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите марку" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все марки</SelectItem>
                        {carBrands.map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Регион</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите регион" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все регионы</SelectItem>
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
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-heading font-bold">Популярные автомобили</h3>
                <Button variant="ghost" onClick={() => setActiveTab('catalog')}>
                  Смотреть все
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {filteredCars.slice(0, 4).map(car => (
                  <Card key={car.id} className="group overflow-hidden transition-all hover:shadow-xl animate-scale-in">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={car.image} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                      <Badge className="absolute top-3 right-3" variant={car.status === 'new' ? 'default' : 'secondary'}>
                        {car.status === 'new' ? 'Новый' : 'С пробегом'}
                      </Badge>
                      <button
                        onClick={() => toggleFavorite(car.id)}
                        className="absolute top-3 left-3 rounded-full bg-white/90 p-2 backdrop-blur transition-all hover:bg-white"
                      >
                        <Icon name="Heart" size={18} className={favorites.includes(car.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
                      </button>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-heading">{car.brand} {car.model}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Icon name="MapPin" size={14} />
                        {car.location}
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
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-heading font-bold">Каталог автомобилей</h2>
              <p className="text-muted-foreground">Найдено: {filteredCars.length} авто</p>
            </div>

            <Card className="p-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Марка</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все марки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все марки</SelectItem>
                      {carBrands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Регион</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все регионы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все регионы</SelectItem>
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
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map(car => (
                <Card key={car.id} className="group overflow-hidden transition-all hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={car.image} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                    <Badge className="absolute top-3 right-3" variant={car.status === 'new' ? 'default' : 'secondary'}>
                      {car.status === 'new' ? 'Новый' : 'С пробегом'}
                    </Badge>
                    <button
                      onClick={() => toggleFavorite(car.id)}
                      className="absolute top-3 left-3 rounded-full bg-white/90 p-2 backdrop-blur transition-all hover:bg-white"
                    >
                      <Icon name="Heart" size={18} className={favorites.includes(car.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
                    </button>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-heading">{car.brand} {car.model}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="MapPin" size={14} />
                      {car.location} • {car.dealership}
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
                      <Button className="w-full">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dealerships' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold">Автосалоны по России</h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dealerships.map(dealer => (
                <Card key={dealer.id} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon name="Store" size={32} className="text-primary" />
                    </div>
                    <CardTitle className="font-heading">{dealer.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="MapPin" size={14} />
                      {dealer.region}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Марки в наличии:</p>
                      <div className="flex flex-wrap gap-2">
                        {dealer.brands.map(brand => (
                          <Badge key={brand} variant="secondary">{brand}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 border-t pt-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Phone" size={14} />
                        {dealer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Mail" size={14} />
                        {dealer.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Globe" size={14} />
                        {dealer.website}
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'credit' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold">Калькулятор автокредита</h2>
            
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-6 text-2xl font-heading font-bold">Параметры кредита</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Стоимость автомобиля: {loanAmount.toLocaleString()} ₽
                    </label>
                    <Slider
                      min={500000}
                      max={10000000}
                      step={100000}
                      value={[loanAmount]}
                      onValueChange={(val) => setLoanAmount(val[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Первоначальный взнос: {downPayment.toLocaleString()} ₽ ({Math.round((downPayment / loanAmount) * 100)}%)
                    </label>
                    <Slider
                      min={0}
                      max={loanAmount}
                      step={50000}
                      value={[downPayment]}
                      onValueChange={(val) => setDownPayment(val[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Срок кредита: {loanTerm} мес. ({Math.round(loanTerm / 12)} {loanTerm / 12 === 1 ? 'год' : 'лет'})
                    </label>
                    <Slider
                      min={12}
                      max={84}
                      step={12}
                      value={[loanTerm]}
                      onValueChange={(val) => setLoanTerm(val[0])}
                    />
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Процентная ставка</p>
                    <p className="text-2xl font-heading font-bold">{interestRate}% годовых</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-6 text-2xl font-heading font-bold">Результаты расчета</h3>
                <div className="space-y-6">
                  <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                    <p className="mb-2 text-sm opacity-90">Ежемесячный платёж</p>
                    <p className="text-4xl font-heading font-bold">{loanCalc.monthlyPayment.toLocaleString()} ₽</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <p className="mb-1 text-sm text-muted-foreground">Сумма кредита</p>
                      <p className="text-xl font-heading font-bold">{(loanAmount - downPayment).toLocaleString()} ₽</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="mb-1 text-sm text-muted-foreground">Переплата</p>
                      <p className="text-xl font-heading font-bold text-accent">{loanCalc.overpayment.toLocaleString()} ₽</p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="mb-1 text-sm text-muted-foreground">Общая сумма выплат</p>
                    <p className="text-2xl font-heading font-bold">{loanCalc.totalPayment.toLocaleString()} ₽</p>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-3 font-heading font-semibold">Банки-партнёры</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Сбербанк — от 11.9%</p>
                      <p>• ВТБ — от 12.5%</p>
                      <p>• Газпромбанк — от 12.0%</p>
                      <p>• Тинькофф — от 13.5%</p>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Icon name="FileText" size={20} className="mr-2" />
                    Оставить заявку
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold">Избранное</h2>
            
            {favoriteCars.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2 text-2xl font-heading font-bold">Пока пусто</h3>
                <p className="mb-6 text-muted-foreground">Добавьте автомобили в избранное, чтобы не потерять их</p>
                <Button onClick={() => setActiveTab('catalog')}>
                  Перейти в каталог
                </Button>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favoriteCars.map(car => (
                  <Card key={car.id} className="group overflow-hidden transition-all hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={car.image} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                      <Badge className="absolute top-3 right-3" variant={car.status === 'new' ? 'default' : 'secondary'}>
                        {car.status === 'new' ? 'Новый' : 'С пробегом'}
                      </Badge>
                      <button
                        onClick={() => toggleFavorite(car.id)}
                        className="absolute top-3 left-3 rounded-full bg-white/90 p-2 backdrop-blur transition-all hover:bg-white"
                      >
                        <Icon name="Heart" size={18} className="fill-red-500 text-red-500" />
                      </button>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-heading">{car.brand} {car.model}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Icon name="MapPin" size={14} />
                        {car.location}
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
                        <Button className="w-full">
                          Подробнее
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-20 border-t bg-muted/50">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="Car" size={28} className="text-primary" />
                <h3 className="text-xl font-heading font-bold">RegHuB</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Крупнейший автопортал России по продаже новых и подержанных автомобилей
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-semibold">Разделы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setActiveTab('catalog')} className="hover:text-primary">Каталог</button></li>
                <li><button onClick={() => setActiveTab('dealerships')} className="hover:text-primary">Автосалоны</button></li>
                <li><button onClick={() => setActiveTab('credit')} className="hover:text-primary">Кредит</button></li>
                <li><button onClick={() => setActiveTab('favorites')} className="hover:text-primary">Избранное</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-semibold">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Авто под заказ</a></li>
                <li><a href="#" className="hover:text-primary">Trade-in</a></li>
                <li><a href="#" className="hover:text-primary">Страхование</a></li>
                <li><a href="#" className="hover:text-primary">Сервис</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-semibold">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>ИП Пастухов Н.А.</p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  +7 (916) 769-42-10
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  customstudios.ru@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 RegHuB. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
