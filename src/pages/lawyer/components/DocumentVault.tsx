import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Upload,
  FolderOpen,
  FileText,
  File,
  Image,
  MoreVertical,
  Download,
  Lock,
  Eye,
  Clock,
  HardDrive,
  Filter,
  Grid3X3,
  List,
} from 'lucide-react';

const folders = [
  { name: 'Court Filings', files: 47, size: '234 MB', icon: FileText, color: 'text-primary' },
  { name: 'Client Documents', files: 83, size: '512 MB', icon: FolderOpen, color: 'text-gold' },
  { name: 'Evidence', files: 29, size: '1.2 GB', icon: Lock, color: 'text-destructive' },
  { name: 'Contracts & Agreements', files: 36, size: '189 MB', icon: File, color: 'text-success' },
];

const recentFiles = [
  { name: 'Wakalatnama - Khan Industries.pdf', folder: 'Court Filings', size: '245 KB', modified: '2 hours ago', type: 'PDF', confidential: true },
  { name: 'Evidence Bundle - State v. Ali Raza.zip', folder: 'Evidence', size: '48 MB', modified: '5 hours ago', type: 'ZIP', confidential: true },
  { name: 'Sale Agreement - Islamabad Realty.docx', folder: 'Contracts', size: '890 KB', modified: 'Yesterday', type: 'DOCX', confidential: false },
  { name: 'Property Survey Report.pdf', folder: 'Evidence', size: '3.2 MB', modified: 'Yesterday', type: 'PDF', confidential: false },
  { name: 'Tax Return Filing - FY2024.xlsx', folder: 'Client Documents', size: '156 KB', modified: '3 days ago', type: 'XLSX', confidential: true },
  { name: 'Court Order - Civil Suit #2847.pdf', folder: 'Court Filings', size: '1.1 MB', modified: '4 days ago', type: 'PDF', confidential: false },
];

const typeIcon: Record<string, typeof FileText> = {
  PDF: FileText,
  DOCX: File,
  ZIP: HardDrive,
  XLSX: File,
  IMG: Image,
};

export default function DocumentVault() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-sans text-foreground">Document Vault</h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">Secure document storage & management</p>
        </div>
        <Button size="sm" className="bg-gradient-primary font-sans text-xs gap-1.5 h-9">
          <Upload className="h-3.5 w-3.5" /> Upload Files
        </Button>
      </div>

      {/* Storage Stats */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-sans text-muted-foreground">Storage Used</span>
            <span className="text-xs font-semibold font-sans text-foreground">2.1 GB / 10 GB</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '21%' }} />
          </div>
          <div className="flex items-center gap-4 mt-2 text-[10px] font-sans text-muted-foreground">
            <span>195 files</span>
            <span>4 folders</span>
            <span>12 confidential</span>
          </div>
        </CardContent>
      </Card>

      {/* Folders */}
      <div>
        <h3 className="text-sm font-semibold font-sans text-foreground mb-3">Folders</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {folders.map(f => (
            <Card key={f.name} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
              <CardContent className="p-4">
                <div className={`h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-3 ${f.color} group-hover:scale-105 transition-transform`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold font-sans text-foreground">{f.name}</p>
                <p className="text-[10px] text-muted-foreground font-sans mt-0.5">{f.files} files · {f.size}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Files */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold font-sans text-foreground">Recent Files</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs font-sans w-40 bg-card border-border/50"
              />
            </div>
            <div className="flex bg-secondary/50 rounded-md p-0.5">
              <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="icon" className="h-7 w-7" onClick={() => setViewMode('list')}>
                <List className="h-3.5 w-3.5" />
              </Button>
              <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="icon" className="h-7 w-7" onClick={() => setViewMode('grid')}>
                <Grid3X3 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {recentFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())).map((file, i) => {
            const Icon = typeIcon[file.type] || FileText;
            return (
              <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium font-sans text-foreground truncate">{file.name}</p>
                          {file.confidential && <Lock className="h-3 w-3 text-destructive shrink-0" />}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground font-sans">
                          <span>{file.folder}</span>
                          <span>·</span>
                          <span>{file.size}</span>
                          <span>·</span>
                          <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{file.modified}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Badge variant="secondary" className="text-[9px] font-sans">{file.type}</Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
