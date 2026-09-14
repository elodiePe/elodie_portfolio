// Structured "case study" summaries: Challenge -> What I did.
// Shown at the top of a project page to SELL the project fast.
//
// IMPORTANT: every field below is paraphrased from the project's own
// description — no invented metrics.

const caseStudies = {
  1: {
    role: "UX/UI Designer",
    challenge:
      "Tourists and locals had no easy, friendly way to discover local trails and places — or to actually navigate them.",
    approach:
      "Ran a quantitative survey, distilled the key features, then iterated from low- to high-fidelity prototypes on Google's design system — giving each search filter its own colour to guide the eye.",
  },
  5: {
    role: "Founder & Designer",
    challenge:
      "I wanted my own clothing brand — one that celebrates standing out instead of blending in.",
    approach:
      "Designed a bold visual identity around a colourful chameleon, then found a print method (DTF) that survives real life and works on any fabric.",
  },
  8: {
    role: "Designer & Developer",
    challenge:
      "A Geneva watchmaker needed a digital home worthy of his craft — with online bookings and a global, multilingual audience.",
    approach:
      "Hand-coded a fully responsive Vue site with a booking + payment service and a self-serve admin panel so he manages everything himself.",
  },
  11: {
    role: "Illustrator & Series lead",
    challenge:
      "UEFA and Amazon wanted to inspire more young women to become football coaches.",
    approach:
      "In a team of eight we built the 'Tomorrow's Football' campaign — a site, a social push, and an interactive animated series that I created and drew by hand.",
  },
  35: {
    role: "Researcher (MSc)",
    challenge:
      "Password managers are so smooth that users stop checking where they log in — leaving them open to business-email-compromise scams.",
    approach:
      "Added 'positive friction' (captcha-like challenges) before revealing a password, then tested it in a controlled A/B experiment.",
  },
  36: {
    role: "Full-stack Designer & Developer",
    challenge:
      "Parents need a simple way to teach kids about money while actually running the household day to day.",
    approach:
      "Built a full-stack app — kid accounts, allowance, chores-for-money, savings goals, teen investing and parent oversight — web + mobile from a single TypeScript codebase.",
  },
  37: {
    role: "Designer & Developer",
    challenge:
      "I wanted a dedicated online home for my animal portrait paintings — one where clients could browse, commission a piece, and buy directly.",
    approach:
      "Designed my own visual identity (palette, EP monogram, illustrations) and coded the whole bilingual site myself: gallery, bespoke portrait commissions, gift cards, and an online shop.",
  },
};

export function getCaseStudy(id) {
  if (id === undefined || id === null) return null;
  return caseStudies[id] || caseStudies[String(id)] || caseStudies[Number(id)] || null;
}

export default caseStudies;
