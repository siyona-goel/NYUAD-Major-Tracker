import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { courses } from "../data";

const MANDATORY_REQUIREMENTS = [
  { id: "fyws", label: "First Year Writing Seminar (FYWS)" },
  { id: "pe1", label: "PE - 1" },
  { id: "pe2", label: "PE - 2", prerequisite: "pe1" },
  { id: "colloquia", label: "Colloquia" },
  { id: "fieldcol1", label: "Field Colloquia (J-term 1)" },
  { id: "fieldcol2", label: "Field Colloquia (J-term 2)", prerequisite: "fieldcol1" },
  { id: "quantitative", label: "Quantitative Reasoning" },
  { id: "experimental", label: "Experimental Inquiry" },
  { id: "islamic", label: "Islamic Studies" },
  { id: "coreadt", label: "Core: Arts, Design and Technology" },
  { id: "corecea", label: "Core: Cultural Exploration Analysis" },
  { id: "coredd", label: "Core: Data and Discovery" },
  { id: "corests", label: "Core: Structures of Thought and Society" },
];

const PLACEHOLDER_MAJOR_REQS = [
  { id: "major1-req1", label: "Major Required Course 1" },
  { id: "major1-req2", label: "Major Required Course 2", prerequisite: "major1-req1" },
];
const PLACEHOLDER_MINOR_REQS = [
  { id: "minor1-req1", label: "Minor Required Course 1" },
  { id: "minor1-req2", label: "Minor Required Course 2", prerequisite: "minor1-req1" },
];
const PLACEHOLDER_MAJOR2_REQS = [
  { id: "major2-req1", label: "Second Major Required Course 1" },
  { id: "major2-req2", label: "Second Major Required Course 2", prerequisite: "major2-req1" },
];
const PLACEHOLDER_MINOR2_REQS = [
  { id: "minor2-req1", label: "Second Minor Required Course 1" },
  { id: "minor2-req2", label: "Second Minor Required Course 2", prerequisite: "minor2-req1" },
];

const PLACEHOLDER_MAJOR_ELECTIVES = [
  { id: "majore1", label: "Major Elective 1" },
  { id: "majore2", label: "Major Elective 2" },
  { id: "majore3", label: "Major Elective 3" },
];
const PLACEHOLDER_MINOR_ELECTIVES = [
  { id: "minore1", label: "Minor Elective 1" },
  { id: "minore2", label: "Minor Elective 2" },
  { id: "minore3", label: "Minor Elective 3" },
];
const PLACEHOLDER_MAJOR2_ELECTIVES = [
  { id: "major2e1", label: "Second Major Elective 1" },
  { id: "major2e2", label: "Second Major Elective 2" },
];
const PLACEHOLDER_MINOR2_ELECTIVES = [
  { id: "minor2e1", label: "Second Minor Elective 1" },
  { id: "minor2e2", label: "Second Minor Elective 2" },
];

const CAPSTONE = [
  { id: "capstone1", label: "Capstone Project 1" },
  { id: "capstone2", label: "Capstone Project 2", prerequisite: "capstone1" },
];

const MILESTONES = [
  { percent: 25, message: "A quarter down, cutie." },
  { percent: 50, message: "Halfway hotshot" },
  { percent: 75, message: "So close you can taste the diploma" },
  { percent: 100, message: "Degree? Completed it, babe." },
];

function getHeading(majors: string[], minors: string[]): string {
  if (majors.length === 2) return `Double major in ${majors[0]} and ${majors[1]}`;
  if (majors.length === 1 && minors.length === 1) return `Major in ${majors[0]}, with a minor in ${minors[0]}`;
  if (majors.length === 1 && minors.length === 2) return `Major in ${majors[0]}, with minors in ${minors[0]} and ${minors[1]}`;
  if (majors.length === 1) return `Major in ${majors[0]}`;
  return "";
}

interface CheckboxItem {
  id: string;
  label: string;
  prerequisite?: string;
}

type SectionState = Record<string, boolean>;

type SetSection = React.Dispatch<React.SetStateAction<SectionState>>;

// Utility to convert course to CheckboxItem
function courseToCheckboxItem(course: any) {
  return {
    id: `${course.major || ''}-${course.minor || ''}-${course.name}`.replace(/\s+/g, '-').toLowerCase(),
    label: course.name
  };
}

