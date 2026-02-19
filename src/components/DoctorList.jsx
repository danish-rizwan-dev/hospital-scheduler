export default function DoctorList({ doctors, onBook }) {
  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
        <div className="text-4xl mb-3">👨‍⚕️</div>
        <p className="text-slate-500 font-medium text-lg">No medical staff registered.</p>
        <p className="text-slate-400 text-sm">Add a doctor to start scheduling appointments.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {doctors.map((d, i) => {
        const isFull = d.currentAppointments >= d.maxDailyPatients;
        const loadPercentage = Math.min((d.currentAppointments / d.maxDailyPatients) * 100, 100);

        return (
          <div 
            key={d.doctorId || i} 
            className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
          >
            {/* Left Section: Identity */}
            <div className="flex items-center gap-4 flex-1">
              <div className={`h-14 w-14 rounded-full flex items-center justify-center font-bold text-xl border-4 border-slate-50 shadow-inner transition-colors ${isFull ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-600'}`}>
                {d.doctorId.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                  {d.doctorId}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">
                    {d.specialization}
                  </span>
                  {isFull && (
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md uppercase">
                      Full Capacity
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Middle Section: Progress Visualizer */}
            <div className="flex-[0.8] px-0 md:px-10 my-5 md:my-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Current Load</span>
                <span className={`text-sm font-black ${isFull ? 'text-red-500' : 'text-blue-600'}`}>
                  {d.currentAppointments} <span className="text-slate-300 font-normal">/ {d.maxDailyPatients}</span>
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full p-0.5 border border-slate-200/50">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    isFull ? 'bg-red-500' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                  }`}
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>
            </div>

            {/* Right Section: Interactive Action */}
            <div className="flex items-center justify-end min-w-[140px]">
              <button
                onClick={() => onBook(d.specialization, d.doctorId)}
                disabled={isFull}
                className={`
                  w-full md:w-auto px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all
                  ${isFull 
                    ? 'bg-slate-50 text-slate-300 border border-slate-200 cursor-not-allowed' 
                    : 'bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg active:scale-95 active:bg-blue-700'
                  }
                `}
              >
                {isFull ? 'Maxed Out' : 'Assign Patient'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}