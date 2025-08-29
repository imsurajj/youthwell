<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contact Us - YouthWell</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9fbf9;
      margin: 0;
      padding: 0;
      color: #111;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;
      background-color: white;
      border-bottom: 1px solid #eee;
    }

    .logo {
      font-weight: bold;
      font-size: 20px;
    }

    nav a {
      margin: 0 15px;
      text-decoration: none;
      color: #111;
      font-weight: 500;
    }

    .container {
      max-width: 700px;
      margin: 40px auto;
      padding: 20px;
    }

    h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    p.subtext {
      color: #77a38a;
      font-size: 14px;
      margin-bottom: 30px;
    }

    .contact-email {
      margin-bottom: 30px;
      font-weight: bold;
    }

    form input,
    form textarea {
      width: 100%;
      padding: 14px;
      margin-bottom: 15px;
      border: none;
      border-radius: 8px;
      background-color: #e9f4ec;
      font-size: 14px;
    }

    form textarea {
      height: 120px;
      resize: vertical;
    }

    button.submit-btn {
      background-color: #20c466;
      color: white;
      padding: 12px 25px;
      font-size: 16px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
    }

    button.submit-btn:hover {
      background-color: #1aa653;
    }

    .confirmation {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #c8e6c9;
      background-color: #e6f4ea;
      color: #2e7d32;
      border-radius: 6px;
      display: none;
    }
  </style>
</head>
<body>

  <header>
    <div class="logo">YouthWell</div>
    <nav>
      <a href="#">Home</a>
      <a href="#">services</a>
      <a href="#">about</a>
      <a href="#">contact</a>
    </nav>
  </header>

  <div class="container">
    <h1>Contact Us</h1>
    <p class="subtext">We’re here to help! If you have any questions, feedback, or need assistance, please reach out to us using the contact information below or by filling out the form.</p>

    <p class="contact-email">Email<br>
      For general inquiries, support, or feedback, please email us at 
      <a href="mailto:support@mindfulme.com">support@mindfulme.com</a>.
    </p>

    <form id="contactForm">
      <input type="text" id="name" placeholder="Your Name" required>
      <input type="email" id="email" placeholder="Your Email" required>
      <input type="text" id="subject" placeholder="Subject" required>
      <textarea id="message" placeholder="Your Message" required></textarea>
      <button type="submit" class="submit-btn">Submit</button>
    </form>

    <div class="confirmation" id="confirmationMsg">
      Thank you! Your message has been submitted. We’ll get back to you soon.
    </div>
  </div>

  <script>
    document.getElementById("contactForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from refreshing

      // Collect form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      const confirmation = document.getElementById("confirmationMsg");

      // Basic validation
      if (!name || !email || !subject || !message) {
        alert("Please fill out all fields.");
        return;
      }

      // Email format check (basic)
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Show confirmation message
      confirmation.style.display = "block";

      // Reset form
      document.getElementById("contactForm").reset();

      // Hide confirmation after a few seconds
      setTimeout(() => {
        confirmation.style.display = "none";
      }, 5000);
    });
  </script>

</body>
</html>

