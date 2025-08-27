const Features = () => {
  const features = [
    {
      title: "Mental Health Support",
      description: "Professional counseling and therapy services tailored for youth",
      icon: "🧠"
    },
    {
      title: "Wellness Programs",
      description: "Holistic health and fitness programs designed for young people ",
      icon: "💪"
    },
    {
      title: "Career Guidance",
      description: "Professional development and career planning support",
      icon: "🎯"
    },
    {
      title: "Community Events",
      description: "Connect with peers and build meaningful relationships",
      icon: "🤝"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose YouthWell?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive approach to the youth wellness combines professional expertise with peer support
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
