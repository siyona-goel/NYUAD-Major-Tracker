import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { courses } from "../data";
import { useUser } from "../contexts/UserContext";

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

// Create a mapping from checkbox IDs to course objects for quick lookup
const courseIdToCourse: Record<string, any> = {};
courses.forEach(course => {
  const id = `${course.major || ''}-${course.minor || ''}-${course.name}`.replace(/\s+/g, '-').toLowerCase();
  courseIdToCourse[id] = course;
});

export default function Courses() {
  const location = useLocation();
  const navigate = useNavigate();
  const { majors = [], minors = [] } = location.state || {};
  
  // Add error handling for user context
  let userContext;
  try {
    userContext = useUser();
  } catch (error) {
    console.error('User context error:', error);
    // Fallback to basic functionality without user context
    userContext = {
      currentUser: null,
      userProgress: null,
      updateProgress: () => {},
      saveProgress: () => {}
    };
  }
  
  const { currentUser, userProgress, updateProgress } = userContext;

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
  const [generalElectives, setGeneralElectives] = useState<number>(0);

  // Restore progress on mount
  useEffect(() => {
    if (userProgress) {
      setMandatory(userProgress.mandatory || {});
      setMajorReqs(userProgress.majorReqs || {});
      setMinorReqs(userProgress.minorReqs || {});
      setMajorElectives(userProgress.majorElectives || {});
      setMinorElectives(userProgress.minorElectives || {});
      setMajor2Reqs(userProgress.major2Reqs || {});
      setMinor2Reqs(userProgress.minor2Reqs || {});
      setMajor2Electives(userProgress.major2Electives || {});
      setMinor2Electives(userProgress.minor2Electives || {});
      setCapstone(userProgress.capstone || {});
      setGeneralElectives(userProgress.generalElectives || 0);
    }
  }, [userProgress]);

  // Debug logging
  console.log('Courses component rendered with:', {
    currentUser,
    hasUserProgress: !!userProgress,
    mandatoryCount: Object.keys(mandatory).length,
    majorReqsCount: Object.keys(majorReqs).length
  });

  // Save progress on any change (with debouncing to prevent too many saves)
  useEffect(() => {
    if (currentUser) {
      const timeoutId = setTimeout(() => {
        updateProgress({
          mandatory,
          majorReqs,
          minorReqs,
          majorElectives,
          minorElectives,
          major2Reqs,
          minor2Reqs,
          major2Electives,
          minor2Electives,
          capstone,
          generalElectives,
        });
      }, 500); // Debounce for 500ms
      
      return () => clearTimeout(timeoutId);
    }
  }, [mandatory, majorReqs, minorReqs, majorElectives, minorElectives, major2Reqs, minor2Reqs, major2Electives, minor2Electives, capstone, generalElectives, currentUser, updateProgress]);

  // Filter courses for selected major/minor
  const major = majors[0] || null;
  const minor = minors[0] || null;

  const majorReqCourses = courses.filter(c => c.major === major && c['major req']);
  const majorElecCourses = courses.filter(c => c.major === major && c['maj elec']);
  const minorReqCourses = courses.filter(c => c.minor === minor && c['minor req']);
  const minorElecCourses = courses.filter(c => c.minor === minor && c['min elec']);

  // Second major and minor courses (if they exist)
  const major2 = majors[1] || null;
  const minor2 = minors[1] || null;
  const major2ReqCourses = courses.filter(c => c.major === major2 && c['major req']);
  const major2ElecCourses = courses.filter(c => c.major === major2 && c['maj elec']);
  const minor2ReqCourses = courses.filter(c => c.minor === minor2 && c['minor req']);
  const minor2ElecCourses = courses.filter(c => c.minor === minor2 && c['min elec']);

  const majorReqItems = majorReqCourses.map(courseToCheckboxItem);
  const majorElecItems = majorElecCourses.map(courseToCheckboxItem);
  const minorReqItems = minorReqCourses.map(courseToCheckboxItem);
  const minorElecItems = minorElecCourses.map(courseToCheckboxItem);
  const major2ReqItems = major2ReqCourses.map(courseToCheckboxItem);
  const major2ElecItems = major2ElecCourses.map(courseToCheckboxItem);
  const minor2ReqItems = minor2ReqCourses.map(courseToCheckboxItem);
  const minor2ElecItems = minor2ElecCourses.map(courseToCheckboxItem);

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
    let totalCredits = checkedCourseIds.reduce((sum, id) => {
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
      // For major/minor/capstone, use the actual course credits if available
      if (courseIdToCourse[id]) {
        return sum + (courseIdToCourse[id].credits || 0);
      }
      // Fallback for any other case (shouldn't happen)
      return sum;
    }, 0);
    
    // Add general electives credits (4 credits per course)
    totalCredits += generalElectives * 4;
    
    return totalCredits;
  }, [checkedCourseIds, generalElectives]);

  // Calculate degree progress (now based on credits achieved)
  const percentComplete = Math.round((credits / 128) * 100);

  const totalCredits = 128;

  // Milestone message
  const milestone = MILESTONES.slice().reverse().find(m => percentComplete >= m.percent);

  // Elective selection logic (max 2 per category)
  const majorElectivesSelected = Object.values(majorElectives).filter(Boolean).length;
  const minorElectivesSelected = Object.values(minorElectives).filter(Boolean).length;
  // Note: major2Electives and minor2Electives are not rendered in the UI, so we don't count them
  const major2ElectivesSelected = Object.values(major2Electives).filter(Boolean).length;
  const minor2ElectivesSelected = Object.values(minor2Electives).filter(Boolean).length;



  // Checkbox handler with prerequisite logic
  function handleCheck(section: SectionState, setSection: SetSection, id: string, prerequisite?: string) {
    // Check if this is a course checkbox (exists in courseIdToCourse)
    if (courseIdToCourse[id]) {
      const course = courseIdToCourse[id];
      if (course.prerequisites && Array.isArray(course.prerequisites)) {
        // Check if all prerequisites are checked
        const prereqIds = course.prerequisites.map((prereqName: string) => {
          // Find the course with this name and generate its ID
          const prereqCourse = courses.find(c => c.name === prereqName && c.major === course.major && c.minor === course.minor);
          if (!prereqCourse) return null;
          return `${prereqCourse.major || ''}-${prereqCourse.minor || ''}-${prereqCourse.name}`.replace(/\s+/g, '-').toLowerCase();
        }).filter(Boolean);
        const allPrereqsChecked = prereqIds.every((prereqId: string) => {
          // Find which section this prereq would be in
          return (
            majorReqs[prereqId] ||
            minorReqs[prereqId] ||
            majorElectives[prereqId] ||
            minorElectives[prereqId] ||
            major2Reqs[prereqId] ||
            minor2Reqs[prereqId] ||
            major2Electives[prereqId] ||
            minor2Electives[prereqId]
          );
        });
        if (!allPrereqsChecked) {
          alert("You must complete all prerequisites before selecting this course.");
          return;
        }
      }
    }
    if (prerequisite && !section[prerequisite]) return;
    setSection((prev: SectionState) => {
      const updated = { ...prev, [id]: !prev[id] };
      return updated;
    });
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
            onClick={() => navigate("/dashboard")}
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
        {majors.length === 2 && minors.length === 0 ? (
          // Show two major requirement boxes side by side for double major
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1 bg-gray-900/70 border border-purple-400/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-200 mb-4 text-center">{majors[0]} Requirements</h3>
              {renderCheckboxes(majorReqItems, majorReqs, setMajorReqs)}
              <div className="mt-6">
                <h4 className="font-semibold text-purple-300 mb-2">{majors[0]} Electives <span className="text-purple-400/70 text-sm">(Choose 2)</span></h4>
                {renderCheckboxes(
                  majorElecItems,
                  majorElectives,
                  setMajorElectives,
                  (item) => !majorElectives[item.id] && majorElectivesSelected >= 2
                )}
              </div>
            </div>
            <div className="flex-1 bg-gray-900/70 border border-purple-400/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-200 mb-4 text-center">{majors[1]} Requirements</h3>
              {renderCheckboxes(major2ReqItems, major2Reqs, setMajor2Reqs)}
              <div className="mt-6">
                <h4 className="font-semibold text-purple-300 mb-2">{majors[1]} Electives <span className="text-purple-400/70 text-sm">(Choose 2)</span></h4>
                {renderCheckboxes(
                  major2ElecItems,
                  major2Electives,
                  setMajor2Electives,
                  (item) => !major2Electives[item.id] && major2ElectivesSelected >= 2
                )}
              </div>
            </div>
          </div>
        ) : (
          // Show major and minor requirements side by side for other combinations
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1 bg-gray-900/70 border border-purple-400/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-200 mb-4 text-center">Major Requirements</h3>
              {renderCheckboxes(majorReqItems, majorReqs, setMajorReqs)}
              <div className="mt-6">
                <h4 className="font-semibold text-purple-300 mb-2">Major Electives <span className="text-purple-400/70 text-sm">(Choose 2)</span></h4>
                {renderCheckboxes(
                  majorElecItems,
                  majorElectives,
                  setMajorElectives,
                  (item) => !majorElectives[item.id] && majorElectivesSelected >= 2
                )}
              </div>
            </div>
            <div className="flex-1 bg-gray-900/70 border border-purple-400/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-200 mb-4 text-center">Minor Requirements</h3>
              {renderCheckboxes(minorReqItems, minorReqs, setMinorReqs)}
              <div className="mt-6">
                <h4 className="font-semibold text-purple-300 mb-2">Minor Electives <span className="text-purple-400/70 text-sm">(Choose 2)</span></h4>
                {renderCheckboxes(
                  minorElecItems,
                  minorElectives,
                  setMinorElectives,
                  (item) => !minorElectives[item.id] && minorElectivesSelected >= 2
                )}
              </div>
            </div>
          </div>
        )}
        

        
        {/* Second Minor Requirements (if double minor and not double major) */}
        {minors.length > 1 && majors.length !== 2 && (
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1 bg-gray-900/70 border border-purple-400/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-200 mb-4 text-center">Second Minor Requirements</h3>
              {renderCheckboxes(minor2ReqItems, minor2Reqs, setMinor2Reqs)}
              <div className="mt-6">
                <h4 className="font-semibold text-purple-300 mb-2">Second Minor Electives <span className="text-purple-400/70 text-sm">(Choose 2)</span></h4>
                {renderCheckboxes(
                  minor2ElecItems,
                  minor2Electives,
                  setMinor2Electives,
                  (item) => !minor2Electives[item.id] && minor2ElectivesSelected >= 2
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* General Electives Section */}
        <div className="bg-gray-900/70 border border-purple-400/30 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">General Electives</h2>
          <div className="flex flex-col items-center">
            <div className="text-center mb-4">
              <label htmlFor="generalElectives" className="block text-purple-200 mb-2 font-medium">
                Number of General Elective Courses Completed:
              </label>
              <input
                id="generalElectives"
                type="number"
                min="0"
                max="20"
                value={generalElectives}
                onChange={(e) => setGeneralElectives(parseInt(e.target.value) || 0)}
                className="w-24 px-3 py-2 bg-gray-800/50 border border-purple-400/30 rounded-lg text-white text-center focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20"
              />
            </div>
            <div className="text-purple-300 text-sm">
              Total Credits from General Electives: {generalElectives * 4}
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