import { useState } from "react";

export default function AddDoctor({ addDoctor }) {
  const [doctorId, setDoctorId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [maxPatients, setMaxPatients] = useState("");

  const isFormValid = doctorId && specialization && maxPatients;

  const submit = () => {
    if (!isFormValid) return;

    addDoctor({
      doctorId,
      specialization,
      maxDailyPatients: Number(maxPatients),
      currentAppointments: 0,
    });

    // Reset fields
    setDoctorId("");
    setSpecialization("");
    setMaxPatients("");
  };

  const inputStyles = `
    w-full px-4 py-2 border border-slate-200 rounded-lg 
    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    outline-none transition-all duration-200 bg-slate-50
  `;

  return (
    <div className="space-y-4">
      {/* Doctor ID Field */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Doctor Name/ID</label>
        <input
          className={inputStyles}
          placeholder="e.g. Dr. Smith"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        />
      </div>

      {/* Specialization Field */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Specialization</label>
        <select
          className={inputStyles}
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">Select Specialty</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="General Physician">General Physician</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>
      </div>

      {/* Max Patients Field */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Daily Capacity</label>
        <input
          className={inputStyles}
          type="number"
          min="1"
          placeholder="Max patients per day"
          value={maxPatients}
          onChange={(e) => setMaxPatients(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={submit}
        disabled={!isFormValid}
        className={`w-full mt-2 py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 ${
          isFormValid 
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-[0.98]" 
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
        }`}
      >
        Add to Directory
      </button>
    </div>
  );
}