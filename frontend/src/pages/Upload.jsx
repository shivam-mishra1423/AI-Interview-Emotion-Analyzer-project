import VideoUpload from "../components/VideoUpload.jsx";
import { motion } from "framer-motion";
import { Camera, Mic, Brain, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: Camera, title: "Frame extraction",   desc: "We sample frames and detect faces using OpenCV." },
  { icon: Brain,  title: "Emotion classification", desc: "DeepFace classifies 7 emotion categories." },
  { icon: Mic,    title: "Speech analysis",     desc: "Audio is transcribed and scored for clarity & pace." },
  { icon: CheckCircle2, title: "Final report",  desc: "An ML model fuses everything into a confidence score." },
];

export default function Upload() {
  return (
    <div className="grid lg:grid-cols-[1fr,360px] gap-6">
      <div>
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                   className="font-display text-3xl font-bold">
          Upload an interview
        </motion.h1>
        <p className="text-muted mt-1">We analyze face, voice and language to coach you.</p>

        <div className="mt-6">
          <VideoUpload />
        </div>
      </div>

      <aside className="space-y-3">
        <h3 className="font-display font-semibold">How it works</h3>
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card !p-4 flex gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center shrink-0 shadow-glow">
              <s.icon size={16} className="text-white" />
            </div>
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-muted">{s.desc}</div>
            </div>
          </motion.div>
        ))}
      </aside>
    </div>
  );
}
