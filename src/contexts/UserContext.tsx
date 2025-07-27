import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authApi, progressApi, apiUtils, type User, type UserProgress } from '../utils/api';

interface UserContextType {
  currentUser: User | null;
  userProgress: UserProgress | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
  updateProgress: (progress: Partial<UserProgress>) => Promise<void>;
  updateCourseCompletion: (courseName: string, category: string, completed: boolean) => Promise<void>;
  resetProgress: () => Promise<void>;
  clearError: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    console.error('useUser must be used within a UserProvider');
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (apiUtils.isAuthenticated()) {
          const { user } = await authApi.getMe();
          setCurrentUser(user);
          
          // Load user progress
          try {
            const { progress } = await progressApi.getUserProgress();
            setUserProgress(progress);
          } catch (progressError) {
            console.warn('Could not load user progress:', progressError);
            // Create default progress if none exists
            setUserProgress({
              userId: user.id,
              email: user.email,
              majors: [],
              minors: [],
              mandatory: {},
              majorReqs: {},
              minorReqs: {},
              majorElectives: {},
              minorElectives: {},
              major2Reqs: {},
              minor2Reqs: {},
              major2Electives: {},
              minor2Electives: {},
              capstone: {},
              generalElectives: 0,
              totalCreditsEarned: 0,
              degreeCompletionPercentage: 0,
              lastUpdated: new Date().toISOString()
            });
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Clear invalid token
        authApi.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { user } = await authApi.login({ email, password });
      setCurrentUser(user);
      
      // Load user progress
      try {
        const { progress } = await progressApi.getUserProgress();
        setUserProgress(progress);
      } catch (progressError) {
        console.warn('Could not load user progress:', progressError);
        // Create default progress
        setUserProgress({
          userId: user.id,
          email: user.email,
          majors: [],
          minors: [],
          mandatory: {},
          majorReqs: {},
          minorReqs: {},
          majorElectives: {},
          minorElectives: {},
          major2Reqs: {},
          minor2Reqs: {},
          major2Electives: {},
          minor2Electives: {},
          capstone: {},
          generalElectives: 0,
          totalCreditsEarned: 0,
          degreeCompletionPercentage: 0,
          lastUpdated: new Date().toISOString()
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { user } = await authApi.register({ email, password, firstName, lastName });
      setCurrentUser(user);
      
      // Create default progress for new user
      setUserProgress({
        userId: user.id,
        email: user.email,
        majors: [],
        minors: [],
        mandatory: {},
        majorReqs: {},
        minorReqs: {},
        majorElectives: {},
        minorElectives: {},
        major2Reqs: {},
        minor2Reqs: {},
        major2Electives: {},
        minor2Electives: {},
        capstone: {},
        generalElectives: 0,
        totalCreditsEarned: 0,
        degreeCompletionPercentage: 0,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setCurrentUser(null);
    setUserProgress(null);
    setError(null);
  };

  const updateProgress = async (progress: Partial<UserProgress>) => {
    try {
      setError(null);
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const { progress: updatedProgress } = await progressApi.updateUserProgress(progress);
      setUserProgress(updatedProgress);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update progress');
      throw error;
    }
  };

  const updateCourseCompletion = async (courseName: string, category: string, completed: boolean) => {
    try {
      setError(null);
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const { progress: updatedProgress } = await progressApi.updateCourseCompletion(
        courseName,
        category,
        completed
      );
      setUserProgress(updatedProgress);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update course completion');
      throw error;
    }
  };

  const resetProgress = async () => {
    try {
      setError(null);
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const { progress: resetProgress } = await progressApi.resetUserProgress();
      setUserProgress(resetProgress);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to reset progress');
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: UserContextType = {
    currentUser,
    userProgress,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProgress,
    updateCourseCompletion,
    resetProgress,
    clearError
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 