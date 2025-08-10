# 🍽️ FoodieExpress - 5Mohamed Components

## 📁 Folder Overview

This folder contains all React components used in the FoodieExpress application, organized in a simple and clear manner.

## 🗂️ File Structure

```
5Mohamed/
├── LandingPage/                 # Landing Page
│   ├── index.tsx               # Main Component
│   ├── Navbar.tsx              # Navigation Bar
│   ├── HeroSection.tsx         # Hero Section
│   ├── FeaturedRestaurants.tsx # Featured Restaurants
│   ├── FeaturesGrid.tsx        # Features Grid
│   └── Footer.tsx              # Footer
├── RestaurantSearch/            # Restaurant Search
│   ├── index.tsx               # Main Component
│   ├── Hero.tsx                # Hero Title
│   ├── SearchControls.tsx      # Search Tools
│   ├── Filters.tsx             # Filters
│   └── FooterControls.tsx      # Footer Tools
├── DeliveryHistoryComponents/   # Delivery History
│   ├── DeliveryHistory.tsx     # Main Component
│   ├── SummaryCard.tsx         # Summary Card
│   ├── FilterSort.tsx          # Filters and Sorting
│   ├── DeliveryTable.tsx       # Delivery Table
│   └── mockData.ts             # Mock Data
├── styles.css                  # Unified CSS File
└── README.md                   # This File
```

## 🚀 How to Use

### 1. LandingPage (Landing Page)
```tsx
import LandingPage from './LandingPage';

// Usage in application
<LandingPage />
```

**Available Components:**
- `Navbar`: Navigation bar with logo and links
- `HeroSection`: Main section with title and description
- `FeaturedRestaurants`: Display featured restaurants
- `FeaturesGrid`: Features grid and reviews
- `Footer`: Page footer with links

### 2. RestaurantSearch (Restaurant Search)
```tsx
import RestaurantSearch from './RestaurantSearch';

// Usage in application
<RestaurantSearch />
```

**Available Components:**
- `Hero`: Main search title
- `SearchControls`: Search tools (search field + location selection)
- `Filters`: Filters (free delivery, special offers, etc.)
- `FooterControls`: Results display and view toggle

### 3. DeliveryHistoryComponents (Delivery History)
```tsx
import DeliveryHistory from './DeliveryHistoryComponents/DeliveryHistory';

// Usage in application
<DeliveryHistory />
```

**Available Components:**
- `SummaryCard`: Statistics summary cards
- `FilterSort`: Data filters and sorting
- `DeliveryTable`: Delivery records table
- `mockData`: Mock data

## 🎨 Design and Styles

### Color System
- **Primary Colors**: `#4318D1` (Blue)
- **Secondary Colors**: `#22c55e` (Green), `#f59e0b` (Orange)
- **Neutral Colors**: `#1e293b`, `#64748b`, `#f8fafc`

### Styles
- **Spacing**: Consistent spacing system (0.5rem, 1rem, 1.5rem, 2rem)
- **Shadows**: Light shadows with hover effects
- **Transitions**: Smooth transitions (0.3s ease)

## 📱 Responsive Design

All components are designed to be responsive across all screen sizes:

```css
/* For medium screens */
@media (max-width: 768px) {
  /* Layout adjustments */
}

/* For small screens */
@media (max-width: 480px) {
  /* Additional adjustments */
}
```

## 🔧 Technical Features

### TypeScript
- All components are written in TypeScript
- Defined interfaces for properties
- Type-safe data handling

### Console Logging
- Each component contains console.log for operation tracking
- Useful for development and debugging

### State Management
- Use of React Hooks (`useState`, `useEffect`)
- Local state management for each component

## 📝 Adding New Components

### 1. Create the File
```tsx
// NewComponent.tsx
import React from 'react';

interface NewComponentProps {
  title: string;
  description?: string;
}

const NewComponent: React.FC<NewComponentProps> = ({ title, description }) => {
  console.log('NewComponent: Component loaded with props:', { title, description });

  return (
    <div className="MA__new-component">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default NewComponent;
```

### 2. Add Styles
```css
/* In styles.css */
.MA__new-component {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.MA__new-component h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}
```

## 🐛 Troubleshooting

### Common Issues and Solutions

1. **Component Not Displaying**
   - Ensure component is imported correctly
   - Check console.log in browser

2. **Design Issues**
   - Ensure `styles.css` is imported
   - Check CSS class names

3. **TypeScript Errors**
   - Ensure interfaces are defined correctly
   - Check data types being passed

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 🤝 Contributing

When adding new components:
1. Follow the naming pattern `MA__component-name`
2. Add console.log for operation tracking
3. Use TypeScript for interfaces
4. Add styles in `styles.css` file
5. Update this README.md file

---

**Created by**: 5Mohamed  
**Last Updated**: December 2024 