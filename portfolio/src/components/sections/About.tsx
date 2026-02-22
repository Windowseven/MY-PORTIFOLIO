import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Shield, Zap, Layers, BookOpen, Server, Lock, CreditCard } from 'lucide-react';

const philosophies = [
  {
    title: "Security First",
    description: "Security isn't an afterthought. It's baked into the architecture from day one.",
    icon: Shield,
    color: "text-blue-500"
  },
  {
    title: "Clean Architecture",
    description: "Maintainable, testable, and scalable codebases that survive team changes.",
    icon: Layers,
    color: "text-green-500"
  },
  {
    title: "Performance Matters",
    description: "Optimizing for the millisecond. Fast load times equal better user experience.",
    icon: Zap,
    color: "text-yellow-500"
  },
  {
    title: "Continuous Learning",
    description: "Technology evolves rapidly. Staying ahead means constant adaptation.",
    icon: BookOpen,
    color: "text-purple-500"
  }
];

const currentFocus = [
  {
    title: "Backend API Architecture",
    description: "Designing scalable and secure REST & GraphQL APIs.",
    icon: Server,
    color: "text-cyan-500"
  },
  {
    title: "Advanced Network Security",
    description: "Deep study of secure communication models & attack prevention.",
    icon: Lock,
    color: "text-red-500"
  },
  {
    title: "Payment Gateway Integration",
    description: "Building secure transaction systems for African markets.",
    icon: CreditCard,
    color: "text-green-500"
  }
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="prose dark:prose-invert text-muted-foreground text-lg leading-relaxed">
              <p className="mb-4">
                I am a Computer Science student at the National Institute of Transport, passionate about bridging the gap between complex backend systems and intuitive frontend experiences.
              </p>
              <p>
                My journey involves deep dives into network security, ethical hacking, and full-stack development. I don't just build apps; I engineer secure digital ecosystems.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 glass border-l-4 border-l-primary">
              <h3 className="text-xl font-bold mb-6">What I'm Currently Focused On</h3>
              <div className="space-y-6">
                {currentFocus.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className={`p-2 rounded-lg bg-secondary ${item.color} bg-opacity-10 h-fit`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div id="philosophy">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Engineering Philosophy
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophies.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:bg-secondary/50 transition-colors">
                  <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
