export default function DoctorList({ doctors, onBook }) {
  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
        <div className="text-4xl mb-3">👨‍⚕️</div>
        <p className="text-slate-500 font-medium">No medical staff registered.</p>
        <p className="text-slate-400 text-sm">Add a doctor to start scheduling appointments.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map((d, i) => {
        const isFull = d.currentAppointments >= d.maxDailyPatients;
        const loadPercentage = (d.currentAppointments / d.maxDailyPatients) * 100;

        return (
          <div 
            key={i} 
            className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            {/* Left: Doctor Info */}
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
                {d.doctorId.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg leading-tight">{d.doctorId}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
                  {d.specialization}
                </span>
              </div>
            </div>

            {/* Middle: Capacity Visualizer */}
            <div className="flex-1 max-w-xs px-0 md:px-8 mb-4 md:mb-0">
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase">Daily Load</span>
                <span className={`text-xs font-bold ${isFull ? 'text-red-500' : 'text-slate-700'}`}>
                  {d.currentAppointments} / {d.maxDailyPatients}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div 
                  className={`h-full transition-all duration-700 ease-out ${
                    isFull ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0">
              <div className="text-right hidden sm:block">
                 <span className={`text-[10px] font-black uppercase tracking-widest ${isFull ? 'text-red-400' : 'text-green-500'}`}>
                  {isFull ? 'At Capacity' : 'Available'}
                </span>
              </div>
              
              <button
                onClick={() => onBook(d.specialization)}
                disabled={isFull}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
                  isFull 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                    : 'bg-black text-white hover:bg-slate-800 active:scale-95'
                }`}
              >
                {isFull ? 'Full' : 'Assign Patient'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}