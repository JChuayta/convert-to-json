import { useEffect } from 'react';
import { useStats } from '../hooks/useStats';

const Stats: React.FC = () => {
  const { stats, incrementConversions } = useStats();

  // Exponer la función globalmente para que App.tsx pueda usarla
  useEffect(() => {
    (window as any).incrementConversions = incrementConversions;
    return () => {
      delete (window as any).incrementConversions;
    };
  }, [incrementConversions]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '1rem'
    }}>
      <div className="stats-badge">
        📊 Conversiones: {stats.conversions.toLocaleString()}
      </div>
      <div className="stats-badge">
        🎯 Total: {stats.totalConversions.toLocaleString()}
      </div>
      <div className="stats-badge">
        🔄 Sesión: {stats.sessionConversions.toLocaleString()}
      </div>
      <div className="stats-badge">
        🕒 Última: {stats.lastUpdated.toLocaleDateString('es-ES')}
      </div>
    </div>
  );
};

export default Stats; 