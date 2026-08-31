# ElevenLabs narration scripts

Copy-paste these into ElevenLabs to generate the spoken narration for each
project, then wire the resulting MP3 back into the site (steps at the bottom).

The bracketed tags like `[laughs]` and `[excited]` are **ElevenLabs v3 audio
tags** — the voice performs them, it does not read them aloud. The `…` and `—`
marks are there for comic timing (pauses). The plain words match the on-screen
transcript in `src/data/stories.js`, so the captions stay in sync.

## Recommended settings

- **Model:** Eleven v3 (the one that understands the `[tags]`).
- **Voice:** pick a warm, expressive, conversational voice you like — the
  narration is written in the first person ("my job", "I drew it"), so choose a
  voice you're happy to have "be you". Expressive options in the ElevenLabs
  library work best; avoid the flat "news reader" ones.
- **Stability:** low / "Creative" (~30%) → more playful, varied intonation.
  Higher stability = flatter and more monotone, which kills the jokes.
- **Export:** MP3. Keep the filenames tidy, e.g. `story-01-vaudsentiers.mp3`.

> Note: not every tag below is officially guaranteed — v3 is generous but
> occasionally ignores one. If a tag ever gets read aloud, just delete it and
> re-generate. The safest, always-supported ones: `[laughs]`, `[sighs]`,
> `[whispers]`, `[sarcastic]`, `[excited]`, `[curious]`.

---

## Project 1 — Vaud Sentiers: application design

```text
[cheerful] Bonjour, and welcome! Grab a comfy seat — this is one hike where you won't even break a sweat.
Meet Vaud Sentiers: a web app that nudges tourists and locals alike to go discover beautiful places, one itinerary at a time.
My job? [proud] The whole user experience and interface. Basically, I made sure that finding your next adventure feels easier than deciding what to watch tonight.
But I didn't just guess what people wanted — [sarcastic] that would be far too easy. I ran a proper survey, crunched the numbers, and let real humans tell me what mattered.
Out came the essentials: search for trails on a map or with smart filters, start navigating right inside the app, share your favourite spots, and rate the paths you loved.
Then came the fun, slightly chaotic part: low-fidelity prototypes. I tested them, people poked holes in them, [laughs] and I happily rebuilt them better.
Finally, the glow-up — high-fidelity designs with real colours and a proper identity, built on Google's design system so everything stays neat and consistent.
And the colours aren't just pretty: each search filter gets its very own colour, so your eyes always know where to go.
[warm] So next time you're itching for a walk in the Canton of Vaud… you know who to thank. Happy exploring!
```

---

## Project 5 — Unmatched

```text
[curious] Okay, real talk — how do you stand out in a world full of, well, everyone?
[cheerful] That exact question turned into a whole clothing brand. Meet Unmatched.
The name says it all: be different, be yourself, don't blend in.
And the mascot? A chameleon — [mischievous] which is a little cheeky, because chameleons are famous for disappearing.
Not mine. Mine is exploding with colour, proudly refusing to hide — unmatched from all the others.
Now, the road here had… a casualty. My first bright idea was to print my designs on my home printer.
[sarcastic] Spoiler: I used the wrong ink and completely broke the poor thing. [laughs] Rest in peace, little printer.
It also turned out that method really doesn't like cotton, so that was a double no.
But I don't quit easily. I discovered DTF printing — direct-to-film — which works on basically any material and lasts and lasts.
[excited] Finally, designs that survive real life and the washing machine!
[warm] So that's Unmatched: a brand about being unapologetically colourful, one durable, chameleon-approved print at a time.
```

---

## Project 8 — Bruno Pesenti's website

```text
[warm] Let me introduce you to a bit of a passion project.
Bruno Pesenti is an independent watchmaker in Geneva — the kind of craftsman who makes time itself look elegant.
My mission: give his exceptional work a digital home worthy of it.
So I designed and hand-coded a custom website — HTML, CSS, and JavaScript inside Vue — fully responsive, so it looks just as sharp on a phone as on a big screen.
[confident] But it's more than a pretty showcase.
It has a built-in booking service, letting clients reserve pieces and handle payments smoothly.
And because fine watchmaking speaks to the whole world, the site comes in French, English, and Italian.
I also built Bruno an easy admin panel, so he can add, edit, or remove pieces and manage bookings entirely on his own — no developer required.
And I'm still there behind the scenes, keeping everything polished and running.
[warm] Because great craftsmanship deserves a great stage — and this one keeps perfect time.
```

