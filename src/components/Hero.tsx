const Hero = () => {
  return (
    <section className="py-46 bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-5xl font-bold text-foreground mb-6">
          Empowering Youth Wellness
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          A comprehensive platform dedicated to youth mental health, wellness, and personal development. 
          Join our community to discover resources, support, and tools for a healthier future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Get Started
          </button>
          <button className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-accent transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
