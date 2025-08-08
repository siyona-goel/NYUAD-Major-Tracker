const API_BASE_URL = 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  lastLogin?: string;
}

export interface UserProgress {
  userId: string;
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
  totalCreditsEarned: number;
  degreeCompletionPercentage: number;
  lastUpdated: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Helper function to set auth token
const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Helper function to remove auth token
const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Helper function to make API requests
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // Handle non-JSON responses (like rate limit errors)
      const text = await response.text();
      throw new Error(text || 'API request failed');
    }
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Authentication API calls
export const authApi = {
  // Register a new user
  register: async (userData: RegisterData): Promise<{ user: User; token: string }> => {
    const response = await apiRequest<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    setAuthToken(response.token);
    return response;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await apiRequest<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setAuthToken(response.token);
    return response;
  },

  // Get current user
  getMe: async (): Promise<{ user: User }> => {
    return await apiRequest<{ user: User }>('/auth/me');
  },

  // Logout (client-side only)
  logout: (): void => {
    removeAuthToken();
  },
};

// Progress API calls
export const progressApi = {
  // Get user progress
  getUserProgress: async (): Promise<{ progress: UserProgress }> => {
    return await apiRequest<{ progress: UserProgress }>('/progress');
  },

  // Update user progress
  updateUserProgress: async (progress: Partial<UserProgress>): Promise<{ progress: UserProgress }> => {
    return await apiRequest<{ progress: UserProgress }>('/progress', {
      method: 'PUT',
      body: JSON.stringify(progress),
    });
  },

  // Update specific course completion
  updateCourseCompletion: async (
    courseName: string,
    category: string,
    completed: boolean
  ): Promise<{ progress: UserProgress }> => {
    return await apiRequest<{ progress: UserProgress }>('/progress/course', {
      method: 'PATCH',
      body: JSON.stringify({ courseName, category, completed }),
    });
  },

  // Reset user progress
  resetUserProgress: async (): Promise<{ progress: UserProgress }> => {
    return await apiRequest<{ progress: UserProgress }>('/progress', {
      method: 'DELETE',
    });
  },
};

// Health check API call
export const healthApi = {
  checkHealth: async (): Promise<{ status: string; message: string; timestamp: string }> => {
    return await apiRequest<{ status: string; message: string; timestamp: string }>('/health');
  },
};

// Export utility functions
export const apiUtils = {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },
}; 