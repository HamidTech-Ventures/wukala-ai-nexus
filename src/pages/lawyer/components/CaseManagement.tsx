import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Briefcase,
  Calendar,
  User,
  MapPin,
  Clock,
  ArrowUpDown,
} from 'lucide-react';

const cases = [
  { id: 'CS-2024-001', title: 'Khan Industries v. Federal Board of Revenue', client: 'Khan Industries Ltd.', court: 'Lahore High Court', judge: 'Justice Malik Shahzad', type: 'Tax', status: 'Active', priority: 'High', nextHearing: '2024-03-15', stage: 'Arguments' },
  { id: 'CS-2024-002', title: 'State v. Ali Raza', client: 'Ali Raza (Defendant)', court: 'Sessions Court, Islamabad', judge: 'Judge Farooq Ahmed', type: 'Criminal', status: 'Active', priority: 'Critical', nextHearing: '2024-03-12', stage: 'Evidence' },
  { id: 'CS-2024-003', title: 'Noor Enterprises Partnership Dispute', client: 'Noor Enterprises', court: 'Civil Court, Karachi', judge: 'Justice Aisha Siddiqui', type: 'Civil', status: 'Discovery', priority: 'Medium', nextHearing: '2024-03-20', stage: 'Discovery' },
  { id: 'CS-2024-004', title: 'Islamabad Realty Property Dispute', client: 'Islamabad Realty Corp.', court: 'Supreme Court of Pakistan', judge: 'CJ Qazi Faez Isa', type: 'Property', status: 'Pending', priority: 'High', nextHearing: '2024-04-01', stage: 'Appeal' },
  { id: 'CS-2024-005', title: 'Fatima Enterprises v. National Bank', client: 'Fatima Enterprises', court: 'Banking Court, Lahore', judge: 'Judge Rizwan Ul Haq', type: 'Banking', status: 'Active', priority: 'Medium', nextHearing: '2024-03-18', stage: 'Hearing' },
  { id: 'CS-2024-006', title: 'Workers Union Collective Bargaining', client: 'Pakistan Workers Union', court: 'Labour Court, Faisalabad', judge: 'Judge Tariq Mehmood', type: 'Labour', status: 'Negotiation', priority: 'Low', nextHearing: '2024-03-25', stage: 'Mediation' },
];

const statusColor: Record<string, string> = {
  Active: 'bg-success/10 text-success border-success/20',
  Pending: 'bg-gold/10 text-gold border-gold/20',
  Discovery: 'bg-primary/10 text-primary border-primary/20',
  Negotiation: 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20',
};

const priorityColor: Record<string, string> = {
  Critical: 'bg-destructive/10 text-destructive border-destructive/20',
  High: 'bg-gold/10 text-gold border-gold/20',
  Medium: 'bg-primary/10 text-primary border-primary/20',
  Low: 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20',
};

export default function CaseManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredCases = cases.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.client.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchSearch;
    return matchSearch && c.status.toLowerCase() === activeTab;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-sans text-foreground">Case Management</h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">{cases.length} total cases · {cases.filter(c => c.status === 'Active').length} active</p>
        </div>
        <Button size="sm" className="bg-gradient-primary font-sans text-xs gap-1.5 h-9">
          <Plus className="h-3.5 w-3.5" /> New Case
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases, clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm font-sans bg-card border-border/50"
          />
        </div>
        <Button variant="outline" size="sm" className="h-9 font-sans text-xs gap-1.5 border-border/50">
          <Filter className="h-3.5 w-3.5" /> Filters
        </Button>
        <Button variant="outline" size="sm" className="h-9 font-sans text-xs gap-1.5 border-border/50">
          <ArrowUpDown className="h-3.5 w-3.5" /> Sort
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary/50 h-9">
          <TabsTrigger value="all" className="text-xs font-sans h-7">All Cases</TabsTrigger>
          <TabsTrigger value="active" className="text-xs font-sans h-7">Active</TabsTrigger>
          <TabsTrigger value="pending" className="text-xs font-sans h-7">Pending</TabsTrigger>
          <TabsTrigger value="discovery" className="text-xs font-sans h-7">Discovery</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Cases List */}
      <div className="space-y-3">
        {filteredCases.map((c) => (
          <Card key={c.id} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Briefcase className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold font-sans text-foreground truncate">{c.title}</p>
                      <span className="text-[10px] text-muted-foreground font-mono">{c.id}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[11px] text-muted-foreground font-sans">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{c.client}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.court}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Next: {c.nextHearing}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={`text-[10px] font-sans ${priorityColor[c.priority]}`}>{c.priority}</Badge>
                  <Badge variant="outline" className={`text-[10px] font-sans ${statusColor[c.status]}`}>{c.status}</Badge>
                  <Badge variant="secondary" className="text-[10px] font-sans">{c.stage}</Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
