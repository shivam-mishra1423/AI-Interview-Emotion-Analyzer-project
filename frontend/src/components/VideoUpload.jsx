import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Film, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadApi } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function VideoUpload() {
  const [file, setFile]         = useState(null);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy]         = useState(false);
  const nav = useNavigate();

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"] },
    maxFiles: 1,
    maxSize: 200 * 1024 * 1024, // 200MB
  });

  const handleUpload = async () => {
    if (!file) return;
    setBusy(true); setProgress(0);
    try {
      const iv = await uploadApi.video(file, setProgress);
      toast.success("Upload complete — analysis started!");
      nav(`/result/${iv.id}`);
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Upload failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="card">
      <div
        {...getRootProps()}
        className={`relative overflow-hidden cursor-pointer rounded-xl border-2 border-dashed
          ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
          transition-all p-10 text-center`}
      >
        <input {...getInputProps()} />

        {/* Animated glow */}
        <div className="absolute inset-0 bg-grid-glow opacity-60 pointer-events-none" />

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow mb-4"
        >
          <UploadCloud className="text-white" size={28} />
        </motion.div>

        <h3 className="font-display text-xl font-semibold mb-1">
          {isDragActive ? "Drop the video here" : "Drag & drop your interview video"}
        </h3>
        <p className="text-sm text-muted">or click to browse • MP4, MOV, AVI, MKV, WebM • up to 200MB</p>
      </div>

      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-surface2 border border-border"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-accent grid place-items-center">
              <Film size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium">{file.name}</div>
              <div className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(1)} MB</div>
            </div>
            {!busy && (
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="p-2 hover:bg-surface rounded-lg"
              >
                <X size={16} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {busy && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted mb-1.5">
            <span>Uploading…</span><span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-surface2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <button
          disabled={!file || busy}
          onClick={handleUpload}
          className="btn-primary"
        >
          {busy ? <><Loader2 className="animate-spin" size={16} /> Processing…</>
                : <>Analyze interview →</>}
        </button>
      </div>
    </div>
  );
}
