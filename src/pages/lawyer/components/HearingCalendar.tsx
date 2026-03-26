import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Gavel,
  User,
} from 'lucide-react';

const hearings = [
  { id: 1, case: 'Khan Industries v. FBR', court: 'Lahore High Court', courtroom: 'Court 3', time: '10:00 AM', date: 'Today', judge: 'Justice Malik Shahzad', type: 'Arguments', priority: 'high' },
  { id: 2, case: 'State v. Ali Raza', court: 'Sessions Court, ISB', courtroom: 'Court 7', time: '11:30 AM', date: 'Today', judge: 'Judge Farooq Ahmed', type: 'Evidence', priority: 'critical' },
  { id: 3, case: 'Fatima Enterprises v. NBP', court: 'Banking Court, LHR', courtroom: 'Court 1', time: '2:00 PM', date: 'Tomorrow', judge: 'Judge Rizwan Ul Haq', type: 'Hearing', priority: 'medium' },
  { id: 4, case: 'Noor Enterprises Dispute', court: 'Civil Court, KHI', courtroom: 'Court 12', time: '9:30 AM', date: 'Mar 20', judge: 'Justice Aisha Siddiqui', type: 'Discovery', priority: 'medium' },
  { id: 5, case: 'Workers Union CBE', court: 'Labour Court, FSD', courtroom: 'Court 2', time: '11:00 AM', date: 'Mar 25', judge: 'Judge Tariq Mehmood', type: 'Mediation', priority: 'low' },
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

export default function HearingCalendar() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-sans text-foreground">Hearing Calendar</h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">{hearings.length} upcoming hearings</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-secondary/50 rounded-lg p-0.5">
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="text-xs font-sans h-7 px-3"
              onClick={() => setView('list')}
            >
              List
            </Button>
            <Button
              variant={view === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              className="text-xs font-sans h-7 px-3"
              onClick={() => setView('calendar')}
            >
              Calendar
            </Button>
          </div>
          <Button size="sm" className="bg-gradient-primary font-sans text-xs gap-1.5 h-9">
            <Plus className="h-3.5 w-3.5" /> Add Hearing
          </Button>
        </div>
      </div>

      {view === 'calendar' && (
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
              <h3 className="text-sm font-semibold font-sans">{currentMonth}</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {daysOfWeek.map(d => (
                <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-2 font-sans">{d}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 3; // offset for month start
                const isToday = day === new Date().getDate();
                const hasHearing = [12, 13, 15, 18, 20, 25].includes(day);
                return (
                  <div
                    key={i}
                    className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs font-sans cursor-pointer transition-colors ${
                      day < 1 || day > 31 ? 'text-muted-foreground/30' : isToday ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    <span>{day > 0 && day <= 31 ? day : ''}</span>
                    {hasHearing && day > 0 && day <= 31 && !isToday && (
                      <div className="h-1 w-1 rounded-full bg-gold mt-0.5" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hearings List */}
      <div className="space-y-3">
        {['Today', 'Tomorrow', 'This Week'].map(group => {
          const groupHearings = hearings.filter(h => {
            if (group === 'Today') return h.date === 'Today';
            if (group === 'Tomorrow') return h.date === 'Tomorrow';
            return h.date !== 'Today' && h.date !== 'Tomorrow';
          });
          if (groupHearings.length === 0) return null;
          return (
            <div key={group}>
              <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wider mb-2">{group}</h3>
              <div className="space-y-2">
                {groupHearings.map(h => (
                  <Card key={h.id} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                          h.priority === 'critical' ? 'bg-destructive/10' : h.priority === 'high' ? 'bg-gold/10' : 'bg-secondary'
                        }`}>
                          <Gavel className={`h-4 w-4 ${
                            h.priority === 'critical' ? 'text-destructive' : h.priority === 'high' ? 'text-gold' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold font-sans text-foreground truncate">{h.case}</p>
                            <Badge variant="outline" className="text-[10px] font-sans shrink-0">{h.type}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] text-muted-foreground font-sans">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{h.time}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{h.court} · {h.courtroom}</span>
                            <span className="flex items-center gap-1"><User className="h-3 w-3" />{h.judge}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
