import Icon from '@/components/ui/icon';

interface FooterProps {
  onTabChange: (tab: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  return (
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
              <li><button onClick={() => onTabChange('catalog')} className="hover:text-primary">Каталог</button></li>
              <li><button onClick={() => onTabChange('dealerships')} className="hover:text-primary">Автосалоны</button></li>
              <li><button onClick={() => onTabChange('credit')} className="hover:text-primary">Кредит</button></li>
              <li><button onClick={() => onTabChange('favorites')} className="hover:text-primary">Избранное</button></li>
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
  );
}
