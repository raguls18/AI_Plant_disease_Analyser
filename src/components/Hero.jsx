import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-emerald-950 mb-6">
            Keep your crops <span className="text-emerald-600">thriving</span>
          </h1>
          <p className="text-lg text-emerald-800/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Instant plant disease identification and treatment recommendations powered by Gemini 1.5 Flash. Protect your harvest with expert botanical AI.
          </p>
        </motion.div>

        <div className="absolute top-0 -left-20 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;