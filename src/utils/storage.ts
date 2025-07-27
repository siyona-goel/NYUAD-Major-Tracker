export interface UserProgress {
  email: string;
  majors: string[];
  minors: string[];
  mandatory: Record<string, boolean>;
  majorReqs: Record<string, boolean>;
  minorReqs: Record<string, boolean>;
  majorElectives: Record<string, boolean>;
  minorElectives: Record<string, boolean>;
  major2Reqs: Record<string, boolean>;
  minor2Reqs: Record<string, boolean>;
  major2Electives: Record<string, boolean>;
  minor2Electives: Record<string, boolean>;
  capstone: Record<string, boolean>;
  generalElectives: number;
  lastUpdated: number;
}

const STORAGE_KEY = 'nyuad_major_tracker_progress';

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    const allProgress = existingData ? JSON.parse(existingData) : {};
    
    allProgress[progress.email] = {
      ...progress,
      lastUpdated: Date.now()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
};

export const loadUserProgress = (email: string): UserProgress | null => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) return null;
    
    const allProgress = JSON.parse(existingData);
    return allProgress[email] || null;
  } catch (error) {
    console.error('Error loading user progress:', error);
    return null;
  }
};

export const deleteUserProgress = (email: string): void => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) return;
    
    const allProgress = JSON.parse(existingData);
    delete allProgress[email];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error deleting user progress:', error);
  }
};

export const getAllUserEmails = (): string[] => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) return [];
    
    const allProgress = JSON.parse(existingData);
    return Object.keys(allProgress);
  } catch (error) {
    console.error('Error getting user emails:', error);
    return [];
  }
}; 