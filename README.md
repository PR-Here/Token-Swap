# 🚀 TokenSwap - React Native App

A modern React Native application for cryptocurrency trading and portfolio management with a beautiful, intuitive user interface.

## ✨ Features

### 🎯 Core Features
- **Onboarding Experience** - Swipeable onboarding with animated skip button
- **User Authentication** - Email validation with Formik integration
- **Dashboard** - Real-time cryptocurrency data and portfolio tracking
- **Guest Dashboard** - Explore mode for non-registered users
- **Interactive Rating System** - Star-based rating with fractional precision
- **Bottom Tab Navigation** - Smooth navigation with custom icons

### 🎨 UI/UX Features
- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Adapts to different screen sizes
- **Custom Components** - Reusable UI components
- **Smooth Animations** - Enhanced user experience
- **Dark/Light Theme Support** - Consistent color scheme

### 📊 Data Management
- **Redux Toolkit** - State management for guest dashboard
- **Form Validation** - Email validation with Yup schemas
- **Real-time Updates** - Dynamic data handling

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation management
- **Formik + Yup** - Form handling and validation

### State Management
- **Redux Toolkit** - Predictable state management
- **React Redux** - React bindings for Redux

### UI Libraries
- **react-native-ratings** - Interactive rating system
- **react-native-safe-area-context** - Safe area handling
- **react-native-gifted-charts** - Data visualization

### Development Tools
- **Metro** - JavaScript bundler
- **Jest** - Testing framework
- **ESLint** - Code linting

## 📱 Screenshots

### Onboarding
- Swipeable onboarding screens
- Animated skip button
- Dot indicators

### Authentication
- Email validation
- Terms acceptance
- Guest access option

### Dashboard
- Cryptocurrency data display
- Portfolio tracking
- Interactive charts

### Guest Dashboard
- Explore mode
- Rating system
- Information cards

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio / Xcode
- iOS Simulator / Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tokenSwap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npx react-native start
   ```

5. **Run the application**
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

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

## 🎯 Key Components

### RatingStars
Interactive star rating system with fractional precision:
```typescript
<RatingStars 
  rating={4.5} 
  size={20} 
  onRatingChange={(rating) => console.log(rating)} 
/>
```

### Form Validation
Email validation with Formik and Yup:
```typescript
const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});
```

### Redux Store
State management for guest dashboard:
```typescript
const store = configureStore({
  reducer: {
    guestDashboard: guestDashboardReducer,
  },
});
```

## 🔧 Configuration

### Environment Setup
- Configure your development environment for React Native
- Set up Android Studio for Android development
- Install Xcode for iOS development (macOS only)

### Dependencies
All required dependencies are listed in `package.json`:
- React Native core libraries
- Navigation libraries
- State management tools
- UI component libraries

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React Native best practices
- Implement proper error handling
- Write clean, readable code

### Component Structure
- Keep components small and focused
- Use custom hooks for logic separation
- Implement proper prop interfaces
- Follow naming conventions

### State Management
- Use Redux Toolkit for complex state
- Keep local state for component-specific data
- Implement proper selectors
- Follow Redux best practices

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Structure
- Unit tests for components
- Integration tests for screens
- Redux store testing

## 📦 Building

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace tokenSwap.xcworkspace -scheme tokenSwap -configuration Release
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native community
- Redux Toolkit team
- React Navigation contributors
- All open-source contributors

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using React Native**
