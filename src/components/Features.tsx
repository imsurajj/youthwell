const Features = () => {
  const features = [
    {
      title: "personilised wellness",
      description: "receive AI -generated meditation scripts,affirmations and calming tips tailored to your",
      icon: "🎯"
    },
    {
      title: "Anonymous Venting Chatbot",
      description: "Share your thoughts and feeling anonymously with our empathetic chatbot,and review your history privately.",
      icon: "💪"
    },
    {
      title: "Daily Wellness Reminders",
      description: "Get gentle reminders throughout the day to take a moment fir yourself, with nudges like ,take a deep breadth or drink some water",
      icon: "🔔"
    },
    {
      title: "mood history dashboard",
      description: "track your daily mood trends with a visual chart and monitor your streaks for consistent check-ins",
      icon: "🤝"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
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
