import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      id: 'capacity',
      title: 'Capacity',
      icon: '📊',
      items: [
        { id: 'production-capacity', label: 'Production Capacity' },
        { id: 'me-capacity', label: 'ME Capacity' },
        { id: 'projects-capacity', label: 'Projects Capacity' },
      ],
    },
    {
      id: 'product-dev',
      title: 'Product Development',
      icon: '🔧',
      items: [
        { id: 'new-product', label: 'New Product Introduction' },
        { id: 'product-mgmt', label: 'Product Management' },
        { id: 'product-family', label: 'Product Family Data' },
      ],
    },
    {
      id: 'production',
      title: 'Production',
      icon: '⚙️',
      items: [
        { id: 'batch-scheduling', label: 'Batch Scheduling' },
        { id: 'product-schedule', label: 'Product Schedule View' },
        { id: 'work-area-schedule', label: 'Work Area Schedule View' },
      ],
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };


  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1>OPSHUB</h1>
          <p className="subtitle">Operations Hub</p>
        </div>
      </header>

      <main className="home-main">
        <div className="sections-grid">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`section-card ${
                expandedSection === section.id ? 'expanded' : ''
              }`}
            >
              <button
                className="section-button"
                onClick={() => toggleSection(section.id)}
                aria-expanded={expandedSection === section.id}
              >
                <span className="section-icon">{section.icon}</span>
                <span className="section-title">{section.title}</span>
                <span className="section-chevron">
                  {expandedSection === section.id ? '▼' : '▶'}
                </span>
              </button>

              {expandedSection === section.id && (
                <div className="items-container">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      to={`/${item.id}`}
                      className="item-button"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
