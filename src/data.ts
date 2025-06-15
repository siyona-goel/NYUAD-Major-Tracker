export const majors = [
  { name: "Arab Crossroads Studies", type: "Multidisciplinary" },
  { name: "Art and Art History", type: "Arts and Humanities" },
  { name: "Bioengineering", type: "Engineering" },
  { name: "Biology", type: "Science" },
  { name: "Business, Organizations and Society", type: "Social Science" },
  { name: "Chemistry", type: "Science" },
  { name: "Civil Engineering", type: "Engineering" },
  { name: "Computer Engineering", type: "Engineering" },
  { name: "Computer Science", type: "Science" },
  { name: "Economics", type: "Social Science" },
  { name: "Electrical Engineering", type: "Engineering" },
  { name: "Film and New Media", type: "Arts and Humanities" },
  { name: "General Engineering", type: "Engineering" },
  { name: "History", type: "Arts and Humanities" },
  { name: "Interactive Media", type: "Arts and Humanities" },
  { name: "Legal Studies", type: "Multidisciplinary" },
  { name: "Literature and Creative Writing", type: "Arts and Humanities" },
  { name: "Mathematics", type: "Science" },
  { name: "Mechanical Engineering", type: "Engineering" },
  { name: "Music", type: "Arts and Humanities" },
  { name: "Philosophy", type: "Arts and Humanities" },
  { name: "Physics", type: "Science" },
  { name: "Political Science", type: "Social Science" },
  { name: "Psychology", type: "Science" },
  { name: "Social Research and Public Policy", type: "Social Science" },
  { name: "Theater", type: "Arts and Humanities" },
];

export const minors = [
    { name: "African Studies", type: "Multidisciplinary" },
    { name: "Ancient World", type: "Multidisciplinary" },
    { name: "Anthropology", type: "Arts and Humanities" },
    { name: "Applied Mathematics", type: "Science" },
    { name: "Arab Crossroads Studies", type: "Multidisciplinary" },
    { name: "Arab Music Studies", type: "Multidisciplinary" },
    { name: "Arabic", type: "Arts and Humanities" },
    { name: "Art History", type: "Arts and Humanities" },
    { name: "Art Practice", type: "Arts and Humanities" },
    { name: "Chinese", type: "Arts and Humanities" },
    { name: "Computer Science", type: "Science" },
    { name: "Creative Writing", type: "Arts and Humanities" },
    { name: "Design", type: "Arts and Humanities" },
    { name: "Economics", type: "Social Science" },
    { name: "Engineering", type: "Engineering" },
    { name: "Environmental Studies", type: "Multidisciplinary" },
    { name: "Film and New Media", type: "Arts and Humanities" },
    { name: "Gender Studies", type: "Arts and Humanities" },
    { name: "Heritage Studies", type: "Multidisciplinary" },
    { name: "History", type: "Arts and Humanities" },
    { name: "Interactive Media", type: "Multidisciplinary" },
    { name: "Legal Studies", type: "Multidisciplinary" },
    { name: "Literature", type: "Arts and Humanities" },
    { name: "Music", type: "Arts and Humanities" },
    { name: "Natural Science", type: "Science" },
    { name: "Peace Studies", type: "Multidisciplinary" },
    { name: "Philosophy", type: "Arts and Humanities" },
    { name: "Political Science", type: "Social Science" },
    { name: "Psychology", type: "Science" },
    { name: "Social Research and Public Policy", type: "Social Science" },
    { name: "Sound and Music Computing", type: "Multidisciplinary" },
    { name: "Theater", type: "Arts and Humanities" },
    { name: "Urbanization", type: "Multidisciplinary"},
];

export interface Course {
  id: string;
  name: string;
  credits: number;
  description: string;
  prerequisites?: string[];
  type: 'core' | 'major' | 'minor' | 'elective' | 'pe' | 'islamic';
  semester_offered: ('fall' | 'spring' | 'summer')[];
  major?: string;
  minor?: string;
  required?: boolean;
  category?: string;
  completed?: boolean;
}

