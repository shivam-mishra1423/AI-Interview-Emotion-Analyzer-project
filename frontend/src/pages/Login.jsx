import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { authApi } from "../services/api.js";
import toast from "react-hot-toast";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await authApi.login(form);
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));
      toast.success(`Welcome back, ${res.user.name}!`);
      nav("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Login failed");
    } finally { setBusy(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-10"
    >
      <div className="card">
        <h1 className="font-display text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted mt-1">Sign in to continue your interview prep.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type="email" required className="input pl-10"
                     value={form.email}
                     onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type="password" required className="input pl-10"
                     value={form.password}
                     onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
          </div>
          <button disabled={busy} className="btn-primary w-full">
            <LogIn size={16} /> {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-sm text-muted text-center">
          New here?{" "}
          <Link to="/register" className="gradient-text font-medium">Create an account</Link>
        </p>
      </div>
    </motion.div>
  );
}
