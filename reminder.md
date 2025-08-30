    
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Daily Reminders</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white font-sans">

  <!-- Top Navbar -->
  <nav class="bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <h1 class="text-2xl font-bold text-white">Wellness App</h1>

      <!-- Navbar Menu -->
      <ul class="flex gap-8 text-gray-300 text-lg font-medium">
        <li><a href="#" class="hover:text-blue-500 transition">Home</a></li>
        <li><a href="#" class="hover:text-blue-500 transition">Services</a></li>
        <li><a href="#" class="hover:text-blue-500 transition">About</a></li>
        <li><a href="#" class="hover:text-blue-500 transition">Contact</a></li>
      </ul>
    </div>
  </nav>

  <!-- Main Container -->
  <div class="max-w-4xl mx-auto pt-28 pb-24 px-6">
    <h1 class="text-3xl font-bold mb-8 text-center">Daily Reminders</h1>

    <!-- Morning Reminder -->
    <div class="bg-gray-800 p-6 rounded-xl mb-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Morning</h2>
      <div class="flex gap-6">
        <div class="flex-1">
          <label class="block mb-2 text-gray-400">Time</label>
          <input type="time" value="09:00" class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="flex-1">
          <label class="block mb-2 text-gray-400">Activity</label>
          <select class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Morning meditation</option>
            <option>Yoga</option>
            <option>Reading</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Afternoon Reminder -->
    <div class="bg-gray-800 p-6 rounded-xl mb-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Afternoon</h2>
      <div class="flex gap-6">
        <div class="flex-1">
          <label class="block mb-2 text-gray-400">Time</label>
          <input type="time" value="13:00" class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="flex-1">
          <label class="block mb-2 text-gray-400">Activity</label>
          <select class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Mindful breathing</option>
            <option>Walking</option>
            <option>Lunch break</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Evening Reminder -->
    <div class="bg-gray-800 p-6 rounded-xl mb-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Evening</h2>
      <div class="flex gap-6">
        <div class="flex-1">
          <label class="block mb-2 text-gray-400">Time</label>
          <input type="time" value="20:00" class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="flex-1">
          <label class="block mb-2 text-gray-400">Activity</label>
          <select class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Digital detox</option>
            <option>Family time</option>
            <option>Dinner</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Editable Save Button at Bottom -->
    <div class="text-center mt-10">
      <button class="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-10 py-4 rounded-lg text-xl font-semibold shadow-lg transition duration-300">
        <span contenteditable="true" class="outline-none focus:ring-0">Save Changes</span>
      </button>
      <p class="mt-2 text-gray-400 text-sm">í²¡ Tip: Click on the text to edit it</p>
    </div>
  </div>

</body>
</html>
