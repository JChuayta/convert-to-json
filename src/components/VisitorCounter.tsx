import { useEffect, useState } from 'react';

interface VisitorCounterProps {
  pageId?: string;
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ pageId = 'convert-to-json' }) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // Usar el mismo servicio que idimetrix
        const response = await fetch(`https://visitor-badge.laobi.icu/api/visitor?page_id=${pageId}`);
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setVisitorCount(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
  }, [pageId]);

  if (loading) {
    return (
      <div className="visitor-counter">
        Cargando visitantes...
      </div>
    );
  }

  if (visitorCount === null) {
    return null;
  }

  return (
    <div className="visitor-counter">
      👥 Visitantes: {visitorCount.toLocaleString()}
    </div>
  );
};

export default VisitorCounter; 