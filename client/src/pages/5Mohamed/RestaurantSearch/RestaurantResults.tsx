interface Props {
  results: any[];
  view: 'grid' | 'list';
  loading?: boolean;
}

export default function RestaurantResults({ results, view, loading }: Props) {
  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 border border-gray-200 rounded-lg bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="mt-6 text-sm text-gray-600">No matching results found.</div>
    );
  }

  if (view === 'list') {
    return (
      <div className="mt-6 space-y-3">
        {results.map((r) => (
          <div key={r.id} className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            {/* Restaurant Image */}
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
              {r.image}
            </div>
            {/* Restaurant Info */}
            <div className="flex-1">
              <div className="font-semibold text-lg text-gray-900">{r.name}</div>
              <div className="text-sm text-gray-600">{r.cuisine} • {r.deliveryTime}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm text-gray-700">{r.rating}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-700">{r.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((r) => (
        <div key={r.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
          {/* Restaurant Image */}
          <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-5xl">
            {r.image}
          </div>
          {/* Restaurant Name */}
          <div className="font-semibold text-lg text-gray-900 text-center mb-2">{r.name}</div>
          {/* Restaurant Details */}
          <div className="text-center space-y-1">
            <div className="text-sm text-gray-600">{r.cuisine}</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-yellow-500">⭐</span>
              <span className="text-sm text-gray-700">{r.rating}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-700">{r.deliveryTime}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-700">{r.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


