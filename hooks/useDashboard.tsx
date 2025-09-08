import { getHeight } from '@/utils/size';
import { useState } from 'react';

export const useDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // Chart data for different time ranges
  const chartData = {
    '6h': [
      { value: 300, label: '12PM' },
      { value: 450, label: '2PM' },
      { value: 380, label: '4PM' },
      { value: 520, label: '6PM' },
      { value: 480, label: '8PM' },
      { value: 580, label: '10PM' },
      { value: 520, label: '12AM' },
    ],
    '12h': [
      { value: 250, label: '6AM' },
      { value: 380, label: '8AM' },
      { value: 320, label: '10AM' },
      { value: 450, label: '12PM' },
      { value: 520, label: '2PM' },
      { value: 480, label: '4PM' },
      { value: 580, label: '6PM' },
    ],
    '24h': [
      { value: 280, label: 'Sun' },
      { value: 420, label: 'Mon' },
      { value: 350, label: 'Tue' },
      { value: 480, label: 'Wed' },
      { value: 580, label: 'Thu' },
      { value: 520, label: 'Fri' },
      { value: 450, label: 'Sat' },
    ],
    '1W': [
      { value: 200, label: 'Week 1' },
      { value: 350, label: 'Week 2' },
      { value: 280, label: 'Week 3' },
      { value: 420, label: 'Week 4' },
      { value: 380, label: 'Week 5' },
      { value: 520, label: 'Week 6' },
      { value: 580, label: 'Week 7' },
    ],
    '1M': [
      { value: 220, label: 'Jan' },
      { value: 380, label: 'Feb' },
      { value: 320, label: 'Mar' },
      { value: 450, label: 'Apr' },
      { value: 400, label: 'May' },
      { value: 520, label: 'Jun' },
      { value: 580, label: 'Jul' },
    ],
    ALL: [
      { value: 180, label: '2020' },
      { value: 320, label: '2021' },
      { value: 280, label: '2022' },
      { value: 420, label: '2023' },
      { value: 380, label: '2024' },
      { value: 520, label: '2025' },
    ],
  };

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
  };

  const getCurrentPrice = () => {
    const currentData = chartData[selectedTimeRange as keyof typeof chartData];
    return currentData[currentData.length - 1]?.value || 510;
  };

  const getPricePosition = () => {
    const currentPrice = getCurrentPrice();
    return getHeight(15) + (getHeight(160) - (currentPrice / 580) * getHeight(160));
  };

  return {
    // State
    selectedTimeRange,
    
    // Data
    chartData,
    
    // Functions
    handleTimeRangeChange,
    getCurrentPrice,
    getPricePosition,
  };
};
