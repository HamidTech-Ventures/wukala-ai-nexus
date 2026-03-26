import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Calendar,
  FileText,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Gavel,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';

const notifications = [
  { id: 1, title: 'Filing deadline approaching', desc: 'Reply due for Khan Industries v. FBR - 2 hours remaining', type: 'urgent', icon: AlertTriangle, time: '10 min ago', read: false },
  { id: 2, title: 'Hearing scheduled', desc: 'State v. Ali Raza - Sessions Court, Tomorrow 11:30 AM', type: 'hearing', icon: Gavel, time: '30 min ago', read: false },
  { id: 3, title: 'Payment received', desc: '₨ 450,000 from Khan Industries Ltd. - Invoice #INV-2024-034', type: 'payment', icon: DollarSign, time: '1 hour ago', read: false },
  { id: 4, title: 'Document signed', desc: 'Sale Agreement signed by Islamabad Realty Corp.', type: 'document', icon: FileText, time: '2 hours ago', read: true },
  { id: 5, title: 'Client meeting reminder', desc: 'Fatima Enterprises - Today at 3:00 PM', type: 'reminder', icon: Calendar, time: '3 hours ago', read: true },
  { id: 6, title: 'New client inquiry', desc: 'Corporate matter consultation request from Apex Group', type: 'client', icon: Users, time: '5 hours ago', read: true },
  { id: 7, title: 'Case update', desc: 'Noor Enterprises - Discovery documents submitted by opposing counsel', type: 'case', icon: Gavel, time: 'Yesterday', read: true },
  { id: 8, title: 'Invoice overdue', desc: 'Fatima Enterprises - ₨ 175,000 past due by 5 days', type: 'urgent', icon: AlertTriangle, time: 'Yesterday', read: true },
];

const typeColor: Record<string, string> = {
  urgent: 'bg-destructive/10 text-destructive',
  hearing: 'bg-gold/10 text-gold',
  payment: 'bg-success/10 text-success',
  document: 'bg-primary/10 text-primary',
  reminder: 'bg-gold/10 text-gold',
  client: 'bg-primary/10 text-primary',
  case: 'bg-muted-foreground/10 text-muted-foreground',
};

export default function SmartNotifications() {
  const [tab, setTab] = useState('all');
  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    if (tab === 'all') return true;
    if (tab === 'unread') return !n.read;
    return n.type === tab;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-sans text-foreground">Smart Notifications</h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">{unreadCount} unread notifications</p>
        </div>
        <Button variant="outline" size="sm" className="font-sans text-xs h-8 border-border/50">
          Mark all as read
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-secondary/50 h-9 flex-wrap">
          <TabsTrigger value="all" className="text-xs font-sans h-7">All</TabsTrigger>
          <TabsTrigger value="unread" className="text-xs font-sans h-7">Unread</TabsTrigger>
          <TabsTrigger value="urgent" className="text-xs font-sans h-7">Urgent</TabsTrigger>
          <TabsTrigger value="hearing" className="text-xs font-sans h-7">Hearings</TabsTrigger>
          <TabsTrigger value="payment" className="text-xs font-sans h-7">Payments</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {filtered.map(n => (
          <Card key={n.id} className={`border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${!n.read ? 'border-l-2 border-l-primary bg-primary/[0.02]' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${typeColor[n.type]}`}>
                  <n.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-sm font-sans ${!n.read ? 'font-semibold text-foreground' : 'font-medium text-foreground/80'}`}>{n.title}</p>
                      <p className="text-[11px] text-muted-foreground font-sans mt-0.5 line-clamp-2">{n.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-muted-foreground font-sans whitespace-nowrap">{n.time}</span>
                      {!n.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