export const courses: Course[] = [
  // Core Courses
  {
    id: 'CORE-AD-001',
    name: 'First-Year Writing Seminar',
    credits: 4,
    description: 'Development of analytical and critical writing skills.',
    type: 'core',
    semester_offered: ['fall', 'spring'],
    required: true,
    category: 'Writing'
  },
  {
    id: 'CORE-AD-002',
    name: 'Core Colloquium',
    credits: 4,
    description: 'Interdisciplinary exploration of global challenges.',
    type: 'core',
    semester_offered: ['fall', 'spring'],
    required: true,
    category: 'Colloquium'
  },
  {
    id: 'CORE-AD-003',
    name: 'Quantitative Reasoning',
    credits: 4,
    description: 'Mathematical concepts and applications.',
    type: 'core',
    semester_offered: ['fall', 'spring'],
    required: true,
    category: 'Mathematics'
  },

  // Computer Science Major Courses
  {
    id: 'CS-AD-101',
    name: 'Introduction to Computer Science',
    credits: 4,
    description: 'Fundamental concepts of programming and computer science.',
    type: 'major',
    semester_offered: ['fall', 'spring'],
    major: 'Computer Science',
    required: true,
    category: 'Foundation'
  },
  {
    id: 'CS-AD-102',
    name: 'Data Structures',
    credits: 4,
    description: 'Implementation and analysis of fundamental data structures.',
    prerequisites: ['CS-AD-101'],
    type: 'major',
    semester_offered: ['spring'],
    major: 'Computer Science',
    required: true,
    category: 'Foundation'
  },
  {
    id: 'CS-AD-201',
    name: 'Computer Systems Organization',
    credits: 4,
    description: 'Computer architecture and organization fundamentals.',
    prerequisites: ['CS-AD-102'],
    type: 'major',
    semester_offered: ['fall'],
    major: 'Computer Science',
    required: true,
    category: 'Systems'
  },
  {
    id: 'CS-AD-202',
    name: 'Algorithms',
    credits: 4,
    description: 'Design and analysis of algorithms and their complexity.',
    prerequisites: ['CS-AD-102'],
    type: 'major',
    semester_offered: ['spring'],
    major: 'Computer Science',
    required: true,
    category: 'Theory'
  },
  {
    id: 'CS-AD-210',
    name: 'Software Engineering',
    credits: 4,
    description: 'Software development methodologies and practices.',
    prerequisites: ['CS-AD-102'],
    type: 'major',
    semester_offered: ['fall'],
    major: 'Computer Science',
    required: true,
    category: 'Software Development'
  },
  {
    id: 'CS-AD-220',
    name: 'Networks',
    credits: 4,
    description: 'Computer networking principles and protocols.',
    prerequisites: ['CS-AD-201'],
    type: 'major',
    semester_offered: ['spring'],
    major: 'Computer Science',
    required: false,
    category: 'Systems'
  },
  {
    id: 'CS-AD-301',
    name: 'Theory of Computation',
    credits: 4,
    description: 'Formal languages, automata, and computability.',
    prerequisites: ['CS-AD-202'],
    type: 'major',
    semester_offered: ['fall'],
    major: 'Computer Science',
    required: true,
    category: 'Theory'
  },
  {
    id: 'CS-AD-302',
    name: 'Artificial Intelligence',
    credits: 4,
    description: 'Fundamental concepts in AI and machine learning.',
    prerequisites: ['CS-AD-202'],
    type: 'major',
    semester_offered: ['spring'],
    major: 'Computer Science',
    required: false,
    category: 'Applications'
  },
  {
    id: 'CS-AD-310',
    name: 'Operating Systems',
    credits: 4,
    description: 'OS principles, process management, and scheduling.',
    prerequisites: ['CS-AD-201'],
    type: 'major',
    semester_offered: ['fall'],
    major: 'Computer Science',
    required: true,
    category: 'Systems'
  },
  {
    id: 'CS-AD-315',
    name: 'Database Systems',
    credits: 4,
    description: 'Database design, querying, and management.',
    prerequisites: ['CS-AD-102'],
    type: 'major',
    semester_offered: ['spring'],
    major: 'Computer Science',
    required: false,
    category: 'Applications'
  },
  {
    id: 'CS-AD-401',
    name: 'Senior Project I',
    credits: 4,
    description: 'First part of the capstone project.',
    prerequisites: ['CS-AD-210', 'CS-AD-301'],
    type: 'major',
    semester_offered: ['fall'],
    major: 'Computer Science',
    required: true,
    category: 'Capstone'
  },
  {
    id: 'CS-AD-402',
    name: 'Senior Project II',
    credits: 4,
    description: 'Second part of the capstone project.',
    prerequisites: ['CS-AD-401'],
    type: 'major',
    semester_offered: ['spring'],
    major: 'Computer Science',
    required: true,
    category: 'Capstone'
  },

  // Economics Major Courses
  {
    id: 'ECON-AD-101',
    name: 'Principles of Microeconomics',
    credits: 4,
    description: 'Introduction to microeconomic theory and applications.',
    type: 'major',
    semester_offered: ['fall', 'spring'],
    major: 'Economics',
    required: true,
    category: 'Foundation'
  },
  {
    id: 'ECON-AD-102',
    name: 'Principles of Macroeconomics',
    credits: 4,
    description: 'Introduction to macroeconomic theory and policies.',
    type: 'major',
    semester_offered: ['fall', 'spring'],
    major: 'Economics',
    required: true,
    category: 'Foundation'
  },
  {
    id: 'ECON-AD-201',
    name: 'Intermediate Microeconomics',
    credits: 4,
    description: 'Advanced microeconomic theory.',
    prerequisites: ['ECON-AD-101', 'CORE-AD-003'],
    type: 'major',
    semester_offered: ['fall'],
    major: 'Economics',
    required: true,
    category: 'Intermediate'
  },
  {
    id: 'ECON-AD-202',
    name: 'Intermediate Macroeconomics',
    credits: 4,
    description: 'Advanced macroeconomic theory.',
    prerequisites: ['ECON-AD-102', 'CORE-AD-003'],
    type: 'major',
    semester_offered: ['spring'],
    major: 'Economics',
    required: true,
    category: 'Intermediate'
  },
  {
    id: 'ECON-AD-301',
    name: 'Econometrics',
    credits: 4,
    description: 'Statistical methods in economic analysis.',
    prerequisites: ['ECON-AD-201', 'ECON-AD-202'],
    type: 'major',
    semester_offered: ['fall'],
    major: 'Economics',
    required: true,
    category: 'Methods'
  },

  // Interactive Media Minor Courses
  {
    id: 'IM-AD-101',
    name: 'Introduction to Interactive Media',
    credits: 4,
    description: 'Fundamentals of digital media and interactivity.',
    type: 'minor',
    semester_offered: ['fall'],
    minor: 'Interactive Media',
    required: true,
    category: 'Foundation'
  },
  {
    id: 'IM-AD-102',
    name: 'Interaction Design Studio',
    credits: 4,
    description: 'Design principles for interactive experiences.',
    prerequisites: ['IM-AD-101'],
    type: 'minor',
    semester_offered: ['spring'],
    minor: 'Interactive Media',
    required: true,
    category: 'Core'
  },
  {
    id: 'IM-AD-201',
    name: 'Communications Lab',
    credits: 4,
    description: 'Digital communication technologies and practices.',
    prerequisites: ['IM-AD-102'],
    type: 'minor',
    semester_offered: ['fall'],
    minor: 'Interactive Media',
    required: true,
    category: 'Core'
  },
  {
    id: 'IM-AD-301',
    name: 'Application Development',
    credits: 4,
    description: 'Creating interactive applications and experiences.',
    prerequisites: ['IM-AD-201'],
    type: 'minor',
    semester_offered: ['spring'],
    minor: 'Interactive Media',
    required: false,
    category: 'Advanced'
  },
  {
    id: 'IM-AD-302',
    name: 'Digital Sound Design',
    credits: 4,
    description: 'Audio production and sound design for media.',
    prerequisites: ['IM-AD-102'],
    type: 'minor',
    semester_offered: ['fall'],
    minor: 'Interactive Media',
    required: false,
    category: 'Advanced'
  },

  // Psychology Minor Courses
  {
    id: 'PSYCH-AD-101',
    name: 'Introduction to Psychology',
    credits: 4,
    description: 'Overview of psychological theories and research.',
    type: 'minor',
    semester_offered: ['fall', 'spring'],
    minor: 'Psychology',
    required: true,
    category: 'Foundation'
  },
  {
    id: 'PSYCH-AD-102',
    name: 'Research Methods in Psychology',
    credits: 4,
    description: 'Scientific methods in psychological research.',
    prerequisites: ['PSYCH-AD-101'],
    type: 'minor',
    semester_offered: ['spring'],
    minor: 'Psychology',
    required: true,
    category: 'Methods'
  },
  {
    id: 'PSYCH-AD-201',
    name: 'Cognitive Psychology',
    credits: 4,
    description: 'Study of mental processes and cognition.',
    prerequisites: ['PSYCH-AD-101'],
    type: 'minor',
    semester_offered: ['fall'],
    minor: 'Psychology',
    required: false,
    category: 'Core'
  },
  {
    id: 'PSYCH-AD-202',
    name: 'Social Psychology',
    credits: 4,
    description: 'Human behavior in social contexts.',
    prerequisites: ['PSYCH-AD-101'],
    type: 'minor',
    semester_offered: ['spring'],
    minor: 'Psychology',
    required: false,
    category: 'Core'
  },

  // PE Requirements
  {
    id: 'PE-AD-101',
    name: 'Physical Education: Swimming',
    credits: 1,
    description: 'Swimming techniques and water safety.',
    type: 'pe',
    semester_offered: ['fall', 'spring', 'summer'],
    required: true
  },
  {
    id: 'PE-AD-102',
    name: 'Physical Education: Tennis',
    credits: 1,
    description: 'Tennis fundamentals and gameplay.',
    type: 'pe',
    semester_offered: ['fall', 'spring'],
    required: true
  },

  // Islamic Studies Requirement
  {
    id: 'ISST-AD-101',
    name: 'Islamic Studies: History and Culture',
    credits: 4,
    description: 'Introduction to Islamic history, culture, and traditions.',
    type: 'islamic',
    semester_offered: ['fall', 'spring'],
    required: true
  },
  {
    id: 'ISST-AD-102',
    name: 'Contemporary Islamic Thought',
    credits: 4,
    description: 'Modern Islamic intellectual traditions and debates.',
    type: 'islamic',
    semester_offered: ['spring'],
    required: true
  }
]; 