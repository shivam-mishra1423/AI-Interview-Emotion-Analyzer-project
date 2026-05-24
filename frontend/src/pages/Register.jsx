import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { authApi } from "../services/api.js";
import toast from "react-hot-toast";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await authApi.register(form);
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));
      toast.success(`Account created — welcome ${res.user.name}!`);
      nav("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Registration failed");
    } finally { setBusy(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto mt-10">
      <div className="card">
        <h1 className="font-display text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted mt-1">Free forever. Start analyzing in 30 seconds.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field icon={User} label="Full name" type="text" value={form.name}
                 onChange={(v) => setForm({ ...form, name: v })} />
          <Field icon={Mail} label="Email" type="email" value={form.email}
                 onChange={(v) => setForm({ ...form, email: v })} />
          <Field icon={Lock} label="Password" type="password" value={form.password}
                 onChange={(v) => setForm({ ...form, password: v })} />
          <button disabled={busy} className="btn-primary w-full">
            <UserPlus size={16} /> {busy ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-muted text-center">
          Already a member?{" "}
          <Link to="/login" className="gradient-text font-medium">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
}

function Field({ icon: Icon, label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          required type={type} className="input pl-10"
          value={value} onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
