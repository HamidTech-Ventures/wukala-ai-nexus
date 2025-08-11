import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Star, 
  MapPin, 
  GraduationCap, 
  Languages, 
  Award,
  MessageSquare,
  Send,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: Date;
  caseType: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'client' | 'lawyer';
  timestamp: Date;
}

const mockReviews: Review[] = [
  {
    id: '1',
    clientName: 'Anonymous Client',
    rating: 5,
    comment: 'Excellent service! Very knowledgeable and handled my case professionally.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    caseType: 'Corporate Law'
  },
  {
    id: '2',
    clientName: 'Business Owner',
    rating: 5,
    comment: 'Helped me with contract negotiations. Great communication and results.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    caseType: 'Business Law'
  },
  {
    id: '3',
    clientName: 'Startup Founder',
    rating: 4,
    comment: 'Good advice on business formation. Responsive and detail-oriented.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
    caseType: 'Corporate Law'
  }
];

export default function LawyerProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'profile' | 'chat'>('profile');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! Thank you for reaching out. How can I assist you with your legal matter today?',
      sender: 'lawyer',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Mock lawyer data (in real app, fetch by ID)
  const lawyer = {
    id: '1',
    name: 'Adv. Muhammad Hassan',
    specialization: ['Corporate Law', 'Business Law', 'Contract Law'],
    location: 'Lahore, Punjab',
    rating: 4.9,
    reviewCount: 127,
    experience: 12,
    languages: ['Urdu', 'English', 'Punjabi'],
    description: 'Experienced corporate lawyer with expertise in business formation, mergers, and contract negotiations. Served major multinational companies in Pakistan and internationally.',
    hourlyRate: 5000,
    availability: 'available',
    verified: true,
    education: 'LLB from Punjab University Law College, LLM from London School of Economics',
    barAdmission: 'High Court of Punjab (2012), Supreme Court of Pakistan (2018)',
    achievements: [
      'Top Corporate Lawyer Award 2023',
      'Published author on Pakistani Corporate Law',
      'Member of Punjab Bar Council'
    ],
    caseTypes: [
      'Business Formation & Registration',
      'Mergers & Acquisitions',
      'Contract Drafting & Review',
      'Corporate Compliance',
      'Intellectual Property',
      'Employment Law'
    ]
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'client',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate lawyer response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message. I understand your concern and will provide you with detailed legal guidance.',
        sender: 'lawyer',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Lawyer Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                        {lawyer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {lawyer.verified && (
                      <div className="absolute -bottom-2 -right-2">
                        <CheckCircle className="h-6 w-6 text-gold fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-xl font-bold mb-1">{lawyer.name}</h1>
                  <p className="text-sm text-muted-foreground mb-3">{lawyer.specialization[0]}</p>
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{lawyer.rating}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        ({lawyer.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setActiveTab('chat')}
                    className="w-full bg-gradient-primary hover:shadow-md transition-all duration-200"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Chat - Rs. {lawyer.hourlyRate}/hr
                  </Button>
                </div>

                <Separator className="my-6" />

                {/* Quick Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{lawyer.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{lawyer.experience} years experience</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Languages className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{lawyer.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-green-600 font-medium">Available Now</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Contact Options */}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6">
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('profile')}
                className={activeTab === 'profile' ? 'bg-primary' : ''}
              >
                Profile
              </Button>
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('chat')}
                className={activeTab === 'chat' ? 'bg-primary' : ''}
              >
                Chat
              </Button>
            </div>

            {activeTab === 'profile' ? (
              <div className="space-y-6">
                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {lawyer.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Specializations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Practice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {lawyer.caseTypes.map((caseType) => (
                        <div key={caseType} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{caseType}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education & Credentials */}
                <Card>
                  <CardHeader>
                    <CardTitle>Education & Credentials</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Education</h4>
                      <p className="text-sm text-muted-foreground">{lawyer.education}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Bar Admissions</h4>
                      <p className="text-sm text-muted-foreground">{lawyer.barAdmission}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Achievements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {lawyer.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-gold" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews */}
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{review.clientName}</p>
                                <p className="text-xs text-muted-foreground">{review.caseType}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    'h-3 w-3',
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  )}
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">
                                {formatDate(review.date)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Chat Interface */
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Chat with {lawyer.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Rs. {lawyer.hourlyRate}/hour
                    </Badge>
                  </div>
                </CardHeader>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          'flex items-start space-x-3',
                          message.sender === 'client' ? 'flex-row-reverse space-x-reverse' : ''
                        )}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={cn(
                            message.sender === 'client' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          )}>
                            {message.sender === 'client' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              lawyer.name.split(' ').map(n => n[0]).join('')
                            )}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className={cn(
                          'flex-1 max-w-sm',
                          message.sender === 'client' ? 'flex justify-end' : ''
                        )}>
                          <div className={cn(
                            'p-3 rounded-2xl',
                            message.sender === 'client' 
                              ? 'chat-bubble-user' 
                              : 'chat-bubble-ai'
                          )}>
                            <p className="text-sm">{message.content}</p>
                            <p className={cn(
                              'text-xs mt-2 opacity-70',
                              message.sender === 'client' ? 'text-primary-foreground' : 'text-muted-foreground'
                            )}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your legal question..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-gradient-primary"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Professional legal consultation. Confidential and secure.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}