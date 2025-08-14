
import { Linkedin, Mail, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LeadershipPage = () => {
  const leaders = [
    {
      name: "Dr. Ahmed Hassan",
      position: "Chief Executive Officer & Founder",
      image: "/placeholder.svg",
      bio: "Dr. Ahmed Hassan is a visionary leader with over 15 years of experience in legal technology and artificial intelligence. He holds a PhD in Computer Science from LUMS and an LLB from Punjab University. Before founding Wukala-GPT, he led digital transformation initiatives at several leading law firms and served as a legal technology consultant for the Supreme Court of Pakistan.",
      achievements: [
        "PhD in Computer Science - LUMS",
        "LLB - Punjab University Law College",
        "Former CTO at Legal Solutions Pakistan",
        "Published researcher in AI and Law"
      ],
      linkedin: "#",
      email: "ahmed.hassan@wukala-gpt.com"
    },
    {
      name: "Advocate Fatima Khan",
      position: "Chief Legal Officer & Co-Founder",
      image: "/placeholder.svg", 
      bio: "Advocate Fatima Khan brings two decades of legal expertise to Wukala-GPT. She is a distinguished member of the Lahore High Court Bar Association and has been recognized as one of Pakistan's leading legal minds. Her passion for justice and extensive courtroom experience ensure that our platform maintains the highest standards of legal accuracy and ethics.",
      achievements: [
        "LLM - Harvard Law School",
        "LLB - Kinnaird College for Women",
        "20+ years of courtroom experience",
        "Member - Lahore High Court Bar Association"
      ],
      linkedin: "#",
      email: "fatima.khan@wukala-gpt.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-serif">
              Our Leadership
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Meet the visionaries behind Pakistan's legal technology revolution
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-20">
              {leaders.map((leader, index) => (
                <div key={leader.name} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                        <img 
                          src={leader.image} 
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <Users className="w-10 h-10 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-foreground mb-2 font-serif">
                        {leader.name}
                      </h2>
                      <p className="text-xl text-primary font-medium">
                        {leader.position}
                      </p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {leader.bio}
                    </p>

                    {/* Achievements */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-primary" />
                        Key Achievements
                      </h3>
                      <ul className="space-y-2">
                        {leader.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline" className="flex items-center">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-serif">
              Our Leadership Philosophy
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              We believe in leading by example, fostering innovation, and maintaining 
              the highest ethical standards in everything we do.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl shadow-md border border-border">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">People First</h3>
                <p className="text-muted-foreground">
                  Our team and clients are at the heart of every decision we make
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-md border border-border">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in technology, service, and legal accuracy
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-md border border-border">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  Continuously pushing boundaries to serve our community better
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
