# Color Clarity 🎨

A fun, accessible color generator web app that helps you create and evaluate color combinations against WCAG 2.2 accessibility standards. Perfect for designers, developers, and anyone who wants to ensure their color choices are inclusive and accessible.

## ✨ Features

- **🎯 Color Pair Picker**: Choose background and text colors using interactive color pickers or direct hex input
- **📊 Real-time Contrast Analysis**: See WCAG 2.2 AA/AAA compliance status instantly
- **👀 Accessible UI Preview**: View sample components (buttons, cards, text) styled with your colors
- **🧠 Smart Suggestions**: Get AI-powered recommendations for accessible color combinations
- **📦 Design Token Export**: Export your colors as CSS variables, Tailwind config, or JSON design tokens
- **♿ Full Accessibility**: Keyboard navigation, screen reader support, and ARIA live regions

## 🛠 Tech Stack

- **Frontend**: React 19 with modern hooks
- **Styling**: Tailwind CSS v4 with PostCSS
- **Build Tool**: Vite for fast development and building
- **Color Utilities**: 
  - `react-colorful` for interactive color pickers
  - `chroma-js` for color contrast calculations and manipulation

## 🚀 Getting Started

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5174`

## 🎨 How to Use

### 1. Choose Your Colors
- Use the **Background** and **Text** color pickers in the left panel
- Or type hex values directly (e.g., `#1e90ff`)
- Colors update in real-time across all panels

### 2. Check Accessibility
- View the **contrast ratio** and WCAG compliance status
- See **pass/fail indicators** for AA and AAA standards (normal and large text)
- Icons and text ensure meaning isn't conveyed by color alone

### 3. Preview Your Design
- The **middle panel** shows sample UI components using your colors
- See how buttons, cards, and text blocks look with your color choices
- Each component indicates whether it meets accessibility standards

### 4. Get Smart Suggestions
- The **suggestions panel** recommends accessible alternatives
- Get separate suggestions for AA and AAA compliance levels
- One-click apply to instantly use suggested colors

### 5. Export Design Tokens
- Export your color pair as **CSS custom properties**
- Get **Tailwind CSS config snippets** for easy integration
- Download **JSON design tokens** for design systems
- Copy-to-clipboard functionality for all formats

## 🎯 WCAG 2.2 Standards

Color Clarity evaluates contrast ratios against these thresholds:

- **AA Normal Text**: 4.5:1 minimum contrast ratio
- **AA Large Text**: 3.0:1 minimum contrast ratio  
- **AAA Normal Text**: 7.0:1 minimum contrast ratio
- **AAA Large Text**: 4.5:1 minimum contrast ratio

*Large text is defined as 18.66px+ (14pt+) or 14px+ (18.66pt+) when bold.*

## ♿ Accessibility Features

- **Keyboard Navigation**: Full app functionality via keyboard
- **Screen Reader Support**: Semantic HTML, ARIA labels, and live regions
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Independence**: Uses icons and text, not just color, to convey meaning
- **Live Announcements**: Screen readers announce contrast changes

## 🙏 Acknowledgments

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/) for accessibility standards
- [react-colorful](https://github.com/omgovich/react-colorful) for beautiful color pickers
- [chroma.js](https://gka.github.io/chroma.js/) for color manipulation and contrast calculations
