import { useCallback, useEffect, useState } from 'react';

export interface StatsData {
  visitors: number;
  conversions: number;
  lastUpdated: Date;
  totalConversions: number;
  sessionConversions: number;
}

const STORAGE_KEY = 'convert-to-json-stats';
const SESSION_KEY = 'convert-to-json-session';

export const useStats = () => {
  const [stats, setStats] = useState<StatsData>({
    visitors: 0,
    conversions: 0,
    lastUpdated: new Date(),
    totalConversions: 0,
    sessionConversions: 0
  });

  // Cargar estadísticas desde localStorage
  const loadStats = useCallback(() => {
    try {
      const savedStats = localStorage.getItem(STORAGE_KEY);
      const sessionStats = sessionStorage.getItem(SESSION_KEY);
      
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        const sessionData = sessionStats ? JSON.parse(sessionStats) : { sessionConversions: 0 };
        
        setStats({
          ...parsedStats,
          lastUpdated: new Date(parsedStats.lastUpdated),
          sessionConversions: sessionData.sessionConversions || 0
        });
      } else {
        // Estadísticas iniciales
        const initialStats: StatsData = {
          visitors: Math.floor(Math.random() * 100) + 50,
          conversions: 0,
          lastUpdated: new Date(),
          totalConversions: 0,
          sessionConversions: 0
        };
        setStats(initialStats);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStats));
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ sessionConversions: 0 }));
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  // Guardar estadísticas en localStorage
  const saveStats = useCallback((newStats: StatsData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ 
        sessionConversions: newStats.sessionConversions 
      }));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  }, []);

  // Incrementar conversiones
  const incrementConversions = useCallback(() => {
    setStats(prevStats => {
      const newStats = {
        ...prevStats,
        conversions: prevStats.conversions + 1,
        totalConversions: prevStats.totalConversions + 1,
        sessionConversions: prevStats.sessionConversions + 1,
        lastUpdated: new Date()
      };
      saveStats(newStats);
      return newStats;
    });
  }, [saveStats]);

  // Resetear conversiones de sesión
  const resetSessionConversions = useCallback(() => {
    setStats(prevStats => {
      const newStats = {
        ...prevStats,
        sessionConversions: 0
      };
      saveStats(newStats);
      return newStats;
    });
  }, [saveStats]);

  // Cargar estadísticas al montar el componente
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    incrementConversions,
    resetSessionConversions,
    loadStats
  };
}; 