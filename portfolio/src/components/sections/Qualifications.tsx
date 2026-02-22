import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle, FileText } from 'lucide-react';

const education = [
  {
    degree: "Bachelor Degree of Computer Science",
    school: "National Institute of Transport",
    year: "2024 - Present",
    location: "Dar es Salaam, Tanzania",
    details: ["Database Systems", "HTML & CSS", "Data Structures & Algorithms", "System Design", "Operating Systems"]
  }
];

const certifications = [
  {
    title: "Cisco Ethical Hacker",
    issuer: "Cisco",
    year: "2024",
    color: "text-green-500",
    bg: "bg-green-500/10",
    file: "/assets/cisco-ethical-hacker.pdf"
  },
  {
    title: "Google Cybersecurity Professional",
    issuer: "Google",
    year: "2025",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    file: "/assets/google-cert.pdf"
  },
  {
    title: "Cisco Cybersecurity Essentials",
    issuer: "Cisco",
    year: "2024",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    file: "/assets/cisco-cyber-security.pdf"
  }
];

export const Qualifications = () => {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <GraduationCap className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Education</h2>
            </motion.div>

            <div className="space-y-8 border-l-2 border-border pl-8 ml-4 relative">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <div className="text-lg text-primary mb-2">{edu.school}</div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {edu.year}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {edu.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {edu.details.map((detail) => (
                      <span key={detail} className="px-2 py-1 rounded bg-secondary text-xs font-medium">
                        {detail}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div id="certifications">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <Award className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Certifications</h2>
            </motion.div>

            <div className="grid gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors group">
                    <div className={`p-3 rounded-full ${cert.bg} ${cert.color}`}>
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold group-hover:text-primary transition-colors">{cert.title}</h3>
                      <div className="text-sm text-muted-foreground mb-2">{cert.issuer} • {cert.year}</div>
                      <a 
                        href={cert.file} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-medium text-primary hover:underline"
                      >
                        <FileText className="w-3 h-3 mr-1" /> View Certificate
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
