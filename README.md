# Loopin - React Native Investment App

A modern React Native application for cryptocurrency investment and trading, built with Expo and TypeScript.

## 📁 Project Structure

```
loopin/
├── app/                          # App screens (Expo Router)
│   ├── _layout.tsx              # Root layout with navigation
│   ├── index.tsx                # Home/landing screen
│   ├── onboarding.tsx           # Onboarding flow
│   ├── login.tsx                # User login screen
│   ├── register.tsx             # User registration screen
│   ├── verify-email.tsx         # Email verification with OTP
│   ├── create-password.tsx      # Password creation screen
│   ├── security-process.tsx     # Security setup screen
│   ├── dashboard.tsx            # Main user dashboard
│   ├── guest-dashboard.tsx      # Guest user dashboard
│   └── addFund.tsx              # Add funds screen
│
├── assets/                       # Static assets
│   ├── fonts/                   # Custom fonts
│   │   ├── Newsreader_60pt-*.ttf
│   │   ├── SFPRODISPLAYMEDIUM.OTF
│   │   └── SFPRODISPLAYREGULAR.OTF
│   └── images/                  # Images and icons
│       ├── Loopin_logo.png
│       ├── bitcoin.png
│       ├── etherium.png
│       ├── key.png
│       └── *.png (various icons)
│
├── components/                   # Reusable UI components
│   ├── index.ts                 # Component exports
│   ├── common/                  # Common reusable components
│   │   ├── Button.tsx           # Custom button component
│   │   ├── Text.tsx             # Custom text component
│   │   ├── TextInput.tsx        # Custom text input component
│   │   ├── Toast.tsx            # Toast notification component
│   │   ├── AppHeader.tsx        # App header component
│   │   ├── RatingStars.tsx      # Rating stars component
│   │   └── TermsAcceptance.tsx  # Terms acceptance component
│   ├── auth/                    # Authentication components
│   │   └── login/               # Login-specific components
│   │       ├── money.tsx
│   │       └── things.tsx
│   └── onboarding/              # Onboarding components
│       ├── onBoardingOne.tsx
│       └── onBoardingTwo.tsx
│
├── constant/                     # App constants
│   ├── colors.ts                # Color palette
│   └── fontName.ts              # Font family names
│
├── context/                      # React Context providers
│   └── ToastContext.tsx         # Global toast notification context
│
├── hooks/                        # Custom React hooks
│   ├── useAppDispatch.ts        # Redux dispatch hook
│   ├── useAppSelector.ts        # Redux selector hook
│   ├── useLogin.tsx             # Login logic hook
│   ├── useRegister.ts           # Registration logic hook
│   ├── useOnBoarding.ts         # Onboarding logic hook
│   ├── useCreatePassword.tsx    # Password creation hook
│   ├── useVerifyEmail.tsx       # Email verification hook
│   ├── useSecurityProcess.tsx   # Security process hook
│   ├── useDashboard.tsx         # Dashboard logic hook
│   ├── useAddFund.tsx           # Add funds logic hook
│   └── useAppLayout.tsx         # App layout hook
│
├── schema/                       # Yup validation schemas
│   ├── index.ts                 # Schema exports
│   ├── RegisterSchema.ts        # Registration validation
│   ├── VerifyEmailSchema.ts     # Email verification validation
│   └── CreatePasswordSchema.ts  # Password creation validation
│
├── store/                        # Redux store configuration
│   ├── index.ts                 # Store setup
│   ├── slices/                  # Redux slices
│   │   └── guestDashboardSlice.ts
│   └── selectors/               # Redux selectors
│       └── guestDashboardSelectors.ts
│
├── utils/                        # Utility functions
│   ├── fonts.ts                 # Font loading utilities
│   ├── size/                    # Responsive sizing utilities
│   │   └── index.ts
│   └── images/                  # Image utilities
│       └── index.ts
│
├── app.json                      # Expo configuration
├── expo-env.d.ts                # Expo TypeScript declarations
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.js              # ESLint configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd loopin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: Redux Toolkit
- **Form Handling**: Formik + Yup
- **Styling**: StyleSheet with responsive utilities
- **Icons**: @expo/vector-icons
- **Charts**: react-native-gifted-charts

## 📱 Features

### Authentication Flow
- User registration with email validation
- Email verification with OTP
- Secure password creation
- User login/logout

### Dashboard
- Real-time cryptocurrency price charts
- Portfolio overview
- Social mentions tracking
- Latest news integration

### Investment Features
- Add funds to account
- Cryptocurrency trading interface
- Security process for account setup

### UI/UX
- Modern, responsive design
- Custom toast notifications
- Smooth animations
- Intuitive navigation

## 🎨 Design System

### Colors
- Primary: `#00046F` (Dark Blue)
- White: `#FFFFFF`
- Red: `#FF0000`
- Black: `#000000`

### Typography
- **Primary Font**: Newsreader (various weights)
- **Secondary Font**: SF Pro Display

### Components
- Custom Button component with variants
- Responsive Text component
- Toast notification system
- App header with navigation

## 🔧 Development

### Code Organization
- **Screens**: Located in `app/` directory using Expo Router
- **Components**: Reusable UI components in `components/`
- **Hooks**: Custom logic hooks in `hooks/`
- **Schemas**: Validation schemas in `schema/`
- **Utils**: Helper functions in `utils/`

### State Management
- Redux Toolkit for global state
- React Context for UI state (toasts)
- Local state with useState for component-specific data

### Form Validation
- Formik for form handling
- Yup for validation schemas
- Centralized schema management

## 📦 Scripts

```bash
# Development
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run on web browser

# Building
npm run build      # Build for production
npm run eject      # Eject from Expo managed workflow

# Linting
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
```

## 🧪 Testing

```bash
npm test           # Run tests
npm run test:watch # Run tests in watch mode
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using React Native and Expo**