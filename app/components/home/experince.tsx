import React from 'react';
import ExperienceCard, { ExperienceItem } from '../layout/ExperienceCard';

// Sample Data based on the image
const experienceData: ExperienceItem[] = [
  {
    id: 1,
    type: 'experience',
    role: 'Web Developer',
    location: 'HeyWordPress',
    description: 'I studied atomic stuff at Stanford University. I create usable web interfaces, front end coding stuff and almost anything.',
  },
  {
    id: 2,
    type: 'education',
    role: 'Engineering Degree',
    location: 'Oxford University',
    description: 'I currently work for Pixelwars creative studio. I create usable web interfaces, front end coding stuff and almost anything.',
  },
  {
    id: 3,
    type: 'experience',
    role: 'UI/UX Designer',
    location: 'Themeforest',
    description: 'I got my Master Degree at Harvard University. I create usable web interfaces, front end coding stuff and almost anything. But I love what i do.',
  },
  {
    id: 4,
    type: 'education',
    role: 'Master Degree',
    location: 'Kiev University',
    description: 'I currently work for Pixelwars creative studio. I create usable web interfaces, front end coding stuff and almost anything. But I love what i do.',
  },
  {
    id: 5,
    type: 'experience',
    role: 'Consultant',
    location: 'Videohive',
    description: 'I studied Computer Science at MIT. I create usable web interfaces, front end coding stuff and almost anything.',
  },
  {
    id: 6,
    type: 'education',
    role: 'Bachelor Degree',
    location: 'Tunis High School',
    description: 'I currently work for Pixelwars creative studio. I create usable web interfaces, front end coding and wordpress Also.',
  },
];

const ExperienceSection = () => {
  return (
    <section className="py-16 md:py-10 bg-[#f9f9fa] px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
             {/* Small purple horizontal line */}
            <span className="h-[2px] w-8 bg-purple-600 inline-block"></span>
            <h6 className="text-purple-600 font-semibold tracking-wider text-sm uppercase">
              Experience & Education
            </h6>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Experience
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experienceData.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;