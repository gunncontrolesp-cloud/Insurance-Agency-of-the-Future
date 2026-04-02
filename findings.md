# findings.md — BLAST Hero Page Design Brief

## Goal
A cinematic, full-viewport hero page inspired by deep-space warp travel — using the BLAST design framework to deliver maximum visual impact.

## Vibe
- Cinematic, sci-fi, editorial
- Dark luxury — deep black with electric blue and amber gold accents
- Motion-forward: everything moves, flows, or pulses
- Magazine-quality type paired with particle physics

## BLAST Framework
- **B**old — Oversized headline, dramatic contrast, no visual timidity
- **L**uminous — Glowing particles, radiant light rays, bloom effects
- **A**nimated — Particle streams, warp light beams, scroll fade-ins, floating elements
- **S**patial — Layered depth with parallax-like CSS transforms, z-index depth staging
- **T**ypographic — Serif display headline + mono/sans supporting text, tight tracking

## Colors
- Background: `#020408` (near-black, space void)
- Primary text: `#F0EDE8` (warm off-white)
- Accent 1: `#3B82F6` → `#60A5FA` (electric blue — particle streams)
- Accent 2: `#F59E0B` → `#FCD34D` (amber gold — light rays)
- Glow: rgba(59, 130, 246, 0.3) for halos

## Sections
1. **Hero** — Full viewport, animated particle canvas, golden light beams, bold headline, subtext, CTA
2. **Nav** — Minimal floating nav overlay (logo left, links right)
3. **Footer** — Simple one-liner

## CTA
- Primary: "Enter the Void" — ghost button with electric blue border + glow on hover
- Secondary: "Learn More" — text link with underline animation

## Constraints
- Single page, no routing
- All animation via CSS keyframes + requestAnimationFrame canvas
- No external animation libraries — pure CSS + vanilla JS canvas
- Mobile-first responsive
- Must feel like looking out a warp-speed spacecraft window
