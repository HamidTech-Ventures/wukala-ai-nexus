import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  DollarSign,
  Briefcase,
  Clock,
  Users,
  Scale,
  Target,
  Award,
} from 'lucide-react';

const kpis = [
  { label: 'Win Rate', value: '73%', change: '+5%', trend: 'up', icon: Award },
  { label: 'Avg. Case Duration', value: '4.2 mo', change: '-0.8 mo', trend: 'up', icon: Clock },
  { label: 'Revenue / Case', value: '₨ 89K', change: '+12%', trend: 'up', icon: DollarSign },
  { label: 'Client Satisfaction', value: '4.7/5', change: '+0.2', trend: 'up', icon: Target },
];

const monthlyRevenue = [
  { month: 'Oct', amount: 2800000 },
  { month: 'Nov', amount: 3200000 },
  { month: 'Dec', amount: 2900000 },
  { month: 'Jan', amount: 3500000 },
  { month: 'Feb', amount: 3800000 },
  { month: 'Mar', amount: 4200000 },
];

const maxRevenue = Math.max(...monthlyRevenue.map(m => m.amount));

const caseOutcomes = [
  { outcome: 'Won', count: 32, pct: 73, color: 'bg-success' },
  { outcome: 'Settled', count: 8, pct: 18, color: 'bg-gold' },
  { outcome: 'Lost', count: 4, pct: 9, color: 'bg-destructive' },
];

const practiceAreas = [
  { area: 'Civil Litigation', cases: 18, revenue: '₨ 1.6M', growth: '+22%' },
  { area: 'Criminal Defense', cases: 12, revenue: '₨ 1.1M', growth: '+8%' },
  { area: 'Corporate Law', cases: 9, revenue: '₨ 890K', growth: '+35%' },
  { area: 'Tax & Revenue', cases: 8, revenue: '₨ 600K', growth: '+15%' },
];

export default function PracticeAnalytics() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold font-sans text-foreground">Practice Analytics</h2>
        <p className="text-xs text-muted-foreground font-sans mt-0.5">Performance insights & metrics</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map(k => (
          <Card key={k.label} className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                  <k.icon className="h-4 w-4" />
                </div>
                <Badge variant="outline" className={`text-[10px] font-sans gap-0.5 ${k.trend === 'up' ? 'text-success border-success/20' : 'text-destructive border-destructive/20'}`}>
                  {k.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {k.change}
                </Badge>
              </div>
              <p className="text-lg font-bold font-sans text-foreground">{k.value}</p>
              <p className="text-[10px] text-muted-foreground font-sans mt-0.5">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Revenue Chart */}
        <Card className="lg:col-span-3 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-sans flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {monthlyRevenue.map(m => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-muted-foreground font-sans font-medium">
                    {(m.amount / 1000000).toFixed(1)}M
                  </span>
                  <div className="w-full relative">
                    <div
                      className="w-full bg-primary/80 rounded-t-md transition-all duration-500 hover:bg-primary"
                      style={{ height: `${(m.amount / maxRevenue) * 120}px` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-sans">{m.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Case Outcomes */}
        <Card className="lg:col-span-2 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-sans flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" /> Case Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-1 h-4 rounded-full overflow-hidden">
              {caseOutcomes.map(o => (
                <div key={o.outcome} className={`h-full ${o.color} transition-all duration-500`} style={{ width: `${o.pct}%` }} />
              ))}
            </div>
            {caseOutcomes.map(o => (
              <div key={o.outcome} className="flex items-center justify-between text-xs font-sans">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <div className={`h-2.5 w-2.5 rounded-full ${o.color}`} />
                  {o.outcome}
                </span>
                <span className="font-medium text-foreground">{o.count} ({o.pct}%)</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Practice Areas */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans">Practice Area Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {practiceAreas.map(p => (
              <div key={p.area} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/20">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-sans text-foreground">{p.area}</p>
                    <p className="text-[11px] text-muted-foreground font-sans">{p.cases} active cases</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold font-sans text-foreground">{p.revenue}</p>
                  <p className="text-[10px] text-success font-sans">{p.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
