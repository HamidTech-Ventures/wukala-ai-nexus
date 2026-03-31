import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  DollarSign,
  Briefcase,
  Clock,
  Scale,
  Target,
  Award,
  ArrowRight,
  Calendar,
  Users,
  FileText,
  PieChart,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Download,
  Filter,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ──
interface KPI {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  detail: string;
}

interface RevenueMonth {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  cases: number;
}

interface CaseMetric {
  outcome: string;
  count: number;
  pct: number;
  color: string;
}

interface PracticeArea {
  area: string;
  activeCases: number;
  closedCases: number;
  revenue: string;
  revenueNum: number;
  growth: string;
  winRate: number;
  avgDuration: string;
}

interface BillingTrend {
  month: string;
  billed: number;
  collected: number;
  outstanding: number;
}

interface LawyerPerformance {
  name: string;
  role: string;
  cases: number;
  winRate: number;
  revenue: string;
  satisfaction: number;
  billableHrs: number;
}

// ── Data ──
const kpis: KPI[] = [
  { label: 'Win Rate', value: '73%', change: '+5%', trend: 'up', icon: Award, detail: 'vs 68% last quarter' },
  { label: 'Avg. Case Duration', value: '4.2 mo', change: '-0.8 mo', trend: 'up', icon: Clock, detail: 'Improved efficiency' },
  { label: 'Revenue / Case', value: '₨ 89K', change: '+12%', trend: 'up', icon: DollarSign, detail: 'Up from ₨ 79K' },
  { label: 'Client Retention', value: '91%', change: '+3%', trend: 'up', icon: Target, detail: '42 of 46 clients retained' },
  { label: 'Billable Hours', value: '168 hrs', change: '+8%', trend: 'up', icon: Activity, detail: 'This month target: 180 hrs' },
  { label: 'Collection Rate', value: '87%', change: '-2%', trend: 'down', icon: DollarSign, detail: '₨ 1.2M outstanding' },
];

const monthlyRevenue: RevenueMonth[] = [
  { month: 'Oct', revenue: 2800000, expenses: 980000, profit: 1820000, cases: 8 },
  { month: 'Nov', revenue: 3200000, expenses: 1100000, profit: 2100000, cases: 11 },
  { month: 'Dec', revenue: 2900000, expenses: 950000, profit: 1950000, cases: 7 },
  { month: 'Jan', revenue: 3500000, expenses: 1200000, profit: 2300000, cases: 13 },
  { month: 'Feb', revenue: 3800000, expenses: 1150000, profit: 2650000, cases: 10 },
  { month: 'Mar', revenue: 4200000, expenses: 1400000, profit: 2800000, cases: 14 },
  { month: 'Apr', revenue: 3900000, expenses: 1250000, profit: 2650000, cases: 12 },
  { month: 'May', revenue: 4500000, expenses: 1500000, profit: 3000000, cases: 15 },
];

const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

const caseOutcomes: CaseMetric[] = [
  { outcome: 'Won', count: 32, pct: 73, color: 'bg-success' },
  { outcome: 'Settled', count: 8, pct: 18, color: 'bg-gold' },
  { outcome: 'Lost', count: 4, pct: 9, color: 'bg-destructive' },
];

const casesByType: CaseMetric[] = [
  { outcome: 'Civil', count: 22, pct: 40, color: 'bg-primary' },
  { outcome: 'Criminal', count: 14, pct: 25, color: 'bg-destructive' },
  { outcome: 'Corporate', count: 11, pct: 20, color: 'bg-gold' },
  { outcome: 'Tax/Revenue', count: 8, pct: 15, color: 'bg-success' },
];

const practiceAreas: PracticeArea[] = [
  { area: 'Civil Litigation', activeCases: 18, closedCases: 22, revenue: '₨ 1.6M', revenueNum: 1600000, growth: '+22%', winRate: 78, avgDuration: '3.8 mo' },
  { area: 'Criminal Defense', activeCases: 12, closedCases: 15, revenue: '₨ 1.1M', revenueNum: 1100000, growth: '+8%', winRate: 67, avgDuration: '5.1 mo' },
  { area: 'Corporate Law', activeCases: 9, closedCases: 11, revenue: '₨ 890K', revenueNum: 890000, growth: '+35%', winRate: 82, avgDuration: '2.5 mo' },
  { area: 'Tax & Revenue', activeCases: 8, closedCases: 6, revenue: '₨ 600K', revenueNum: 600000, growth: '+15%', winRate: 71, avgDuration: '4.7 mo' },
  { area: 'Family Law', activeCases: 5, closedCases: 8, revenue: '₨ 380K', revenueNum: 380000, growth: '+10%', winRate: 75, avgDuration: '6.2 mo' },
];

