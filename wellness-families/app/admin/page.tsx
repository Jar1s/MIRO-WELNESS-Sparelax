'use client';

import { useEffect, useState } from 'react';

type PopupForm = {
  id?: string;
  image_url: string;
  popup_size: 'sm' | 'md' | 'lg';
  popup_scale: number;
  enabled: boolean;
};

const emptyForm: PopupForm = {
  image_url: '',
  popup_size: 'md',
  popup_scale: 100,
  enabled: true,
};

const MIN_POPUP_SCALE = 70;
const MAX_POPUP_SCALE = 220;
const normalizeScale = (value: number) => Math.min(MAX_POPUP_SCALE, Math.max(MIN_POPUP_SCALE, Math.round(value)));

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PopupForm>(emptyForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_password');
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    loadPopup(password);

    const handleFocus = () => {
      loadPopup(password);
    };

    window.addEventListener('focus', handleFocus);
    const interval = setInterval(() => {
      loadPopup(password);
    }, 30000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [authed, password]);

  const loadPopup = async (pwd: string) => {
    const res = await fetch('/api/admin/popup', {
      headers: { 'x-admin-password': pwd },
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Unauthorized');
    }
    const json = await res.json();
    if (json?.popup) {
      const p = json.popup;
      setForm({
        id: p.id,
        image_url: p.image_url || '',
        popup_size: p.popup_size === 'lg' || p.popup_size === 'sm' ? p.popup_size : 'md',
        popup_scale: typeof p.popup_scale === 'number' ? normalizeScale(p.popup_scale) : 100,
        enabled: Boolean(p.enabled),
      });
      if (!p.image_url) {
        setMessage('Žiadny obrázok nie je uložený.');
      }
    } else {
      setForm(emptyForm);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await loadPopup(password);
      sessionStorage.setItem('admin_password', password);
      setAuthed(true);
      setMessage('Načítané.');
    } catch {
      setMessage('Nesprávne heslo.');
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  const savePopup = async (payload: PopupForm) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/popup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({
          id: payload.id,
          image_url: payload.image_url,
          popup_size: payload.popup_size,
          popup_scale: normalizeScale(payload.popup_scale),
          enabled: payload.enabled,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || 'Save failed');
      }
      setForm((prev) => ({
        ...prev,
        id: json.popup?.id || prev.id,
        popup_size:
          json.popup?.popup_size === 'lg' || json.popup?.popup_size === 'sm'
            ? json.popup.popup_size
            : 'md',
        popup_scale: typeof json.popup?.popup_scale === 'number' ? normalizeScale(json.popup.popup_scale) : 100,
      }));
      setMessage('Uložené.');
      if (typeof window !== 'undefined') {
        localStorage.setItem('promo_popup_force_refresh', String(Date.now()));
      }
      return true;
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Save failed';
      setMessage(`Uloženie zlyhalo: ${text}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setLoading(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-password': password },
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || 'Upload failed');
      }

      const nextForm = { ...form, image_url: json.url };
      setForm(nextForm);
      setMessage('Obrázok nahraný. Ukladám...');
      await savePopup(nextForm);
    } catch {
      setMessage('Upload zlyhal.');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    await savePopup(form);
  };

  const handleScaleChange = (value: number) => {
    setForm((prev) => ({ ...prev, popup_scale: normalizeScale(value) }));
  };

  const handleScaleCommit = (value: number) => {
    const nextForm = { ...form, popup_scale: normalizeScale(value) };
    setForm(nextForm);
    void savePopup(nextForm);
  };

  const previewSizeClass =
    form.popup_size === 'lg'
      ? 'max-w-[calc(320px*var(--popup-scale))]'
      : form.popup_size === 'sm'
        ? 'max-w-[calc(160px*var(--popup-scale))]'
        : 'max-w-[calc(230px*var(--popup-scale))]';
  const previewScaleStyle = {
    '--popup-scale': String(form.popup_scale / 100),
  } as React.CSSProperties;

  const handlePreview = () => {
    window.open('/?popupPreview=1', '_blank', 'noopener,noreferrer');
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-2xl shadow-lg border border-[#e8e6e3] w-full max-w-sm space-y-4"
        >
          <h1 className="text-xl font-display font-bold text-[#2c2c2c]">Admin</h1>
          <input
            type="password"
            placeholder="Heslo"
            className="w-full border border-[#e8e6e3] rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6bb8ff] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4d9be0] transition-colors"
          >
            {loading ? 'Načítavam...' : 'Prihlásiť'}
          </button>
          {message && <p className="text-sm text-[#6b6b6b]">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#e8e6e3] space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-[#2c2c2c]">Popup admin</h1>
            <p className="text-sm text-[#6b6b6b]">Nastav akciu a obrázok.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={handlePreview}
              className="bg-white text-[#2c2c2c] px-4 py-3 rounded-lg font-semibold border border-[#e8e6e3] hover:bg-[#f5f3f0] transition-colors"
            >
              Preview
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => loadPopup(password)}
              className="bg-white text-[#2c2c2c] px-4 py-3 rounded-lg font-semibold border border-[#e8e6e3] hover:bg-[#f5f3f0] transition-colors"
            >
              Obnoviť
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleSave}
              className="bg-[#6bb8ff] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4d9be0] transition-colors"
            >
              {loading ? 'Ukladám...' : 'Uložiť'}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#2c2c2c]">Obrázok</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleUpload(file);
              }
            }}
          />
          <p className="text-xs text-[#6b6b6b]">Po nahraní obrázka sa nastavenie uloží automaticky.</p>
          {form.image_url && (
            <div className="space-y-2">
              <div className="text-xs text-[#6b6b6b] break-all">{form.image_url}</div>
              <div
                className={`rounded-lg overflow-hidden border border-[#e8e6e3] ${previewSizeClass} transition-[max-width] duration-200`}
                style={previewScaleStyle}
              >
                <img src={form.image_url} alt="Popup preview" className="w-full h-auto" />
              </div>
              <p className="text-xs text-[#6b6b6b]">
                Náhľad veľkosti: {form.popup_size === 'sm' ? 'Malý' : form.popup_size === 'lg' ? 'Veľký' : 'Stredný'}
              </p>
              <p className="text-xs text-[#6b6b6b]">Mierka: {form.popup_scale}%</p>
            </div>
          )}
          {!form.image_url && (
            <div className="text-xs text-[#6b6b6b]">Momentálne nie je uložený žiadny obrázok.</div>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#2c2c2c]">Veľkosť popupu</label>
          <select
            className="w-full border border-[#e8e6e3] rounded-lg px-3 py-2 bg-white"
            value={form.popup_size}
            onChange={(e) => {
              const nextForm = {
                ...form,
                popup_size: e.target.value as PopupForm['popup_size'],
              };
              setForm(nextForm);
              savePopup(nextForm);
            }}
          >
            <option value="sm">Malý</option>
            <option value="md">Stredný</option>
            <option value="lg">Veľký</option>
          </select>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#6b6b6b]">
              <span>Jemné doladenie</span>
              <span>{form.popup_scale}%</span>
            </div>
            <input
              type="range"
              min={MIN_POPUP_SCALE}
              max={MAX_POPUP_SCALE}
              step={1}
              value={form.popup_scale}
              onChange={(e) => handleScaleChange(Number(e.target.value))}
              onMouseUp={(e) => handleScaleCommit(Number((e.target as HTMLInputElement).value))}
              onTouchEnd={(e) => handleScaleCommit(Number((e.target as HTMLInputElement).value))}
              onKeyUp={(e) => {
                if (
                  e.key === 'ArrowLeft' ||
                  e.key === 'ArrowRight' ||
                  e.key === 'Home' ||
                  e.key === 'End' ||
                  e.key === 'PageUp' ||
                  e.key === 'PageDown'
                ) {
                  handleScaleCommit(Number((e.target as HTMLInputElement).value));
                }
              }}
              className="w-full accent-[#CD7F32]"
            />
            <p className="text-xs text-[#6b6b6b]">Báza je sm/md/lg, slider ju doladí v rozsahu {MIN_POPUP_SCALE}% až {MAX_POPUP_SCALE}%.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="enabled"
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => {
              const nextForm = { ...form, enabled: e.target.checked };
              setForm(nextForm);
              savePopup(nextForm);
            }}
          />
          <label htmlFor="enabled" className="text-sm text-[#2c2c2c]">
            Aktivovať popup
          </label>
        </div>

        {message && <p className="text-sm text-[#6b6b6b]">{message}</p>}
      </div>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          type="button"
          disabled={loading}
          onClick={handleSave}
          className="bg-[#6bb8ff] text-white px-6 py-3 rounded-full font-semibold shadow-xl hover:bg-[#4d9be0] transition-colors"
        >
          {loading ? 'Ukladám...' : 'Uložiť'}
        </button>
      </div>
    </div>
  );
}
