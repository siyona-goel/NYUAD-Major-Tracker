import { useState } from "react";
import { useNavigate } from "react-router-dom";
import headingImg from "../assets/heading.png";

const majors = [
  "Arab Crossroads Studies (BA)", 
  "Art and Art History (BA)", 
  "Bioengineering (BS)", 
  "Biology (BS)",
  "Business, Organizations and Society (BA)",
  "Chemistry (BS)",
  "Civil Engineering (BS)",
  "Computer Engineering (BS)",
  "Computer Science (BS)",
  "Economics (BA)",
  "Electrical Engineering (BS)",
  "Film and New Media (BA)",
  "General Engineering (BS)",
  "History (BA)",
  "Interactive Media (BA)",
  "Legal Studies (BA)",
  "Literature and Creative Writing (BA)",
  "Mathematics (BS)",
  "Mechanical Engineering (BS)",
  "Music (BA)",
  "Philosophy (BA)",
  "Physics (BS)",
  "Political Science (BA)",
  "Psychology (BA)",
  "Social Research and Public Policy (BA)",
  "Theater (BA)"
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredMajors = majors.filter((major) =>
    major.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-10">
      {/* Heading Image */}
      <img
        src={headingImg}
        alt="NYUAD Major Tracker Heading"
        className="w-full max-w-2xl mx-auto mb-8"
        style={{ display: "block" }}
      />
      {/* Select a Major Text */}
      <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: "#b794f4" }}>
        Select a Major
      </h2>
      {/* Search Box */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a major..."
        className="mb-8 px-6 py-3 w-full max-w-md rounded-lg border-none outline-none text-lg bg-gray-900 text-purple-300 placeholder-purple-400 shadow focus:ring-2 focus:ring-purple-500 transition"
      />
      {/* Majors List */}
      <div className="w-full max-w-md flex flex-col gap-4 items-center">
        {filteredMajors.length === 0 ? (
          <div className="text-purple-400 text-lg mt-8">search not found</div>
        ) : (
          filteredMajors.map((major, idx) => (
            <button
              key={major}
              onClick={() => navigate(`/major/${major}`)}
              className="w-full py-4 rounded-lg text-xl font-semibold bg-gradient-to-r from-purple-700/60 to-purple-500/60 text-purple-100 shadow-md hover:from-purple-600/90 hover:to-purple-400/90 transition"
            >
              {major}
            </button>
          ))
        )}
      </div>
    </div>
  );
} 