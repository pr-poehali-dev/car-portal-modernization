import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface CreditPageProps {
  loanAmount: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  onLoanAmountChange: (value: number) => void;
  onDownPaymentChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
  monthlyPayment: number;
  totalPayment: number;
  overpayment: number;
}

export default function CreditPage({
  loanAmount,
  downPayment,
  loanTerm,
  interestRate,
  onLoanAmountChange,
  onDownPaymentChange,
  onLoanTermChange,
  monthlyPayment,
  totalPayment,
  overpayment
}: CreditPageProps) {
  return (
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
                onValueChange={(val) => onLoanAmountChange(val[0])}
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
                onValueChange={(val) => onDownPaymentChange(val[0])}
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
                onValueChange={(val) => onLoanTermChange(val[0])}
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
              <p className="text-4xl font-heading font-bold">{monthlyPayment.toLocaleString()} ₽</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <p className="mb-1 text-sm text-muted-foreground">Сумма кредита</p>
                <p className="text-xl font-heading font-bold">{(loanAmount - downPayment).toLocaleString()} ₽</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="mb-1 text-sm text-muted-foreground">Переплата</p>
                <p className="text-xl font-heading font-bold text-accent">{overpayment.toLocaleString()} ₽</p>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <p className="mb-1 text-sm text-muted-foreground">Общая сумма выплат</p>
              <p className="text-2xl font-heading font-bold">{totalPayment.toLocaleString()} ₽</p>
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
  );
}
