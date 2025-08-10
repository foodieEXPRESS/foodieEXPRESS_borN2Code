# 🍽️ FoodieExpress - 5Mohamed Components

## 📁 نظرة عامة على المجلد

هذا المجلد يحتوي على جميع مكونات React المستخدمة في تطبيق FoodieExpress، منظمة بطريقة بسيطة وواضحة.

## 🗂️ هيكل الملفات

```
5Mohamed/
├── LandingPage/                 # الصفحة الرئيسية
│   ├── index.tsx               # المكون الرئيسي
│   ├── Navbar.tsx              # شريط التنقل
│   ├── HeroSection.tsx         # القسم الرئيسي
│   ├── FeaturedRestaurants.tsx # المطاعم المميزة
│   ├── FeaturesGrid.tsx        # شبكة الميزات
│   └── Footer.tsx              # التذييل
├── RestaurantSearch/            # البحث عن المطاعم
│   ├── index.tsx               # المكون الرئيسي
│   ├── Hero.tsx                # العنوان الرئيسي
│   ├── SearchControls.tsx      # أدوات البحث
│   ├── Filters.tsx             # المرشحات
│   └── FooterControls.tsx      # أدوات التذييل
├── DeliveryHistoryComponents/   # تاريخ التوصيل
│   ├── DeliveryHistory.tsx     # المكون الرئيسي
│   ├── SummaryCard.tsx         # بطاقة الملخص
│   ├── FilterSort.tsx          # المرشحات والترتيب
│   ├── DeliveryTable.tsx       # جدول التوصيل
│   └── mockData.ts             # البيانات التجريبية
├── styles.css                  # ملف CSS موحد
└── README.md                   # هذا الملف
```

## 🚀 كيفية الاستخدام

### 1. LandingPage (الصفحة الرئيسية)
```tsx
import LandingPage from './LandingPage';

// استخدام في التطبيق
<LandingPage />
```

**المكونات المتاحة:**
- `Navbar`: شريط التنقل مع الشعار والروابط
- `HeroSection`: القسم الرئيسي مع العنوان والوصف
- `FeaturedRestaurants`: عرض المطاعم المميزة
- `FeaturesGrid`: شبكة الميزات والمراجعات
- `Footer`: تذييل الصفحة مع الروابط

### 2. RestaurantSearch (البحث عن المطاعم)
```tsx
import RestaurantSearch from './RestaurantSearch';

// استخدام في التطبيق
<RestaurantSearch />
```

**المكونات المتاحة:**
- `Hero`: العنوان الرئيسي للبحث
- `SearchControls`: أدوات البحث (حقل البحث + اختيار الموقع)
- `Filters`: المرشحات (توصيل مجاني، عروض خاصة، إلخ)
- `FooterControls`: عرض النتائج وتبديل العرض

### 3. DeliveryHistoryComponents (تاريخ التوصيل)
```tsx
import DeliveryHistory from './DeliveryHistoryComponents/DeliveryHistory';

// استخدام في التطبيق
<DeliveryHistory />
```

**المكونات المتاحة:**
- `SummaryCard`: بطاقات ملخص الإحصائيات
- `FilterSort`: مرشحات وترتيب البيانات
- `DeliveryTable`: جدول سجلات التوصيل
- `mockData`: البيانات التجريبية

## 🎨 التصميم والأنماط

### نظام الألوان
- **الألوان الأساسية**: `#4318D1` (أزرق)
- **الألوان الثانوية**: `#22c55e` (أخضر), `#f59e0b` (برتقالي)
- **الألوان المحايدة**: `#1e293b`, `#64748b`, `#f8fafc`

### الأنماط
- **التباعد**: استخدام نظام تباعد متناسق (0.5rem, 1rem, 1.5rem, 2rem)
- **الظلال**: ظلال خفيفة مع تأثيرات hover
- **الانتقالات**: انتقالات سلسة (0.3s ease)

## 📱 التصميم المتجاوب

جميع المكونات مصممة لتكون متجاوبة مع جميع أحجام الشاشات:

```css
/* للشاشات المتوسطة */
@media (max-width: 768px) {
  /* تعديلات التخطيط */
}

/* للشاشات الصغيرة */
@media (max-width: 480px) {
  /* تعديلات إضافية */
}
```

## 🔧 الميزات التقنية

### TypeScript
- جميع المكونات مكتوبة بـ TypeScript
- واجهات محددة للخصائص
- أنواع آمنة للبيانات

### Console Logging
- كل مكون يحتوي على console.log لتتبع العمليات
- مفيد للتطوير والتصحيح

### State Management
- استخدام React Hooks (`useState`, `useEffect`)
- إدارة الحالة المحلية لكل مكون

## 📝 إضافة مكونات جديدة

### 1. إنشاء الملف
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

### 2. إضافة الأنماط
```css
/* في styles.css */
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

## 🐛 استكشاف الأخطاء

### مشاكل شائعة وحلولها

1. **المكون لا يظهر**
   - تأكد من استيراد المكون بشكل صحيح
   - تحقق من console.log في المتصفح

2. **مشاكل في التصميم**
   - تأكد من استيراد ملف `styles.css`
   - تحقق من أسماء الفئات CSS

3. **أخطاء TypeScript**
   - تأكد من تعريف الواجهات بشكل صحيح
   - تحقق من أنواع البيانات المرسلة

## 📚 موارد إضافية

- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 🤝 المساهمة

عند إضافة مكونات جديدة:
1. اتبع نمط التسمية `MA__component-name`
2. أضف console.log لتتبع العمليات
3. استخدم TypeScript للواجهات
4. أضف الأنماط في ملف `styles.css`
5. حدث هذا الملف README.md

---

**تم إنشاؤه بواسطة**: 5Mohamed  
**آخر تحديث**: ديسمبر 2024 