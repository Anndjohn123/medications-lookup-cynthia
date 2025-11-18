# Hope Street Health Center Medication Lookup - Design Guidelines

## Design Approach
**Selected Approach:** Design System - Accessibility-First Healthcare Utility

This is a utility-focused healthcare application where clarity, accessibility, and efficiency are paramount. The design prioritizes users with limited digital literacy, vision impairments, and high-stress situations over aesthetic innovation.

**Key Design Principles:**
- Clarity over aesthetics: Every element serves a functional purpose
- Accessibility-first: Designed for users with disabilities and limited technical skills
- Mobile-primary: Optimized for smartphone use in clinical settings
- Error-tolerant: Forgiving interface for stressed, non-technical users

---

## Typography System

**Font Stack:** System fonts (Arial, Helvetica, sans-serif) for maximum compatibility and fast loading

**Type Scale:**
- Page Heading: 32px (2rem), bold, used for "Hope Street Health - Medication Lookup"
- Section Headings: 24px (1.5rem), bold, for medication names and section titles
- Body Text: 18px (1.125rem), regular weight for all medication information
- Warning Text: 18px (1.125rem), bold weight for critical warnings
- Small Text: 16px (1rem) minimum for any supporting text

**Line Height:** 1.6 for all body text to improve readability for vision-impaired users

**Hierarchy:**
- Medication Generic Name: Largest, bold, high contrast
- Information Labels: Medium size, semibold
- Information Content: Body size, regular weight
- Warnings: Body size, bold, visually distinct background

---

## Layout & Spacing System

**Tailwind Spacing Units:** Use units of 4, 5, 6, and 8 for consistent rhythm (p-4, p-5, p-6, p-8, etc.)

**Container System:**
- Maximum content width: 800px (max-w-3xl) - optimal reading width
- Page padding: p-5 on mobile, p-8 on desktop
- Card padding: p-6 for all medication information cards
- Element spacing: space-y-4 for vertical rhythm between information fields

**Grid System:**
- Single column layout throughout (no multi-column needed for this utility)
- Full-width search bar
- Full-width medication cards
- Stacked information fields for easy scanning

**Responsive Breakpoints:**
- Mobile: 320px-767px (default, base classes)
- Tablet: 768px-1023px (md: prefix)
- Desktop: 1024px+ (lg: prefix)

---

## Component Specifications

### Search Section
- Large search input: h-14 (56px) for easy tapping, full width
- Placeholder text: "Type medication name..." in subdued styling
- Helper text below: "Try searching: Lisinopril, Metformin, or Zoloft" in smaller text
- Auto-focus on page load for immediate interaction
- Search results appear below input as user types

### Medication Information Card
**Structure (top to bottom):**
1. Generic Name: Large heading with high prominence
2. Brand Names: Subheading, slightly smaller
3. Primary Use Section: Icon (✅) + label + description
4. How to Take Section: Icon (💊) + label + instructions
5. Warnings Section: Icon (⚠️) + label + warnings (distinct background treatment)
6. Side Effects Section: Icon (📋) + label + list of effects
7. Search Again Button: Full width on mobile, centered with auto width on desktop

**Card Layout:**
- Background: White or very light background for contrast
- Padding: p-6 on all sides
- Rounded corners: rounded-lg
- Subtle shadow for depth: shadow-md
- Each information section: mb-4 spacing

### Buttons
**Primary Button (Search Again/Reset):**
- Height: h-12 (48px minimum, exceeds 44px accessibility requirement)
- Padding: px-8 py-3
- Border radius: rounded-lg
- Full width on mobile (w-full), auto width centered on desktop
- Bold text, uppercase or sentence case

### Warning/Alert Styling
- Distinct background treatment for warning sections
- Bold text for emphasis
- Icon or visual indicator (⚠️ symbol)
- Adequate padding (p-4) for visual separation

### Error States
"No medication found" message:
- Centered text alignment
- Prominent size (text-lg)
- Helpful suggestion text below
- Clickable list of all available medications as fallback

---

## Accessibility Implementation

**Contrast Requirements:**
- All text meets WCAG AA standards (4.5:1 minimum)
- Warning sections have even higher contrast
- Interactive elements clearly distinguishable from static content

**Touch Targets:**
- Minimum 44px × 44px for all clickable elements (use h-12 or larger)
- Generous spacing between interactive elements (min 8px)
- No tiny close buttons or small clickable areas

**Visual Hierarchy:**
- Clear visual distinction between sections using spacing and backgrounds
- Icons for visual reinforcement of information categories
- Consistent use of visual indicators (✅ ⚠️ 💊 📋)

**Readability:**
- No text smaller than 16px anywhere in the application
- High contrast text throughout
- Ample line spacing (1.6 line-height)
- Generous margins around text blocks

---

## Images
**No images needed for this application.** This is a text-based utility tool where clarity and speed are paramount. The interface relies on typography, spacing, and visual indicators (icons/symbols) rather than imagery.

---

## Mobile-Specific Considerations

**320px Width Optimizations:**
- Single column layout throughout
- Full-width buttons for easy tapping
- No horizontal scrolling under any circumstances
- Stack all information vertically
- Larger touch targets (h-12 minimum)

**Interaction Patterns:**
- Auto-focus search on mobile (keyboard appears immediately)
- Sticky search bar consideration for easy re-searching
- Smooth scrolling to results
- Clear "back to top" or "search again" action after viewing medication

---

## Performance & Loading

**Critical Requirements:**
- Page must load in under 2 seconds on slow clinic internet
- CSV data cached after initial load
- No external dependencies that could fail (use system fonts, inline icons if possible)
- Minimal JavaScript for core functionality
- Progressive enhancement: basic functionality works even if JS partially fails