---

## Project 11 — UEFA × Amazon

```text
[excited] Picture this: a school project, but the clients are UEFA and Amazon. [sarcastic] No pressure, right?
The goal — encourage more young women to become football coaches.
Our team of eight built a whole campaign called Tomorrow's Football: a website, a social media push, and an interactive animated series.
And the series? [proud] That one was my baby.
It's called 'Coach like a women', following a young woman who becomes the coach of her little sister's football team.
Here's the twist: each episode is partly written by the audience.
We actually interview a real person about what they'd like to see, then bring it to life.
[playful] Oh, and I drew the whole thing by hand. Yes, really.
I used a little AI to help design the characters, but then came two solid weeks of nothing but drawing — for what ends up being a very short burst of video.
Long? [sighs] Absolutely. And the funny part: today's AI could probably crank that out in about ten minutes.
[amazed] Ten minutes! A little humbling, a little wild. [warm] But hand-drawn, it has a soul — and I wouldn't trade that.
```

---

## Project 35 — Password Managers VS BEC Attacks (Master thesis)

```text
[cheerful] Alright, put on your lab coat — we're doing science.
My master's thesis asked a sneaky question: [curious] can we make password managers a little more… alert?
See, password managers are so smooth that we stop paying attention to where we're actually logging in.
[wry] Which is exactly what scammers love.
So I added friendly friction — tiny challenges, a bit like captchas — right before a password appears, hoping people would slow down and catch the fake login attempts.
I ran an experiment: twenty-four brave participants, ten emails, three of them sneaky attacks.
Group A got the normal password manager; group B got my extra friction.
And the result? [pause] Plot twist: the friction didn't significantly help people spot the attacks.
[sighs] Not the triumphant ending I'd dreamed of, I'll admit.
[sincere] But that's the honest, slightly chilly reality of research — and I learned an enormous amount, so nothing was wasted.
The hardest part? As observers, we weren't allowed to react. [whispers] Poker faces only.
[warm] But the best part came after: talking with each participant and finally understanding how their mind worked.
Because sometimes the real discovery isn't in the data — it's in the conversation.
```

---

## Project 36 — MyHouzly: family finance & household app

```text
[cheerful] Okay, gather round the kitchen table — this one's for the whole family.
Meet MyHouzly: a full-stack app that turns running a household into something that actually… [playful] works.
The big idea? Help parents teach kids about money, [sarcastic] without the weekly "where did your allowance go" interrogation.
Every child gets their own account. Allowance lands automatically each week — no more digging for coins.
Chores pay out in real money or points, so suddenly emptying the dishwasher has… [amused] stakes.
Kids can set savings goals that even earn interest, and teens get a supervised stock portfolio — a gentle first taste of investing, with a grown-up watching the wheel.
Parents stay firmly in charge: approving chores, sharing permissions between co-parents, and switching on whatever household modules they need — meal planning, laundry rotation, shared shopping lists.
[proud] And behind the scenes, I built a proper full-stack beast: one TypeScript codebase feeding both a React website and a React Native mobile app, a single Express, Prisma and PostgreSQL API, real subscription billing, push notifications, and privacy handling that keeps everything GDPR-friendly.
Oh, and the interface grows up with the child — the same app makes sense for a curious six-year-old and a savvy sixteen-year-old.
[warm] From pocket money to portfolios, all in one tidy place.
```

---

## How to put the MP3 into the site

1. Generate and download the MP3 from ElevenLabs (see settings above).
2. Host it somewhere public. Easiest: drop it into your existing
   `elodiepe.github.io/portfolio-images` repo, so the URL looks like
   `https://elodiepe.github.io/portfolio-images/story-01-vaudsentiers.mp3`.
3. Add the URL as an `audio` field for that project. You can put it in EITHER
   place — the player checks both:

   - in `src/data/stories.js` (next to the script), or
   - directly in `src/assets/projects.json` on that project (this is what was
     done for Unmatched: `"audio": "https://…/unmatched_audio.wav"`).

   ```js
   // src/data/stories.js
   1: {
     audio: "https://elodiepe.github.io/portfolio-images/story-01-vaudsentiers.mp3",
     script: "Bonjour, and welcome! ...",   // leave the clean script as-is
   },
   ```

4. Rebuild / redeploy. The player now uses your ElevenLabs voice with a
   progress bar, and keeps the transcript under "Show transcript" as captions.
   If no `audio` is set, it falls back to the free browser voice.