const maxAreaRevenue = Math.max(...practiceAreas.map(p => p.revenueNum));

const billingTrends: BillingTrend[] = [
  { month: 'Oct', billed: 2800000, collected: 2400000, outstanding: 400000 },
  { month: 'Nov', billed: 3200000, collected: 2900000, outstanding: 700000 },
  { month: 'Dec', billed: 2900000, collected: 2500000, outstanding: 1100000 },
  { month: 'Jan', billed: 3500000, collected: 3100000, outstanding: 1500000 },
  { month: 'Feb', billed: 3800000, collected: 3400000, outstanding: 1900000 },
  { month: 'Mar', billed: 4200000, collected: 3700000, outstanding: 2400000 },
];

const maxBilling = Math.max(...billingTrends.map(b => b.billed));

const teamPerformance: LawyerPerformance[] = [
  { name: 'Adv. Ahmed Khan', role: 'Senior Partner', cases: 14, winRate: 79, revenue: '₨ 1.8M', satisfaction: 4.8, billableHrs: 192 },
  { name: 'Adv. Sara Malik', role: 'Associate', cases: 11, winRate: 73, revenue: '₨ 1.2M', satisfaction: 4.6, billableHrs: 178 },
  { name: 'Adv. Usman Ali', role: 'Junior Associate', cases: 9, winRate: 67, revenue: '₨ 650K', satisfaction: 4.4, billableHrs: 165 },
  { name: 'Adv. Fatima Noor', role: 'Associate', cases: 10, winRate: 80, revenue: '₨ 980K', satisfaction: 4.7, billableHrs: 185 },
];

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'cases', label: 'Cases', icon: Scale },
  { id: 'billing', label: 'Billing', icon: FileText },
  { id: 'team', label: 'Team', icon: Users },
];

type TabId = 'overview' | 'revenue' | 'cases' | 'billing' | 'team';

