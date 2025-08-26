import { RootState } from '../index';

export const selectSelectedTimeRange = (state: RootState) => state.guestDashboard.selectedTimeRange;
export const selectChartData = (state: RootState) => state.guestDashboard.chartData;
export const selectCurrentPrice = (state: RootState) => state.guestDashboard.currentPrice;
export const selectGoal = (state: RootState) => state.guestDashboard.goal;
export const selectDashboardLoading = (state: RootState) => state.guestDashboard.isLoading;
export const selectDashboardError = (state: RootState) => state.guestDashboard.error;

// Derived selectors
export const selectCurrentChartData = (state: RootState) => {
  const timeRange = state.guestDashboard.selectedTimeRange;
  return state.guestDashboard.chartData[timeRange] || [];
};

export const selectCurrentChartValue = (state: RootState) => {
  const currentData = selectCurrentChartData(state);
  return currentData[currentData.length - 1]?.value || 0;
}; 