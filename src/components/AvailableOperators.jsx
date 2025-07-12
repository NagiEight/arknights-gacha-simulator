const AvailableOperators = () => (
  <div className="max-w-2xl">
    <h1 className="text-xl font-bold mb-4 bg-gray-500/60 backdrop-blur-md text-white">
      Available operators
    </h1>
    <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
      <ul className="list-disc pl-6">
        <li className="text-yellow-100">op6</li>
        <li className="text-yellow-400">op5</li>
        <li className="text-purple-400">op4</li>
        <li className="text-blue-400">op3</li>
      </ul>
    </div>
  </div>
);

export default AvailableOperators;
