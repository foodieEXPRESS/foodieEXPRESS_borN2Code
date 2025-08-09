import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <header>
      <h1 className="rs-hero__title">{title}</h1>
      <p className="rs-hero__subtitle">{subtitle}</p>
    </header>
  );
};

export default Hero; 