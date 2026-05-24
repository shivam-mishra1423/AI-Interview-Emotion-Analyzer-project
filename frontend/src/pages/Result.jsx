import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, ArrowLeft, Loader2, Sparkles, Mic, Camera, FileText } from "lucide-react";
import { analysisApi } from "../services/api.js";
import ConfidenceMeter from "../components/ConfidenceMeter.jsx";
import EmotionChart from "../components/EmotionChart.jsx";
import toast from "react-hot-toast";

export default function Result() {
  const { id } = useParams();
  const [iv, setIv] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const data = await analysisApi.get(id);
        if (cancelled) return;
        setIv(data);
        if (data.status === "processing" || data.status === "pending") {
          setTimeout(tick, 4000);
        }
      } catch {
        toast.error("Could not load result");
      }
    };
    tick();
    return () => { cancelled = true; };
  }, [id]);

  if (!iv) {
    return (
      <div className="card flex items-center gap-3">
        <Loader2 className="animate-spin text-primary" /> Loading…
      </div>
    );
  }

  const processing = iv.status === "processing" || iv.status === "pending";

  return (
    <div>
      <Link to="/dashboard" className="text-sm text-muted hover:text-text inline-flex items-center gap-1.5 mb-4">
        <ArrowLeft size={14} /> Back to dashboard
      </Link>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                     className="font-display text-3xl font-bold">
            Interview #{iv.id} report
          </motion.h1>
          <p className="text-muted text-sm">
            {new Date(iv.created_at).toLocaleString()} · status {" "}
            <span className={`badge ${processing ? "text-warning" : iv.status === "done" ? "text-success" : "text-danger"}`}>
              {iv.status}
            </span>
          </p>
        </div>
        {iv.status === "done" && (
          <a href={analysisApi.report(iv.id)} className="btn-primary" target="_blank" rel="noreferrer">
            <Download size={16} /> Download PDF
          </a>
        )}
      </div>

      {processing && (
        <div className="card flex items-center gap-3 mb-6">
          <Loader2 className="animate-spin text-primary" />
          <div>
            <div className="font-medium">Analysis in progress</div>
            <div className="text-sm text-muted">Extracting frames, running emotion detection, transcribing audio…</div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Confidence */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card">
          <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-primary" /> Confidence
          </h3>
          <ConfidenceMeter score={iv.confidence_score} label="Confidence" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card">
          <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
            <Mic size={16} className="text-primary2" /> Communication
          </h3>
          <ConfidenceMeter score={iv.communication_score} label="Communication" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
          <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
            <Camera size={16} className="text-accent" /> Emotion
          </h3>
          <ConfidenceMeter score={iv.emotion_score} label="Emotion" />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <div className="card">
          <h3 className="font-display font-semibold mb-2">Emotion distribution</h3>
          <EmotionChart data={iv.emotions} />
        </div>

        <div className="card">
          <h3 className="font-display font-semibold mb-3">Speech metrics</h3>
          {iv.speech_metrics && Object.keys(iv.speech_metrics).length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(iv.speech_metrics).map(([k, v]) => (
                <div key={k} className="rounded-xl bg-surface2 border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted">
                    {k.replace(/_/g, " ")}
                  </div>
                  <div className="mt-0.5 font-display text-lg font-bold">{String(v)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted text-sm">No speech metrics yet.</div>
          )}
        </div>
      </div>

      {iv.feedback && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    className="card mt-4 border-primary/40">
          <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
            <FileText size={16} className="text-primary" /> AI Coach feedback
          </h3>
          <p className="text-sm text-muted leading-relaxed">{iv.feedback}</p>
        </motion.div>
      )}

      {iv.transcript && (
        <div className="card mt-4">
          <h3 className="font-display font-semibold mb-2">Transcript</h3>
          <p className="text-sm text-muted whitespace-pre-wrap leading-relaxed">{iv.transcript}</p>
        </div>
      )}
    </div>
  );
}
