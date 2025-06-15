import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import headingImg from "../assets/heading.png";
import { majors, minors } from "../data";

interface Toast {
  id: number;
  message: string;
  type: 'add' | 'remove';
}

interface SearchResult {
  name: string;
  type: string;
  category: 'major' | 'minor';
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [selectedMinors, setSelectedMinors] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [keyboardIndex, setKeyboardIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredMajors = majors.filter((major) =>
    major.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMinors = minors.filter((minor) =>
    minor.name.toLowerCase().includes(search.toLowerCase())
  );

  // Combine and format search results
  const searchResults: SearchResult[] = [
    ...filteredMajors.map(major => ({ 
      name: major.name, 
      type: major.type, 
      category: 'major' as const 
    })),
    ...filteredMinors.map(minor => ({ 
      name: minor.name, 
      type: minor.type, 
      category: 'minor' as const 
    }))
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
        setKeyboardIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset keyboard index when search changes
  useEffect(() => {
    setKeyboardIndex(-1);
  }, [search]);

  const showToast = (message: string, type: 'add' | 'remove') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 2000);
  };

  const handleMajorSelect = (major: string) => {
    const isRemoving = selectedMajors.includes(major);
    showToast(
      isRemoving ? `Removed ${major} from majors` : `Added ${major} to majors`,
      isRemoving ? 'remove' : 'add'
    );
    setSelectedMajors(prev =>
      isRemoving ? prev.filter((m) => m !== major) : [...prev, major]
    );
  };

  const handleMinorSelect = (minor: string) => {
    const isRemoving = selectedMinors.includes(minor);
    showToast(
      isRemoving ? `Removed ${minor} from minors` : `Added ${minor} to minors`,
      isRemoving ? 'remove' : 'add'
    );
    setSelectedMinors(prev =>
      isRemoving ? prev.filter((m) => m !== minor) : [...prev, minor]
    );
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchFocused || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setKeyboardIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setKeyboardIndex(prev => prev > -1 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (keyboardIndex >= 0 && keyboardIndex < searchResults.length) {
          const result = searchResults[keyboardIndex];
          if (result.category === 'major') {
            handleMajorSelect(result.name);
          } else {
            handleMinorSelect(result.name);
          }
          setSearch("");
          setIsSearchFocused(false);
          setKeyboardIndex(-1);
        }
        break;
      case 'Escape':
        setIsSearchFocused(false);
        setKeyboardIndex(-1);
        break;
    }
  };

  const handleSearchResultClick = (result: SearchResult) => {
    if (result.category === 'major') {
      handleMajorSelect(result.name);
    } else {
      handleMinorSelect(result.name);
    }
    setSearch("");
    setIsSearchFocused(false);
    setKeyboardIndex(-1);
  };

  const handleProceed = () => {
    navigate("/courses", {
      state: { majors: selectedMajors, minors: selectedMinors },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-6 py-3 rounded-lg backdrop-blur-md border shadow-lg
              transform transition-all duration-300 animate-slide-in
              ${toast.type === 'add' 
                ? 'bg-purple-700/30 border-purple-400/50 text-purple-100 shadow-purple-500/20' 
                : 'bg-gray-800/30 border-gray-600/50 text-gray-200 shadow-gray-900/20'
              }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'add' ? (
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      <img
        src={headingImg}
        alt="NYUAD Major Tracker Heading"
        className="w-full max-w-2xl mx-auto mb-8 mix-blend-screen brightness-100"
      />

      <div className="w-full max-w-4xl mb-8 relative" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search for majors or minors..."
            className="w-full px-6 py-4 bg-gray-800/20 backdrop-blur-sm border border-purple-400/30 
              rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60
              focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400/50">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {isSearchFocused && search && searchResults.length > 0 && (
          <div className="absolute w-full mt-2 bg-gray-800/95 backdrop-blur-md border border-purple-400/30 
            rounded-lg shadow-lg overflow-hidden z-10">
            <div className="p-2">
              {searchResults.map((result, index) => (
                <div
                  key={`${result.category}-${result.name}`}
                  onClick={() => handleSearchResultClick(result)}
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 rounded-md
                    ${index === keyboardIndex ? 'bg-purple-700/60 text-white' : ''}
                    ${(result.category === 'major' ? selectedMajors : selectedMinors).includes(result.name)
                      ? 'bg-purple-700/40 text-white'
                      : 'hover:bg-gray-700/50 text-purple-200'
                    }`}
                >
                  <div className="font-medium">{result.name}</div>
                  <div className="text-sm text-purple-400/70">
                    {result.category === 'major' ? 'Major' : 'Minor'} - {result.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: "#b794f4" }}>
            Select Major(s)
          </h2>
          <div className="flex flex-col gap-3">
            {majors.map((major) => (
              <div
                key={major.name}
                onClick={() => handleMajorSelect(major.name)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-opacity-20 ${
                  selectedMajors.includes(major.name)
                    ? "bg-purple-700/30 border-purple-400 text-white shadow-[0_0_15px_rgba(167,139,250,0.3)] before:absolute before:inset-0 before:bg-purple-500/20 before:blur-sm before:-z-10"
                    : "bg-gray-800/20 border-purple-300/30 text-purple-300 hover:bg-gray-700/30 hover:border-purple-400/50 hover:shadow-[0_0_10px_rgba(167,139,250,0.1)]"
                } relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <p className="font-semibold relative z-10">{major.name}</p>
                <p className="text-sm text-purple-400/80 relative z-10">{major.type}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: "#b794f4" }}>
            Select Minor(s)
          </h2>
          <div className="flex flex-col gap-3">
            {minors.map((minor) => (
              <div
                key={minor.name}
                onClick={() => handleMinorSelect(minor.name)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-opacity-20 ${
                  selectedMinors.includes(minor.name)
                    ? "bg-purple-700/30 border-purple-400 text-white shadow-[0_0_15px_rgba(167,139,250,0.3)] before:absolute before:inset-0 before:bg-purple-500/20 before:blur-sm before:-z-10"
                    : "bg-gray-800/20 border-purple-300/30 text-purple-300 hover:bg-gray-700/30 hover:border-purple-400/50 hover:shadow-[0_0_10px_rgba(167,139,250,0.1)]"
                } relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <p className="font-semibold relative z-10">{minor.name}</p>
                <p className="text-sm text-purple-400/80 relative z-10">{minor.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={handleProceed}
        className="mt-10 px-8 py-3 rounded-lg text-xl font-semibold bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:from-green-600 hover:to-teal-600 transition disabled:opacity-50"
        disabled={selectedMajors.length === 0}
      >
        Proceed
      </button>
    </div>
  );
} 