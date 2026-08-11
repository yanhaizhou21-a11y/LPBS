import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, KeyRound, LockKeyhole, ShieldCheck, ShieldAlert } from 'lucide-react';
import { readJsonResponse } from '../lib/http';
import { ASSETS } from '../data/assets';
import { FloatingInput } from './ui/floating-input';
import { ThemeToggleButton } from './ThemeToggleButton';

interface SecretAdminLoginProps {
  accessDenied?: boolean;
  onLoginSuccess: (adminName: string) => void;
  onBackToHome: () => void;
}

export function SecretAdminLogin({ accessDenied = false, onLoginSuccess, onBackToHome }: SecretAdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(accessDenied ? 'Error: Unauthorized Access. Masuk dengan akun admin untuk melanjutkan.' : null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
      const data = await readJsonResponse(response, 'Respons autentikasi tidak valid. Pastikan backend aktif.');

      if (response.ok && data.success) onLoginSuccess(data.admin.name);
      else setError(data.message || 'Kombinasi kredensial admin salah.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Gagal menghubungi server autentikasi admin. Pastikan backend aktif.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <button onClick={onBackToHome} className="admin-login-back">
        <ArrowLeft size={18} aria-hidden="true" /> Kembali ke beranda
      </button>
      <ThemeToggleButton className="admin-login-theme" />

      <section className="admin-login-intro" aria-label="Portal internal Botani Seed">
        <img src={ASSETS.logo} alt="" width="52" height="52" />
        <p className="admin-login-eyebrow">PT Botani Seed Indonesia</p>
        <h1>Kelola operasional dalam satu portal.</h1>
        <p>Pantau pesanan, perbarui status pembayaran, dan kelola katalog produk dari ruang kerja yang terlindungi.</p>
        <div className="admin-login-security"><ShieldCheck size={19} aria-hidden="true" /> Akses khusus Super Admin</div>
      </section>

      <div className="admin-login-card">
        <div className="admin-login-heading">
          <span className="admin-login-lock"><LockKeyhole size={24} aria-hidden="true" /></span>
          <div>
            <p>Portal internal</p>
            <h2>Masuk sebagai admin</h2>
          </div>
        </div>
        <p className="admin-login-description">Gunakan kredensial Super Admin yang telah dikonfigurasi pada server.</p>

        {error && (
          <div className="admin-login-error" role="alert">
            <ShieldAlert size={18} aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <FloatingInput
            label="Username Super Admin"
            type="text"
            id="admin-username"
            autoComplete="username"
            required
            value={username}
            aria-invalid={Boolean(error)}
            onChange={(event) => setUsername(event.target.value)}
          />
          <div className="admin-password-control">
            <FloatingInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="admin-password"
              autoComplete="current-password"
              required
              value={password}
              aria-invalid={Boolean(error)}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="button" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}>
              {showPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
            </button>
          </div>

          <button type="submit" disabled={isLoading} className="admin-login-submit">
            {isLoading ? <span>Memverifikasi...</span> : <><KeyRound size={18} aria-hidden="true" /> Masuk ke dashboard</>}
          </button>
        </form>

        <p className="admin-login-footnote">Tidak tersedia pendaftaran akun publik. Seluruh aktivitas admin tercatat.</p>
      </div>
    </main>
  );
}
