import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface SecretAdminLoginProps {
  accessDenied?: boolean;
  onLoginSuccess: (adminName: string) => void;
  onBackToHome: () => void;
}

export function SecretAdminLogin({ accessDenied = false, onLoginSuccess, onBackToHome }: SecretAdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(accessDenied ? 'Error: Unauthorized Access. Masuk dengan akun admin untuk melanjutkan.' : null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Masukkan username dan password admin.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLoginSuccess(data.admin.name);
      } else {
        setError(data.message || 'Kombinasi kredensial admin salah.');
      }
    } catch (err: any) {
      setError('Gagal menghubungi server autentikasi admin. Pastikan backend aktif.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700 p-8 shadow-2xl relative">
        <button
          onClick={onBackToHome}
          className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembalilah ke Utama
        </button>

        <div className="text-center mt-6 mb-8">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Secret Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">PT Botani Seed Indonesia (Internal Access Only)</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Username Admin</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password Rahasia</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 disabled:opacity-50 mt-6"
          >
            {isLoading ? (
              <span>Memverifikasi Autentikasi...</span>
            ) : (
              <>
                <KeyRound className="w-4 h-4" /> Masuk Portal Admin
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-700/60 text-center">
          <p className="text-[11px] text-slate-500">
            Akses rute terlindungi. Seluruh aktivitas ditinjau secara berkala.
          </p>
        </div>
      </div>
    </div>
  );
}
