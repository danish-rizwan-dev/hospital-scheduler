import { useState, useEffect } from "react";
import AddDoctor from "./components/AddDoctor";
import DoctorList from "./components/DoctorList";
import BookAppointment from "./components/BookAppointment";

export default function App() {
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Auto-hide messages after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const addDoctor = (doctor) => {
    // Ensure new doctors start with 0 appointments
    const newDoctor = { ...doctor, currentAppointments: 0 };
    setDoctors([...doctors, newDoctor]);
    setMessage({ text: "Doctor added successfully!", type: "success" });
  };

  const bookAppointment = (specialization) => {
    const available = doctors.filter(
      (d) =>
        d.specialization === specialization &&
        d.currentAppointments < d.maxDailyPatients
    );

    if (available.length === 0) {
      setMessage({ text: "No doctors available for this specialty", type: "error" });
      return;
    }

    // Find the doctor with the fewest appointments
    const sortedAvailable = [...available].sort(
      (a, b) => a.currentAppointments - b.currentAppointments
    );
    const selectedDoctor = sortedAvailable[0];

    // Update state immutably
    const updatedDoctors = doctors.map((d) =>
      d.doctorId === selectedDoctor.doctorId
        ? { ...d, currentAppointments: d.currentAppointments + 1 }
        : d
    );

    setDoctors(updatedDoctors);
    setMessage({ 
      text: `Appointment booked with Dr. ${selectedDoctor.name || selectedDoctor.doctorId}`, 
      type: "success" 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <header className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-900 mb-2">
          Hospital Portal
        </h1>
        <p className="text-slate-500">Manage staff and patient scheduling with ease.</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        {/* Top Section: Forms */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-blue-100 p-2 rounded-lg text-blue-600">✚</span>
              Register New Doctor
            </h2>
            <AddDoctor addDoctor={addDoctor} />
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-green-100 p-2 rounded-lg text-green-600">📅</span>
              Quick Book
            </h2>
            <BookAppointment doctors={doctors} bookAppointment={bookAppointment} />
          </section>
        </div>

        {/* Bottom Section: List */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-6">Medical Staff Directory</h2>
          <DoctorList doctors={doctors} />
        </section>
      </main>

      {/* Toast Notification */}
      {message.text && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white transition-all transform animate-bounce ${
          message.type === "error" ? "bg-red-600" : "bg-blue-600"
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}