# Team Triangle App

An interactive team member display component built with Next.js, React, and Framer Motion. Features a beautiful triangular layout with hover animations and member information popups.

## Features

- 🎨 Beautiful triangular team layout
- ✨ Smooth hover animations with Framer Motion
- 📱 Fully responsive design
- 🎯 Interactive member cards with role information
- 🌟 Modern glassmorphism design elements

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd team-triangle-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Adding Team Members

Edit the `teamMembers` array in `components/team-triangle.tsx` to add your own team members:

\`\`\`javascript
const teamMembers = [
  {
    id: 1,
    name: "Your Name",
    role: "Your Role",
    image: "path-to-your-image.jpg"
  },
  // ... more members
];
\`\`\`

### Styling

The component uses Tailwind CSS for styling. You can customize colors, spacing, and animations by modifying the classes in the component.

## Deployment

### Deploy to Vercel

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

You can also deploy to:
- Netlify
- Railway
- AWS Amplify
- Any platform that supports Next.js

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

This project is open source and available under the [MIT License](LICENSE).
