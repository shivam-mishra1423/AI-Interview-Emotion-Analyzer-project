import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, Sparkles, BarChart3, Mic, Camera, ShieldCheck, ArrowRight,
} from "lucide-react";

const features = [
  { icon: Camera,      title: "Facial Emotion Detection",  desc: "OpenCV + DeepFace classify 7 emotions across video frames." },
  { icon: Mic,         title: "Speech & NLP Analysis",     desc: "Transcribe audio, score pace, fillers and positive language." },
  { icon: BarChart3,   title: "Confidence Scoring",        desc: "Random-Forest model fuses visual, audio & text features." },
  { icon: ShieldCheck, title: "Private & Secure",          desc: "Your videos never leave your backend. JWT-protected APIs." },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative pt-10 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 badge mb-6"
        >
          <Sparkles size={12} className="text-primary2" />
          <span className="text-xs">AI-powered interview coach</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display font-bold text-4xl sm:text-6xl leading-tight tracking-tight"
        >
          Master your interviews with <br className="hidden sm:block" />
          <span className="gradient-text">real-time AI feedback</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="mt-5 text-muted max-w-2xl mx-auto"
        >
          Upload a recorded interview and get instant analysis on your facial emotions,
          speech communication quality, and overall confidence — backed by computer
          vision and NLP.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link to="/register" className="btn-primary">Get started <ArrowRight size={16} /></Link>
          <Link to="/login" className="btn-ghost">I have an account</Link>
        </motion.div>

        {/* Floating preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-16 mx-auto max-w-3xl"
        >
          <div className="card relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-glow opacity-50 pointer-events-none" />
            <div className="grid grid-cols-3 gap-4 relative">
              {[
                { label: "Confidence",    value: "87",   accent: "from-primary to-primary2" },
                { label: "Communication", value: "92",   accent: "from-primary2 to-success" },
                { label: "Emotion",       value: "78",   accent: "from-accent to-primary" },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="rounded-xl bg-surface2 border border-border p-4 text-left"
                >
                  <div className="text-xs text-muted uppercase tracking-wider">{m.label}</div>
                  <div className={`mt-1 font-display text-3xl font-bold bg-gradient-to-r ${m.accent} bg-clip-text text-transparent`}>
                    {m.value}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted text-left relative">
              <Brain size={14} className="inline mr-1.5 text-primary" />
              “Excellent energy and clarity. Reduce filler words slightly to push confidence above 90.”
            </p>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-16">
        <h2 className="font-display text-3xl font-bold text-center mb-12">
          A complete <span className="gradient-text">AI interview pipeline</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="card hover:border-primary/40 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
                <f.icon size={18} className="text-white" />
              </div>
              <h3 className="mt-4 font-display font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