export default function PracticeAnalytics() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [period, setPeriod] = useState('6m');
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-sans text-foreground">Practice Analytics</h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">Performance insights & metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-secondary/50 rounded-lg p-0.5">
            {['1m', '3m', '6m', '1y'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 text-[10px] font-sans font-medium rounded-md transition-colors ${period === p ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="font-sans text-xs h-8 border-border/50 gap-1.5">
            <Download className="h-3 w-3" /> Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={v => { setActiveTab(v as TabId); setSelectedArea(null); }}>
        <TabsList className="bg-secondary/50 h-9 flex-wrap">
          {tabs.map(t => (
            <TabsTrigger key={t.id} value={t.id} className="text-xs font-sans h-7 gap-1.5">
              <t.icon className="h-3 w-3" /> {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'revenue' && <RevenueTab />}
          {activeTab === 'cases' && <CasesTab selectedArea={selectedArea} setSelectedArea={setSelectedArea} />}
          {activeTab === 'billing' && <BillingTab />}
          {activeTab === 'team' && <TeamTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Overview Tab ──
function OverviewTab() {
  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {kpis.map(k => (
          <Card key={k.label} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
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
              <p className="text-[9px] text-muted-foreground/70 font-sans mt-1">{k.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Revenue Chart */}
        <Card className="lg:col-span-3 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-sans flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> Revenue vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1.5 h-44">
              {monthlyRevenue.map(m => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[8px] text-muted-foreground font-sans font-medium">
                    {(m.revenue / 1000000).toFixed(1)}M
                  </span>
                  <div className="w-full flex flex-col gap-0.5">
                    <div
                      className="w-full bg-primary/80 rounded-t-sm transition-all duration-500 hover:bg-primary"
                      style={{ height: `${(m.revenue / maxRevenue) * 100}px` }}
                    />
                    <div
                      className="w-full bg-destructive/30 rounded-b-sm"
                      style={{ height: `${(m.expenses / maxRevenue) * 100}px` }}
                    />
                  </div>
                  <span className="text-[9px] text-muted-foreground font-sans">{m.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-sans">
                <div className="h-2 w-2 rounded-full bg-primary/80" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-sans">
                <div className="h-2 w-2 rounded-full bg-destructive/30" /> Expenses
              </span>
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
            {/* Donut-style ring */}
            <div className="flex items-center justify-center py-2">
              <div className="relative h-28 w-28">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  {caseOutcomes.reduce((acc, o, i) => {
                    const offset = acc;
                    const circumference = 2 * Math.PI * 40;
                    const dash = (o.pct / 100) * circumference;
                    const colors = ['hsl(var(--success))', 'hsl(var(--gold))', 'hsl(var(--destructive))'];
                    return (
                      <>
                        {acc}
                        <circle
                          key={o.outcome}
                          cx="50" cy="50" r="40"
                          fill="none"
                          stroke={colors[i]}
                          strokeWidth="12"
                          strokeDasharray={`${dash} ${circumference - dash}`}
                          strokeDashoffset={`-${typeof offset === 'number' ? offset : 0}`}
                          className="transition-all duration-700"
                        />
                      </>
                    );
                  }, 0 as any)}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-sans text-foreground">73%</span>
                  <span className="text-[9px] text-muted-foreground font-sans">Win Rate</span>
                </div>
              </div>
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

      {/* Quick Practice Areas */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans">Top Practice Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {practiceAreas.slice(0, 4).map(p => (
              <div key={p.area} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/20">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-sans text-foreground">{p.area}</p>
                    <p className="text-[11px] text-muted-foreground font-sans">{p.activeCases} active · {p.winRate}% win rate</p>
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

// ── Revenue Tab ──
function RevenueTab() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalExpenses = monthlyRevenue.reduce((s, m) => s + m.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-5">
      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Revenue', value: `₨ ${(totalRevenue / 1000000).toFixed(1)}M`, icon: DollarSign, sub: 'Last 8 months' },
          { label: 'Total Expenses', value: `₨ ${(totalExpenses / 1000000).toFixed(1)}M`, icon: TrendingDown, sub: `${((totalExpenses / totalRevenue) * 100).toFixed(0)}% of revenue` },
          { label: 'Net Profit', value: `₨ ${(totalProfit / 1000000).toFixed(1)}M`, icon: TrendingUp, sub: `${profitMargin}% margin` },
          { label: 'Avg Monthly', value: `₨ ${(totalRevenue / monthlyRevenue.length / 1000000).toFixed(1)}M`, icon: BarChart3, sub: 'Per month avg' },
        ].map(s => (
          <Card key={s.label} className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="h-7 w-7 rounded-md bg-secondary flex items-center justify-center text-muted-foreground mb-2">
                <s.icon className="h-3.5 w-3.5" />
              </div>
              <p className="text-lg font-bold font-sans text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-sans">{s.label}</p>
              <p className="text-[9px] text-muted-foreground/60 font-sans mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue + Profit Chart */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" /> Revenue, Expenses & Profit Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {monthlyRevenue.map(m => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground font-sans w-8 shrink-0">{m.month}</span>
                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <div className="h-3 bg-primary/80 rounded-sm transition-all duration-500" style={{ width: `${(m.revenue / maxRevenue) * 100}%` }} />
                    <span className="text-[8px] text-muted-foreground font-sans">{(m.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 bg-success/60 rounded-sm transition-all duration-500" style={{ width: `${(m.profit / maxRevenue) * 100}%` }} />
                    <span className="text-[8px] text-muted-foreground font-sans">{(m.profit / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-sans">
              <div className="h-2 w-2 rounded-full bg-primary/80" /> Revenue
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-sans">
              <div className="h-2 w-2 rounded-full bg-success/60" /> Profit
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Practice Area */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans">Revenue by Practice Area</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {practiceAreas.map(p => (
            <div key={p.area} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-foreground font-medium">{p.area}</span>
                <span className="text-muted-foreground">{p.revenue} <span className="text-success">{p.growth}</span></span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary/70 rounded-full transition-all duration-700" style={{ width: `${(p.revenueNum / maxAreaRevenue) * 100}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Cases Tab ──
function CasesTab({ selectedArea, setSelectedArea }: { selectedArea: PracticeArea | null; setSelectedArea: (a: PracticeArea | null) => void }) {
  if (selectedArea) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
        <Button variant="ghost" size="sm" onClick={() => setSelectedArea(null)} className="text-xs font-sans gap-1 text-muted-foreground h-7 px-2">
          ← Back to overview
        </Button>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold font-sans text-foreground">{selectedArea.area}</h3>
                <p className="text-[11px] text-muted-foreground font-sans">Detailed performance breakdown</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Active Cases', value: selectedArea.activeCases },
                { label: 'Closed Cases', value: selectedArea.closedCases },
                { label: 'Win Rate', value: `${selectedArea.winRate}%` },
                { label: 'Avg Duration', value: selectedArea.avgDuration },
                { label: 'Revenue', value: selectedArea.revenue },
                { label: 'Growth', value: selectedArea.growth },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-lg bg-secondary/30 border border-border/20">
                  <p className="text-lg font-bold font-sans text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground font-sans">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Case Outcomes */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-sans flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" /> Case Outcomes (All Time)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-1 h-5 rounded-full overflow-hidden">
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

        {/* Cases by Type */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-sans flex items-center gap-2">
              <PieChart className="h-4 w-4 text-primary" /> Cases by Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-1 h-5 rounded-full overflow-hidden">
              {casesByType.map(c => (
                <div key={c.outcome} className={`h-full ${c.color} transition-all duration-500`} style={{ width: `${c.pct}%` }} />
              ))}
            </div>
            {casesByType.map(c => (
              <div key={c.outcome} className="flex items-center justify-between text-xs font-sans">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <div className={`h-2.5 w-2.5 rounded-full ${c.color}`} />
                  {c.outcome}
                </span>
                <span className="font-medium text-foreground">{c.count} ({c.pct}%)</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Practice Area Drilldown */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans">Practice Area Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {practiceAreas.map(p => (
              <div
                key={p.area}
                onClick={() => setSelectedArea(p)}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/20 cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-sans text-foreground">{p.area}</p>
                    <p className="text-[11px] text-muted-foreground font-sans">{p.activeCases} active · {p.closedCases} closed · {p.winRate}% win</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-sm font-semibold font-sans text-foreground">{p.revenue}</p>
                    <p className="text-[10px] text-success font-sans">{p.growth}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Billing Tab ──
function BillingTab() {
  const totalBilled = billingTrends.reduce((s, b) => s + b.billed, 0);
  const totalCollected = billingTrends.reduce((s, b) => s + b.collected, 0);
  const collectionRate = ((totalCollected / totalBilled) * 100).toFixed(1);

  return (
    <div className="space-y-5">
      {/* Billing Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Billed', value: `₨ ${(totalBilled / 1000000).toFixed(1)}M`, color: 'text-foreground' },
          { label: 'Collected', value: `₨ ${(totalCollected / 1000000).toFixed(1)}M`, color: 'text-success' },
          { label: 'Collection Rate', value: `${collectionRate}%`, color: 'text-primary' },
        ].map(s => (
          <Card key={s.label} className="border-border/50 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className={`text-lg font-bold font-sans ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-sans mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing Trends Chart */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" /> Billing vs Collection Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-40">
            {billingTrends.map(b => (
              <div key={b.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[8px] text-muted-foreground font-sans">{(b.billed / 1000000).toFixed(1)}M</span>
                <div className="w-full flex gap-0.5">
                  <div className="flex-1">
                    <div className="w-full bg-primary/70 rounded-t-sm" style={{ height: `${(b.billed / maxBilling) * 110}px` }} />
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-success/60 rounded-t-sm" style={{ height: `${(b.collected / maxBilling) * 110}px` }} />
                  </div>
                </div>
                <span className="text-[9px] text-muted-foreground font-sans">{b.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-sans">
              <div className="h-2 w-2 rounded-full bg-primary/70" /> Billed
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-sans">
              <div className="h-2 w-2 rounded-full bg-success/60" /> Collected
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Outstanding by Month */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-gold" /> Outstanding Receivables
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {billingTrends.map(b => (
            <div key={b.month} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/20 border border-border/10">
              <span className="text-xs font-sans text-foreground font-medium">{b.month}</span>
              <div className="flex items-center gap-3">
                <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full" style={{ width: `${(b.outstanding / b.billed) * 100}%` }} />
                </div>
                <span className="text-xs font-sans text-muted-foreground w-16 text-right">₨ {(b.outstanding / 1000).toFixed(0)}K</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Team Tab ──
function TeamTab() {
  return (
    <div className="space-y-5">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-sans flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {teamPerformance.map(t => (
            <div key={t.name} className="p-3 rounded-lg bg-secondary/30 border border-border/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold font-sans text-primary">{t.name.split(' ').pop()?.[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium font-sans text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground font-sans">{t.role}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold font-sans text-foreground">{t.revenue}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Cases', value: t.cases },
                  { label: 'Win Rate', value: `${t.winRate}%` },
                  { label: 'Rating', value: `${t.satisfaction}/5` },
                  { label: 'Hours', value: t.billableHrs },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-xs font-semibold font-sans text-foreground">{s.value}</p>
                    <p className="text-[9px] text-muted-foreground font-sans">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Billable hours bar */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-[9px] text-muted-foreground font-sans mb-1">
                  <span>Billable hours utilization</span>
                  <span>{((t.billableHrs / 200) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary/70 rounded-full transition-all duration-500" style={{ width: `${(t.billableHrs / 200) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
