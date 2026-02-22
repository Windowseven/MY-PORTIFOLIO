import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Code, Database, Globe, Lock, Server, Cpu } from 'lucide-react';

const skills = [
  {
    category: "Frontend",
    icon: Code,
    items: ["Next.js", "React", "Tailwind CSS", "JavaScript", "Framer Motion"]
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Express", "GraphQL", "MySQL", "REST APIs"]
  },
  {
    category: "Database",
    icon: Database,
    items: ["MySQL", "PostgreSQL", "Redis"]
  },
  {
    category: "Networking",
    icon: Globe,
    items: ["TCP/IP", "Routing", "VLAN", "Subnetting", "DNS"]
  },
  {
    category: "Security",
    icon: Lock,
    items: ["JWT", "OAuth", "Penetration Testing", "Encryption", "OWASP"]
  },
  {
    category: "Tools",
    icon: Cpu,
    items: ["Docker", "Git", "Linux", "AWS", "Vercel"]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-muted-foreground max-w-2xl">
            A comprehensive toolset for building secure, scalable, and high-performance applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
