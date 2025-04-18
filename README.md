## 🍽️ Restaurant Ordering and Reservation System

This is a full-stack web application that allows users to seamlessly order food and reserve seats at a restaurant. It features a dynamic user interface for browsing meals and a step-by-step reservation process with real-time availability checks to prevent double bookings.

### 🛠️ Technologies Used

- **Frontend**: React.js, TailwindCSS, React Router, Framer Motion  
- **Backend**: Supabase (Database, Authentication, API)  
- **Deployment**: Netlify (Frontend), Supabase (Backend)

### ✨ Features

- 🛒 Browse meals by categories (Swallow, Vegetables, Fast Food, Snacks, Drinks)
- 🧺 Add to cart and manage orders before checkout
- 📆 Multi-step reservation form with progress tracker
- ⏰ Real-time date & time picker that disables already-booked slots
- 🔐 User authentication using Supabase
- 📊 Admin view for managing reservations and orders
- 📱 Fully responsive and animated UI

### ⚙️ How It Works

Users can explore the menu, add meals to their cart, and proceed to make a reservation through a guided multi-step form. Reserved dates and times are stored in Supabase and are validated to avoid double bookings. All user data is securely handled via Supabase Auth.
