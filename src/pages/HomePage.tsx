
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, Clock } from 'lucide-react';
import logo from '@/assets/Wukala-GPT-Logo-Green.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/10 to-background py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6 sm:mb-8">
              <img 
                src={logo} 
                alt="Wukala-GPT Logo" 
                className="h-24 w-auto sm:h-32 lg:h-40"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Pakistan's Premier AI-Powered Legal Assistant Platform
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
              Connecting clients with verified lawyers and providing intelligent legal guidance 
              through cutting-edge artificial intelligence technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary hover:shadow-lg transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                <Link to="/auth/role">Get Started</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-2"
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
                Why Choose Wukala-GPT?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the future of legal services with our comprehensive platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl mb-4 sm:mb-6">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-3 sm:mb-4">Trusted & Secure</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  All lawyers are verified through our rigorous Bar Council verification process, 
                  ensuring you connect with qualified legal professionals.
                </p>
              </div>

              <div className="bg-card p-6 lg:p-8 rounded-2xl shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-6">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-4">Expert Network</h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Access Pakistan's largest network of qualified lawyers across all legal 
                  specializations and jurisdictions.
                </p>
              </div>

              <div className="bg-card p-6 lg:p-8 rounded-2xl shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-6">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-4">24/7 AI Support</h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Get instant legal guidance with our AI assistant, available round the clock 
                  for immediate consultation and document assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 sm:mb-6 font-serif">
              Ready to Transform Your Legal Experience?
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-6 sm:mb-8">
              Join thousands of satisfied clients and lawyers on Pakistan's most trusted legal platform
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
            >
              <Link to="/auth/role">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
