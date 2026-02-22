import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "Smart Class System",
    description: "A class management system for tracking attendance with geolocation security. Only student devices physically around the classroom are marked present — eliminating attendance cheating.",
    tags: ["Node.js", "Express", "React", "Tailwind CSS", "MySQL"],
    image: "/assets/smart-class.png",
    link: "#",
    github: "#",
    features: ["Geolocation Attendance", "Anti-proxy Logic", "Admin Analytics"]
  },
  {
    title: "Linux Buddy (Shell)",
    description: "Interactive command-line toolkit designed to teach Linux commands from beginner to advanced in a safe, structured, and funny way — entirely in Swahili.",
    tags: ["Shell Scripting", "Bash", "Linux"],
    image: "/assets/linux-buddy.png",
    link: "#",
    github: "#",
    features: ["Command Simulation", "Safe Sandbox", "Humor-based Learning"]
  },
  {
    title: "WiFi Billing System",
    description: "Comprehensive voucher-based WiFi authentication & billing system. Transforms a normal WiFi router into a business-ready service platform.",
    tags: ["HTML", "JS", "Shell", "MySQL"],
    image: "/assets/wifi-billing.png",
    link: "#",
    github: "#",
    features: ["Voucher Generation", "Bandwidth Control", "Expiry Tracking"]
  },
  {
    title: "Event Booking System",
    description: "A secure platform for booking events with real-time availability and secure payment processing integration.",
    tags: ["React", "Node.js", "Stripe", "MySQL"],
    image: "/assets/event-booking.png",
    link: "#",
    github: "#",
    features: ["Real-time Booking", "Secure Payments", "Ticket Generation"]
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-between items-end"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl">
              Real-world solutions solving actual problems.
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex">
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group h-full flex flex-col border-border/50 hover:border-primary/50 transition-all">
                {/* Preview Image */}
                <div className="h-64 w-full relative overflow-hidden bg-black/10">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="sm" variant="default">
                      View Case Study
                    </Button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Key Features</div>
                    <ul className="grid grid-cols-2 gap-1">
                      {project.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-border/50">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <a href={project.github} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                    <a href={project.link} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
