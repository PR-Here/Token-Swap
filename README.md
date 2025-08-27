# 🚀 TokenSwap - React Native App

A modern React Native application for cryptocurrency trading and portfolio management.

## ✨ Core Features

- **Onboarding Experience** - Swipeable onboarding with animated skip button
- **User Authentication** - Email validation with Formik integration
- **Dashboard** - Real-time cryptocurrency data and portfolio tracking
- **Guest Dashboard** - Explore mode for non-registered users
- **Interactive Rating System** - Star-based rating with fractional precision
- **Bottom Tab Navigation** - Smooth navigation with custom icons

## 📁 Project Structure

```
tokenSwap/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Text.tsx
│   │   ├── TextInput.tsx
│   │   ├── RatingStars.tsx
│   │   └── TermsAcceptance.tsx
│   ├── constant/           # App constants
│   │   ├── colors.ts
│   │   ├── fontName.ts
│   │   ├── screenName.ts
│   │   └── appScreenConstant.ts
│   ├── navigation/         # Navigation setup
│   │   ├── drawerNavigation.tsx
│   │   └── rootStackParamList.ts
│   ├── screen/            # App screens
│   │   ├── onboarding/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   └── guestDashboard/
│   ├── store/             # Redux store
│   │   ├── index.ts
│   │   ├── slices/
│   │   └── selectors/
│   ├── utils/             # Utility functions
│   │   ├── images/
│   │   └── size/
│   └── hooks/             # Custom hooks
├── assets/                # Static assets
│   ├── images/
│   └── fonts/
├── android/               # Android specific files
├── ios/                   # iOS specific files
└── package.json
```
