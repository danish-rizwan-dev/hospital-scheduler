# 🏥 Hospital Appointment Scheduler

A sleek, professional healthcare management dashboard built with **React** and **Tailwind CSS**. This application streamlines medical staff registration and patient scheduling with real-time capacity tracking.

---

## 🚀 Live Demo Features

* **Doctor Directory**: Add medical professionals with specific IDs and specialties.
* **Dynamic Load Tracking**: Visual progress bars show real-time doctor availability.
* **Smart Booking**: Automated department-based booking and manual patient assignment.
* **Prevent Overbooking**: Intuitive UI that disables booking once a doctor hits their daily limit.
* **Responsive Design**: A clean, "SaaS-style" interface that works on mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

- **Framework**: [React.js](https://reactjs.org/) (Functional Components & Hooks)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- **Icons**: Emojis & Custom Tailwind UI Elements
- **State Management**: React `useState` and `useEffect`
- **Build Tool**: Vite / Create React App

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── AddDoctor.jsx        # Form to register new medical staff
│   ├── DoctorList.jsx       # Dashboard displaying doctor status cards
│   └── BookAppointment.jsx  # Department-based quick booking panel
├── App.jsx                  # Main logic and state management
├── index.css                # Tailwind directives and custom component layers
└── main.jsx                 # Application entry point
