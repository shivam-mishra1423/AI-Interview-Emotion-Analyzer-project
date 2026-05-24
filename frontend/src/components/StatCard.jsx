import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, accent = "from-primary to-primary2" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card overflow-hidden relative"
    >
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl`} />
      <div className="flex items-center gap-3 text-muted text-sm">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${accent} grid place-items-center text-white`}>
          <Icon size={18} />
        </div>
        {label}
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
    </motion.div>
  );
}
