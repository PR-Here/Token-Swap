import {
  GuestDashboard,
  Login,
  Onboarding,
  Register,
} from '../screen';
import BottomTabNavigation from '../navigation/drawerNavigation';
import { ScreenName } from './screenName';

export const AppScreen = [
  {
    name: ScreenName.Onboarding,
    component: Onboarding,
  },
  {
    name: ScreenName.Login,
    component: Login,
  },
  {
    name: ScreenName.Register,
    component: Register,
  },
  {
    name: ScreenName.Dashboard,
    component: BottomTabNavigation,
  },
  {
    name: ScreenName.GuestDashboard,
    component: GuestDashboard,
  },
];
