"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import RichTextEditor from "@/components/RichTextEditor";

/* ═══════════════════════════════════════════════════
   UniStation Admin Panel — Site-wide Content Manager
   Manages: brand, social, stats, offices, testimonials,
            packages, destinations, faqs, CMS (blogs, videos,
            team, reviews)
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

/* ─── Helper: strip HTML tags for plain-text display in inputs ─── */
function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim();
}

/* ─── Helper: detect non-Latin1 chars (HTTP headers can't carry them) ─── */
function stringHasNonLatin1(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) return true;
  }
  return false;
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
    cursor: saving ? "not-allowed" : "pointer",
    boxShadow: saving ? "none" : "0 4px 15px rgba(240,180,20,0.4)",
  }),
  undoBtn: {
    padding: "10px 18px", background: "white", color: "#374151", border: "1.5px solid #e5e7eb",
    borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
};

const FONT = "'Inter', system-ui, -apple-system, sans-serif";

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
      <Field label="Brand Name"><TextInput value={d.name} onChange={v => onChange({ ...d, name: v })} /></Field>
      <Field label="Tagline"><TextInput value={d.tagline} onChange={v => onChange({ ...d, tagline: v })} /></Field>
      <Field label="Logo URL"><TextInput value={d.logoUrl} onChange={v => onChange({ ...d, logoUrl: v })} /></Field>
      <Field label="Email"><TextInput value={d.email} onChange={v => onChange({ ...d, email: v })} /></Field>
      <Field label="WhatsApp Number (without +)"><TextInput value={d.whatsapp} onChange={v => onChange({ ...d, whatsapp: v })} placeholder="971522732589" /></Field>
      <Field label="Copyright Text"><TextInput value={d.copyright} onChange={v => onChange({ ...d, copyright: v })} /></Field>
    </div>
  );
}

/* ─── Social Editor ─── */
function SocialEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const d = data || {};
  return (
    <div>
      <Field label="Instagram"><TextInput value={d.instagram} onChange={v => onChange({ ...d, instagram: v })} /></Field>
      <Field label="TikTok"><TextInput value={d.tiktok} onChange={v => onChange({ ...d, tiktok: v })} /></Field>
      <Field label="Facebook"><TextInput value={d.facebook} onChange={v => onChange({ ...d, facebook: v })} /></Field>
      <Field label="Twitter / X"><TextInput value={d.twitter} onChange={v => onChange({ ...d, twitter: v })} /></Field>
      <Field label="YouTube"><TextInput value={d.youtube} onChange={v => onChange({ ...d, youtube: v })} /></Field>
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
            <strong>Stat #{i + 1}</strong>
            <button onClick={() => onChange(data.filter((_, idx) => idx !== i))} style={S.deleteBtn}>Delete</button>
          </div>
          <Field label="Value (e.g. 800+)"><TextInput value={stat.value} onChange={v => { const n = [...data]; n[i] = { ...stat, value: v }; onChange(n); }} /></Field>
          <Field label="Label (e.g. Students Guided)"><TextInput value={stat.label} onChange={v => { const n = [...data]; n[i] = { ...stat, label: v }; onChange(n); }} /></Field>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { label: "", value: "" }])} style={S.addBtn}>+ Add Stat</button>
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
            <strong>Review #{i + 1}</strong>
            <button onClick={() => onChange(data.filter((_, idx) => idx !== i))} style={S.deleteBtn}>Delete</button>
          </div>
          <Field label="Student Name"><TextInput value={t.name} onChange={v => { const n = [...data]; n[i] = { ...t, name: v }; onChange(n); }} /></Field>
          <Field label="Country"><TextInput value={t.country} onChange={v => { const n = [...data]; n[i] = { ...t, country: v }; onChange(n); }} /></Field>
          <Field label="Program"><TextInput value={t.program} onChange={v => { const n = [...data]; n[i] = { ...t, program: v }; onChange(n); }} /></Field>
          <Field label="Review Text"><TextArea value={t.text} onChange={v => { const n = [...data]; n[i] = { ...t, text: v }; onChange(n); }} /></Field>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { name: "", country: "", program: "", text: "" }])} style={S.addBtn}>+ Add Review</button>
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
            <strong>Office #{i + 1}</strong>
            <button onClick={() => onChange(data.filter((_, idx) => idx !== i))} style={S.deleteBtn}>Delete</button>
          </div>
          <Field label="City"><TextInput value={o.city} onChange={v => { const n = [...data]; n[i] = { ...o, city: v }; onChange(n); }} /></Field>
          <Field label="Country"><TextInput value={o.country} onChange={v => { const n = [...data]; n[i] = { ...o, country: v }; onChange(n); }} /></Field>
          <Field label="Address"><TextArea value={o.address} onChange={v => { const n = [...data]; n[i] = { ...o, address: v }; onChange(n); }} /></Field>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { city: "", country: "", address: "" }])} style={S.addBtn}>+ Add Office</button>
    </div>
  );
}

/* ─── Packages Editor ─── */
const pkgLabels: Record<string, string> = {
  "uk": "🇬🇧 UK",
  "uk-medicine": "🇬🇧 UK Medicine",
  "early-bird": "🐦 Early Bird",
  "europe": "🇪🇺 Europe",
  "usa": "🇺🇸 USA",
  "canada": "🇨🇦 Canada",
  "asia": "🌏 Asia",
  "spain-foundation-year": "🇪🇸 Spain Foundation Year",
  "profile-building": "📋 Profile Building",
};

function PackagesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const packages = data || {};
  const slugs = Object.keys(packages);
  const [selectedSlug, setSelectedSlug] = useState<string>(slugs[0] || "");

  useEffect(() => {
    if (!selectedSlug && slugs.length > 0) setSelectedSlug(slugs[0]);
  }, [slugs, selectedSlug]);

  if (slugs.length === 0) return <div>No packages found</div>;

  const pkg = packages[selectedSlug];

  const updatePkg = (newPkg: any) => {
    onChange({ ...packages, [selectedSlug]: newPkg });
  };

  return (
    <div>
      <Field label="Select Package">
        <select
          value={selectedSlug}
          onChange={e => setSelectedSlug(e.target.value)}
          style={{ ...S.input, padding: "10px 12px", cursor: "pointer" }}
        >
          {slugs.map(s => <option key={s} value={s}>{pkgLabels[s] || s}</option>)}
        </select>
      </Field>

      <div style={S.card}>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Package ID: <code>{selectedSlug}</code></div>

        <Field label="Introduction"><TextArea value={pkg.intro} onChange={v => updatePkg({ ...pkg, intro: v })} /></Field>

        {/* Tiers */}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
          <strong style={{ display: "block", marginBottom: 10 }}>Package Tiers ({(pkg.tiers || []).length})</strong>
          {(pkg.tiers || []).map((tier: any, ti: number) => (
            <div key={ti} style={{ ...S.card, background: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong>Tier #{ti + 1}</strong>
                <button onClick={() => updatePkg({ ...pkg, tiers: pkg.tiers.filter((_: any, idx: number) => idx !== ti) })} style={S.deleteBtn}>Delete</button>
              </div>
              <Field label="Tier Name"><TextInput value={tier.name} onChange={v => { const n = [...pkg.tiers]; n[ti] = { ...tier, name: v }; updatePkg({ ...pkg, tiers: n }); }} /></Field>
              <Field label="Subtitle"><TextInput value={tier.subtitle} onChange={v => { const n = [...pkg.tiers]; n[ti] = { ...tier, subtitle: v }; updatePkg({ ...pkg, tiers: n }); }} /></Field>
              {tier.price && <Field label="Price"><TextInput value={tier.price} onChange={v => { const n = [...pkg.tiers]; n[ti] = { ...tier, price: v }; updatePkg({ ...pkg, tiers: n }); }} /></Field>}
              <Field label="Best For"><TextArea value={tier.idealFor} onChange={v => { const n = [...pkg.tiers]; n[ti] = { ...tier, idealFor: v }; updatePkg({ ...pkg, tiers: n }); }} /></Field>

              {/* Features */}
              <div style={{ marginTop: 10 }}>
                <strong style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Features ({(tier.features || []).length})</strong>
                {(tier.features || []).map((f: any, fi: number) => (
                  <div key={fi} style={{ ...S.card, background: "#f9fafb", marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <small>Feature #{fi + 1}</small>
                      <button onClick={() => { const n = [...pkg.tiers]; n[ti] = { ...tier, features: tier.features.filter((_: any, idx: number) => idx !== fi) }; updatePkg({ ...pkg, tiers: n }); }} style={S.deleteBtn}>✕</button>
                    </div>
                    <Field label="Title"><TextInput value={f.title} onChange={v => { const feats = [...tier.features]; feats[fi] = { ...f, title: v }; const n = [...pkg.tiers]; n[ti] = { ...tier, features: feats }; updatePkg({ ...pkg, tiers: n }); }} /></Field>
                    <Field label="Description"><TextArea value={f.description} onChange={v => { const feats = [...tier.features]; feats[fi] = { ...f, description: v }; const n = [...pkg.tiers]; n[ti] = { ...tier, features: feats }; updatePkg({ ...pkg, tiers: n }); }} /></Field>
                  </div>
                ))}
                <button onClick={() => { const feats = [...(tier.features || []), { title: "", description: "" }]; const n = [...pkg.tiers]; n[ti] = { ...tier, features: feats }; updatePkg({ ...pkg, tiers: n }); }} style={S.addBtn}>+ Add Feature</button>
              </div>
            </div>
          ))}
          <button onClick={() => updatePkg({ ...pkg, tiers: [...(pkg.tiers || []), { name: "", subtitle: "", features: [], idealFor: "" }] })} style={S.addBtn}>+ Add Tier</button>
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

  if (slugs.length === 0) return <div>No destinations found</div>;

  const dest = dests[selectedSlug];
  const updateDest = (newDest: any) => onChange({ ...dests, [selectedSlug]: newDest });

  return (
    <div>
      <Field label="Select Destination">
        <select
          value={selectedSlug}
          onChange={e => setSelectedSlug(e.target.value)}
          style={{ ...S.input, padding: "10px 12px", cursor: "pointer" }}
        >
          {slugs.map(s => <option key={s} value={s}>{pkgLabels[s] || s}</option>)}
        </select>
      </Field>

      <div style={S.card}>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Destination ID: <code>{selectedSlug}</code></div>

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
          <button onClick={() => updateDest({ ...dest, overviewParagraphs: [...(dest.overviewParagraphs || []), ""] })} style={S.addBtn}>+ Add Paragraph</button>
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
          <button onClick={() => updateDest({ ...dest, stats: [...(dest.stats || []), { label: "", value: "" }] })} style={S.addBtn}>+ Add Stat</button>
        </div>

        <div style={{ marginTop: 16, padding: 12, background: "#fef3c7", borderRadius: 8, fontSize: 12, color: "#92400e" }}>
          Note: Advanced sections (two-paths, key-advantages, etc.) are best edited in code. The fields above cover the most important content.
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

  if (groups.length === 0) return <div>No FAQ groups found</div>;

  const items: any[] = faqs[selectedGroup] || [];

  return (
    <div>
      <Field label="Select FAQ Group">
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
              <small>Question #{i + 1}</small>
              <button onClick={() => { const n = [...items]; n.splice(i, 1); onChange({ ...faqs, [selectedGroup]: n }); }} style={S.deleteBtn}>Delete</button>
            </div>
            <Field label="Question"><TextInput value={item.q} onChange={v => { const n = [...items]; n[i] = { ...item, q: v }; onChange({ ...faqs, [selectedGroup]: n }); }} /></Field>
            <Field label="Answer"><TextArea value={item.a} onChange={v => { const n = [...items]; n[i] = { ...item, a: v }; onChange({ ...faqs, [selectedGroup]: n }); }} /></Field>
          </div>
        ))}
        <button onClick={() => onChange({ ...faqs, [selectedGroup]: [...items, { q: "", a: "" }] })} style={S.addBtn}>+ Add Question</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Georgia-specific Editors
   ═══════════════════════════════════════════════════ */

/* ─── Georgia Stats Editor ─── */
function GeorgiaStatsEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const remove = (i: number) => onChange((data || []).filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: any) => {
    const next = [...(data || [])];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };
  return (
    <div>
      <div style={{ padding: 12, background: "#eff6ff", borderRadius: 8, marginBottom: 16, fontSize: 13, color: "#1e40af" }}>
        Georgia page stats — shown in the numbers section
      </div>
      {(data || []).map((stat, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <strong>Stat #{i + 1}</strong>
            <button onClick={() => remove(i)} style={S.deleteBtn}>Delete</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Number"><input type="number" step="0.1" value={stat.target || 0} onChange={e => update(i, "target", parseFloat(e.target.value) || 0)} style={S.input} /></Field>
            <Field label="Label"><TextInput value={stat.label || ""} onChange={v => update(i, "label", v)} placeholder="e.g. Accredited Universities" /></Field>
            <Field label="Before number (prefix)"><TextInput value={stat.prefix || ""} onChange={v => update(i, "prefix", v)} placeholder="e.g. +" /></Field>
            <Field label="After number (suffix)"><TextInput value={stat.suffix || ""} onChange={v => update(i, "suffix", v)} placeholder="e.g. %" /></Field>
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { target: 0, prefix: "", suffix: "", label: "" }])} style={S.addBtn}>+ Add Stat</button>
    </div>
  );
}

/* ─── Georgia Universities Editor ─── */
function UniversitiesEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const removeUni = (i: number) => onChange((data || []).filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: any) => {
    const next = [...(data || [])];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };
  return (
    <div>
      <div style={{ padding: 12, background: "#eff6ff", borderRadius: 8, marginBottom: 16, fontSize: 13, color: "#1e40af" }}>
        Georgia Universities — shown in the universities section
      </div>
      {(data || []).map((uni, i) => (
        <div key={i} style={{ ...S.card, borderLeft: uni.highlight ? "4px solid #f0b414" : "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <strong>#{uni.rank || i + 1} — {uni.name}</strong>
            <button onClick={() => removeUni(i)} style={S.deleteBtn}>Delete</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <Field label="Name (English)"><TextInput value={uni.name || ""} onChange={v => update(i, "name", v)} /></Field>
            <Field label="Name (Arabic)"><TextInput value={uni.nameAr || ""} onChange={v => update(i, "nameAr", v)} /></Field>
            <Field label="Abbreviation"><TextInput value={uni.abbr || ""} onChange={v => update(i, "abbr", v)} /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 8 }}>
            <Field label="Tuition Fee"><TextInput value={uni.fee || ""} onChange={v => update(i, "fee", v)} placeholder="$8,000" /></Field>
            <Field label="Type (Public/Private)"><TextInput value={uni.type || ""} onChange={v => update(i, "type", v)} /></Field>
            <Field label="Rank"><input type="number" value={uni.rank || i + 1} onChange={e => update(i, "rank", parseInt(e.target.value) || 1)} style={S.input} /></Field>
          </div>
          <Field label="Description"><TextArea value={uni.desc || uni.description || ""} onChange={v => update(i, "desc", v)} /></Field>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, marginTop: 8 }}>
            <input type="checkbox" checked={!!uni.highlight} onChange={e => update(i, "highlight", e.target.checked)} style={{ width: 18, height: 18, accentColor: "#f0b414" }} />
            Featured (highlight this university)
          </label>
          <div style={{ marginTop: 12 }}>
            <label style={S.label}>Features</label>
            {(uni.features || []).map((f: string, fi: number) => (
              <div key={fi} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <input type="text" value={f} onChange={e => { const feats = [...uni.features]; feats[fi] = e.target.value; update(i, "features", feats); }} style={S.input} />
                <button onClick={() => update(i, "features", uni.features.filter((_: any, idx: number) => idx !== fi))} style={S.deleteBtn}>✕</button>
              </div>
            ))}
            <button onClick={() => update(i, "features", [...(uni.features || []), ""])} style={S.addBtn}>+ Add Feature</button>
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { rank: (data || []).length + 1, name: "", nameAr: "", abbr: "", fee: "", type: "", desc: "", features: [], highlight: false }])} style={S.addBtn}>+ Add University</button>
    </div>
  );
}

/* ─── Georgia Hero Editor ─── */
function HeroEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const d = data || {};
  const update = (field: string, value: any) => onChange({ ...d, [field]: value });
  return (
    <div>
      <div style={{ padding: 12, background: "#eff6ff", borderRadius: 8, marginBottom: 16, fontSize: 13, color: "#1e40af" }}>
        Georgia page hero — the main banner section
      </div>
      <Field label="Badge"><TextInput value={d.badge || ""} onChange={v => update("badge", v)} /></Field>
      <Field label="Title Line 1"><TextInput value={d.title1 || ""} onChange={v => update("title1", v)} /></Field>
      <Field label="Title Line 2 (highlight)"><TextInput value={d.title2 || ""} onChange={v => update("title2", v)} /></Field>
      <Field label="Description"><TextArea value={d.description || ""} onChange={v => update("description", v)} /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Primary Button Text"><TextInput value={d.ctaPrimary || ""} onChange={v => update("ctaPrimary", v)} /></Field>
        <Field label="Secondary Button Text"><TextInput value={d.ctaSecondary || ""} onChange={v => update("ctaSecondary", v)} /></Field>
      </div>
    </div>
  );
}

/* ─── Georgia Contact Editor ─── */
function ContactEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const d = data || {};
  const update = (field: string, value: any) => onChange({ ...d, [field]: value });
  return (
    <div>
      <div style={{ padding: 12, background: "#eff6ff", borderRadius: 8, marginBottom: 16, fontSize: 13, color: "#1e40af" }}>
        Georgia page contact information
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="WhatsApp Number"><TextInput value={d.whatsapp || ""} onChange={v => update("whatsapp", v)} /></Field>
        <Field label="WhatsApp Link"><TextInput value={d.whatsappLink || ""} onChange={v => update("whatsappLink", v)} /></Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Email"><TextInput value={d.email || ""} onChange={v => update("email", v)} /></Field>
        <Field label="Phone Number"><TextInput value={d.phone || ""} onChange={v => update("phone", v)} /></Field>
      </div>
      <Field label="Instagram Link"><TextInput value={d.social?.instagram || ""} onChange={v => update("social", { ...d.social, instagram: v })} /></Field>
    </div>
  );
}

