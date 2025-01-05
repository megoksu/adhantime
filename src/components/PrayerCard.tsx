interface PrayerCardProps {
  name: string;
  time: string;
  isActive: boolean;
}

export default function PrayerCard({ name, time, isActive }: PrayerCardProps) {
  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        isActive
          ? 'bg-green-500 text-white'
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{name}</h2>
        <div className="text-lg">{time}</div>
      </div>
      {isActive && (
        <div className="mt-2 text-sm font-medium">Current Prayer Time</div>
      )}
    </div>
  );
} 