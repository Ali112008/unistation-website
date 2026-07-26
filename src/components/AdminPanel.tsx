"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════
   UniStation Admin Panel — Site-wide Content Manager
   Manages: brand, social, stats, offices, testimonials,
            packages, destinations, faqs
   ═══════════════════════════════════════════════════ */

type ConfigData = Record<string, any>;

/* ─── Session Management (7-day persist) ─── */
const SESSION_KEY = "unistation_admin_session_v2";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

function saveSession(password: string) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ pw: password, ts: Date.now() }));
}
function loadSession(): string | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (Date.now() - s.ts > SESSION_DURATION) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return s.pw;
  } catch {
    return null;
  }
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

/* ─── Common Styles ─── */
const S = {
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 },
  input: {
    width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: 8,
    fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const,
    transition: "border-color 0.15s",
  },
  textarea: {
    width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: 8,
    fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const,
    resize: "vertical" as const, minHeight: 80, lineHeight: 1.5,
  },
  card: { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 14, marginBottom: 12 },
  deleteBtn: {
    padding: "4px 10px", background: "#fee2e2", color: "#991b1b", border: "none",
    borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
  addBtn: {
    padding: "8px 14px", background: "#f0b414", color: "#28143c", border: "none",
    borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8,
  },
  saveBtn: (saving: boolean) => ({
    padding: "10px 22px", background: saving ? "#9ca3af" : "linear-gradient(135deg, #f0b414, #e5a710)",
    color: "#28143c", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 800,
    cursor: saving ? "not-allowed" : "pointer", fontFamily: "Cairo, sans-serif",
    boxShadow: saving ? "none" : "0 4px 15px rgba(240,180,20,0.4)",
  }),
  undoBtn: {
    padding: "10px 18px", background: "white", color: "#374151", border: "1.5px solid #e5e7eb",
    borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Cairo, sans-serif",
  },
};

/* ─── Field Components ─── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={e => e.currentTarget.style.borderColor = "#f0b414"}
      onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
      style={S.input}
    />
  );
}

function TextArea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={e => e.currentTarget.style.borderColor = "#f0b414"}
      onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
      style={S.textarea}
    />
  );
}

/* ─── List Editor (for arrays of strings) ─── */
function StringListEditor({ items, onChange, label, addLabel }: {
  items: string[]; onChange: (items: string[]) => void; label: string; addLabel: string;
}) {
  return (
    <div>
      <label style={S.label}>{label}</label>
      {(items || []).map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <input
            type="text"
            value={item}
            onChange={e => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
            style={S.input}
          />
          <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} style={S.deleteBtn}>✕</button>
        </div>
      ))}
      <button onClick={() => onChange([...(items || []), ""])} style={S.addBtn}>+ {addLabel}</button>
    </div>
  );
}

/* ─── Brand Editor ─── */
function BrandEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const d = data || {};
  return (
    <div>
      <Field label="اسم الشركة (Brand Name)"><TextInput value={d.name} onChange={v => onChange({ ...d, name: v })} /></Field>
      <Field label="الشعار النصي (Tagline)"><TextInput value={d.tagline} onChange={v => onChange({ ...d, tagline: v })} /></Field>
      <Field label="رابط اللوجو (Logo URL)"><TextInput value={d.logoUrl} onChange={v => onChange({ ...d, logoUrl: v })} /></Field>
      <Field label="البريد الإلكتروني"><TextInput value={d.email} onChange={v => onChange({ ...d, email: v })} /></Field>
      <Field label="رقم واتساب (بصيغة دولية بدون +)"><TextInput value={d.whatsapp} onChange={v => onChange({ ...d, whatsapp: v })} placeholder="971522732589" /></Field>
      <Field label="حقوق النشر"><TextInput value={d.copyright} onChange={v => onChange({ ...d, copyright: v })} /></Field>
    </div>
  );
}

/* ─── Social Editor ─── */
function SocialEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const d = data || {};
  return (
    <div>
      <Field label="إنستجرام"><TextInput value={d.instagram} onChange={v => onChange({ ...d, instagram: v })} /></Field>
      <Field label="تيك توك"><TextInput value={d.tiktok} onChange={v => onChange({ ...d, tiktok: v })} /></Field>
      <Field label="فيسبوك"><TextInput value={d.facebook} onChange={v => onChange({ ...d, facebook: v })} /></Field>
      <Field label="تويتر / X"><TextInput value={d.twitter} onChange={v => onChange({ ...d, twitter: v })} /></Field>
      <Field label="يوتيوب"><TextInput value={d.youtube} onChange={v => onChange({ ...d, youtube: v })} /></Field>
    </div>
  );
}

