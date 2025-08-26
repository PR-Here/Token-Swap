# TokenSwap Project Structure

## Folder Organization

### `/src`

- **`components/`** - Reusable UI components

  - `Button.tsx`
  - `Text.tsx`
  - `TextInput.tsx`
  - `RatingStars.tsx`
  - `TermsAcceptance.tsx`

- **`constant/`** - App constants and configurations

  - `appScreenConstant.ts`
  - `colors.ts`
  - `fontName.ts`
  - `screenName.ts`

- **`hooks/`** - Custom React hooks

  - `useAppDispatch.ts` - Typed Redux dispatch hook
  - `useAppSelector.ts` - Typed Redux selector hook

- **`navigation/`** - Navigation configuration

  - `drawerNavigation.tsx` - Bottom tab navigation

- **`store/`** - Redux store and state management

  - `index.ts` - Main store setup
  - `slices/` - Redux slices
    - `dashboardSlice.ts` - Dashboard state
  - `selectors/` - Redux selectors
    - `dashboardSelectors.ts`
  - `middleware/` - Custom middleware
  - `types/` - TypeScript types

- **`screen/`** - App screens

  - `dashboard/` - Main dashboard
  - `guestDashboard/` - Guest dashboard
  - `login/` - Login screen
  - `onboarding/` - Onboarding screens
  - `register/` - Registration screen

- **`services/`** - API and external services

  - `api.ts` - Base API service

- **`types/`** - TypeScript type definitions

- **`utils/`** - Utility functions
  - `images/` - Image imports
  - `size/` - Responsive sizing
  - `helpers/` - Helper functions
  - `validation/` - Validation utilities

## Redux Toolkit Setup

### Store Configuration

- **Main Store**: `src/store/index.ts`
- **Slices**: Dashboard
- **Selectors**: Typed selectors for dashboard slice

### Usage Examples

#### Using Redux in Components

```typescript
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  selectSelectedTimeRange,
  setTimeRange,
} from '../store/slices/dashboardSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const timeRange = useAppSelector(selectSelectedTimeRange);

  const handleTimeRangeChange = (range: string) => {
    dispatch(setTimeRange(range));
  };
};
```

#### Selectors

```typescript
// Dashboard selectors
const timeRange = useAppSelector(selectSelectedTimeRange);
const chartData = useAppSelector(selectCurrentChartData);
const currentPrice = useAppSelector(selectCurrentPrice);
const goal = useAppSelector(selectGoal);
```

### State Structure

#### Dashboard State

```typescript
{
  selectedTimeRange: string;
  chartData: ChartData;
  currentPrice: string;
  goal: string;
  isLoading: boolean;
  error: string | null;
}
```

## Best Practices

1. **Use Typed Hooks**: Always use `useAppSelector` and `useAppDispatch`
2. **Selectors**: Use selectors to access state, not direct state access
3. **Async Operations**: Use async thunks for API calls
4. **Error Handling**: Always handle loading and error states
5. **Type Safety**: Maintain TypeScript types for all state and actions
