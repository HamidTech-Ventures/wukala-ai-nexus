import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  FileText,
  FileSignature,
  FilePlus2,
  Clock,
  Star,
  Copy,
  Download,
  MoreVertical,
} from 'lucide-react';

const templates = [
  { id: 1, name: 'Power of Attorney (Wakalatnama)', category: 'Court Filing', uses: 156, starred: true },
  { id: 2, name: 'Civil Suit Plaint', category: 'Court Filing', uses: 89, starred: true },
  { id: 3, name: 'Criminal Bail Application', category: 'Criminal', uses: 124, starred: false },
  { id: 4, name: 'Partnership Agreement', category: 'Corporate', uses: 67, starred: false },
  { id: 5, name: 'Rental Agreement', category: 'Property', uses: 203, starred: true },
  { id: 6, name: 'Notice of Demand', category: 'General', uses: 95, starred: false },
];

const recentDrafts = [
  { id: 1, name: 'Reply to Show Cause Notice - Khan Industries', template: 'Show Cause Reply', modified: '2 hours ago', status: 'Draft' },
  { id: 2, name: 'Written Arguments - State v. Ali Raza', template: 'Written Arguments', modified: '5 hours ago', status: 'Review' },
  { id: 3, name: 'Sale Agreement - Islamabad Realty', template: 'Sale Agreement', modified: 'Yesterday', status: 'Final' },
  { id: 4, name: 'Bail Application - Criminal Case #447', template: 'Bail Application', modified: 'Yesterday', status: 'Draft' },
  { id: 5, name: 'Demand Notice - Fatima Enterprises', template: 'Notice of Demand', modified: '3 days ago', status: 'Sent' },
];

const statusStyle: Record<string, string> = {
  Draft: 'bg-gold/10 text-gold border-gold/20',
  Review: 'bg-primary/10 text-primary border-primary/20',
  Final: 'bg-success/10 text-success border-success/20',
  Sent: 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20',
};

export default function DocumentDrafting() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-sans text-foreground">Document Drafting</h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">Templates & drafts for legal documents</p>
        </div>
        <Button size="sm" className="bg-gradient-primary font-sans text-xs gap-1.5 h-9">
          <FilePlus2 className="h-3.5 w-3.5" /> New Document
        </Button>
      </div>

      {/* Templates */}
      <div>
        <h3 className="text-sm font-semibold font-sans text-foreground mb-3">Document Templates</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {templates.map(t => (
            <Card key={t.id} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <FileSignature className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex items-center gap-1">
                    {t.starred && <Star className="h-3.5 w-3.5 text-gold fill-gold" />}
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <p className="text-sm font-semibold font-sans text-foreground leading-tight">{t.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="text-[10px] font-sans">{t.category}</Badge>
                  <span className="text-[10px] text-muted-foreground font-sans">{t.uses} uses</span>
                </div>
                <div className="flex gap-1.5 mt-3">
                  <Button variant="outline" size="sm" className="flex-1 h-7 text-[10px] font-sans gap-1 border-border/50">
                    <Copy className="h-3 w-3" /> Use
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] font-sans gap-1">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Drafts */}
      <div>
        <h3 className="text-sm font-semibold font-sans text-foreground mb-3">Recent Drafts</h3>
        <div className="space-y-2">
          {recentDrafts.map(d => (
            <Card key={d.id} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium font-sans text-foreground truncate">{d.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground font-sans">
                        <span>{d.template}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{d.modified}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] font-sans shrink-0 ${statusStyle[d.status]}`}>{d.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
