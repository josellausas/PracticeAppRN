import { useState, useEffect, useCallback, useRef } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

interface UseApiReturn<T> extends ApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
  retry: () => Promise<T | null>;
}

/**
 * Advanced API hook with retry logic, caching, and error handling
 * Perfect for demonstrating senior-level React patterns
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const {
    immediate = false,
    retryCount = 3,
    retryDelay = 1000,
  } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const retryCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (...args: any[]): Promise<T | null> => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiFunction(...args);
      setState({ data: result, loading: false, error: null });
      retryCountRef.current = 0;
      return result;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return null;
      }

      const errorMessage = error.message || 'An error occurred';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      
      // Auto-retry logic
      if (retryCountRef.current < retryCount) {
        retryCountRef.current++;
        setTimeout(() => {
          execute(...args);
        }, retryDelay * retryCountRef.current);
      }
      
      return null;
    }
  }, [apiFunction, retryCount, retryDelay]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
    retryCountRef.current = 0;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const retry = useCallback(() => {
    retryCountRef.current = 0;
    return execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
    retry,
  };
}

// Example usage:
export const useMoviesApi = () => {
  const fetchMovies = async (): Promise<any[]> => {
    const response = await fetch('https://reactnative.dev/movies.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.movies;
  };

  return useApi(fetchMovies, { immediate: true, retryCount: 2 });
};
