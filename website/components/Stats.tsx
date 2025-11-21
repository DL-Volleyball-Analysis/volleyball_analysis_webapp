export function Stats() {
  const stats = [
    { value: "98.5%", label: "Detection Accuracy" },
    { value: "30 FPS", label: "Real-time Processing" },
    { value: "10+", label: "Tracking Features" },
    { value: "100K+", label: "Frames Analyzed" },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
