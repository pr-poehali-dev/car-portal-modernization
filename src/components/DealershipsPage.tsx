import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Dealership {
  id: number;
  name: string;
  region: string;
  brands: string[];
  phone: string;
  email: string;
  website: string;
}

interface DealershipsPageProps {
  dealerships: Dealership[];
}

export default function DealershipsPage({ dealerships }: DealershipsPageProps) {
  return (
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
  );
}