export default function Courses() {
  const location = useLocation();
  const navigate = useNavigate();
  const { majors = [], minors = [] } = location.state || {};

  // State for checkboxes
  const [mandatory, setMandatory] = useState<SectionState>({});
  const [majorReqs, setMajorReqs] = useState<SectionState>({});
  const [minorReqs, setMinorReqs] = useState<SectionState>({});
  const [majorElectives, setMajorElectives] = useState<SectionState>({});
  const [minorElectives, setMinorElectives] = useState<SectionState>({});
  const [major2Reqs, setMajor2Reqs] = useState<SectionState>({});
  const [minor2Reqs, setMinor2Reqs] = useState<SectionState>({});
  const [major2Electives, setMajor2Electives] = useState<SectionState>({});
  const [minor2Electives, setMinor2Electives] = useState<SectionState>({});
  const [capstone, setCapstone] = useState<SectionState>({});

  // Filter courses for selected major/minor
  const major = majors[0] || null;
  const minor = minors[0] || null;

  const majorReqCourses = courses.filter(c => c.major === major && c['major req']);
  const majorElecCourses = courses.filter(c => c.major === major && c['maj elec']);
  const minorReqCourses = courses.filter(c => c.minor === minor && c['minor req']);
  const minorElecCourses = courses.filter(c => c.minor === minor && c['min elec']);

  const majorReqItems = majorReqCourses.map(courseToCheckboxItem);
  const majorElecItems = majorElecCourses.map(courseToCheckboxItem);
  const minorReqItems = minorReqCourses.map(courseToCheckboxItem);
  const minorElecItems = minorElecCourses.map(courseToCheckboxItem);

  // Gather all checked course IDs
  const checkedCourseIds = useMemo(() => [
    ...Object.keys(majorReqs).filter(k => majorReqs[k]),
    ...Object.keys(minorReqs).filter(k => minorReqs[k]),
    ...Object.keys(major2Reqs).filter(k => major2Reqs[k]),
    ...Object.keys(minor2Reqs).filter(k => minor2Reqs[k]),
    ...Object.keys(majorElectives).filter(k => majorElectives[k]),
    ...Object.keys(minorElectives).filter(k => minorElectives[k]),
    ...Object.keys(major2Electives).filter(k => major2Electives[k]),
    ...Object.keys(minor2Electives).filter(k => minor2Electives[k]),
    ...Object.keys(capstone).filter(k => capstone[k]),
    ...Object.keys(mandatory).filter(k => mandatory[k]),
  ], [majorReqs, minorReqs, major2Reqs, minor2Reqs, majorElectives, minorElectives, major2Electives, minor2Electives, capstone, mandatory]);

  // Calculate credits achieved
  const credits = useMemo(() => {
    return checkedCourseIds.reduce((sum, id) => {
      // Handle mandatory requirements
      if (id === "pe1" || id === "pe2" || 
          id === "quantitative" || id === "experimental" || id === "islamic") {
        return sum; // PE, Quantitative Reasoning, Experimental Inquiry, and Islamic Studies don't count towards credits
      }
      if (id === "fieldcol1" || id === "fieldcol2") {
        return sum + 3; // J-term courses are 3 credits
      }
      if (id.startsWith("fyws") || id.startsWith("colloquia") || 
          id.startsWith("core")) {
        return sum + 4; // All other mandatory requirements are 4 credits
      }
      
      // Handle major/minor requirements and electives
      if (id.startsWith("major") || id.startsWith("minor") || id.startsWith("capstone")) {
        return sum + 4; // All major/minor courses and capstone are 4 credits
      }
      
      return sum;
    }, 0);
  }, [checkedCourseIds]);

  // Calculate degree progress (including 0-credit courses)
  const totalRequirements = MANDATORY_REQUIREMENTS.length + 
    PLACEHOLDER_MAJOR_REQS.length + 
    PLACEHOLDER_MINOR_REQS.length + 
    PLACEHOLDER_MAJOR2_REQS.length + 
    PLACEHOLDER_MINOR2_REQS.length + 
    CAPSTONE.length;
  
  const completedRequirements = checkedCourseIds.length;
  const percentComplete = Math.round((completedRequirements / totalRequirements) * 100);

  const totalCredits = 128;

  // Milestone message
  const milestone = MILESTONES.slice().reverse().find(m => percentComplete >= m.percent);

  // Elective selection logic (max 2 total)
  const totalElectivesSelected = [
    ...Object.values(majorElectives),
    ...Object.values(minorElectives),
    ...Object.values(major2Electives),
    ...Object.values(minor2Electives),
  ].filter(Boolean).length;
  const electivesDisabled = totalElectivesSelected >= 2;

  // Count checked electives for each group
  const majorElectivesChecked = Object.values(majorElectives).filter(Boolean).length;
  const minorElectivesChecked = Object.values(minorElectives).filter(Boolean).length;

  // Checkbox handler with prerequisite logic
  function handleCheck(section: SectionState, setSection: SetSection, id: string, prerequisite?: string) {
    if (prerequisite && !section[prerequisite]) return;
    setSection((prev: SectionState) => ({ ...prev, [id]: !prev[id] }));
  }

  // Update renderCheckboxes to accept a shouldDisable function
  function renderCheckboxes(
    items: CheckboxItem[],
    section: SectionState,
    setSection: SetSection,
    shouldDisable?: (item: CheckboxItem) => boolean
  ) {
    return items.map(item => (
      <label key={item.id} className="flex items-center gap-2 mb-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={Boolean(section[item.id])}
          disabled={
            (!!(item.prerequisite && !section[item.prerequisite])) ||
            (shouldDisable && shouldDisable(item))
          }
          onChange={() => handleCheck(section, setSection, item.id, item.prerequisite)}
          className="accent-purple-500 w-5 h-5"
        />
        <span className={item.prerequisite && !section[item.prerequisite] ? "text-gray-500" : ""}>{item.label}</span>
      </label>
    ));
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-300 text-center w-full">
            {getHeading(majors, minors)}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="absolute right-8 top-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-400/30 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-purple-400 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-purple-300">Back</span>
          </button>
        </div>
        {/* Progress Circles */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-10">
          <div className="w-48 h-48 flex flex-col items-center">
            <CircularProgressbar
              value={credits}
              maxValue={totalCredits}
              text={`${credits} / 128`}
              styles={buildStyles({
                pathColor: "#a78bfa",
                textColor: "#fff",
                trailColor: "#312e81",
                textSize: "20px",
              })}
            />
            <div className="mt-3 text-purple-300 font-semibold text-center text-lg">Credits Achieved</div>
          </div>
          <div className="w-48 h-48 flex flex-col items-center">
            <CircularProgressbar
              value={percentComplete}
              maxValue={100}
              text={`${percentComplete}%`}
              styles={buildStyles({
                pathColor: "#a78bfa",
                textColor: "#fff",
                trailColor: "#312e81",
                textSize: "20px",
              })}
            />
            <div className="mt-3 text-purple-300 font-semibold text-center text-lg">Degree Progress</div>
          </div>
        </div>
        {/* Milestone Message */}
        {milestone && (
          <div className="text-center text-xl font-bold text-purple-400 mb-8 animate-pulse">{milestone.message}</div>
        )}
        {/* Mandatory Requirements */}
        <div className="bg-gray-900/70 border border-purple-400/30 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">Mandatory Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>{renderCheckboxes(MANDATORY_REQUIREMENTS.slice(0, 7), mandatory, setMandatory)}</div>
            <div>{renderCheckboxes(MANDATORY_REQUIREMENTS.slice(7), mandatory, setMandatory)}</div>
          </div>
        </div>
        {/* Major/Minor/Double Major Requirements */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1 bg-gray-900/70 border border-purple-400/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-200 mb-4 text-center">Major Requirements</h3>
            {renderCheckboxes(majorReqItems, majorReqs, setMajorReqs)}
            <div className="mt-6">
              <h4 className="font-semibold text-purple-300 mb-2">Major Electives</h4>
              {renderCheckboxes(
                majorElecItems,
                majorElectives,
                setMajorElectives,
                (item) => !majorElectives[item.id] && majorElectivesChecked >= 2
              )}
            </div>
          </div>
          <div className="flex-1 bg-gray-900/70 border border-purple-400/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-200 mb-4 text-center">Minor Requirements</h3>
            {renderCheckboxes(minorReqItems, minorReqs, setMinorReqs)}
            <div className="mt-6">
              <h4 className="font-semibold text-purple-300 mb-2">Minor Electives</h4>
              {renderCheckboxes(
                minorElecItems,
                minorElectives,
                setMinorElectives,
                (item) => !minorElectives[item.id] && minorElectivesChecked >= 2
              )}
            </div>
          </div>
        </div>
        {/* Capstone Section */}
        <div className="bg-gray-900/70 border border-purple-400/30 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">CAPSTONE</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            {renderCheckboxes(CAPSTONE, capstone, setCapstone)}
          </div>
        </div>
      </div>
    </div>
  );
} 