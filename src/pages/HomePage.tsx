
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, Clock, Sparkles, Scale } from 'lucide-react';
import logo from '@/assets/Wukala-GPT-Logo-Green.jpg';
import heroBg from '@/assets/hero-courtroom-bg.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Clear without Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-background/10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full" style={{ animationDelay: '2s' }} />
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Glass Card Container */}
            <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/20 shadow-2xl">
              <div className="text-center">
                {/* Logo with Glow Effect */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full" />
                    <img 
                      src={logo} 
                      alt="Wukala-GPT Logo" 
                      className="h-28 w-auto sm:h-36 lg:h-44 relative z-10 drop-shadow-2xl"
                    />
                  </div>
                </div>

                {/* Futuristic Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI-Powered Legal Intelligence</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-serif">
                  Pakistan's Premier
                  <span className="block text-gradient-primary mt-2">Legal AI Platform</span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Connecting clients with verified lawyers and providing intelligent legal guidance 
                  through cutting-edge artificial intelligence technology.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3 justify-center mb-10">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm">
                    <Scale className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">Verified Lawyers</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">Secure Platform</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">24/7 AI Support</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-gradient-primary hover:shadow-premium hover:scale-105 transition-all duration-300 text-base sm:text-lg px-8 py-6 font-semibold"
                  >
                    <Link to="/auth/role">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Get Started
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg"
                    className="text-base sm:text-lg px-8 py-6 border-2 border-primary/50 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              </div>
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
