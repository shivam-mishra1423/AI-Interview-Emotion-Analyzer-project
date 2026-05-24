import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const statusUi = {
  done:       { icon: CheckCircle2, color: "text-success", label: "Completed" },
  processing: { icon: Loader2,      color: "text-warning animate-spin", label: "Processing" },
  pending:    { icon: Loader2,      color: "text-warning animate-spin", label: "Pending" },
  failed:     { icon: XCircle,      color: "text-danger",  label: "Failed" },
};

export default function ReportCard({ interview, index = 0 }) {
  const S = statusUi[interview.status] || statusUi.pending;
  const Icon = S.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card hover:border-primary/40 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted mb-1">
            <Calendar size={12} />
            {new Date(interview.created_at).toLocaleString()}
          </div>
          <h3 className="font-display font-semibold">Interview #{interview.id}</h3>
        </div>
        <div className={`badge ${S.color}`}>
          <Icon size={12} /> <span>{S.label}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Metric label="Confidence"    value={interview.confidence_score}    accent="from-primary to-primary2" />
        <Metric label="Communication" value={interview.communication_score} accent="from-primary2 to-success" />
        <Metric label="Emotion"       value={interview.emotion_score}       accent="from-accent to-primary" />
      </div>

      <Link
        to={`/result/${interview.id}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm gradient-text font-medium group-hover:gap-3 transition-all"
      >
        View report <ArrowUpRight size={16} />
      </Link>
    </motion.div>
  );
}

function Metric({ label, value, accent }) {
  return (
    <div className="rounded-xl bg-surface2 border border-border p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted">{label}</div>
      <div className={`mt-1 font-display text-xl font-bold bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
        {Number(value || 0).toFixed(0)}
      </div>
    </div>
  );
}
