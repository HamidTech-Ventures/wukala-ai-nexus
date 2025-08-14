
import { Scale, Target, Heart, Globe, Award, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-serif">
              About Wukala-GPT
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Revolutionizing Pakistan's legal landscape through artificial intelligence 
              and human expertise
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary mr-4">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground font-serif">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At Wukala-GPT, we believe that access to quality legal services should not be 
                  a privilege, but a fundamental right. Our mission is to democratize legal 
                  assistance in Pakistan by leveraging cutting-edge artificial intelligence 
                  to bridge the gap between clients and qualified legal professionals.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We are committed to creating a transparent, efficient, and trustworthy 
                  platform where every Pakistani can find the legal help they need, 
                  when they need it.
                </p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                    <div className="text-sm text-muted-foreground">Clients Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Verified Lawyers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Cities Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-6 font-serif">
                  What Sets Us Apart
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Rigorous Verification</div>
                      <div className="text-sm text-muted-foreground">
                        All lawyers undergo comprehensive Bar Council verification
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Nationwide Coverage</div>
                      <div className="text-sm text-muted-foreground">
                        Serving clients across all provinces and territories
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Community Driven</div>
                      <div className="text-sm text-muted-foreground">
                        Built by Pakistanis, for Pakistanis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary mr-4">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground font-serif">Our Vision</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We envision a Pakistan where legal justice is accessible to all, regardless 
                  of economic status, geographic location, or social background. Through 
                  technology and human compassion, we're building a future where legal 
                  guidance is just a click away.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our platform represents more than just a service—it's a movement towards 
                  a more just and equitable society where everyone has the tools they need 
                  to protect their rights and pursue justice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4">
                  <Scale className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Justice</h3>
                <p className="text-muted-foreground">
                  Ensuring fair and equal access to legal services for all Pakistanis
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Compassion</h3>
                <p className="text-muted-foreground">
                  Understanding that legal matters often involve life-changing situations
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  Maintaining the highest standards in technology and service quality
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  Continuously evolving to serve our community better through technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