/* ─── Georgia Package Editor ─── */
function GeorgiaPackageEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const d = data || {};
  const update = (field: string, value: any) => onChange({ ...d, [field]: value });

  const updateInstallment = (i: number, field: string, v: string) => {
    const next = [...(d.installments || [])];
    next[i] = { ...next[i], [field]: v };
    update("installments", next);
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Title"><TextInput value={d.title || ""} onChange={v => update("title", v)} /></Field>
        <Field label="Badge"><TextInput value={d.badge || ""} onChange={v => update("badge", v)} placeholder="Best Value" /></Field>
      </div>
      <Field label="Description"><TextArea value={d.description || ""} onChange={v => update("description", v)} /></Field>

      {d.totalPrice !== undefined && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Total Price"><TextInput value={d.totalPrice || ""} onChange={v => update("totalPrice", v)} /></Field>
          <Field label="Currency"><TextInput value={d.currency || ""} onChange={v => update("currency", v)} placeholder="AED" /></Field>
        </div>
      )}
      {d.priceNote !== undefined && (
        <Field label="Price Note"><TextInput value={d.priceNote || ""} onChange={v => update("priceNote", v)} /></Field>
      )}

      {d.installments && (
        <div style={{ marginTop: 12 }}>
          <strong style={{ display: "block", marginBottom: 8, color: "#28143c" }}>Payment Installments</strong>
          {(d.installments || []).map((inst: any, i: number) => (
            <div key={i} style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong>Installment #{i + 1}</strong>
                <button onClick={() => update("installments", d.installments.filter((_: any, idx: number) => idx !== i))} style={S.deleteBtn}>Delete</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field label="Label"><TextInput value={inst.label || ""} onChange={v => updateInstallment(i, "label", v)} /></Field>
                <Field label="Amount"><TextInput value={inst.amount || ""} onChange={v => updateInstallment(i, "amount", v)} /></Field>
              </div>
              <Field label="Note"><TextInput value={inst.note || ""} onChange={v => updateInstallment(i, "note", v)} /></Field>
            </div>
          ))}
          <button onClick={() => update("installments", [...(d.installments || []), { label: "", amount: "", note: "" }])} style={S.addBtn}>+ Add Installment</button>
        </div>
      )}

      {d.note !== undefined && (
        <Field label="Note"><TextArea value={d.note || ""} onChange={v => update("note", v)} /></Field>
      )}

      <div style={{ marginTop: 12 }}>
        <label style={S.label}>Services Included</label>
        {(d.services || []).map((s: string, si: number) => (
          <div key={si} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <input type="text" value={s} onChange={e => { const sv = [...d.services]; sv[si] = e.target.value; update("services", sv); }} style={S.input} />
            <button onClick={() => update("services", d.services.filter((_: any, idx: number) => idx !== si))} style={S.deleteBtn}>✕</button>
          </div>
        ))}
        <button onClick={() => update("services", [...(d.services || []), ""])} style={S.addBtn}>+ Add Service</button>
      </div>
    </div>
  );
}

/* ─── Georgia Registration Editor ─── */
function RegistrationEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const d = data || {};
  const update = (field: string, value: any) => onChange({ ...d, [field]: value });
  return (
    <div>
      <div style={{ padding: 12, background: "#eff6ff", borderRadius: 8, marginBottom: 16, fontSize: 13, color: "#1e40af" }}>
        Registration section — required documents list
      </div>
      <Field label="Title"><TextInput value={d.title || ""} onChange={v => update("title", v)} /></Field>
      <Field label="Description"><TextArea value={d.description || ""} onChange={v => update("description", v)} /></Field>

      <strong style={{ display: "block", marginBottom: 8, color: "#28143c", marginTop: 12 }}>Required Documents</strong>
      {(d.docs || []).map((doc: any, i: number) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <strong>Document #{i + 1}</strong>
            <button onClick={() => update("docs", d.docs.filter((_: any, idx: number) => idx !== i))} style={S.deleteBtn}>Delete</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Document Name"><TextInput value={doc.title || ""} onChange={v => { const docs = [...d.docs]; docs[i] = { ...doc, title: v }; update("docs", docs); }} /></Field>
            <Field label="Description"><TextInput value={doc.desc || ""} onChange={v => { const docs = [...d.docs]; docs[i] = { ...doc, desc: v }; update("docs", docs); }} /></Field>
          </div>
        </div>
      ))}
      <button onClick={() => update("docs", [...(d.docs || []), { title: "", desc: "" }])} style={S.addBtn}>+ Add Document</button>
    </div>
  );
}

/* ─── Georgia FAQs Editor ─── */
function GeorgiaFaqsEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const remove = (i: number) => onChange((data || []).filter((_, idx) => idx !== i));
  return (
    <div>
      <div style={{ padding: 12, background: "#eff6ff", borderRadius: 8, marginBottom: 16, fontSize: 13, color: "#1e40af" }}>
        Georgia page FAQs (separate from site-wide FAQs)
      </div>
      {(data || []).map((faq, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <strong>Question #{i + 1}</strong>
            <button onClick={() => remove(i)} style={S.deleteBtn}>Delete</button>
          </div>
          <Field label="Question"><TextInput value={faq.q || ""} onChange={v => { const n = [...(data || [])]; n[i] = { ...faq, q: v }; onChange(n); }} /></Field>
          <Field label="Answer"><TextArea value={faq.a || ""} onChange={v => { const n = [...(data || [])]; n[i] = { ...faq, a: v }; onChange(n); }} /></Field>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { q: "", a: "" }])} style={S.addBtn}>+ Add Question</button>
    </div>
  );
}

/* ─── Image Upload Field (drag & drop + click) ─── */
function ImageUploadField({ label, value, onUpload, onUrlChange, fileInputRef, uploadTarget, setUploadTarget, uploading }: {
  label: string;
  value: string;
  onUpload: (file: File) => void;
  onUrlChange: (url: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  uploadTarget: string;
  setUploadTarget: (t: string) => void;
  uploading: boolean;
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Image is too large. Maximum size is 10 MB.");
        return;
      }
      onUpload(file);
    }
  };

  return (
    <Field label={label}>
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => { setUploadTarget(uploadTarget); fileInputRef.current?.click(); }}
        style={{
          border: `2px dashed ${dragOver ? "#f0b414" : value ? "#d1d5db" : "#e5e7eb"}`,
          borderRadius: 10, padding: value ? 0 : "24px 16px",
          textAlign: "center", cursor: "pointer",
          background: dragOver ? "#fffbeb" : uploading ? "#f9fafb" : "#fafafa",
          transition: "all 0.2s", position: "relative",
        }}
      >
        {uploading && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.85)", borderRadius: 10, zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#f0b414", fontWeight: 600, fontSize: 14 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
              Uploading...
            </div>
          </div>
        )}
        {value ? (
          <div style={{ position: "relative", padding: 8 }}>
            <img src={value} alt={label} style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 8, display: "block", background: "white" }} />
            <div style={{ position: "absolute", bottom: 12, right: 12, display: "flex", gap: 6 }}>
              <span style={{ background: "rgba(0,0,0,0.7)", color: "white", padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>Click to replace</span>
            </div>
          </div>
        ) : (
          <div>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 8px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <div style={{ color: "#6b7280", fontSize: 13, fontWeight: 600 }}>Click or drag image here</div>
            <div style={{ color: "#9ca3af", fontSize: 11, marginTop: 4 }}>JPG, PNG, WebP</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <span style={{ fontSize: 11, color: "#9ca3af", flex: 1 }}>or paste URL:</span>
        <input type="text" value={value} onChange={e => onUrlChange(e.target.value)} placeholder="https://..." style={{ ...S.input, fontSize: 12, padding: "6px 10px" }} />
      </div>
    </Field>
  );
}

