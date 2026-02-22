import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Let's Build Something Secure</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Open for collaborations, hackathons, and freelance opportunities.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              <a href="mailto:lespikiusjunior@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">lespikiusjunior@gmail.com</div>
                </div>
              </a>
              
              <a href="https://github.com/Windowseven" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">GitHub</div>
                  <div className="font-medium">Windowseven</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/Lespikius Junior" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">LinkedIn</div>
                  <div className="font-medium">Lespikius Junior</div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button className="w-full" size="lg">
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
