import React from 'react';

function ResumeTemplate({ resume }) {
  const themeStyles = {
    purple: {
      header: 'from-purple-600 to-pink-600',
      border: 'border-purple-500/30',
      badge: 'bg-purple-500/20 text-purple-300',
      accent: 'text-purple-400',
      dot: 'bg-purple-500'
    },
    blue: {
      header: 'from-blue-600 to-cyan-600',
      border: 'border-blue-500/30',
      badge: 'bg-blue-500/20 text-blue-300',
      accent: 'text-blue-400',
      dot: 'bg-blue-500'
    },
    emerald: {
      header: 'from-emerald-600 to-teal-600',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/20 text-emerald-300',
      accent: 'text-emerald-400',
      dot: 'bg-emerald-500'
    }
  };

  const theme = themeStyles[resume.theme];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.header} p-8 text-white`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">{resume.personalInfo.name}</h2>
            <p className="text-white/90 text-lg mt-1">{resume.personalInfo.title}</p>
            <p className="text-white/70 text-sm mt-2 max-w-2xl">{resume.personalInfo.summary}</p>
          </div>
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20`}>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {resume.personalInfo.email}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {resume.personalInfo.phone}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {resume.personalInfo.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div>
              <h3 className={`text-lg font-bold ${theme.accent} mb-4 flex items-center gap-2`}>
                <span className={`w-3 h-3 ${theme.dot} rounded-full`}></span>
                Contact
              </h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-sm">📍 {resume.personalInfo.location}</p>
                <p className="text-sm">🌐 {resume.personalInfo.website}</p>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className={`text-lg font-bold ${theme.accent} mb-4 flex items-center gap-2`}>
                <span className={`w-3 h-3 ${theme.dot} rounded-full`}></span>
                Education
              </h3>
              <div className={`bg-gray-900/50 rounded-xl p-4 border ${theme.border}`}>
                <h4 className="text-white font-semibold">{resume.education.degree}</h4>
                <p className="text-gray-400 text-sm mt-1">{resume.education.school}</p>
                <p className="text-gray-500 text-sm mt-1">Class of {resume.education.year}</p>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className={`text-lg font-bold ${theme.accent} mb-4 flex items-center gap-2`}>
                <span className={`w-3 h-3 ${theme.dot} rounded-full`}></span>
                Certifications
              </h3>
              <div className="space-y-2">
                {resume.certifications.map((cert, index) => (
                  <div key={index} className={`${theme.badge} px-3 py-2 rounded-lg text-sm`}>
                    🏆 {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience */}
          <div className="lg:col-span-2">
            <h3 className={`text-lg font-bold ${theme.accent} mb-6 flex items-center gap-2`}>
              <span className={`w-3 h-3 ${theme.dot} rounded-full`}></span>
              Professional Experience
            </h3>
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <div key={index} className={`bg-gray-900/50 rounded-xl p-6 border ${theme.border} hover:border-gray-600 transition-colors`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-white font-bold text-lg">{exp.role}</h4>
                      <p className={`${theme.accent} font-semibold`}>{exp.company}</p>
                    </div>
                    <span className={`${theme.badge} px-3 py-1 rounded-full text-xs whitespace-nowrap`}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Skills Summary */}
            <div className="mt-8">
              <h3 className={`text-lg font-bold ${theme.accent} mb-4 flex items-center gap-2`}>
                <span className={`w-3 h-3 ${theme.dot} rounded-full`}></span>
                Key Achievements
              </h3>
              <div className={`bg-gray-900/50 rounded-xl p-6 border ${theme.border}`}>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    Successfully delivered {resume.stats?.projects || 'multiple'} projects on time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    Managed cross-functional teams of {resume.stats?.teamSize || '5+'} members
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    Achieved {resume.stats?.satisfaction || '95%'} client satisfaction rate
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-700 p-4 flex justify-end gap-3">
        <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm">
          Share
        </button>
        <button className={`bg-gradient-to-r ${theme.header} text-white px-6 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity`}>
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ResumeTemplate;