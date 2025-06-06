import { useEffect, useState } from 'react';
import { Eye, Users } from 'lucide-react';

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate real-time visitor counting
    const storedCount = localStorage.getItem('portfolioVisitors');
    const currentCount = storedCount ? parseInt(storedCount) : Math.floor(Math.random() * 1000) + 500;
    
    setVisitors(currentCount);
    localStorage.setItem('portfolioVisitors', (currentCount + 1).toString());
    
    const timer = setTimeout(() => setIsVisible(true), 2000);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newCount = currentCount + Math.floor(Math.random() * 3) + 1;
      setVisitors(newCount);
      localStorage.setItem('portfolioVisitors', newCount.toString());
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="hologram-effect p-4 rounded-xl backdrop-blur-lg">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Eye className="w-5 h-5 text-portfolio-accent animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-portfolio-accent rounded-full animate-ping"></div>
          </div>
          <div>
            <div className="text-sm text-gray-300 font-['Fira_Code']">Live Visitors</div>
            <div className="text-lg font-bold text-portfolio-accent font-['Orbitron']">
              {visitors.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}