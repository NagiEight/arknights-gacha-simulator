const PullButtons = () => (
  <div className="grid-cols-3 flex flex-row-reverse">
    {[
      { label: 'pull x10', color: 'yellow-500', gradient: '#FFBE59' },
      { label: 'pull x1', color: 'red-500', gradient: '#FF5959' },
      { label: 'pull xcustom', color: 'white', gradient: '#FFFFFF' },
    ].map(({ label, color, gradient }) => (
      <button
        key={label}
        className={`relative px-6 py-3 font-bold text-white uppercase tracking-wider border border-${color} shadow hover:scale-105 transition-transform bg-[repeating-linear-gradient(45deg,${gradient},${gradient}_10px,#1f2937_10px,#1f2937_20px)]`}
      >
        <div className={`text-${color} bg-black text-lg`}>{label}</div>
      </button>
    ))}
    <div className="p-4">number of pulls:</div>
  </div>
);

export default PullButtons;
