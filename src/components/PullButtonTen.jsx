const PullButtonTen = ({ onClick, onTriggerBorder }) => (
    <button
        onClick={() => {
            onClick();
            onTriggerBorder();
        }}
        className="relative px-6 py-3 font-bold text-white uppercase tracking-wider border border-yellow-500 shadow hover:scale-105 transition-transform bg-[repeating-linear-gradient(45deg,#FFBE59,#FFBE59_10px,#1f2937_10px,#1f2937_20px)]"
    >
        <div>pull x10</div>
    </button>
);

export default PullButtonTen;