// Card "pitch" metadata: short hooks + auto-derived badges + a discipline
// accent colour, used to make the project grid sell each project harder.
//
// IMPORTANT: nothing here invents results or metrics. Hooks are one-line
// summaries of the project's OWN description; badges are derived from real
// fields (website, figma, tags, whether a spoken story exists).

import { getStory } from "./stories.js";
import { t } from "../i18n";

// One-line, punchy hooks drawn from each project's real description.
// Add or tweak freely — projects without an entry simply show no hook.
const hooks = {
  1: "The app that turns a map into your next adventure.",
  2: "A playful brand identity born from a French pun.",
  3: "Eight animal gazes that stare right back at you.",
  4: "A card game that makes kids fall for the world's weirdest animals.",
  5: "My own clothing brand — bold prints that refuse to blend in.",
  6: "Tinder, but for adopting pets.",
  7: "An AI-made ad where the smell of pizza brings statues to life.",
  8: "A hand-coded, trilingual home for a Geneva watchmaker.",
  9: "A print catalog as refined as the watches inside it.",
  10: "A watch-hands logo, frozen at the perfect 10:10.",
  11: "A hand-drawn animated series to inspire future women coaches.",
  12: "Usability testing that turned two users into a pile of insights.",
  32: "A hummingbird logo about everyone doing their small part.",
  33: "A golden logo steeped in Greek mythology.",
  34: "A lion whose mood rises and falls with your screen time.",
  35: "Can a little friction help you outsmart email scammers?",
  36: "From pocket money to portfolios — a full-stack family app.",
};

// Discipline → display label + accent colour (for the reveal gradient).
const disciplineStyle = {
  ux: { label: "UX", color: "#0ea5e9" },
  ui: { label: "UI", color: "#0ea5e9" },
  coding: { label: "Code", color: "#10b981" },
  development: { label: "Code", color: "#10b981" },
  branding: { label: "Branding", color: "#d97706" },
  graphism: { label: "Graphism", color: "#d97706" },
  photography: { label: "Photo", color: "#db2777" },
  painting: { label: "Painting", color: "#db2777" },
  drawing: { label: "Drawing", color: "#db2777" },
  video: { label: "Video", color: "#7c3aed" },
  ai: { label: "AI", color: "#6366f1" },
};

function normTag(t) {
  return (t || "").toString().toLowerCase().trim();
}

// Returns { hook, accent, badges: [{ label, icon? }] } for a project card.
export function getCardMeta(project) {
  if (!project) return { hook: "", accent: "#422D79", badges: [] };

  const tags = Array.isArray(project.tags)
    ? project.tags.map(normTag)
    : [normTag(project.tags)];

  // Accent colour = first tag we recognise, else brand purple.
  let accent = "#422D79";
  for (const t of tags) {
    if (disciplineStyle[t]) {
      accent = disciplineStyle[t].color;
      break;
    }
  }

  // Up to two discipline badges (de-duplicated by label).
  const badges = [];
  const seen = new Set();
  for (const t of tags) {
    const d = disciplineStyle[t];
    if (d && !seen.has(d.label)) {
      seen.add(d.label);
      badges.push({ label: d.label });
    }
    if (badges.length >= 2) break;
  }

  // Real, safe "proof" badges derived from existing fields.
  if (project.website) badges.push({ label: t("card.liveSite"), icon: "↗" });
  else if (project.figma) badges.push({ label: t("card.prototype") });

  const voiced = !!(getStory(project.id) || project.audio);
  if (voiced) badges.push({ label: t("card.voiced"), icon: "🎧" });

  return {
    hook: hooks[project.id] || hooks[String(project.id)] || "",
    accent,
    badges: badges.slice(0, 4),
    voiced,
  };
}

export default getCardMeta;
