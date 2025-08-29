import { Navbar } from "@/components/Navbar";

// Content constants
const content = {
  pageHeading: 'About Youthwell',
  pageSubheading: 'Empowering mental wellness through AI and compassionate support.',
  sections: [
    {
      title: 'Our Mission',
      text: `At Youthwell, our mission is to make mental wellness accessible to everyone.
      We believe that everyone deserves to have the tools and support they need to thrive
      emotionally and mentally. Our platform combines the power of AI with compassionate
      human support to provide personalized guidance and resources.`
    },
    {
      title: 'Our Values',
      text: `We are guided by core values of empathy, innovation, and inclusivity.
      We strive to create a safe and supportive space where individuals feel heard,
      understood, and empowered on their journey to well-being.
      We are committed to using technology responsibly and ethically
      to enhance mental health support.`
    },
    {
      title: 'AI and Chatbot Features',
      text: `Our AI-powered chatbot provides 24/7 support, offering immediate assistance
      with stress management, mood tracking, and personalized recommendations.
      It learns from user interactions to provide increasingly relevant and helpful
      guidance, complementing traditional therapy and self-care practices.`,
      features: [
        { title: 'Personalized Wellness', text: 'Receive AI-generated meditation scripts, affirmations, and calming tips tailored to your individual needs.' },
        { title: 'Anonymous Venting Chatbot', text: 'Share your thoughts and feelings privately and safely without any judgment.' },
        { title: 'Daily Wellness Reminders', text: 'Stay consistent with gentle reminders designed to encourage healthy habits.' },
        { title: 'Mood History Dashboard', text: 'Track your emotional patterns over time and gain insights into your mental well-being.' }
      ]
    }
  ]
};

export default function About() {
  return (
    <div className="bg-background/95 text-white min-h-screen pb-22">
      <Navbar />

      {/* Centered Page Heading */}
      <header className="text-center py-24">
      <h1 className="text-4xl font-bold">{content.pageHeading}</h1>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{content.pageSubheading}</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-16">
        {content.sections.map((section, index) => (
          <section key={index}>
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <p className="text-gray-300 leading-relaxed">{section.text}</p>

            {section.features && (
              <ul className="list-disc list-inside text-gray-300 mt-6 space-y-2">
                {section.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="font-semibold text-white">{feature.title}:</span> {feature.text}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
