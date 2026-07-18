import React from 'react';
import ProfileCard from './components/ProfileCard';
import ResumeTemplate from './components/ResumeTemplate';

function App() {
  // Profile Data for Cards
  const profiles = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior UX Designer",
      avatar: "SJ",
      email: "sarah.j@design.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      socialLinks: {
        linkedin: "sarahjohnson",
        github: "sarahj-design",
        twitter: "@sarah_designs"
      },
      stats: {
        projects: 47,
        experience: "8+ years",
        clients: 32
      },
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Full Stack Developer",
      avatar: "MC",
      email: "marcus@dev.io",
      phone: "+1 (555) 876-5432",
      location: "New York, NY",
      skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
      socialLinks: {
        linkedin: "marcuschen",
        github: "marcus-dev",
        twitter: "@marcuscodes"
      },
      stats: {
        projects: 63,
        experience: "5+ years",
        clients: 28
      },
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Product Manager",
      avatar: "ER",
      email: "emily.r@product.com",
      phone: "+1 (555) 345-6789",
      location: "Austin, TX",
      skills: ["Agile", "Data Analytics", "Strategy", "Stakeholder Management"],
      socialLinks: {
        linkedin: "emilyrodriguez",
        github: "emily-pm",
        twitter: "@emily_product"
      },
      stats: {
        projects: 35,
        experience: "6+ years",
        clients: 45
      },
      gradient: "from-emerald-600 to-teal-600"
    }
  ];

  // Resume Data
  const resumes = [
    {
      id: 1,
      personalInfo: {
        name: "Sarah Johnson",
        title: "Senior UX Designer",
        email: "sarah.j@design.com",
        phone: "+1 (555) 234-5678",
        location: "San Francisco, CA",
        website: "sarahjohnson.design",
        summary: "Passionate UX designer with 8+ years of experience creating intuitive digital experiences. Specialized in user-centered design and design thinking methodologies."
      },
      experience: [
        {
          company: "TechCorp Inc.",
          role: "Senior UX Designer",
          period: "2020 - Present",
          description: "Lead design strategy for enterprise SaaS products serving 50K+ users. Managed team of 4 designers and established design system."
        },
        {
          company: "DesignStudio",
          role: "UX Designer",
          period: "2017 - 2020",
          description: "Designed mobile applications for Fortune 500 clients. Improved user engagement by 40% through iterative design processes."
        }
      ],
      education: {
        degree: "M.S. Human-Computer Interaction",
        school: "Stanford University",
        year: "2017"
      },
      certifications: ["Google UX Design", "IDEO Design Thinking"],
      theme: "purple"
    },
    {
      id: 2,
      personalInfo: {
        name: "Marcus Chen",
        title: "Full Stack Developer",
        email: "marcus@dev.io",
        phone: "+1 (555) 876-5432",
        location: "New York, NY",
        website: "marcuschen.dev",
        summary: "Full stack developer with 5+ years building scalable web applications. Expert in React ecosystem and cloud architecture with AWS."
      },
      experience: [
        {
          company: "CloudTech Solutions",
          role: "Senior Full Stack Developer",
          period: "2021 - Present",
          description: "Architected microservices handling 1M+ daily requests. Led migration from monolith to cloud-native infrastructure reducing costs by 35%."
        },
        {
          company: "StartupHub",
          role: "Full Stack Developer",
          period: "2019 - 2021",
          description: "Built real-time collaboration tools using WebSocket and React. Implemented CI/CD pipelines improving deployment frequency by 200%."
        }
      ],
      education: {
        degree: "B.S. Computer Science",
        school: "MIT",
        year: "2019"
      },
      certifications: ["AWS Solutions Architect", "MongoDB Certified Developer"],
      theme: "blue"
    },
    {
      id: 3,
      personalInfo: {
        name: "Emily Rodriguez",
        title: "Product Manager",
        email: "emily.r@product.com",
        phone: "+1 (555) 345-6789",
        location: "Austin, TX",
        website: "emilyrodriguez.pm",
        summary: "Strategic product manager with 6+ years driving product vision from conception to launch. Data-driven decision maker with focus on user-centric solutions."
      },
      experience: [
        {
          company: "InnovateTech",
          role: "Senior Product Manager",
          period: "2021 - Present",
          description: "Led product strategy for B2B platform generating $15M ARR. Launched 3 major features that increased customer retention by 25%."
        },
        {
          company: "GrowthVentures",
          role: "Product Manager",
          period: "2018 - 2021",
          description: "Managed product lifecycle for mobile app with 500K+ users. Implemented A/B testing framework increasing conversion by 30%."
        }
      ],
      education: {
        degree: "MBA, Product Management",
        school: "Harvard Business School",
        year: "2018"
      },
      certifications: ["Pragmatic Institute PMC", "Scrum Alliance CSPO"],
      theme: "emerald"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Cards Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Profile Cards</h2>
            <p className="text-gray-400 text-lg">Professional profile cards with different themes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </section>

      {/* Resumes Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Resume Templates</h2>
            <p className="text-gray-400 text-lg">Professional resume templates with different themes</p>
          </div>
          <div className="space-y-8">
            {resumes.map(resume => (
              <ResumeTemplate key={resume.id} resume={resume} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;