import Pagination from "./Pagination";

const OperatorCard = ({ name, role, stars, img }) => (
  <div className="flex items-center space-x-4 bg-gray-900/50 p-2 hover:bg-gray-700 transition">
    <img src={img} alt={name} className="w-16 h-16 rounded-md object-cover" />
    <div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-white">{role}</p>
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
    <div className="p-3 text-white">
      <h2 className="text-2xl font-bold mb-4 bg-gray-900/50">History</h2>
      <div className="grid grid-cols-2 gap-6">
        {history.map((op, i) => (
          <OperatorCard key={i} {...op} />
        ))}
      </div>
      <Pagination></Pagination>
    </div>
  );
};

export default HistorySection;
