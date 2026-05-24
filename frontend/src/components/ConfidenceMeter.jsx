import { motion } from "framer-motion";

export default function ConfidenceMeter({ score = 0, label = "Confidence" }) {
  const pct = Math.max(0, Math.min(100, score));
  const r = 70, c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const color =
    pct >= 75 ? "#22c55e" : pct >= 50 ? "#7c5cff" : pct >= 30 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg width="176" height="176" className="-rotate-90">
        <circle cx="88" cy="88" r={r} stroke="#23233a" strokeWidth="14" fill="none" />
        <motion.circle
          cx="88" cy="88" r={r}
          stroke={color} strokeWidth="14" fill="none" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-display text-4xl font-bold gradient-text"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          {pct.toFixed(0)}
        </motion.span>
        <span className="text-xs text-muted mt-1">{label}</span>
      </div>
    </div>
  );
}
