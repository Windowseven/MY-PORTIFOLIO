//import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Qualifications } from './components/sections/Qualifications';
import { Contact } from './components/sections/Contact';
import { WinnAI } from './components/features/WinnAI.tsx';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Qualifications />
        <Contact />
      </Layout>
      <WinnAI />
    </ThemeProvider>
  );
}

export default App;