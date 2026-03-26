import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  Phone,
  Mail,
  MoreVertical,
  Star,
  MapPin,
  Briefcase,
  MessageSquare,
} from 'lucide-react';

const clients = [
  { id: 1, name: 'Khan Industries Ltd.', contact: 'Imran Khan', email: 'imran@khanindustries.pk', phone: '+92 300 1234567', city: 'Lahore', activeCases: 3, totalBilled: '₨ 2.4M', status: 'Active', vip: true },
  { id: 2, name: 'Fatima Enterprises', contact: 'Fatima Bibi', email: 'fatima@fatimaent.pk', phone: '+92 321 9876543', city: 'Karachi', activeCases: 1, totalBilled: '₨ 890K', status: 'Active', vip: false },
  { id: 3, name: 'Ali Raza (Individual)', contact: 'Ali Raza', email: 'ali.raza@gmail.com', phone: '+92 333 4567890', city: 'Islamabad', activeCases: 1, totalBilled: '₨ 450K', status: 'Active', vip: false },
  { id: 4, name: 'Noor Enterprises', contact: 'Ahmed Noor', email: 'ahmed@noorent.pk', phone: '+92 312 3456789', city: 'Karachi', activeCases: 1, totalBilled: '₨ 1.1M', status: 'Active', vip: true },
  { id: 5, name: 'Pakistan Workers Union', contact: 'Rashid Mehmood', email: 'rashid@pwu.org.pk', phone: '+92 345 6789012', city: 'Faisalabad', activeCases: 1, totalBilled: '₨ 320K', status: 'Active', vip: false },
  { id: 6, name: 'Islamabad Realty Corp.', contact: 'Shahid Ali', email: 'shahid@isbrealty.pk', phone: '+92 302 1234567', city: 'Islamabad', activeCases: 1, totalBilled: '₨ 1.8M', status: 'Inactive', vip: true },
];

export default function ClientCRM() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.contact.toLowerCase().includes(searchQuery.toLowerCase());
    if (tab === 'all') return matchSearch;
    if (tab === 'vip') return matchSearch && c.vip;
    return matchSearch && c.status.toLowerCase() === tab;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-sans text-foreground">Client CRM</h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">{clients.length} clients · {clients.filter(c => c.vip).length} VIP</p>
        </div>
        <Button size="sm" className="bg-gradient-primary font-sans text-xs gap-1.5 h-9">
          <Plus className="h-3.5 w-3.5" /> Add Client
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9 text-sm font-sans bg-card border-border/50" />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-secondary/50 h-9">
          <TabsTrigger value="all" className="text-xs font-sans h-7">All</TabsTrigger>
          <TabsTrigger value="active" className="text-xs font-sans h-7">Active</TabsTrigger>
          <TabsTrigger value="vip" className="text-xs font-sans h-7">VIP</TabsTrigger>
          <TabsTrigger value="inactive" className="text-xs font-sans h-7">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(client => (
          <Card key={client.id} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-border">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold font-sans">
                      {client.contact.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold font-sans text-foreground">{client.name}</p>
                      {client.vip && <Star className="h-3 w-3 text-gold fill-gold" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground font-sans">{client.contact}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="space-y-2 text-[11px] font-sans text-muted-foreground">
                <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{client.email}</div>
                <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{client.phone}</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{client.city}</div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                <div className="flex items-center gap-3 text-[11px] font-sans">
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{client.activeCases} cases</span>
                  <span className="font-semibold text-foreground">{client.totalBilled}</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Phone className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><MessageSquare className="h-3 w-3" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