/* ─── Stats Editor ─── */
function StatsEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  return (
    <div>
      {(data || []).map((stat, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <strong>رقم #{i + 1}</strong>
            <button onClick={() => onChange(data.filter((_, idx) => idx !== i))} style={S.deleteBtn}>حذف</button>
          </div>
          <Field label="القيمة"><TextInput value={stat.value} onChange={v => { const n = [...data]; n[i] = { ...stat, value: v }; onChange(n); }} /></Field>
          <Field label="الوصف"><TextInput value={stat.label} onChange={v => { const n = [...data]; n[i] = { ...stat, label: v }; onChange(n); }} /></Field>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { label: "", value: "" }])} style={S.addBtn}>+ إضافة رقم</button>
    </div>
  );
}

/* ─── Testimonials Editor ─── */
function TestimonialsEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  return (
    <div>
      {(data || []).map((t, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <strong>رأي #{i + 1}</strong>
            <button onClick={() => onChange(data.filter((_, idx) => idx !== i))} style={S.deleteBtn}>حذف</button>
          </div>
          <Field label="الاسم"><TextInput value={t.name} onChange={v => { const n = [...data]; n[i] = { ...t, name: v }; onChange(n); }} /></Field>
          <Field label="الدولة"><TextInput value={t.country} onChange={v => { const n = [...data]; n[i] = { ...t, country: v }; onChange(n); }} /></Field>
          <Field label="التخصص"><TextInput value={t.program} onChange={v => { const n = [...data]; n[i] = { ...t, program: v }; onChange(n); }} /></Field>
          <Field label="نص الرأي"><TextArea value={t.text} onChange={v => { const n = [...data]; n[i] = { ...t, text: v }; onChange(n); }} /></Field>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { name: "", country: "", program: "", text: "" }])} style={S.addBtn}>+ إضافة رأي</button>
    </div>
  );
}

/* ─── Offices Editor ─── */
function OfficesEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  return (
    <div>
      {(data || []).map((o, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <strong>مكتب #{i + 1}</strong>
            <button onClick={() => onChange(data.filter((_, idx) => idx !== i))} style={S.deleteBtn}>حذف</button>
          </div>
          <Field label="المدينة"><TextInput value={o.city} onChange={v => { const n = [...data]; n[i] = { ...o, city: v }; onChange(n); }} /></Field>
          <Field label="الدولة"><TextInput value={o.country} onChange={v => { const n = [...data]; n[i] = { ...o, country: v }; onChange(n); }} /></Field>
          <Field label="العنوان"><TextArea value={o.address} onChange={v => { const n = [...data]; n[i] = { ...o, address: v }; onChange(n); }} /></Field>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { city: "", country: "", address: "" }])} style={S.addBtn}>+ إضافة مكتب</button>
    </div>
  );
}

