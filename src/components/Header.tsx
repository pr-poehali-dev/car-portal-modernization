import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  theme: 'light' | 'dark';
  activeTab: string;
  favoritesCount: number;
  onTabChange: (tab: string) => void;
  onThemeToggle: () => void;
}

export default function Header({ theme, activeTab, favoritesCount, onTabChange, onThemeToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Car" size={32} className="text-primary" />
          <h1 className="text-2xl font-heading font-bold">RegHuB</h1>
        </div>
        
        <nav className="hidden md:flex gap-6">
          <button onClick={() => onTabChange('home')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}>
            Главная
          </button>
          <button onClick={() => onTabChange('catalog')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}>
            Каталог
          </button>
          <button onClick={() => onTabChange('dealerships')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'dealerships' ? 'text-primary' : 'text-muted-foreground'}`}>
            Автосалоны
          </button>
          <button onClick={() => onTabChange('credit')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'credit' ? 'text-primary' : 'text-muted-foreground'}`}>
            Кредит
          </button>
          <button onClick={() => onTabChange('favorites')} className={`font-medium transition-colors hover:text-primary ${activeTab === 'favorites' ? 'text-primary' : 'text-muted-foreground'}`}>
            Избранное {favoritesCount > 0 && <Badge className="ml-1">{favoritesCount}</Badge>}
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onThemeToggle}>
            <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
          </Button>
          <Button>
            <Icon name="Phone" size={16} className="mr-2" />
            Контакты
          </Button>
        </div>
      </div>
    </header>
  );
}
