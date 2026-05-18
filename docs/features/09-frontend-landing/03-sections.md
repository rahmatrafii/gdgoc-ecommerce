# Landing Sections Breakdown

This document maps each implemented section in `frontend/src/components/sections`.

## 1. Hero Section

- File: `HeroSection.tsx`
- Includes:
  - Large editorial headline
  - Supporting copy
  - Primary and secondary CTA
  - Floating product glass cards
  - Ambient glow background

## 2. Featured Categories

- File: `CategoriesSection.tsx`
- Includes required category set:
  - Streetwear
  - Sneakers
  - Luxury Watches
  - Bags
  - Accessories
  - Women Collection
  - Men Collection
- Supports API merge for category descriptions.

## 3. New Arrivals

- File: `NewArrivalsSection.tsx`
- Features product grid with:
  - Live search (`q`) connected to backend query
  - Category filter (`category`) connected to backend query
  - In-stock toggle (`in_stock`) connected to backend query
  - Reset filters action
  - Image
  - Title
  - Brand
  - Price
  - Rating
  - Wishlist toggle
  - Quick add-to-cart action
  - Context-aware empty state (empty backend data vs empty filter result)

## 4. Limited Edition Banner

- File: `LimitedEditionSection.tsx`
- Includes countdown timer and high-contrast CTA.
- CTA now routes user to catalog and applies a limited-drop search intent.

## 5. Best Seller Collection

- File: `BestSellerSection.tsx`
- Horizontal product carousel behavior with snap scrolling.

## 6. Why Choose Us

- File: `WhyChooseUsSection.tsx`
- Glass feature cards for:
  - Fast Worldwide Shipping
  - Authentic Products
  - AI Style Recommendations
  - Secure Payments
  - Easy Returns
  - 24/7 Fashion Support

## 7. Fashion Lookbook

- File: `LookbookSection.tsx`
- Editorial campaign-like visual composition.

## 8. Customer Testimonials

- File: `TestimonialsSection.tsx`
- Glass review cards with rating stars and profile data.

## 9. Newsletter Subscription

- File: `NewsletterSection.tsx`
- Email form with CTA for exclusive drops.

## 10. Mobile Shopping Experience

- File: `MobileExperienceSection.tsx`
- Mobile app mockup visuals and store CTA buttons.

## 11. Footer

- File: `FooterSection.tsx`
- Multi-column footer with navigation, shop, support, and social links.
- Footer links now map to real section anchors or external social URLs.