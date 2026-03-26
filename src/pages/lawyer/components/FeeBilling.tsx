import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DollarSign,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Receipt,
  ArrowUpRight,
  Download,
} from 'lucide-react';
import { useState } from 'react';

const invoices = [
  { id: 'INV-2024-034', client: 'Khan Industries Ltd.', amount: '₨ 450,000', date: 'Mar 10, 2024', due: 'Mar 25, 2024', status: 'Paid' },
  { id: 'INV-2024-033', client: 'Noor Enterprises', amount: '₨ 280,000', date: 'Mar 8, 2024', due: 'Mar 23, 2024', status: 'Pending' },
  { id: 'INV-2024-032', client: 'Fatima Enterprises', amount: '₨ 175,000', date: 'Mar 5, 2024', due: 'Mar 20, 2024', status: 'Overdue' },
  { id: 'INV-2024-031', client: 'Islamabad Realty Corp.', amount: '₨ 520,000', date: 'Mar 1, 2024', due: 'Mar 15, 2024', status: 'Paid' },
  { id: 'INV-2024-030', client: 'Pakistan Workers Union', amount: '₨ 95,000', date: 'Feb 28, 2024', due: 'Mar 14, 2024', status: 'Paid' },
];

const statusStyle: Record<string, string> = {
  Paid: 'bg-success/10 text-success border-success/20',
  Pending: 'bg-gold/10 text-gold border-gold/20',
  Overdue: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusIcon: Record<string, typeof CheckCircle2> = {
  Paid: CheckCircle2,
  Pending: Clock,
  Overdue: AlertCircle,
};

export default function FeeBilling() {
  const [tab, setTab] = useState('all');

  const filtered = invoices.filter(i => tab === 'all' || i.status.toLowerCase() === tab);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-sans text-foreground">Fee & Billing</h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">Invoices, payments & revenue tracking</p>
        </div>
        <Button size="sm" className="bg-gradient-primary font-sans text-xs gap-1.5 h-9">
          <Plus className="h-3.5 w-3.5" /> Create Invoice
        </Button>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Revenue', value: '₨ 4.2M', sub: 'This month', icon: DollarSign, color: 'text-success' },
          { label: 'Outstanding', value: '₨ 455K', sub: '2 invoices', icon: Clock, color: 'text-gold' },
          { label: 'Overdue', value: '₨ 175K', sub: '1 invoice', icon: AlertCircle, color: 'text-destructive' },
          { label: 'Growth', value: '+18%', sub: 'vs last month', icon: TrendingUp, color: 'text-primary' },
        ].map(s => (
          <Card key={s.label} className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`h-8 w-8 rounded-lg bg-secondary flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-lg font-bold font-sans text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-sans mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-secondary/50 h-9">
          <TabsTrigger value="all" className="text-xs font-sans h-7">All</TabsTrigger>
          <TabsTrigger value="paid" className="text-xs font-sans h-7">Paid</TabsTrigger>
          <TabsTrigger value="pending" className="text-xs font-sans h-7">Pending</TabsTrigger>
          <TabsTrigger value="overdue" className="text-xs font-sans h-7">Overdue</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Invoices */}
      <div className="space-y-2">
        {filtered.map(inv => {
          const Icon = statusIcon[inv.status];
          return (
            <Card key={inv.id} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Receipt className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold font-sans text-foreground">{inv.client}</p>
                        <span className="text-[10px] text-muted-foreground font-mono">{inv.id}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground font-sans">
                        <span>Issued: {inv.date}</span>
                        <span>·</span>
                        <span>Due: {inv.due}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="text-sm font-bold font-sans text-foreground">{inv.amount}</p>
                    <Badge variant="outline" className={`text-[10px] font-sans gap-1 ${statusStyle[inv.status]}`}>
                      <Icon className="h-3 w-3" />{inv.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
