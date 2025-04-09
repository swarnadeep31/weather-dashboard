type Props = {
    history: string[];
    onSelect: (city: string) => void;
  };
  
  export default function RecentSearches({ history, onSelect }: Props) {
    if (history.length === 0) return null;
  
    return (
      <div className="mt-8 w-full max-w-md">
        <h3 className="text-lg font-medium mb-2 text-blue-700">Recent Searches</h3>
        <div className="flex flex-wrap gap-2">
          {history.map((city, i) => (
            <button
              key={i}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm"
              onClick={() => onSelect(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    );
  }
  