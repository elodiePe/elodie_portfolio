// Storytelling narration scripts for the "Interactive description" overlay.
//
// Keyed by project id. Each entry:
//   script : the fun, spoken narration (storytelling tone, jokes welcome).
//            This is what the browser voice reads aloud AND what we show on
//            screen as a transcript (so it doubles as captions for the audio).
//   audio  : optional URL to a pre-recorded MP3 (e.g. ElevenLabs). When set,
//            the player uses this instead of the browser voice for premium
//            quality. Leave null to use the free built-in browser voice.
//            To record ElevenLabs voices, see ELEVENLABS_SCRIPTS.md at the repo
//            root — it has the emotion-tagged scripts and the exact steps to
//            drop the finished MP3 URL into the `audio` field below.
//
// To add a project, copy an entry and fill it in. Split ideas into short
// sentences — the player highlights one sentence at a time as it speaks.

export const stories = {
  1: {
    audio: null,
    script:
      "Bonjour, and welcome! Grab a comfy seat — this is one hike where you won't even break a sweat. " +
      "Meet Vaud Sentiers: a web app that nudges tourists and locals alike to go discover beautiful places, one itinerary at a time. " +
      "My job? The whole user experience and interface. Basically, I made sure that finding your next adventure feels easier than deciding what to watch tonight. " +
      "But I didn't just guess what people wanted — that would be far too easy. I ran a proper survey, crunched the numbers, and let real humans tell me what mattered. " +
      "Out came the essentials: search for trails on a map or with smart filters, start navigating right inside the app, share your favourite spots, and rate and comment on the paths you loved. " +
      "Then came the fun, slightly chaotic part: low-fidelity prototypes. I tested them, people poked holes in them, and I happily rebuilt them better. " +
      "Finally, the glow-up — high-fidelity designs with real colours and a proper identity, built on Google's design system so everything stays neat and consistent. " +
      "And the colours aren't just pretty: each search filter gets its very own colour, so your eyes always know where to go. " +
      "So next time you're itching for a walk in the Canton of Vaud… you know who to thank. Happy exploring!",
  },

  5: {
    audio: null,
    script:
      "Okay, real talk — how do you stand out in a world full of, well, everyone? " +
      "That exact question turned into a whole clothing brand. Meet Unmatched. " +
      "The name says it all: be different, be yourself, don't blend in. " +
      "And the mascot? A chameleon — which is a little cheeky, because chameleons are famous for disappearing. " +
      "Not mine. Mine is exploding with colour, proudly refusing to hide — unmatched from all the others. " +
      "Now, the road here had… a casualty. My first bright idea was to print my designs on my home printer. " +
      "Spoiler: I used the wrong ink and completely broke the poor thing. Rest in peace, little printer. " +
      "It also turned out that method really doesn't like cotton, so that was a double no. " +
      "But I don't quit easily. I discovered DTF printing — direct-to-film — which works on basically any material and lasts and lasts. " +
      "Finally, designs that survive real life and the washing machine. " +
      "So that's Unmatched: a brand about being unapologetically colourful, one durable, chameleon-approved print at a time.",
  },

  8: {
    audio: null,
    script:
      "Let me introduce you to a bit of a passion project. " +
      "Bruno Pesenti is an independent watchmaker in Geneva — the kind of craftsman who makes time itself look elegant. " +
      "My mission: give his exceptional work a digital home worthy of it. " +
      "So I designed and hand-coded a custom website — HTML, CSS, and JavaScript inside Vue — fully responsive, so it looks just as sharp on a phone as on a big screen. " +
      "But it's more than a pretty showcase. " +
      "It has a built-in booking service, letting clients reserve pieces and handle payments smoothly. " +
      "And because fine watchmaking speaks to the whole world, the site comes in French, English, and Italian. " +
      "I also built Bruno an easy admin panel, so he can add, edit, or remove pieces and manage bookings entirely on his own — no developer required. " +
      "And I'm still there behind the scenes, keeping everything polished and running. " +
      "Because great craftsmanship deserves a great stage — and this one keeps perfect time.",
  },

  11: {
    audio: null,
    script:
      "Picture this: a school project, but the clients are UEFA and Amazon. No pressure, right? " +
      "The goal — encourage more young women to become football coaches. " +
      "Our team of eight built a whole campaign called Tomorrow's Football: a website, a social media push, and an interactive animated series. " +
      "And the series? That one was my baby. " +
      "It's called 'Coach like a women', following a young woman who becomes the coach of her little sister's football team. " +
      "Here's the twist: each episode is partly written by the audience. " +
      "We actually interview a real person about what they'd like to see, then bring it to life. " +
      "Oh, and I drew the whole thing by hand. Yes, really. " +
      "I used a little AI to help design the characters, but then came two solid weeks of nothing but drawing — for what ends up being a very short burst of video. " +
      "Long? Absolutely. And the funny part: today's AI could probably crank that out in about ten minutes. " +
      "Ten minutes! A little humbling, a little wild. But hand-drawn, it has a soul — and I wouldn't trade that.",
  },

  35: {
    audio: null,
    script:
      "Alright, put on your lab coat — we're doing science. " +
      "My master's thesis asked a sneaky question: can we make password managers a little more… alert? " +
      "See, password managers are so smooth that we stop paying attention to where we're actually logging in. " +
      "Which is exactly what scammers love. " +
      "So I added friendly friction — tiny challenges, a bit like captchas — right before a password appears, hoping people would slow down and catch the fake login attempts. " +
      "I ran an experiment: twenty-four brave participants, ten emails, three of them sneaky attacks. " +
      "Group A got the normal password manager; group B got my extra friction. " +
      "And the result? Plot twist: the friction didn't significantly help people spot the attacks. " +
      "Not the triumphant ending I'd dreamed of, I'll admit. " +
      "But that's the honest, slightly chilly reality of research — and I learned an enormous amount, so nothing was wasted. " +
      "The hardest part? As observers, we weren't allowed to react. Poker faces only. " +
      "But the best part came after: talking with each participant and finally understanding how their mind worked. " +
      "Because sometimes the real discovery isn't in the data — it's in the conversation.",
  },
};

export function getStory(id) {
  if (id === undefined || id === null) return null;
  return stories[id] || stories[String(id)] || stories[Number(id)] || null;
}

export default stories;
