import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, LogOut, LayoutDashboard, Upload, LogIn } from "lucide-react";
import { isAuthed, logout, getUser } from "../services/api.js";
import { motion } from "framer-motion";

export default function Navbar() {
  const loc = useLocation();
  const nav = useNavigate();
  const user = getUser();
  const authed = isAuthed();

  const NavLink = ({ to, icon: Icon, children }) => {
    const active = loc.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition
          ${active ? "bg-surface2 text-text" : "text-muted hover:text-text hover:bg-surface2/60"}`}
      >
        <Icon size={16} /> {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow"
          >
            <Brain size={18} className="text-white" />
          </motion.div>
          <div className="leading-tight">
            <div className="font-display font-bold">Interview<span className="gradient-text">AI</span></div>
            <div className="text-[10px] text-muted -mt-0.5">Emotion · Speech · Confidence</div>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {authed && <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>}
          {authed && <NavLink to="/upload"    icon={Upload}>Upload</NavLink>}
        </nav>

        <div className="flex items-center gap-2">
          {authed ? (
            <>
              <div className="hidden sm:flex items-center gap-2 badge">
                <div className="w-6 h-6 rounded-full bg-gradient-accent grid place-items-center text-[11px] font-bold">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-xs">{user?.name}</span>
              </div>
              <button onClick={logout} className="btn-ghost !px-3 !py-2">
                <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => nav("/login")} className="btn-ghost !px-3 !py-2">
                <LogIn size={16} /> Login
              </button>
              <button onClick={() => nav("/register")} className="btn-primary !px-4 !py-2">
                Get started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
