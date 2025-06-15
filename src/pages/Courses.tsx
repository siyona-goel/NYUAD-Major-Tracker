import { useLocation, useNavigate } from "react-router-dom";
import { courses } from "../data";
import type { Course } from "../data";
import { useState } from "react";

export default function Courses() {
  const location = useLocation();
  const navigate = useNavigate();
  const { majors, minors } = location.state || { majors: [], minors: [] };
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  const coursesByType = {
    core: courses.filter(course => course.type === 'core'),
    major: courses.filter(course => course.type === 'major' && majors.includes(course.major!)),
    minor: courses.filter(course => course.type === 'minor' && minors.includes(course.minor!)),
    elective: courses.filter(course => course.type === 'elective'),
    pe: courses.filter(course => course.type === 'pe'),
    islamic: courses.filter(course => course.type === 'islamic')
  };

  const coursesByCategory = (courses: Course[]) => {
    return courses.reduce((acc, course) => {
      const category = course.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(course);
      return acc;
    }, {} as Record<string, Course[]>);
  };

  const getPrerequisiteNames = (prerequisites: string[] | undefined) => {
    if (!prerequisites) return [];
    return prerequisites.map(preId => {
      const course = courses.find(c => c.id === preId);
      return course ? course.name : preId;
    });
  };

  const canTakeCourse = (course: Course) => {
    if (!course.prerequisites) return true;
    return course.prerequisites.every(preId => completedCourses.includes(preId));
  };

  const toggleCourseCompletion = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    if (completedCourses.includes(courseId)) {
      // Check if this course is a prerequisite for any completed courses
      const isPrerequisiteForCompleted = courses.some(c => 
        completedCourses.includes(c.id) && 
        c.prerequisites?.includes(courseId)
      );

      if (isPrerequisiteForCompleted) {
        alert("Cannot uncheck this course as it is a prerequisite for other completed courses.");
        return;
      }

      setCompletedCourses(prev => prev.filter(id => id !== courseId));
    } else {
      if (!canTakeCourse(course)) {
        alert("Cannot complete this course until all prerequisites are completed.");
        return;
      }
      setCompletedCourses(prev => [...prev, courseId]);
    }
  };

  const calculateProgress = (courseList: Course[]) => {
    const required = courseList.filter(c => c.required);
    if (required.length === 0) return 0;
    const completed = required.filter(c => completedCourses.includes(c.id));
    return (completed.length / required.length) * 100;
  };

  const CourseCard = ({ course }: { course: Course }) => {
    const isSelected = selectedCourseId === course.id;
    const prerequisites = getPrerequisiteNames(course.prerequisites);
    const isCompleted = completedCourses.includes(course.id);
    const canTake = canTakeCourse(course);
    
    return (
      <div 
        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 backdrop-blur-sm border border-opacity-20 
          ${isCompleted 
            ? "bg-green-700/30 border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.3)]"
            : isSelected 
              ? "bg-purple-700/30 border-purple-400 shadow-[0_0_15px_rgba(167,139,250,0.3)]" 
              : canTake
                ? "bg-gray-800/20 border-purple-300/30 hover:bg-gray-700/30 hover:border-purple-400/50"
                : "bg-gray-800/10 border-red-300/30 opacity-60"
          } relative overflow-hidden group`}
        onClick={() => setSelectedCourseId(isSelected ? null : course.id)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-white">{course.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-purple-300 text-sm">{course.credits} cr</span>
            <div 
              onClick={(e) => {
                e.stopPropagation();
                toggleCourseCompletion(course.id);
              }}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-300 cursor-pointer relative
                ${!canTake && !isCompleted
                  ? "border-red-400/50 bg-red-400/10 cursor-not-allowed"
                  : isCompleted 
                    ? "border-green-400 bg-green-400/20" 
                    : "border-purple-400/50 hover:border-purple-400 bg-purple-400/10"
                }`}
            >
              {isCompleted && (
                <svg 
                  className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-purple-200/70 mb-2">{course.id}</p>
        
        {!canTake && !isCompleted && (
          <div className="text-xs text-red-400 mb-2">
            Prerequisites not met
          </div>
        )}

        {course.required && (
          <div className="text-xs text-yellow-400 mb-2">
            Required Course
          </div>
        )}
        
        {isSelected && (
          <>
            <p className="text-sm text-gray-300 mt-2">{course.description}</p>
            
            {prerequisites.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-semibold text-purple-300">Prerequisites:</p>
                <ul className="list-disc list-inside text-sm">
                  {prerequisites.map(pre => {
                    const preReqCourse = courses.find(c => c.name === pre);
                    const isPreReqCompleted = preReqCourse && completedCourses.includes(preReqCourse.id);
                    return (
                      <li 
                        key={pre} 
                        className={isPreReqCompleted ? "text-green-400" : "text-gray-300"}
                      >
                        {pre}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            
            <div className="mt-2">
              <p className="text-sm font-semibold text-purple-300">Offered in:</p>
              <div className="flex gap-2 mt-1">
                {course.semester_offered.map(semester => (
                  <span 
                    key={semester}
                    className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-200"
                  >
                    {semester}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const ProgressBar = ({ value }: { value: number }) => (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  const CourseSection = ({ 
    title, 
    courses: sectionCourses, 
    description 
  }: { 
    title: string; 
    courses: Course[]; 
    description?: string 
  }) => {
    const categorizedCourses = coursesByCategory(sectionCourses);
    const progress = calculateProgress(sectionCourses);

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-purple-300">{title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-200">{Math.round(progress)}% Complete</span>
            <div className="w-32">
              <ProgressBar value={progress} />
            </div>
          </div>
        </div>
        {description && <p className="text-gray-400 mb-6 text-sm">{description}</p>}
        
        {Object.entries(categorizedCourses).map(([category, categoryCourses]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-purple-400">Course Requirements & Progress</h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-400/30 
            hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group"
        >
          <svg
            className="w-5 h-5 text-purple-400 transform transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-purple-300">Back to Dashboard</span>
        </button>
      </div>
      
      <CourseSection 
        title="Core Requirements" 
        courses={coursesByType.core}
        description="Foundational courses required for all students"
      />
      
      {coursesByType.major.length > 0 && (
        <CourseSection 
          title="Major Requirements" 
          courses={coursesByType.major}
          description={`Required courses for your selected major${majors.length > 1 ? 's' : ''}: ${majors.join(', ')}`}
        />
      )}
      
      {coursesByType.minor.length > 0 && (
        <CourseSection 
          title="Minor Requirements" 
          courses={coursesByType.minor}
          description={`Required courses for your selected minor${minors.length > 1 ? 's' : ''}: ${minors.join(', ')}`}
        />
      )}
      
      <CourseSection 
        title="Electives" 
        courses={coursesByType.elective}
        description="Choose any three courses from this pool of electives"
      />
      
      <CourseSection 
        title="Physical Education Requirement" 
        courses={coursesByType.pe}
        description="Complete at least one PE course"
      />
      
      <CourseSection 
        title="Islamic Studies Requirement" 
        courses={coursesByType.islamic}
        description="Complete one course in Islamic Studies"
      />
    </div>
  );
} 