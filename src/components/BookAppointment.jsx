export default function BookAppointment({ doctors, bookAppointment }) {
  const specializations = [...new Set(doctors.map((d) => d.specialization))];

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500 mb-4">
        Select a department to find the next available slot.
      </p>

      {specializations.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {specializations.map((spec) => {
            const hasAvailability = doctors.some(
              (d) => d.specialization === spec && d.currentAppointments < d.maxDailyPatients
            );

            return (
              <button
                key={spec}
                disabled={!hasAvailability}
                onClick={() => bookAppointment(spec)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 group ${
                  hasAvailability
                    ? "border-slate-100 hover:border-blue-500 hover:bg-blue-50 bg-white"
                    : "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-lg text-lg ${hasAvailability ? 'bg-blue-100' : 'bg-slate-200'}`}>
                    {spec === "Cardiology" ? "❤️" : spec === "Pediatrics" ? "👶" : "🏥"}
                  </span>
                  <div className="text-left">
                    <div className="font-bold text-slate-800">{spec}</div>
                    <div className="text-xs text-slate-500">Fastest available</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!hasAvailability && (
                    <span className="text-[10px] font-bold text-red-500 uppercase bg-red-50 px-2 py-1 rounded">
                      Full
                    </span>
                  )}
                  <span className={`text-xl transition-transform group-hover:translate-x-1 ${hasAvailability ? 'text-blue-500' : 'text-slate-300'}`}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <div className="text-slate-300 text-3xl mb-2">📋</div>
          <p className="text-slate-500 font-medium">No active departments</p>
          <p className="text-xs text-slate-400 mt-1">Please register a doctor first to enable booking.</p>
        </div>
      )}
    </div>
  );
}