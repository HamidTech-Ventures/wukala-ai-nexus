import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Briefcase,
  Clock,
  Star,
} from 'lucide-react';

const teamMembers = [
  { id: 1, name: 'Adv. Sara Malik', role: 'Senior Associate', email: 'sara@lawfirm.pk', phone: '+92 300 111 2233', activeCases: 8, utilization: 85, status: 'Available', specialization: 'Corporate Law' },
  { id: 2, name: 'Adv. Hassan Raza', role: 'Associate', email: 'hassan@lawfirm.pk', phone: '+92 321 444 5566', activeCases: 6, utilization: 72, status: 'In Court', specialization: 'Criminal Law' },
  { id: 3, name: 'Adv. Ayesha Khan', role: 'Junior Associate', email: 'ayesha@lawfirm.pk', phone: '+92 333 777 8899', activeCases: 4, utilization: 60, status: 'Available', specialization: 'Civil Litigation' },
  { id: 4, name: 'Zain Ahmed', role: 'Paralegal', email: 'zain@lawfirm.pk', phone: '+92 312 222 3344', activeCases: 12, utilization: 90, status: 'Busy', specialization: 'Research' },
  { id: 5, name: 'Hira Noor', role: 'Legal Secretary', email: 'hira@lawfirm.pk', phone: '+92 345 555 6677', activeCases: 0, utilization: 78, status: 'Available', specialization: 'Administration' },
];

const statusColor: Record<string, string> = {
  Available: 'bg-success/10 text-success border-success/20',
  'In Court': 'bg-gold/10 text-gold border-gold/20',
  Busy: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function TeamManagement() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-sans text-foreground">Team Management</h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">{teamMembers.length} team members</p>
        </div>
        <Button size="sm" className="bg-gradient-primary font-sans text-xs gap-1.5 h-9">
          <Plus className="h-3.5 w-3.5" /> Add Member
        </Button>
      </div>

      {/* Team Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Avg. Utilization', value: '77%' },
          { label: 'Cases Assigned', value: '30' },
          { label: 'Available Now', value: '3' },
        ].map(s => (
          <Card key={s.label} className="border-border/50 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-lg font-bold font-sans text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-sans mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Members */}
      <div className="space-y-3">
        {teamMembers.map(member => (
          <Card key={member.id} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-11 w-11 border-2 border-border shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold font-sans">
                      {member.name.replace('Adv. ', '').split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold font-sans text-foreground">{member.name}</p>
                      <Badge variant="outline" className={`text-[10px] font-sans ${statusColor[member.status]}`}>{member.status}</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-sans">{member.role} · {member.specialization}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground font-sans">
                      <span className="flex items-center gap-0.5"><Mail className="h-3 w-3" />{member.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-sm font-bold font-sans text-foreground">{member.activeCases}</p>
                    <p className="text-[10px] text-muted-foreground font-sans">Cases</p>
                  </div>
                  <div className="w-24">
                    <div className="flex items-center justify-between text-[10px] font-sans mb-1">
                      <span className="text-muted-foreground">Utilization</span>
                      <span className="font-semibold text-foreground">{member.utilization}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          member.utilization > 85 ? 'bg-destructive' : member.utilization > 70 ? 'bg-gold' : 'bg-success'
                        }`}
                        style={{ width: `${member.utilization}%` }}
                      />
                    </div>
                  </div>
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
