// Structured "case study" summaries: Challenge -> What I did -> Result.
// Shown at the top of a project page to SELL the project fast.
//
// IMPORTANT: every field below is paraphrased from the project's own
// description — no invented metrics. The `results` stats are real facts
// (a shipped site, a language count, measured study numbers). Swap in
// punchier real numbers whenever you have them (users, downloads, sales…).

const caseStudies = {
  1: {
    role: "UX/UI Designer",
    challenge:
      "Tourists and locals had no easy, friendly way to discover local trails and places — or to actually navigate them.",
    approach:
      "Ran a quantitative survey, distilled the key features, then iterated from low- to high-fidelity prototypes on Google's design system — giving each search filter its own colour to guide the eye.",
    results: [
      { stat: "Live", label: "Shipped at vaudsentiers.ch" },
      { stat: "4", label: "Core features from real user research" },
      { stat: "UX→UI", label: "Survey to high-fi, end to end" },
    ],
  },
  5: {
    role: "Founder & Designer",
    challenge:
      "I wanted my own clothing brand — one that celebrates standing out instead of blending in.",
    approach:
      "Designed a bold visual identity around a colourful chameleon, then found a print method (DTF) that survives real life and works on any fabric.",
    results: [
      { stat: "Live", label: "Brand & shop online" },
      { stat: "DTF", label: "Durable prints on any material" },
      { stat: "1", label: "Brand built solo, end to end" },
    ],
  },
  8: {
    role: "Designer & Developer",
    challenge:
      "A Geneva watchmaker needed a digital home worthy of his craft — with online bookings and a global, multilingual audience.",
    approach:
      "Hand-coded a fully responsive Vue site with a booking + payment service and a self-serve admin panel so he manages everything himself.",
    results: [
      { stat: "500+", label: "Visits per month" },
      { stat: "3", label: "Languages: FR / EN / IT" },
      { stat: "Live", label: "In production, still maintained" },
    ],
  },
  11: {
    role: "Illustrator & Series lead",
    challenge:
      "UEFA and Amazon wanted to inspire more young women to become football coaches.",
    approach:
      "In a team of eight we built the 'Tomorrow's Football' campaign — a site, a social push, and an interactive animated series that I created and drew by hand.",
    results: [
      { stat: "Team of 8", label: "Site + social + series" },
      { stat: "Hand-drawn", label: "Audience-driven episodes" },
      { stat: "UEFA × Amazon", label: "Real brand brief" },
    ],
  },
  35: {
    role: "Researcher (MSc)",
    challenge:
      "Password managers are so smooth that users stop checking where they log in — leaving them open to business-email-compromise scams.",
    approach:
      "Added 'positive friction' (captcha-like challenges) before revealing a password, then tested it in a controlled A/B experiment.",
    results: [
      { stat: "24", label: "Participants, two groups" },
      { stat: "SUS 89 / 78", label: "Usability impact measured" },
      { stat: "10", label: "Emails, 3 of them real attacks" },
    ],
  },
  36: {
    role: "Full-stack Designer & Developer",
    challenge:
      "Parents need a simple way to teach kids about money while actually running the household day to day.",
    approach:
      "Built a full-stack app — kid accounts, allowance, chores-for-money, savings goals, teen investing and parent oversight — web + mobile from a single TypeScript codebase.",
    results: [
      { stat: "Web + Mobile", label: "One shared codebase" },
      { stat: "Live", label: "myhouzly.com, real billing" },
      { stat: "6→16", label: "UI that grows with the child" },
    ],
  },
};

export function getCaseStudy(id) {
  if (id === undefined || id === null) return null;
  return caseStudies[id] || caseStudies[String(id)] || caseStudies[Number(id)] || null;
}

export default caseStudies;
