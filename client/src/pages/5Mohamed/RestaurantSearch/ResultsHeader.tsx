import { Grid3X3, List } from "lucide-react";

interface Props {
  resultsCount: number;
  view: 'grid' | 'list';
  onChange: (v: 'grid' | 'list') => void;
}

export default function ResultsHeader({ resultsCount, view, onChange }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-gray-900">{resultsCount}</span>
        <span className="text-lg text-gray-600">restaurants found</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">View:</span>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            className={`p-3 ${view === 'grid' ? 'bg-[#4318D1] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => onChange('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            className={`p-3 border-l border-gray-300 ${view === 'list' ? 'bg-[#4318D1] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => onChange('list')}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


