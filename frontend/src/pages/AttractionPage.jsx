import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api/axios';
import { fetchWikiImage } from '../utils/fetchWikiImage';

const parseSections = (markdown) => {
  const regex = /##\s*(.+?)\n([\s\S]*?)(?=\n##\s|$)/g;
  const sections = {};
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    sections[match[1].trim()] = match[2].trim();
  }
  return sections;
};

const parseListItems = (content = '') =>
  content
    .split('\n')
    .filter((line) => line.trim().startsWith('-'))
    .map((line) => line.replace(/^-\s*/, '').trim());

function AttractionPage() {
  const [searchParams] = useSearchParams();
  const destinationName = searchParams.get('destination');
  const attractionName = searchParams.get('name');
  const navigate = useNavigate();

  const [heroImage, setHeroImage] = useState('');
  const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = await fetchWikiImage(attractionName, destinationName);
        if (url) setHeroImage(url);
      } catch {
        // no image found, page still works without one
      }

      try {
        const res = await api.get(
          `/attractions/${encodeURIComponent(destinationName)}/${encodeURIComponent(attractionName)}`
        );
        setSections(parseSections(res.data.info));
      } catch {
        setSections({ 'History & Background': 'We could not load information about this place right now.' });
      }

      setLoading(false);
    };

    fetchData();
  }, [destinationName, attractionName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading {attractionName}...</p>
      </div>
    );
  }

  const nearby = parseListItems(sections['Nearby Attractions']);
  const food = parseListItems(sections['Local Food to Try']);

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="relative w-full h-80 sm:h-[26rem] overflow-hidden">
        {heroImage ? (
          <img src={heroImage} alt={attractionName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-blue-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/25 hover:-translate-x-1 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to {destinationName}
        </button>

        <div className="absolute bottom-6 left-0 right-0 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
            {attractionName}
          </h1>
          <p className="text-white/90 text-lg mt-1">{destinationName}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-5">

        {sections['History & Background'] && (
          <div
            className="relative overflow-hidden bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-7 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            <div className="absolute -top-14 -right-14 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-60" />
            <div className="relative flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">History &amp; Background</h2>
                <p className="text-gray-600 leading-relaxed">{sections['History & Background']}</p>
              </div>
            </div>
          </div>
        )}

        {sections['Why Visit'] && (
          <div
            className="relative overflow-hidden bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-7 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="absolute -bottom-14 -left-14 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-60" />
            <div className="relative flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Why Visit</h2>
                <p className="text-gray-600 leading-relaxed">{sections['Why Visit']}</p>
              </div>
            </div>
          </div>
        )}

        {sections['Best Time to Visit'] && (
          <div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 text-white p-6 sm:p-7 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full" />
            <div className="relative flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/70 mb-1">Best Time to Visit</p>
                <p className="text-lg font-semibold">{sections['Best Time to Visit']}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">

          {nearby.length > 0 && (
            <div
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-800"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <h2 className="text-base font-bold text-gray-900">Nearby Attractions</h2>
              </div>
              <div className="flex flex-col gap-2">
                {nearby.map((item) => (
                  <div
                    key={item}
                    className="text-sm text-gray-600 bg-gray-50 rounded-xl px-3.5 py-2.5 hover:bg-gray-100 hover:translate-x-1 transition-all duration-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {food.length > 0 && (
            <div
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-800"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                <h2 className="text-base font-bold text-gray-900">Local Food to Try</h2>
              </div>
              <div className="flex flex-col gap-2">
                {food.map((item) => (
                  <div
                    key={item}
                    className="text-sm text-gray-600 bg-gray-50 rounded-xl px-3.5 py-2.5 hover:bg-gray-100 hover:translate-x-1 transition-all duration-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div
          className="opacity-0 animate-fade-in-up flex justify-center pt-4"
          style={{ animationDelay: '500ms' }}
        >
          <Link
            to={`/itinerary?destination=${encodeURIComponent(destinationName)}`}
            className="inline-flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to {destinationName} overview
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AttractionPage;