/* ─── Navigation Editor ─── */
function NavigationEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const remove = (i: number) => onChange((data || []).filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: any) => {
    const next = [...(data || [])];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };
  const updateChild = (i: number, ci: number, field: string, value: string) => {
    const next = [...(data || [])];
    const children = [...(next[i].children || [])];
    children[ci] = { ...children[ci], [field]: value };
    next[i] = { ...next[i], children };
    onChange(next);
  };
  const removeChild = (i: number, ci: number) => {
    const next = [...(data || [])];
    next[i] = { ...next[i], children: (next[i].children || []).filter((_: any, idx: number) => idx !== ci) };
    onChange(next);
  };
  const addChild = (i: number) => {
    const next = [...(data || [])];
    next[i] = { ...next[i], children: [...(next[i].children || []), { label: "", href: "" }] };
    onChange(next);
  };
  return (
    <div>
      {(data || []).map((item, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <strong>Nav Item #{i + 1}</strong>
            <button onClick={() => remove(i)} style={S.deleteBtn}>Delete</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <Field label="Label"><TextInput value={item.label || ""} onChange={v => update(i, "label", v)} /></Field>
            <Field label="Href"><TextInput value={item.href || ""} onChange={v => update(i, "href", v)} placeholder="/path" /></Field>
            <Field label="Side">
              <select value={item.side || "left"} onChange={e => update(i, "side", e.target.value)} style={{ ...S.input, padding: "10px 12px", cursor: "pointer" }}>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </Field>
          </div>
          {(item.children || []).length > 0 && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
              <strong style={{ display: "block", marginBottom: 8, fontSize: 13 }}>Children ({(item.children || []).length})</strong>
              {(item.children || []).map((child: any, ci: number) => (
                <div key={ci} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <input type="text" placeholder="Label" value={child.label || ""} onChange={e => updateChild(i, ci, "label", e.target.value)} style={S.input} />
                  <input type="text" placeholder="Href" value={child.href || ""} onChange={e => updateChild(i, ci, "href", e.target.value)} style={S.input} />
                  <button onClick={() => removeChild(i, ci)} style={S.deleteBtn}>✕</button>
                </div>
              ))}
              <button onClick={() => addChild(i)} style={{ ...S.addBtn, fontSize: 12, padding: "6px 12px" }}>+ Add Child</button>
            </div>
          )}
          {(item.children || []).length === 0 && (
            <button onClick={() => addChild(i)} style={{ ...S.addBtn, fontSize: 12, padding: "6px 12px" }}>+ Add Child</button>
          )}
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { label: "", href: "", side: "left", children: [] }])} style={S.addBtn}>+ Add Nav Item</button>
    </div>
  );
}

/* ─── About Editor ─── */
function AboutEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const d = data || { paragraphs: [] };
  const paragraphs = d.paragraphs || [];
  return (
    <div>
      <strong style={{ display: "block", marginBottom: 10, color: "#28143c" }}>About Us Paragraphs ({paragraphs.length})</strong>
      {paragraphs.map((p: string, i: number) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <strong>Paragraph #{i + 1}</strong>
            <button onClick={() => onChange({ ...d, paragraphs: paragraphs.filter((_: string, idx: number) => idx !== i) })} style={S.deleteBtn}>Delete</button>
          </div>
          <TextArea value={p} onChange={v => { const n = [...paragraphs]; n[i] = v; onChange({ ...d, paragraphs: n }); }} placeholder="Enter paragraph text..." />
        </div>
      ))}
      <button onClick={() => onChange({ ...d, paragraphs: [...paragraphs, ""] })} style={S.addBtn}>+ Add Paragraph</button>
    </div>
  );
}

/* ─── Timeline Editor ─── */
function TimelineEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const remove = (i: number) => onChange((data || []).filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: string) => {
    const next = [...(data || [])];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };
  return (
    <div>
      {(data || []).map((item, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <strong>Event #{i + 1}</strong>
            <button onClick={() => remove(i)} style={S.deleteBtn}>Delete</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Year"><TextInput value={item.year || ""} onChange={v => update(i, "year", v)} placeholder="2020" /></Field>
            <Field label="Title"><TextInput value={item.title || ""} onChange={v => update(i, "title", v)} /></Field>
          </div>
          <Field label="Description"><TextArea value={item.description || ""} onChange={v => update(i, "description", v)} /></Field>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { year: "", title: "", description: "" }])} style={S.addBtn}>+ Add Event</button>
    </div>
  );
}

