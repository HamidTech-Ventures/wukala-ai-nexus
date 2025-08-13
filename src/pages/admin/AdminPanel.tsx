import { useState, useEffect } from 'react';
import { Search, Eye, Check, X, Clock, Filter, User, FileText, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import anime from 'animejs/lib/anime.es.js';

interface LawyerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  barCouncilNumber: string;
  degreeTitle: string;
  university: string;
  yearOfCompletion: string;
  chamberAddress: string;
  degreeDocument: string;
  introVideo: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<LawyerApplication | null>(null);
  
  // Mock data - in real app, this would come from API
  const [applications, setApplications] = useState<LawyerApplication[]>([
    {
      id: '1',
      name: 'Ahmad Hassan',
      email: 'ahmad.hassan@example.com',
      phone: '0300-1234567',
      city: 'Lahore',
      barCouncilNumber: 'LHC-2020-12345',
      degreeTitle: 'LLB',
      university: 'Punjab University',
      yearOfCompletion: '2020',
      chamberAddress: 'Chamber 123, District Courts, Lahore',
      degreeDocument: 'ahmad_degree.pdf',
      introVideo: 'ahmad_intro.mp4',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Fatima Khan',
      email: 'fatima.khan@example.com',
      phone: '0301-9876543',
      city: 'Karachi',
      barCouncilNumber: 'KHI-2019-67890',
      degreeTitle: 'LLM',
      university: 'Karachi University',
      yearOfCompletion: '2019',
      chamberAddress: 'Office 456, Commercial Area, Karachi',
      degreeDocument: 'fatima_degree.pdf',
      introVideo: 'fatima_intro.mp4',
      submittedAt: '2024-01-14T14:20:00Z',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Muhammad Ali',
      email: 'muhammad.ali@example.com',
      phone: '0302-5555555',
      city: 'Islamabad',
      barCouncilNumber: 'ISB-2021-11111',
      degreeTitle: 'LLB',
      university: 'International Islamic University',
      yearOfCompletion: '2021',
      chamberAddress: 'Chamber 789, F-8 Courts, Islamabad',
      degreeDocument: 'ali_degree.pdf',
      introVideo: 'ali_intro.mp4',
      submittedAt: '2024-01-13T09:15:00Z',
      status: 'approved'
    }
  ]);

  useEffect(() => {
    anime({
      targets: '.admin-content',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    });
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.barCouncilNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (applicationId: string, newStatus: 'approved' | 'rejected') => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    
    // Success animation
    anime({
      targets: `[data-application-id="${applicationId}"]`,
      scale: [1, 0.95, 1],
      duration: 400,
      easing: 'easeInOutQuad'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    total: applications.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="admin-content opacity-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage lawyer verification applications</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <User className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <X className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or bar council number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Lawyer Applications</h2>
            </div>
            
            <div className="divide-y divide-border">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  data-application-id={application.id}
                  className="p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {application.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{application.name}</h3>
                        <p className="text-sm text-muted-foreground">{application.email}</p>
                        <p className="text-sm text-muted-foreground">Bar Council: {application.barCouncilNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{formatDate(application.submittedAt)}</p>
                        <p className="text-sm text-muted-foreground">{application.city}</p>
                      </div>
                      {getStatusBadge(application.status)}
                      
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Application Details - {application.name}</DialogTitle>
                            </DialogHeader>
                            {selectedApplication && (
                              <Tabs defaultValue="personal" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                  <TabsTrigger value="verification">Verification</TabsTrigger>
                                  <TabsTrigger value="documents">Documents</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="personal" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Full Name</Label>
                                      <p className="text-sm text-muted-foreground">{selectedApplication.name}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Email</Label>
                                      <p className="text-sm text-muted-foreground">{selectedApplication.email}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Phone</Label>
                                      <p className="text-sm text-muted-foreground">{selectedApplication.phone}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">City</Label>
                                      <p className="text-sm text-muted-foreground">{selectedApplication.city}</p>
                                    </div>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="verification" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Bar Council Number</Label>
                                      <p className="text-sm text-muted-foreground">{selectedApplication.barCouncilNumber}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Degree</Label>
                                      <p className="text-sm text-muted-foreground">{selectedApplication.degreeTitle}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">University</Label>
                                      <p className="text-sm text-muted-foreground">{selectedApplication.university}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Year of Completion</Label>
                                      <p className="text-sm text-muted-foreground">{selectedApplication.yearOfCompletion}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Chamber Address</Label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.chamberAddress}</p>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="documents" className="space-y-4">
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                      <div className="flex items-center space-x-3">
                                        <FileText className="w-8 h-8 text-primary" />
                                        <div>
                                          <p className="font-medium">Degree Document</p>
                                          <p className="text-sm text-muted-foreground">{selectedApplication.degreeDocument}</p>
                                        </div>
                                      </div>
                                      <Button variant="outline" size="sm">View Document</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                      <div className="flex items-center space-x-3">
                                        <Video className="w-8 h-8 text-primary" />
                                        <div>
                                          <p className="font-medium">Introduction Video</p>
                                          <p className="text-sm text-muted-foreground">{selectedApplication.introVideo}</p>
                                        </div>
                                      </div>
                                      <Button variant="outline" size="sm">Play Video</Button>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {application.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(application.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusChange(application.id, 'rejected')}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;