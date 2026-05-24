import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Video, BarChart3, MessageSquare, Sparkles, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

import { dashboardApi } from "../services/api.js";
import StatCard from "../components/StatCard.jsx";
import ReportCard from "../components/ReportCard.jsx";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats]           = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    Promise.all([dashboardApi.stats(), dashboardApi.interviews()])
      .then(([s, iv]) => { setStats(s); setInterviews(iv); })
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const chartData = interviews.slice(0, 10).reverse().map((iv) => ({
    name: `#${iv.id}`,
    Confidence:    iv.confidence_score,
    Communication: iv.communication_score,
    Emotion:       iv.emotion_score,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                     className="font-display text-3xl font-bold">Dashboard</motion.h1>
          <p className="text-muted">Track your interview performance over time.</p>
        </div>
        <Link to="/upload" className="btn-primary">
          <Plus size={16} /> New analysis
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Video}         label="Total interviews" value={loading ? "…" : stats?.total_interviews ?? 0} accent="from-primary to-primary2" />
        <StatCard icon={Sparkles}      label="Avg confidence"   value={loading ? "…" : (stats?.avg_confidence ?? 0).toFixed(0)} accent="from-accent to-primary" />
        <StatCard icon={MessageSquare} label="Avg communication" value={loading ? "…" : (stats?.avg_communication ?? 0).toFixed(0)} accent="from-primary2 to-success" />
        <StatCard icon={BarChart3}     label="Avg emotion"       value={loading ? "…" : (stats?.avg_emotion ?? 0).toFixed(0)} accent="from-warning to-accent" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <div className="card lg:col-span-2">
          <h3 className="font-display font-semibold mb-4">Performance trend</h3>
          {chartData.length === 0 ? (
            <div className="text-muted text-sm h-64 grid place-items-center">No interviews yet. Upload one to see analytics.</div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#23233a" />
                  <XAxis dataKey="name" stroke="#9494b0" fontSize={12} />
                  <YAxis stroke="#9494b0" fontSize={12} />
                  <Tooltip contentStyle={{ background: "#11111d", border: "1px solid #23233a", borderRadius: 12 }} />
                  <Bar dataKey="Confidence"    fill="#7c5cff" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Communication" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Emotion"       fill="#ff5c8a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="font-display font-semibold mb-2">Coach tip</h3>
          <p className="text-sm text-muted">
            Aim for ~130 words per minute and keep filler words under 3%. Smile naturally during your first answer — it sets a positive tone.
          </p>
          <div className="mt-4 p-4 rounded-xl bg-gradient-primary/10 border border-primary/30">
            <div className="text-xs uppercase tracking-wider text-primary2">Pro</div>
            <div className="font-display font-semibold mt-1">Record 3 mock interviews this week.</div>
          </div>
        </div>
      </div>

      <h2 className="font-display text-xl font-semibold mt-10 mb-4">Recent interviews</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {interviews.length === 0 && !loading && (
          <div className="card col-span-full text-center text-muted">
            No interviews yet. <Link to="/upload" className="gradient-text font-medium">Upload your first video →</Link>
          </div>
        )}
        {interviews.map((iv, i) => <ReportCard key={iv.id} interview={iv} index={i} />)}
      </div>
    </div>
  );
}
