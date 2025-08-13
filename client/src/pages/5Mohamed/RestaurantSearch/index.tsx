import { useState } from "react";
import NavBar from "../LandingPage/Navbar";
import Hero from "./Hero";
import SearchControls from "./SearchControls";
import Filters from "./Filters";
import ResultsHeader from "./ResultsHeader";
import api from "../../../services/api";

export default function FoodieExpressApp() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [resultsCount, setResultsCount] = useState<number>(0);

  const handleSearch = async (query: string) => {
    const q = String(query || '').trim();
    if (!q) {
      setResultsCount(0);
      return;
    }
    try {
      const { data } = await api.get('/search', { params: { query: q } });
      const total = typeof data?.total === 'number' ? data.total : Array.isArray(data?.data) ? data.data.length : 0;
      setResultsCount(total);
    } catch (err) {
      setResultsCount(0);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <Hero />

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <SearchControls onSearch={handleSearch} />
            <Filters />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <ResultsHeader resultsCount={resultsCount} view={view} onChange={setView} />
        </div>
      </div>
    </div>
  );
}
