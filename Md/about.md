<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>About Us - SereneMind</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white min-h-screen flex flex-col">

  <!-- Top Navigation Bar -->
  <nav class="bg-gray-900 border-b border-gray-700 shadow-md fixed top-0 left-0 w-full z-50">
    <div class="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
      
      <!-- Logo / Brand -->
      <div class="text-2xl font-bold text-white">
        SereneMind
      </div>
      
      <!-- Navbar Links -->
      <ul class="hidden md:flex space-x-8 text-gray-300 font-medium">
        <li><a href="#" class="hover:text-white transition">Home</a></li>
        <li><a href="#" class="hover:text-white transition">Services</a></li>
        <li><a href="#" class="hover:text-white transition">About</a></li>
        <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
      </ul>
      
      <!-- Buttons -->
      <div class="hidden md:flex space-x-4">
        <a href="#" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">Sign Up</a>
        <a href="#" class="px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-600 transition">Login</a>
      </div>
      
      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button id="menu-btn" class="text-gray-300 hover:text-white focus:outline-none text-2xl">
          â˜°
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-gray-800 px-6 py-4 space-y-4">
      <a href="#" class="block text-gray-300 hover:text-white">Home</a>
      <a href="#" class="block text-gray-300 hover:text-white">Services</a>
      <a href="#" class="block text-gray-300 hover:text-white">About</a>
      <a href="#contact" class="block text-gray-300 hover:text-white">Contact</a>
      <a href="#" class="block bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-center">Sign Up</a>
      <a href="#" class="block border border-blue-600 hover:bg-blue-600 px-3 py-2 rounded-lg text-center">Login</a>
    </div>
  </nav>

  <!-- Page Content -->
  <main class="max-w-3xl mx-auto w-full px-6 pt-28 pb-10 space-y-10">

    <!-- Our Mission -->
    <section>
      <h2 class="text-2xl font-bold mb-3">Our Mission</h2>
      <p class="text-gray-300 leading-relaxed">
        At SereneMind, our mission is to make mental wellness accessible to everyone.
        We believe that everyone deserves to have the tools and support they need to thrive
        emotionally and mentally. Our platform combines the power of AI with compassionate
        human support to provide personalized guidance and resources.
      </p>
    </section>

    <!-- Our Values -->
    <section>
      <h2 class="text-2xl font-bold mb-3">Our Values</h2>
      <p class="text-gray-300 leading-relaxed">
        We are guided by core values of empathy, innovation, and inclusivity.
        We strive to create a safe and supportive space where individuals feel heard,
        understood, and empowered on their journey to well-being.
        We are committed to using technology responsibly and ethically
        to enhance mental health support.
      </p>
    </section>

    <!-- AI and Chatbot Features -->
    <section>
      <h2 class="text-2xl font-bold mb-3">AI and Chatbot Features</h2>
      <p class="text-gray-300 leading-relaxed">
        Our AI-powered chatbot provides 24/7 support, offering immediate assistance
        with stress management, mood tracking, and personalized recommendations.
        It learns from user interactions to provide increasingly relevant and helpful
        guidance, complementing traditional therapy and self-care practices.
      </p>

      <!-- Feature Highlights -->
      <ul class="list-disc list-inside text-gray-300 mt-4 space-y-2">
        <li><span class="font-semibold text-white">Personalized Wellness:</span> Receive AI-generated meditation scripts, affirmations, and calming tips tailored to your individual needs.</li>
        <li><span class="font-semibold text-white">Anonymous Venting Chatbot:</span> Share your thoughts and feelings privately and safely without any judgment.</li>
        <li><span class="font-semibold text-white">Daily Wellness Reminders:</span> Stay consistent with gentle reminders designed to encourage healthy habits.</li>
        <li><span class="font-semibold text-white">Mood History Dashboard:</span> Track your emotional patterns over time and gain insights into your mental well-being.</li>
      </ul>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="border border-gray-700 rounded-xl p-5 mt-6 bg-gray-900">
      <h2 class="text-2xl font-bold mb-3">Contact Us</h2>
      <p class="text-gray-300 mb-2">
        We'd love to hear from you! Whether you have questions, feedback, or suggestions, feel free to reach out.
      </p>
      <p class="text-gray-300">
        í³§ Email: 
        <a href="mailto:support@serenemind.com" class="text-blue-400 hover:underline">
          support@serenemind.com
        </a>
      </p>
    </section>
  </main>

  <!-- Script for Mobile Menu -->
  <script>
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  </script>

</body>
</html>
