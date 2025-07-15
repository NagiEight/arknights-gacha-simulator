const PullButtonOne = ({ onClick }) => (
    <button
        onClick={onClick}
        className="relative px-6 py-3 font-bold text-white uppercase tracking-wider border border-red-500 shadow hover:scale-105 transition-transform bg-[repeating-linear-gradient(45deg,#FF5959,#FF5959_10px,#1f2937_10px,#1f2937_20px)]"
    >
        <div className="text-red-500 bg-black text-lg">pull x1</div>
    </button>
);

export default PullButtonOne;