/* ─── Packages Editor ─── */
function PackagesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const packages = data || {};
  const slugs = Object.keys(packages);
  const [selectedSlug, setSelectedSlug] = useState<string>(slugs[0] || "");

  // Auto-select first if none selected
  useEffect(() => {
    if (!selectedSlug && slugs.length > 0) setSelectedSlug(slugs[0]);
  }, [slugs, selectedSlug]);

  if (slugs.length === 0) return <div>لا توجد باقات</div>;

  const pkg = packages[selectedSlug];

  const updatePkg = (newPkg: any) => {
    onChange({ ...packages, [selectedSlug]: newPkg });
  };

  return (
    <div>
      {/* Package selector */}
      <Field label="اختر الباقة">
        <select
          value={selectedSlug}
          onChange={e => setSelectedSlug(e.target.value)}
          style={{ ...S.input, padding: "10px 12px", cursor: "pointer" }}
        >
          {slugs.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>

      <div style={S.card}>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>الـ slug: <code>{selectedSlug}</code></div>

        <Field label="Intro / المقدمة"><TextArea value={pkg.intro} onChange={v => updatePkg({ ...pkg, intro: v })} /></Field>

        {/* Tiers */}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
          <strong style={{ display: "block", marginBottom: 10 }}>Tiers / المستويات ({(pkg.tiers || []).length})</strong>
          {(pkg.tiers || []).map((tier: any, ti: number) => (
            <div key={ti} style={{ ...S.card, background: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong>Tier #{ti + 1}</strong>
                <button onClick={() => updatePkg({ ...pkg, tiers: pkg.tiers.filter((_: any, idx: number) => idx !== ti) })} style={S.deleteBtn}>حذف</button>
              </div>
              <Field label="الاسم"><TextInput value={tier.name} onChange={v => { const n = [...pkg.tiers]; n[ti] = { ...tier, name: v }; updatePkg({ ...pkg, tiers: n }); }} /></Field>
              <Field label="العنوان الفرعي"><TextInput value={tier.subtitle} onChange={v => { const n = [...pkg.tiers]; n[ti] = { ...tier, subtitle: v }; updatePkg({ ...pkg, tiers: n }); }} /></Field>
              {tier.price && <Field label="السعر"><TextInput value={tier.price} onChange={v => { const n = [...pkg.tiers]; n[ti] = { ...tier, price: v }; updatePkg({ ...pkg, tiers: n }); }} /></Field>}
              <Field label="الفئة المستهدفة (idealFor)"><TextArea value={tier.idealFor} onChange={v => { const n = [...pkg.tiers]; n[ti] = { ...tier, idealFor: v }; updatePkg({ ...pkg, tiers: n }); }} /></Field>

              {/* Features */}
              <div style={{ marginTop: 10 }}>
                <strong style={{ display: "block", marginBottom: 6, fontSize: 13 }}>المميزات ({(tier.features || []).length})</strong>
                {(tier.features || []).map((f: any, fi: number) => (
                  <div key={fi} style={{ ...S.card, background: "#f9fafb", marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <small>ميزة #{fi + 1}</small>
                      <button onClick={() => { const n = [...pkg.tiers]; n[ti] = { ...tier, features: tier.features.filter((_: any, idx: number) => idx !== fi) }; updatePkg({ ...pkg, tiers: n }); }} style={S.deleteBtn}>✕</button>
                    </div>
                    <Field label="العنوان"><TextInput value={f.title} onChange={v => { const feats = [...tier.features]; feats[fi] = { ...f, title: v }; const n = [...pkg.tiers]; n[ti] = { ...tier, features: feats }; updatePkg({ ...pkg, tiers: n }); }} /></Field>
                    <Field label="الوصف"><TextArea value={f.description} onChange={v => { const feats = [...tier.features]; feats[fi] = { ...f, description: v }; const n = [...pkg.tiers]; n[ti] = { ...tier, features: feats }; updatePkg({ ...pkg, tiers: n }); }} /></Field>
                  </div>
                ))}
                <button onClick={() => { const feats = [...(tier.features || []), { title: "", description: "" }]; const n = [...pkg.tiers]; n[ti] = { ...tier, features: feats }; updatePkg({ ...pkg, tiers: n }); }} style={S.addBtn}>+ إضافة ميزة</button>
              </div>
            </div>
          ))}
          <button onClick={() => updatePkg({ ...pkg, tiers: [...(pkg.tiers || []), { name: "", subtitle: "", features: [], idealFor: "" }] })} style={S.addBtn}>+ إضافة Tier</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Destinations Editor ─── */
function DestinationsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const dests = data || {};
  const slugs = Object.keys(dests);
  const [selectedSlug, setSelectedSlug] = useState<string>(slugs[0] || "");

  useEffect(() => {
    if (!selectedSlug && slugs.length > 0) setSelectedSlug(slugs[0]);
  }, [slugs, selectedSlug]);

  if (slugs.length === 0) return <div>لا توجد وجهات</div>;

  const dest = dests[selectedSlug];
  const updateDest = (newDest: any) => onChange({ ...dests, [selectedSlug]: newDest });

  return (
    <div>
      <Field label="اختر الوجهة">
        <select
          value={selectedSlug}
          onChange={e => setSelectedSlug(e.target.value)}
          style={{ ...S.input, padding: "10px 12px", cursor: "pointer" }}
        >
          {slugs.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>

      <div style={S.card}>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>الـ slug: <code>{selectedSlug}</code></div>

        <Field label="Hero Subtitle"><TextInput value={dest.heroSubtitle} onChange={v => updateDest({ ...dest, heroSubtitle: v })} /></Field>
        <Field label="Hero Description"><TextArea value={dest.heroDescription} onChange={v => updateDest({ ...dest, heroDescription: v })} /></Field>
        <Field label="Overview Title"><TextInput value={dest.overviewTitle} onChange={v => updateDest({ ...dest, overviewTitle: v })} /></Field>

        {/* Overview Paragraphs */}
        <div style={{ marginTop: 10 }}>
          <strong style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Overview Paragraphs ({(dest.overviewParagraphs || []).length})</strong>
          {(dest.overviewParagraphs || []).map((p: string, pi: number) => (
            <div key={pi} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <textarea
                value={p}
                onChange={e => { const n = [...dest.overviewParagraphs]; n[pi] = e.target.value; updateDest({ ...dest, overviewParagraphs: n }); }}
                style={{ ...S.textarea, minHeight: 60 }}
              />
              <button onClick={() => updateDest({ ...dest, overviewParagraphs: dest.overviewParagraphs.filter((_: string, idx: number) => idx !== pi) })} style={S.deleteBtn}>✕</button>
            </div>
          ))}
          <button onClick={() => updateDest({ ...dest, overviewParagraphs: [...(dest.overviewParagraphs || []), ""] })} style={S.addBtn}>+ إضافة فقرة</button>
        </div>

        {/* Stats */}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
          <strong style={{ display: "block", marginBottom: 10 }}>Stats ({(dest.stats || []).length})</strong>
          {(dest.stats || []).map((s: any, si: number) => (
            <div key={si} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <input type="text" placeholder="value" value={s.value} onChange={e => { const n = [...dest.stats]; n[si] = { ...s, value: e.target.value }; updateDest({ ...dest, stats: n }); }} style={S.input} />
              <input type="text" placeholder="label" value={s.label} onChange={e => { const n = [...dest.stats]; n[si] = { ...s, label: e.target.value }; updateDest({ ...dest, stats: n }); }} style={S.input} />
              <button onClick={() => updateDest({ ...dest, stats: dest.stats.filter((_: any, idx: number) => idx !== si) })} style={S.deleteBtn}>✕</button>
            </div>
          ))}
          <button onClick={() => updateDest({ ...dest, stats: [...(dest.stats || []), { label: "", value: "" }] })} style={S.addBtn}>+ إضافة stat</button>
        </div>

        <div style={{ marginTop: 16, padding: 12, background: "#fef3c7", borderRadius: 8, fontSize: 12, color: "#92400e" }}>
          ⚠️ ملاحظة: الـ additionalSections (مثل two-paths, key-advantages, إلخ) معقدة جداً ويُنصح بتعديلها من الكود مباشرة. الـ fields اللي فوق بتغطي أهم المحتوى اللي العميل محتاج يعدله.
        </div>
      </div>
    </div>
  );
}

/* ─── FAQs Editor ─── */
function FaqsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const faqs = data || {};
  const groups = Object.keys(faqs).filter(k => Array.isArray(faqs[k]));
  const [selectedGroup, setSelectedGroup] = useState<string>(groups[0] || "");

  useEffect(() => {
    if (!selectedGroup && groups.length > 0) setSelectedGroup(groups[0]);
  }, [groups, selectedGroup]);

  if (groups.length === 0) return <div>لا توجد مجموعات أسئلة</div>;

  const items: any[] = faqs[selectedGroup] || [];

  return (
    <div>
      <Field label="اختر المجموعة">
        <select
          value={selectedGroup}
          onChange={e => setSelectedGroup(e.target.value)}
          style={{ ...S.input, padding: "10px 12px", cursor: "pointer" }}
        >
          {groups.map(g => <option key={g} value={g}>{g} ({(faqs[g] || []).length})</option>)}
        </select>
      </Field>

      <div style={S.card}>
        {items.map((item, i) => (
          <div key={i} style={{ ...S.card, background: "white", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <small>سؤال #{i + 1}</small>
              <button onClick={() => { const n = [...items]; n.splice(i, 1); onChange({ ...faqs, [selectedGroup]: n }); }} style={S.deleteBtn}>حذف</button>
            </div>
            <Field label="السؤال"><TextInput value={item.q} onChange={v => { const n = [...items]; n[i] = { ...item, q: v }; onChange({ ...faqs, [selectedGroup]: n }); }} /></Field>
            <Field label="الإجابة"><TextArea value={item.a} onChange={v => { const n = [...items]; n[i] = { ...item, a: v }; onChange({ ...faqs, [selectedGroup]: n }); }} /></Field>
          </div>
        ))}
        <button onClick={() => onChange({ ...faqs, [selectedGroup]: [...items, { q: "", a: "" }] })} style={S.addBtn}>+ إضافة سؤال</button>
      </div>
    </div>
  );
}

/* ─── Main Admin Component ─── */
export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState<ConfigData>({});
  const [originalData, setOriginalData] = useState<ConfigData>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("brand");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const sess = loadSession();
    if (sess) {
      setPassword(sess);
      setLoggedIn(true);
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (!loggedIn) return;
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/config", { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const json = await res.json();
      setData(json);
      setOriginalData(json);
    } catch {
      setError("فشل تحميل البيانات");
    }
    setLoading(false);
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) fetchData();
  }, [loggedIn, fetchData]);

  /* ─── Login Handler ─── */
  const handleLogin = async () => {
    if (!password) return;
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ key: "_ping", value: true }),
      });
      if (res.status === 401) { setLoginError("كلمة المرور غير صحيحة"); return; }
    } catch { /* allow local dev */ }
    setLoginError("");
    saveSession(password);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    clearSession();
    setLoggedIn(false);
    setPassword("");
    setData({});
  };

  const saveKey = async (key: string, value: any) => {
    setSaving(true); setSavedKey(null); setError("");
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) { setError("فشل الحفظ"); return; }
      setSavedKey(key);
      setOriginalData(prev => ({ ...prev, [key]: value }));
      setTimeout(() => setSavedKey(null), 3000);
    } catch { setError("خطأ في الاتصال"); }
    setSaving(false);
  };

  const handleSaveTab = () => {
    const tabMap: Record<string, string> = {
      brand: "brand", social: "social", stats: "stats", offices: "offices",
      testimonials: "testimonials", packages: "packages", destinations: "destinations",
      faqs: "faqs",
    };
    const key = tabMap[activeTab];
    if (key && data[key] !== undefined) saveKey(key, data[key]);
  };

  const updateTabData = (value: any) => {
    const tabMap: Record<string, string> = {
      brand: "brand", social: "social", stats: "stats", offices: "offices",
      testimonials: "testimonials", packages: "packages", destinations: "destinations",
      faqs: "faqs",
    };
    const key = tabMap[activeTab];
    if (key) setData(prev => ({ ...prev, [key]: value }));
  };

  const hasUndo = JSON.stringify(data[activeTab]) !== JSON.stringify(originalData[activeTab]);
  const handleUndo = () => {
    const tabToKey: Record<string, string> = {
      brand: "brand", social: "social", stats: "stats", offices: "offices",
      testimonials: "testimonials", packages: "packages", destinations: "destinations",
      faqs: "faqs",
    };
    const key = tabToKey[activeTab];
    if (key) setData(prev => ({ ...prev, [key]: originalData[key] }));
  };

  const tabs = [
    { id: "brand", label: "بيانات الشركة", icon: "🏢" },
    { id: "social", label: "السوشيال", icon: "📱" },
    { id: "stats", label: "الأرقام", icon: "📊" },
    { id: "testimonials", label: "آراء الطلاب", icon: "💬" },
    { id: "offices", label: "المكاتب", icon: "🏛️" },
    { id: "packages", label: "الباقات", icon: "📦" },
    { id: "destinations", label: "الوجهات", icon: "🌍" },
    { id: "faqs", label: "الأسئلة", icon: "❓" },
  ];

  /* ─── Login Screen ─── */
  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#28143c", fontFamily: "Cairo, sans-serif", direction: "rtl", padding: 20 }}>
        <div style={{ background: "white", borderRadius: 20, padding: "40px 32px", width: "100%", maxWidth: 400, textAlign: "center", boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}>
          <div style={{ width: 70, height: 70, background: "linear-gradient(135deg, #28143c, #3d1f5e)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32 }}>⚙️</div>
          <h1 style={{ color: "#28143c", fontSize: 24, fontWeight: 800, marginBottom: 6 }}>UniStation Admin</h1>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="كلمة المرور"
            onFocus={e => e.currentTarget.style.borderColor = "#f0b414"}
            onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
            style={{ width: "100%", padding: "14px 18px", border: "2px solid #e5e7eb", borderRadius: 12, fontSize: 16, outline: "none", boxSizing: "border-box", marginBottom: 16, fontFamily: "Cairo, sans-serif" }}
          />
          {loginError && <p style={{ color: "#e11d48", fontSize: 13, marginBottom: 14 }}>{loginError}</p>}
          <button
            onClick={handleLogin}
            style={{ width: "100%", padding: 14, background: "linear-gradient(135deg, #f0b414, #e5a710)", color: "#28143c", border: "none", borderRadius: 12, fontSize: 17, fontWeight: 800, cursor: "pointer", fontFamily: "Cairo, sans-serif", boxShadow: "0 4px 15px rgba(240,180,20,0.4)" }}
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  /* ─── Admin Dashboard ─── */
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "Cairo, sans-serif", direction: "rtl" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #28143c, #3d1f5e)",
        padding: isMobile ? "12px 16px" : "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 8,
        boxShadow: "0 4px 15px rgba(40,20,60,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>⚙️</div>
          <h1 style={{ color: "white", fontSize: isMobile ? 15 : 18, fontWeight: 700, margin: 0 }}>
            UniStation Admin
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={fetchData} disabled={loading}
            style={{ padding: "7px 14px", background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 12, fontFamily: "Cairo, sans-serif" }}>
            {loading ? "⏳" : "🔄"}
            {!isMobile && " تحديث"}
          </button>
          <button onClick={handleLogout}
            style={{ padding: "7px 14px", background: "rgba(255,255,255,0.1)", color: "#fca5a5", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 12, fontFamily: "Cairo, sans-serif" }}>
            🚪 {!isMobile && "خروج"}
          </button>
          <a href="/"
            style={{ padding: "7px 14px", background: "#f0b414", color: "#28143c", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 12, textDecoration: "none", fontFamily: "Cairo, sans-serif" }}>
            👁️ {!isMobile && "عرض الموقع"}
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", display: "flex", overflowX: "auto", padding: "0 12px" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              padding: isMobile ? "10px 14px" : "12px 18px", border: "none",
              borderBottom: activeTab === t.id ? "3px solid #f0b414" : "3px solid transparent",
              background: activeTab === t.id ? "#fffbeb" : "none",
              color: activeTab === t.id ? "#28143c" : "#888",
              fontWeight: activeTab === t.id ? 700 : 500,
              cursor: "pointer", whiteSpace: "nowrap",
              fontSize: isMobile ? 12 : 13,
              fontFamily: "Cairo, sans-serif", transition: "all 0.2s",
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 950, margin: isMobile ? "16px auto" : "24px auto", padding: "0 12px" }}>
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: 14, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
            ❌ {error}
            <button onClick={() => setError("")} style={{ float: "left", border: "none", background: "none", cursor: "pointer", fontSize: 18, color: "#991b1b" }}>✕</button>
          </div>
        )}
        {savedKey && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", padding: 14, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
            ✅ تم حفظ "{savedKey}" بنجاح! التغييرات ظاهرة على الموقع فوراً.
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#888", fontSize: 16 }}>⏳ جاري تحميل البيانات...</div>
        ) : (
          <div>
            {/* Action buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              {hasUndo ? (
                <button onClick={handleUndo} style={S.undoBtn}>↩️ تراجع عن التعديلات</button>
              ) : <div />}
              <button onClick={handleSaveTab} disabled={saving} style={S.saveBtn(saving)}>
                {saving ? "⏳ جاري الحفظ..." : "💾 حفظ التعديلات"}
              </button>
            </div>

            {/* Tab Content */}
            <div style={{ background: "white", borderRadius: 14, padding: isMobile ? 16 : 24, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              {activeTab === "brand" && <BrandEditor data={data.brand} onChange={updateTabData} />}
              {activeTab === "social" && <SocialEditor data={data.social} onChange={updateTabData} />}
              {activeTab === "stats" && <StatsEditor data={data.stats || []} onChange={updateTabData} />}
              {activeTab === "testimonials" && <TestimonialsEditor data={data.testimonials || []} onChange={updateTabData} />}
              {activeTab === "offices" && <OfficesEditor data={data.offices || []} onChange={updateTabData} />}
              {activeTab === "packages" && <PackagesEditor data={data.packages} onChange={updateTabData} />}
              {activeTab === "destinations" && <DestinationsEditor data={data.destinations} onChange={updateTabData} />}
              {activeTab === "faqs" && <FaqsEditor data={data.faqs} onChange={updateTabData} />}
            </div>

            {/* Bottom Save */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 8 }}>
              {hasUndo ? (
                <button onClick={handleUndo} style={S.undoBtn}>↩️ تراجع عن التعديلات</button>
              ) : <div />}
              <button onClick={handleSaveTab} disabled={saving} style={S.saveBtn(saving)}>
                {saving ? "⏳ جاري الحفظ..." : "💾 حفظ التعديلات"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
