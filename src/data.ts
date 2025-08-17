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
  
  name: string;
  credits: number;  
  prerequisites?: string[];  
  major?: string;
  minor?: string;
  'major req'?: boolean;
  'minor req'?: boolean;
  'maj elec'?: boolean;
  'min elec'?: boolean;
}

export const courses = [
  // Computer Science
  {
    name: 'Introduction to Computer Science',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': true,
    'minor req': true,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },
  {
    name: 'Calculus w/ Applications to Science & Engr',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },
  {
    name: 'Discrete Mathematics',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': true,
    'minor req': true,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },
  {
    name: 'Data Structures',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': true,
    'minor req': true,
    'maj elec': false,
    'min elec': false,
    prerequisites: ['Introduction to Computer Science']
  },
  {
    name: 'Computer Systems Organization',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: ['Data Structures']
  },
  {
    name: 'Algorithms',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': true,
    'minor req': true,
    'maj elec': false,
    'min elec': false,
    prerequisites: ['Discrete Mathematics']
  },
  {
    name: 'Software Engineering',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: ['Algorithms', 'Data Structures']
  },
  {
    name: 'Computer Networks',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: ['Algorithms', 'Computer Systems Organization']
  },  
  {
    name: 'Operating Systems',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: ['Algorithms', 'Computer Systems Organization']
  },
  {
    name: 'Research Seminar in Computer Science',
    credits: 2,
    major: 'Computer Science',
    minor: null,
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: ['Algorithms', 'Computer Systems Organization', 'Calculus w/ Applications to Science & Engr']
  },
  {
    name: 'Database Systems',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Natural Language Processing',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Algorithmic Foundations of Data Science',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Algorithms', 'Data Structures']
  },
  {
    name: 'Computational Social Science',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Machine Learning',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Algorithms']
  },
  {
    name: 'Arabic Computational Linguistics',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Data Structures']
  },
  {
    name: 'Computer Security',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Quantum Computing',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Advanced Topics in AI and Machine Learning',
    credits: 4,
    major: 'Computer Science',
    minor: 'Computer Science',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },

  // Economics
  {
    name: 'Principles of Microeconomics',
    credits: 4,
    major: 'Economics',
    minor: 'Economics',
    'major req': true,
    'minor req': true,
    'maj elec': false,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Principles of Macroeconomics',
    credits: 4,
    major: 'Economics',
    minor: 'Economics',
    'major req': true,
    'minor req': true,
    'maj elec': false,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Intermediate Microeconomics',
    credits: 4,
    major: 'Economics',
    minor: 'Economics',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },
  {
    name: 'Intermediate Macroeconomics',
    credits: 4,
    major: 'Economics',
    minor: 'Economics',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },
  {
    name: 'Econometrics',
    credits: 4,
    major: 'Economics',
    minor: 'Economics',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },  

// Interactive Media
  {
    name: 'Introduction to Interactive Media',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': true,
    'minor req': true,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },  
  {
    name: 'Communications Lab',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': true,
    'minor req': true,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },
  {
    name: 'Communication and Technology',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },
  {
    name: 'Understanding Interactive Media - Critical Questions & Theories',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },
  {
    name: 'Circuit Breakers!',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Introduction to Digital Humanities',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Machine Lab',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Software Art: Image',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Interactive Media', 'Decoding Nature']
  },
  {
    name: 'Software Art: Text',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Interactive Media']
  },
  {
    name: 'Decoding Nature',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Interactive Media']
  },
  {
    name: 'Games and Play',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Interactive Media']
  },
  {
    name: 'Live Coding',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Interactive Media']
  },
  {
    name: 'Connections Lab',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Interactive Media']
  },
  {
    name: 'Future Punk',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Bioart Practices',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Designing Virtual Worlds',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Interactive Media', 'Communications Lab', 'Decoding Nature']
  },
  {
    name: 'Desert Media Art',
    credits: 4,
    major: 'Interactive Media',
    minor: 'Interactive Media',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Interactive Media']
  },

// Psychology
  {
    name: 'Introduction to Psychology',
    credits: 4,
    major: 'Psychology',
    minor: 'Psychology',
    'major req': true,
    'minor req': true,
    'maj elec': false,
    'min elec': false,
    prerequisites: null
  },
  {
    name: 'Research Methods in Psychology',
    credits: 4,
    major: null,
    minor: 'Psychology',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Biopsychology',
    credits: 4,
    major: 'Psychology',
    minor: 'Psychology',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': true,
    prerequisites: null
  },
  {
    name: 'Statistics for Psychology',
    credits: 4,
    major: 'Psychology',
    minor: 'Psychology',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': true,
    prerequisites: null
  }
  {
    name: 'Developmental Psychology',
    credits: 4,
    major: 'Psychology',
    minor: 'Psychology',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Psychology']
  }
  {
    name: 'Social Psychology',
    credits: 4,
    major: 'Psychology',
    minor: 'Psychology',
    'major req': false,
    'minor req': false,
    'maj elec': true,
    'min elec': true,
    prerequisites: ['Introduction to Psychology']
  }
  {
    name: 'Research Seminar in Psychology',
    credits: 2,
    major: 'Psychology',
    minor: 'Psychology',
    'major req': true,
    'minor req': false,
    'maj elec': false,
    'min elec': false,
    prerequisites: ['Introduction to Psychology', 'Research Methods in Psychology']
  }
]; 