/* ─── Comparison Table Editor ─── */
function ComparisonTableEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const d = data || { headers: [], rows: [] };
  const headers = d.headers || [];
  const rows = d.rows || [];
  const updateHeader = (i: number, v: string) => {
    const h = [...headers]; h[i] = v; onChange({ ...d, headers: h });
  };
  const removeHeader = (i: number) => {
    const h = headers.filter((_: string, idx: number) => idx !== i);
    const r = rows.map((row: string[]) => row.filter((_: string, idx: number) => idx !== i));
    onChange({ ...d, headers: h, rows: r });
  };
  const addHeader = () => {
    const h = [...headers, ""]; const r = rows.map((row: string[]) => [...row, ""]);
    onChange({ ...d, headers: h, rows: r });
  };
  const updateCell = (ri: number, ci: number, v: string) => {
    const r = [...rows]; r[ri] = [...r[ri]]; r[ri][ci] = v; onChange({ ...d, rows: r });
  };
  const removeRow = (i: number) => onChange({ ...d, rows: rows.filter((_: string[], idx: number) => idx !== i) });
  const addRow = () => onChange({ ...d, rows: [...rows, headers.map(() => "")] });
  return (
    <div>
      <strong style={{ display: "block", marginBottom: 10, color: "#28143c" }}>Comparison Table ({headers.length} columns, {rows.length} rows)</strong>
      {headers.length > 0 && (
        <div style={{ overflowX: "auto", marginBottom: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                {headers.map((h: string, hi: number) => (
                  <th key={hi} style={{ padding: 6, borderBottom: "2px solid #e5e7eb", textAlign: "left", minWidth: 120 }}>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <input type="text" value={h} onChange={e => updateHeader(hi, e.target.value)} placeholder="Header" style={{ ...S.input, fontSize: 12, padding: "4px 8px" }} />
                      <button onClick={() => removeHeader(hi)} style={{ ...S.deleteBtn, padding: "2px 6px", fontSize: 11, flexShrink: 0 }}>✕</button>
                    </div>
                  </th>
                ))}
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: string[], ri: number) => (
                <tr key={ri}>
                  {headers.map((_: string, ci: number) => (
                    <td key={ci} style={{ padding: 4 }}>
                      <input type="text" value={row[ci] || ""} onChange={e => updateCell(ri, ci, e.target.value)} style={{ ...S.input, fontSize: 12, padding: "6px 8px" }} />
                    </td>
                  ))}
                  <td style={{ padding: 4 }}>
                    <button onClick={() => removeRow(ri)} style={{ ...S.deleteBtn, padding: "2px 6px", fontSize: 11 }}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={addHeader} style={S.addBtn}>+ Add Column</button>
        <button onClick={addRow} style={S.addBtn}>+ Add Row</button>
      </div>
    </div>
  );
}

/* ─── Language Courses Editor ─── */
function LanguageCoursesEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const courses = data || [];
  const update = (i: number, field: string, value: any) => {
    const next = [...courses];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };
  const remove = (i: number) => {
    onChange(courses.filter((_: any, idx: number) => idx !== i));
    if (expandedIdx === i) setExpandedIdx(null);
  };
  const addFaq = (i: number) => {
    const faqs = [...(courses[i].faqs || []), { q: "", a: "" }];
    update(i, "faqs", faqs);
  };
  const updateFaq = (i: number, fi: number, field: string, v: string) => {
    const faqs = [...(courses[i].faqs || [])];
    faqs[fi] = { ...faqs[fi], [field]: v };
    update(i, "faqs", faqs);
  };
  const removeFaq = (i: number, fi: number) => {
    const faqs = (courses[i].faqs || []).filter((_: any, idx: number) => idx !== fi);
    update(i, "faqs", faqs);
  };
  const updateFee = (i: number, fi: number, field: string, v: string) => {
    const fees = [...(courses[i].fees || [])];
    fees[fi] = { ...fees[fi], [field]: v };
    update(i, "fees", fees);
  };
  const removeFee = (i: number, fi: number) => {
    const fees = (courses[i].fees || []).filter((_: any, idx: number) => idx !== fi);
    update(i, "fees", fees);
  };
  const addFee = (i: number) => {
    const fees = [...(courses[i].fees || []), { level: "", category: "", duration: "", price: "" }];
    update(i, "fees", fees);
  };

  return (
    <div>
      {courses.map((c: any, i: number) => {
        const isExpanded = expandedIdx === i;
        return (
          <div key={i} style={S.card}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              onClick={() => setExpandedIdx(isExpanded ? null : i)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16, color: "#9ca3af", transition: "transform 0.2s", display: "inline-block", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                <strong>{c.name || "(Untitled)"}</strong>
                <span style={{ fontSize: 12, color: "#9ca3af", background: "#f3f4f6", padding: "2px 8px", borderRadius: 4 }}>{c.slug || "no-slug"}</span>
              </div>
              <button onClick={e => { e.stopPropagation(); remove(i); }} style={S.deleteBtn}>Delete</button>
            </div>
            {isExpanded && (
              <div style={{ marginTop: 14, borderTop: "1px solid #e5e7eb", paddingTop: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <Field label="Name"><TextInput value={c.name || ""} onChange={v => update(i, "name", v)} /></Field>
                  <Field label="Slug"><TextInput value={c.slug || ""} onChange={v => update(i, "slug", v)} /></Field>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  <Field label="Flag (emoji)"><TextInput value={c.flag || ""} onChange={v => update(i, "flag", v)} placeholder="🇬🇧" /></Field>
                  <Field label="Price Range"><TextInput value={c.priceRange || ""} onChange={v => update(i, "priceRange", v)} placeholder="$200-$500" /></Field>
                  <Field label="Format"><TextInput value={c.format || ""} onChange={v => update(i, "format", v)} placeholder="Online / In-person" /></Field>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <Field label="Levels (comma-separated)"><TextInput value={c.levels || ""} onChange={v => update(i, "levels", v)} placeholder="A1, A2, B1, B2" /></Field>
                  <Field label="Exams (comma-separated)"><TextInput value={c.exams || ""} onChange={v => update(i, "exams", v)} placeholder="IELTS, TOEFL" /></Field>
                </div>
                <Field label="Image URL"><TextInput value={c.image || ""} onChange={v => update(i, "image", v)} placeholder="https://..." /></Field>
                <Field label="Short Description"><TextInput value={c.shortDescription || ""} onChange={v => update(i, "shortDescription", v)} /></Field>
                <Field label="Full Description"><TextArea value={c.description || ""} onChange={v => update(i, "description", v)} /></Field>

                {/* What You Learn */}
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
                  <strong style={{ display: "block", marginBottom: 8, fontSize: 13 }}>What You Learn ({(c.whatYouLearn || []).length})</strong>
                  <StringListEditor
                    items={c.whatYouLearn || []}
                    onChange={v => update(i, "whatYouLearn", v)}
                    label=""
                    addLabel="Add Learning Point"
                  />
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
                  <strong style={{ display: "block", marginBottom: 8, fontSize: 13 }}>FAQs ({(c.faqs || []).length})</strong>
                  {(c.faqs || []).map((faq: any, fi: number) => (
                    <div key={fi} style={{ ...S.card, background: "white", marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <small>FAQ #{fi + 1}</small>
                        <button onClick={() => removeFaq(i, fi)} style={S.deleteBtn}>✕</button>
                      </div>
                      <Field label="Question"><TextInput value={faq.q || ""} onChange={v => updateFaq(i, fi, "q", v)} /></Field>
                      <Field label="Answer"><TextArea value={faq.a || ""} onChange={v => updateFaq(i, fi, "a", v)} /></Field>
                    </div>
                  ))}
                  <button onClick={() => addFaq(i)} style={{ ...S.addBtn, fontSize: 12, padding: "6px 12px" }}>+ Add FAQ</button>
                </div>

                {/* Fees */}
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
                  <strong style={{ display: "block", marginBottom: 8, fontSize: 13 }}>Fees ({(c.fees || []).length})</strong>
                  {(c.fees || []).map((fee: any, fi: number) => (
                    <div key={fi} style={{ ...S.card, background: "white", marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <small>Fee #{fi + 1}</small>
                        <button onClick={() => removeFee(i, fi)} style={S.deleteBtn}>✕</button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <Field label="Level"><TextInput value={fee.level || ""} onChange={v => updateFee(i, fi, "level", v)} /></Field>
                        <Field label="Category"><TextInput value={fee.category || ""} onChange={v => updateFee(i, fi, "category", v)} /></Field>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <Field label="Duration"><TextInput value={fee.duration || ""} onChange={v => updateFee(i, fi, "duration", v)} /></Field>
                        <Field label="Price"><TextInput value={fee.price || ""} onChange={v => updateFee(i, fi, "price", v)} /></Field>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addFee(i)} style={{ ...S.addBtn, fontSize: 12, padding: "6px 12px" }}>+ Add Fee</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <button onClick={() => onChange([...courses, { slug: "", name: "", flag: "", image: "", shortDescription: "", description: "", priceRange: "", levels: "", format: "" }])} style={S.addBtn}>+ Add Course</button>
    </div>
  );
}

/* ─── Exam Types Editor ─── */
function ExamTypesEditor({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const remove = (i: number) => onChange((data || []).filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: string) => {
    const next = [...(data || [])];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };
  return (
    <div>
      {(data || []).map((item, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <strong>Exam Type #{i + 1}</strong>
            <button onClick={() => remove(i)} style={S.deleteBtn}>Delete</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Name"><TextInput value={item.name || ""} onChange={v => update(i, "name", v)} placeholder="IELTS" /></Field>
            <Field label="Slug"><TextInput value={item.slug || ""} onChange={v => update(i, "slug", v)} placeholder="ielts" /></Field>
          </div>
          <Field label="Full Name"><TextInput value={item.fullName || ""} onChange={v => update(i, "fullName", v)} placeholder="International English Language Testing System" /></Field>
          <Field label="Description"><TextArea value={item.description || ""} onChange={v => update(i, "description", v)} /></Field>
          <Field label="Who Is It For"><TextArea value={item.whoFor || ""} onChange={v => update(i, "whoFor", v)} /></Field>
        </div>
      ))}
      <button onClick={() => onChange([...(data || []), { name: "", slug: "", fullName: "", description: "", whoFor: "" }])} style={S.addBtn}>+ Add Exam Type</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CMS Editors (Blog, Videos, Team, Reviews)
   ═══════════════════════════════════════════════════ */

type CmsItem = Record<string, any>;

const CMS_TAB_IDS = ["cmsBlog", "cmsVideos", "cmsTeam", "cmsReviews", "cmsPortfolio"] as const;

interface CmsEditorProps {
  items: CmsItem[];
  loading: boolean;
  editingItem: CmsItem | null;
  password: string;
  onRefresh: () => void;
  onEdit: (item: CmsItem | null) => void;
  apiBase: string;
  responseKey: string;
  emptyTitle: string;
  itemTitleField: string;
  itemDateField: string;
  imageField?: string; // field name that holds the Cloudinary image URL for this CMS type
  children?: React.ReactNode;
  renderFields?: (ctx: { item: CmsItem; updateField: (f: string, v: any) => void; handleImageUpload: (file: File, field: string) => Promise<void>; fileInputRef: React.RefObject<HTMLInputElement | null>; setUploadTarget: (t: string) => void; uploading: boolean }) => React.ReactNode;
}

/* ─── Generic CMS List + Edit wrapper ─── */
function CmsEditorShell({ items, loading, editingItem, password, onRefresh, onEdit, apiBase, responseKey, emptyTitle, itemTitleField, itemDateField, imageField, renderFields }: CmsEditorProps) {
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState("");
  const localItem = useRef<CmsItem | null>(null);

  // Keep localItem in sync with editingItem (but only on mount / external changes)
  useEffect(() => {
    localItem.current = editingItem ? { ...editingItem } : null;
  }, [editingItem]);

  const updateField = (field: string, value: any) => {
    if (!localItem.current) return;
    localItem.current = { ...localItem.current, [field]: value };
    onEdit({ ...localItem.current });
  };

  const handleSave = async () => {
    if (!localItem.current) return;
    const item = localItem.current;
    const nameField = itemTitleField || "title";
    if (!item[nameField]?.toString().trim()) {
      setLocalError(`${emptyTitle || "Title"} is required`);
      return;
    }
    setSaving(true); setLocalError("");
    try {
      const isNew = !item.id;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(apiBase, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(item),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Save failed" }));
        setLocalError(err.error || "Save failed");
      } else {
        onEdit(null);
        onRefresh();
      }
    } catch {
      setLocalError("Connection error");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string, imageUrl?: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      // Delete image from Cloudinary first
      if (imageUrl && imageUrl.includes("cloudinary.com")) {
        try {
          await fetch(`/api/upload?url=${encodeURIComponent(imageUrl)}`, {
            method: "DELETE",
            headers: { "x-admin-password": password },
          });
        } catch { /* ignore cloudinary delete failure, still delete the item */ }
      }
      const res = await fetch(`${apiBase}?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (res.ok) onRefresh();
      else setLocalError("Delete failed");
    } catch {
      setLocalError("Connection error");
    }
  };

  const handleImageUpload = async (file: File, field: string) => {
    setUploading(true);
    setLocalError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", field === "coverImage" ? "blogs" : field === "image" ? "team" : field === "thumbnail" ? "videos" : "reviews");
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: formData,
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        let msg = `Upload failed (HTTP ${res.status})`;
        try { const errJson = JSON.parse(errText); msg = `Upload failed: ${errJson.error || res.status}`; } catch {}
        if (errText) msg += `: ${errText.slice(0, 200)}`;
        setLocalError(msg);
        setUploading(false); return;
      }
      const data = await res.json();
      if (data.url) updateField(field, data.url);
      else setLocalError("No URL returned from upload");
    } catch (err: any) {
      setLocalError(`Upload error: ${err?.message || String(err)}`);
    }
    setUploading(false);
  };

  // If editing an item, render the form
  if (editingItem) {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#28143c" }}>
            {editingItem.id ? `Edit: ${editingItem[itemTitleField] || "Item"}` : "Add New Item"}
          </h3>
          <button onClick={() => onEdit(null)} style={{ ...S.deleteBtn, background: "#f3f4f6", color: "#374151" }}>← Back to List</button>
        </div>
        {localError && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: 10, borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{localError}</div>}
        {renderFields && renderFields({ item: editingItem, updateField, handleImageUpload, fileInputRef, setUploadTarget: setUploadTarget as (t: string) => void, uploading })}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file && uploadTarget) {
              if (file.size > 10 * 1024 * 1024) {
                alert("Image is too large. Maximum size is 10 MB.");
                e.target.value = "";
                return;
              }
              handleImageUpload(file, uploadTarget);
              setUploadTarget("");
            }
            e.target.value = "";
          }}
        />
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={handleSave} disabled={saving} style={S.saveBtn(saving)}>{saving ? "Saving..." : "Save"}</button>
          <button onClick={() => onEdit(null)} style={S.undoBtn}>Cancel</button>
        </div>
      </div>
    );
  }

  // List view
  if (loading) return <div style={{ textAlign: "center", padding: 40, color: "#888" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#28143c" }}>{emptyTitle} ({items.length})</h3>
        <button onClick={() => onEdit({})} style={S.addBtn}>+ Add New</button>
      </div>
      {localError && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: 10, borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{localError}</div>}
      {!items.length && <div style={{ padding: 30, textAlign: "center", color: "#9ca3af", background: "#f9fafb", borderRadius: 10 }}>No items yet. Click "+ Add New" to create one.</div>}
      {items.map((item) => (
        <div key={item.id} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#28143c", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item[itemTitleField] || "(Untitled)"}
              </div>
              {item[itemDateField] && <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{new Date(item[itemDateField]).toLocaleDateString()}</div>}
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 12 }}>
              <button onClick={() => onEdit({ ...item })} style={{ padding: "5px 12px", background: "#eff6ff", color: "#1e40af", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
              <button onClick={() => handleDelete(item.id, item[itemTitleField] || "this item", imageField ? item[imageField] : undefined)} style={S.deleteBtn}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Blog Post Editor ─── */
function CmsBlogEditor({ items, loading, editingItem, password, onRefresh, onEdit }: Omit<CmsEditorProps, 'apiBase' | 'responseKey' | 'emptyTitle' | 'itemTitleField' | 'itemDateField' | 'children' | 'renderFields'>) {
  return (
    <CmsEditorShell
      items={items} loading={loading} editingItem={editingItem} password={password}
      onRefresh={onRefresh} onEdit={onEdit}
      apiBase="/api/cms/blog" responseKey="blogs"
      emptyTitle="Blog Posts" itemTitleField="title" itemDateField="createdOn"
      imageField="coverImage"
      renderFields={({ item, updateField, handleImageUpload, fileInputRef, setUploadTarget, uploading }) => (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Title"><TextInput value={item.title || ""} onChange={v => updateField("title", v)} /></Field>
            <Field label="Author"><TextInput value={item.author || ""} onChange={v => updateField("author", v)} placeholder="UniStation Team" /></Field>
          </div>
          <Field label="Excerpt"><TextArea value={item.excerpt || ""} onChange={v => updateField("excerpt", v)} /></Field>
          <Field label="Content"><RichTextEditor value={item.content || ""} onChange={v => updateField("content", v)} placeholder="Write your blog post here..." /></Field>
          <Field label="Tags (comma-separated)"><TextInput value={item.tags || ""} onChange={v => updateField("tags", v)} placeholder="study-abroad, georgia, tips" /></Field>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, marginTop: 8 }}>
            <input type="checkbox" checked={!!item.featured} onChange={e => updateField("featured", e.target.checked)} style={{ width: 18, height: 18, accentColor: "#f0b414" }} />
            Featured post
          </label>
          <ImageUploadField
            label="Cover Image" value={item.coverImage || ""}
            onUpload={f => { setUploadTarget("coverImage"); handleImageUpload(f, "coverImage"); }}
            onUrlChange={v => updateField("coverImage", v)}
            fileInputRef={fileInputRef} uploadTarget={"coverImage"} setUploadTarget={setUploadTarget}
            uploading={uploading}
          />
        </div>
      )}
    />
  );
}

/* ─── Videos Editor ─── */
function CmsVideosEditor({ items, loading, editingItem, password, onRefresh, onEdit }: Omit<CmsEditorProps, 'apiBase' | 'responseKey' | 'emptyTitle' | 'itemTitleField' | 'itemDateField' | 'children' | 'renderFields'>) {
  return (
    <CmsEditorShell
      items={items} loading={loading} editingItem={editingItem} password={password}
      onRefresh={onRefresh} onEdit={onEdit}
      apiBase="/api/cms/videos" responseKey="videos"
      emptyTitle="Videos" itemTitleField="title" itemDateField="createdOn"
      imageField="thumbnail"
      renderFields={({ item, updateField, handleImageUpload, fileInputRef, setUploadTarget, uploading }) => (
        <div>
          <Field label="Title"><TextInput value={item.title || ""} onChange={v => updateField("title", v)} /></Field>
          <Field label="Description"><TextArea value={item.description || ""} onChange={v => updateField("description", v)} /></Field>
          <Field label="YouTube URL"><TextInput value={item.youtubeUrl || ""} onChange={v => updateField("youtubeUrl", v)} placeholder="https://youtube.com/watch?v=..." /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Category"><TextInput value={item.category || ""} onChange={v => updateField("category", v)} /></Field>
            <Field label="Tags (comma-separated)"><TextInput value={item.tags || ""} onChange={v => updateField("tags", v)} /></Field>
          </div>
          <ImageUploadField
            label="Thumbnail" value={item.thumbnail || ""}
            onUpload={f => { setUploadTarget("thumbnail"); handleImageUpload(f, "thumbnail"); }}
            onUrlChange={v => updateField("thumbnail", v)}
            fileInputRef={fileInputRef} uploadTarget={"thumbnail"} setUploadTarget={setUploadTarget}
            uploading={uploading}
          />
        </div>
      )}
    />
  );
}

/* ─── Team Members Editor ─── */
function CmsTeamEditor({ items, loading, editingItem, password, onRefresh, onEdit }: Omit<CmsEditorProps, 'apiBase' | 'responseKey' | 'emptyTitle' | 'itemTitleField' | 'itemDateField' | 'children' | 'renderFields'>) {
  return (
    <CmsEditorShell
      items={items} loading={loading} editingItem={editingItem} password={password}
      onRefresh={onRefresh} onEdit={onEdit}
      apiBase="/api/cms/team" responseKey="team"
      emptyTitle="Team Members" itemTitleField="name" itemDateField=""
      imageField="image"
      renderFields={({ item, updateField, handleImageUpload, fileInputRef, setUploadTarget, uploading }) => (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Name"><TextInput value={item.name || ""} onChange={v => updateField("name", v)} /></Field>
            <Field label="Role"><TextInput value={item.role || ""} onChange={v => updateField("role", v)} /></Field>
          </div>
          <Field label="Bio"><RichTextEditor value={item.bio || ""} onChange={v => updateField("bio", v)} placeholder="Write team member bio here..." /></Field>
          <ImageUploadField
            label="Photo" value={item.image || ""}
            onUpload={f => { setUploadTarget("image"); handleImageUpload(f, "image"); }}
            onUrlChange={v => updateField("image", v)}
            fileInputRef={fileInputRef} uploadTarget={"image"} setUploadTarget={setUploadTarget}
            uploading={uploading}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Email"><TextInput value={item.email || ""} onChange={v => updateField("email", v)} /></Field>
            <Field label="Phone"><TextInput value={item.phone || ""} onChange={v => updateField("phone", v)} /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Twitter"><TextInput value={item.twitter || ""} onChange={v => updateField("twitter", v)} /></Field>
            <Field label="Facebook"><TextInput value={item.facebook || ""} onChange={v => updateField("facebook", v)} /></Field>
          </div>
          <Field label="Qualifications (comma-separated)"><TextInput value={stripHtml(item.qualifications) || ""} onChange={v => updateField("qualifications", v)} placeholder="BSc Computer Science, MBA" /></Field>
          <Field label="Languages (comma-separated)"><TextInput value={stripHtml(item.languages) || ""} onChange={v => updateField("languages", v)} placeholder="Arabic, English, Turkish" /></Field>
          <Field label="Hobbies (comma-separated)"><TextInput value={stripHtml(item.hobbies) || ""} onChange={v => updateField("hobbies", v)} placeholder="Reading, Football, Travel" /></Field>
        </div>
      )}
    />
  );
}

/* ─── Reviews Editor ─── */
function CmsReviewsEditor({ items, loading, editingItem, password, onRefresh, onEdit }: Omit<CmsEditorProps, 'apiBase' | 'responseKey' | 'emptyTitle' | 'itemTitleField' | 'itemDateField' | 'children' | 'renderFields'>) {
  return (
    <CmsEditorShell
      items={items} loading={loading} editingItem={editingItem} password={password}
      onRefresh={onRefresh} onEdit={onEdit}
      apiBase="/api/cms/reviews" responseKey="reviews"
      emptyTitle="Reviews" itemTitleField="name" itemDateField="createdOn"
      imageField="photo"
      renderFields={({ item, updateField, handleImageUpload, fileInputRef, setUploadTarget, uploading }) => (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Name"><TextInput value={item.name || ""} onChange={v => updateField("name", v)} /></Field>
            <Field label="Rating (1-5)"><input type="number" min={1} max={5} step={0.1} value={item.rating || 5} onChange={e => updateField("rating", parseFloat(e.target.value) || 5)} style={S.input} /></Field>
          </div>
          <Field label="Review Text"><TextArea value={item.text || ""} onChange={v => updateField("text", v)} /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Country"><TextInput value={item.country || ""} onChange={v => updateField("country", v)} placeholder="UAE" /></Field>
            <Field label="Program"><TextInput value={item.program || ""} onChange={v => updateField("program", v)} placeholder="Medicine, UK" /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Source"><TextInput value={item.source || ""} onChange={v => updateField("source", v)} placeholder="Google" /></Field>
            <Field label="University"><TextInput value={item.university || ""} onChange={v => updateField("university", v)} /></Field>
          </div>
          <ImageUploadField
            label="Photo" value={item.photo || ""}
            onUpload={f => { setUploadTarget("photo"); handleImageUpload(f, "photo"); }}
            onUrlChange={v => updateField("photo", v)}
            fileInputRef={fileInputRef} uploadTarget={"photo"} setUploadTarget={setUploadTarget}
            uploading={uploading}
          />
        </div>
      )}
    />
  );
}

function CmsPortfolioEditor({ items, loading, editingItem, password, onRefresh, onEdit }: Omit<CmsEditorProps, 'apiBase' | 'responseKey' | 'emptyTitle' | 'itemTitleField' | 'itemDateField' | 'children' | 'renderFields'>) {
  return (
    <CmsEditorShell
      items={items} loading={loading} editingItem={editingItem} password={password}
      onRefresh={onRefresh} onEdit={onEdit}
      apiBase="/api/cms/portfolio" responseKey="portfolio"
      emptyTitle="Student Name" itemTitleField="name" itemDateField="createdOn"
      imageField="image"
      renderFields={({ item, updateField, handleImageUpload, fileInputRef, setUploadTarget, uploading }) => (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Student Name"><TextInput value={item.name || ""} onChange={v => updateField("name", v)} /></Field>
            <Field label="Country"><TextInput value={item.country || ""} onChange={v => updateField("country", v)} placeholder="Egypt" /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Curriculum"><TextInput value={item.curriculum || ""} onChange={v => updateField("curriculum", v)} placeholder="A-Level, IB, Emirati" /></Field>
            <Field label="Program"><TextInput value={item.program || ""} onChange={v => updateField("program", v)} placeholder="Medicine" /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="University"><TextInput value={item.university || ""} onChange={v => updateField("university", v)} /></Field>
            <Field label="Destination"><TextInput value={item.destination || ""} onChange={v => updateField("destination", v)} placeholder="UK, USA" /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Featured"><select value={item.featured || 0} onChange={e => updateField("featured", parseInt(e.target.value))} style={S.input}><option value={0}>No</option><option value={1}>Yes</option></select></Field>
            <Field label="Sort Order"><input type="number" min={1} max={999} value={item.sortOrder ?? 99} onChange={e => updateField("sortOrder", parseInt(e.target.value) || 99)} style={S.input} /></Field>
          </div>
          <ImageUploadField
            label="Photo (optional)" value={item.image || ""}
            onUpload={f => { setUploadTarget("image"); handleImageUpload(f, "image"); }}
            onUrlChange={v => updateField("image", v)}
            fileInputRef={fileInputRef} uploadTarget={"image"} setUploadTarget={setUploadTarget}
            uploading={uploading}
          />
        </div>
      )}
    />
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

  /* ─── CMS State ─── */
  const [cmsData, setCmsData] = useState<CmsItem[]>([]);
  const [editingItem, setEditingItem] = useState<CmsItem | null>(null);
  const [cmsLoading, setCmsLoading] = useState(false);
  const isCmsTab = (CMS_TAB_IDS as readonly string[]).includes(activeTab);

  const fetchCmsData = useCallback(async (tab: string) => {
    setCmsLoading(true); setCmsData([]); setEditingItem(null);
    let url = "";
    let key = "";
    if (tab === "cmsBlog") { url = "/api/cms/blog"; key = "blogs"; }
    else if (tab === "cmsVideos") { url = "/api/cms/videos"; key = "videos"; }
    else if (tab === "cmsTeam") { url = "/api/cms/team"; key = "team"; }
    else if (tab === "cmsReviews") { url = "/api/cms/reviews"; key = "reviews"; }
    else if (tab === "cmsPortfolio") { url = "/api/cms/portfolio"; key = "portfolio"; }
    if (!url) { setCmsLoading(false); return; }
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setCmsData(json[key] || []);
      }
    } catch { /* ignore */ }
    setCmsLoading(false);
  }, []);

  useEffect(() => {
    if (loggedIn && isCmsTab) fetchCmsData(activeTab);
  }, [activeTab, loggedIn, isCmsTab, fetchCmsData]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const sess = loadSession();
    if (sess) {
      if (stringHasNonLatin1(sess)) {
        clearSession();
        setLoginError("Session expired. Please enter your password again (English only).");
      } else {
        setPassword(sess);
        setLoggedIn(true);
      }
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
      setError("Failed to load data");
    }
    setLoading(false);
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) fetchData();
  }, [loggedIn, fetchData]);

  /* ─── Login Handler ─── */
  const handleLogin = async () => {
    if (!password) return;

    if (stringHasNonLatin1(password)) {
      setLoginError("Password must be English letters and numbers only. Make sure your keyboard is in English mode.");
      return;
    }

    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ key: "_ping", value: true }),
      });
      if (res.status === 401) { setLoginError("Incorrect password"); return; }
      if (!res.ok) { setLoginError("Could not connect to server"); return; }
    } catch {
      setLoginError("Connection failed — check your internet");
      return;
    }
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

    if (password && stringHasNonLatin1(password)) {
      setError("Invalid password — please log out and log back in (English only)");
      setSaving(false);
      return;
    }

    try {
      const bodyStr = JSON.stringify({ key, value });
      console.log(`[saveKey] Saving key="${key}" payload=${bodyStr.length} bytes`);
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: bodyStr,
      });
      console.log(`[saveKey] Response: ${res.status} ${res.statusText}`);
      if (!res.ok) {
        let errMsg = "Save failed";
        try {
          const errBody = await res.json();
          if (errBody?.error) errMsg = `Save failed (${res.status}): ${errBody.error}`;
        } catch { errMsg = `Save failed (HTTP ${res.status})`; }
        setError(errMsg);
        return;
      }
      setSavedKey(key);
      setOriginalData(prev => ({ ...prev, [key]: value }));
      setTimeout(() => setSavedKey(null), 3000);
    } catch (err: any) {
      console.error("[saveKey] Fetch failed:", err);
      const msg = err?.message || String(err);
      setError(`Connection error: ${msg}`);
    }
    setSaving(false);
  };

  const tabMap: Record<string, string> = {
    brand: "brand", social: "social", stats: "stats", offices: "offices",
    testimonials: "testimonials", packages: "packages", destinations: "destinations",
    faqs: "faqs",
    navigation: "navigation", about: "about", timeline: "timeline",
    comparisonTable: "comparisonTable", languageCourses: "languageCourses",
    examTypes: "examTypes",
    georgiaHero: "hero", georgiaContact: "site", georgiaStats: "georgia_stats",
    georgiaUniversities: "universities", georgiaBasicPackage: "basicPackage",
    georgiaAdditionalPackage: "additionalPackage", georgiaRegistration: "registration",
    georgiaFaqs: "georgia_faqs",
  };

  const handleSaveTab = () => {
    const key = tabMap[activeTab];
    if (key && data[key] !== undefined) saveKey(key, data[key]);
  };

  const updateTabData = (value: any) => {
    const key = tabMap[activeTab];
    if (key) setData(prev => ({ ...prev, [key]: value }));
  };

  const hasUndo = isCmsTab ? false : JSON.stringify(data[tabMap[activeTab] || activeTab]) !== JSON.stringify(originalData[tabMap[activeTab] || activeTab]);
  const handleUndo = () => {
    const key = tabMap[activeTab];
    if (key) setData(prev => ({ ...prev, [key]: originalData[key] }));
  };

  const tabs = [
    // General
    { id: "brand", label: "Brand", icon: "", group: "general" },
    { id: "social", label: "Social Media", icon: "", group: "general" },
    { id: "stats", label: "Stats", icon: "", group: "general" },
    // Reviews are managed from CMS (Webflow), not here
    { id: "offices", label: "Offices", icon: "", group: "general" },
    { id: "packages", label: "Packages", icon: "", group: "general" },
    { id: "destinations", label: "Destinations", icon: "", group: "general" },
    { id: "faqs", label: "FAQs", icon: "", group: "general" },
    { id: "navigation", label: "Navigation", icon: "", group: "general" },
    { id: "about", label: "About Us", icon: "", group: "general" },
    { id: "timeline", label: "Timeline", icon: "", group: "general" },
    { id: "comparisonTable", label: "Comparison", icon: "", group: "general" },
    { id: "languageCourses", label: "Lang. Courses", icon: "", group: "general" },
    { id: "examTypes", label: "Exam Types", icon: "", group: "general" },
    // Georgia divider
    { id: "_georgia_divider", label: "Georgia", icon: "", group: "divider" },
    // Georgia
    { id: "georgiaHero", label: "Hero", icon: "", group: "georgia" },
    { id: "georgiaStats", label: "Stats", icon: "", group: "georgia" },
    { id: "georgiaUniversities", label: "Universities", icon: "", group: "georgia" },
    { id: "georgiaBasicPackage", label: "Package", icon: "", group: "georgia" },
    { id: "georgiaAdditionalPackage", label: "Add-on", icon: "", group: "georgia" },
    { id: "georgiaRegistration", label: "Registration", icon: "", group: "georgia" },
    { id: "georgiaContact", label: "Contact", icon: "", group: "georgia" },
    { id: "georgiaFaqs", label: "FAQs", icon: "", group: "georgia" },
    // CMS divider
    { id: "_cms_divider", label: "CMS", icon: "", group: "divider" },
    // CMS
    { id: "cmsBlog", label: "Blog Posts", icon: "", group: "cms" },
    { id: "cmsVideos", label: "Videos", icon: "", group: "cms" },
    { id: "cmsTeam", label: "Team", icon: "", group: "cms" },
    { id: "cmsReviews", label: "Reviews", icon: "", group: "cms" },
    { id: "cmsPortfolio", label: "Portfolio", icon: "", group: "cms" },
  ];

  /* ─── Login Screen ─── */
  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#28143c", fontFamily: FONT, padding: 20 }}>
        <div style={{ background: "white", borderRadius: 20, padding: "40px 32px", width: "100%", maxWidth: 400, textAlign: "center", boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}>
          <div style={{ width: 70, height: 70, background: "linear-gradient(135deg, #28143c, #3d1f5e)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32, lineHeight: 1 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h1 style={{ color: "#28143c", fontSize: 24, fontWeight: 800, marginBottom: 6 }}>UniStation Admin</h1>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>Enter your password to continue</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            onFocus={e => e.currentTarget.style.borderColor = "#f0b414"}
            onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
            style={{ width: "100%", padding: "14px 18px", border: "2px solid #e5e7eb", borderRadius: 12, fontSize: 16, outline: "none", boxSizing: "border-box", marginBottom: 16, fontFamily: FONT }}
          />
          {loginError && <p style={{ color: "#e11d48", fontSize: 13, marginBottom: 14 }}>{loginError}</p>}
          <button
            onClick={handleLogin}
            style={{ width: "100%", padding: 14, background: "linear-gradient(135deg, #f0b414, #e5a710)", color: "#28143c", border: "none", borderRadius: 12, fontSize: 17, fontWeight: 800, cursor: "pointer", fontFamily: FONT, boxShadow: "0 4px 15px rgba(240,180,20,0.4)" }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  /* ─── Admin Dashboard ─── */
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: FONT }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #28143c, #3d1f5e)",
        padding: isMobile ? "12px 16px" : "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 8,
        boxShadow: "0 4px 15px rgba(40,20,60,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h1 style={{ color: "white", fontSize: isMobile ? 15 : 18, fontWeight: 700, margin: 0 }}>
            UniStation Admin
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={fetchData} disabled={loading}
            style={{ padding: "7px 14px", background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 12, fontFamily: FONT }}>
            {loading ? "..." : "Refresh"}
          </button>
          <button onClick={handleLogout}
            style={{ padding: "7px 14px", background: "rgba(255,255,255,0.1)", color: "#fca5a5", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 12, fontFamily: FONT }}>
            Sign Out
          </button>
          <a href="/"
            style={{ padding: "7px 14px", background: "#f0b414", color: "#28143c", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 12, textDecoration: "none", fontFamily: FONT }}>
            View Site
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", display: "flex", overflowX: "auto", padding: "0 12px" }}>
        {tabs.map(t => {
          if (t.group === "divider") {
            return (
              <div key={t.id} style={{
                padding: "0 12px", display: "flex", alignItems: "center",
                color: "#1e40af", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                borderLeft: "1px solid #e5e7eb", borderRight: "1px solid #e5e7eb",
                background: "#eff6ff",
              }}>
                {t.icon} {t.label}
              </div>
            );
          }
          const isGeorgia = t.group === "georgia";
          const isCms = t.group === "cms";
          const isActive = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{
                padding: isMobile ? "10px 14px" : "12px 18px", border: "none",
                borderBottom: isActive ? "3px solid #f0b414" : "3px solid transparent",
                background: isActive ? (isGeorgia ? "#eff6ff" : isCms ? "#f0fdf4" : "#fffbeb") : "none",
                color: isActive ? "#28143c" : (isGeorgia ? "#1e40af" : isCms ? "#166534" : "#888"),
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer", whiteSpace: "nowrap",
                fontSize: isMobile ? 12 : 13,
                fontFamily: FONT, transition: "all 0.2s",
              }}
            >
              {t.icon} {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 950, margin: isMobile ? "16px auto" : "24px auto", padding: "0 12px" }}>
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: 14, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
            {error}
            <button onClick={() => setError("")} style={{ float: "right", border: "none", background: "none", cursor: "pointer", fontSize: 18, color: "#991b1b" }}>✕</button>
          </div>
        )}
        {savedKey && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", padding: 14, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
            Saved successfully! Changes are live on the site.
          </div>
        )}

        {(loading && !isCmsTab) ? (
          <div style={{ textAlign: "center", padding: 80, color: "#888", fontSize: 16 }}>Loading data...</div>
        ) : (
          <div>
            {/* Action buttons — hidden for CMS tabs (they have their own save) */}
            {!isCmsTab && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                {hasUndo ? (
                  <button onClick={handleUndo} style={S.undoBtn}>Undo Changes</button>
                ) : <div />}
                <button onClick={handleSaveTab} disabled={saving} style={S.saveBtn(saving)}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

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
              {activeTab === "navigation" && <NavigationEditor data={data.navigation || []} onChange={updateTabData} />}
              {activeTab === "about" && <AboutEditor data={data.about || { paragraphs: [] }} onChange={updateTabData} />}
              {activeTab === "timeline" && <TimelineEditor data={data.timeline || []} onChange={updateTabData} />}
              {activeTab === "comparisonTable" && <ComparisonTableEditor data={data.comparisonTable || { headers: [], rows: [] }} onChange={updateTabData} />}
              {activeTab === "languageCourses" && <LanguageCoursesEditor data={data.languageCourses || []} onChange={updateTabData} />}
              {activeTab === "examTypes" && <ExamTypesEditor data={data.examTypes || []} onChange={updateTabData} />}
              {/* Georgia */}
              {activeTab === "georgiaHero" && <HeroEditor data={data.hero || {}} onChange={updateTabData} />}
              {activeTab === "georgiaStats" && <GeorgiaStatsEditor data={data.georgia_stats || []} onChange={updateTabData} />}
              {activeTab === "georgiaUniversities" && <UniversitiesEditor data={data.universities || []} onChange={updateTabData} />}
              {activeTab === "georgiaBasicPackage" && <GeorgiaPackageEditor data={data.basicPackage || {}} onChange={updateTabData} />}
              {activeTab === "georgiaAdditionalPackage" && <GeorgiaPackageEditor data={data.additionalPackage || {}} onChange={updateTabData} />}
              {activeTab === "georgiaRegistration" && <RegistrationEditor data={data.registration || {}} onChange={updateTabData} />}
              {activeTab === "georgiaContact" && <ContactEditor data={data.site || {}} onChange={updateTabData} />}
              {activeTab === "georgiaFaqs" && <GeorgiaFaqsEditor data={data.georgia_faqs || []} onChange={updateTabData} />}
              {/* CMS */}
              {activeTab === "cmsBlog" && <CmsBlogEditor items={cmsData} loading={cmsLoading} editingItem={editingItem} password={password} onRefresh={() => fetchCmsData("cmsBlog")} onEdit={setEditingItem} />}
              {activeTab === "cmsVideos" && <CmsVideosEditor items={cmsData} loading={cmsLoading} editingItem={editingItem} password={password} onRefresh={() => fetchCmsData("cmsVideos")} onEdit={setEditingItem} />}
              {activeTab === "cmsTeam" && <CmsTeamEditor items={cmsData} loading={cmsLoading} editingItem={editingItem} password={password} onRefresh={() => fetchCmsData("cmsTeam")} onEdit={setEditingItem} />}
              {activeTab === "cmsReviews" && <CmsReviewsEditor items={cmsData} loading={cmsLoading} editingItem={editingItem} password={password} onRefresh={() => fetchCmsData("cmsReviews")} onEdit={setEditingItem} />}
              {activeTab === "cmsPortfolio" && <CmsPortfolioEditor items={cmsData} loading={cmsLoading} editingItem={editingItem} password={password} onRefresh={() => fetchCmsData("cmsPortfolio")} onEdit={setEditingItem} />}
            </div>

            {/* Bottom Save — hidden for CMS tabs */}
            {!isCmsTab && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 8 }}>
                {hasUndo ? (
                  <button onClick={handleUndo} style={S.undoBtn}>Undo Changes</button>
                ) : <div />}
                <button onClick={handleSaveTab} disabled={saving} style={S.saveBtn(saving)}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
