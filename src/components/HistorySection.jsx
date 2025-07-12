const OperatorCard = ({ name, role, stars, img }) => (
  <div className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg shadow hover:bg-gray-700 transition">
    <img src={img} alt={name} className="w-16 h-16 rounded-md object-cover" />
    <div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{role}</p>
      <span className="text-yellow-400 text-sm">{'★ '.repeat(stars)}</span>
    </div>
  </div>
);

const HistorySection = () => {
  const history = Array(10).fill({
    name: 'Lappland',
    role: 'Guard',
    stars: 5,
    img: './data/ops/arts/5/Lappland.png',
  });

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className="grid grid-cols-2 gap-6">
        {history.map((op, i) => (
          <OperatorCard key={i} {...op} />
        ))}
      </div>
    </div>
  );
};

export default HistorySection;
