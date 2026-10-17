Sprout 2.0 — Inclusive Micro-Investing Platform

This repository contains the complete frontend code and interactive prototype for Sprout 2.0, a mobile-first investing platform designed for first-time investors in India starting from ₹100.   

How to Run Locally
Ensure all four files (index.html, styles.css, i1.js, and app.js) are saved in the exact same directory.
Open index.html directly in any modern web browser (Chrome, Safari, Edge, Firefox), or launch it via a local development tool like VS Code Live Server.

How the Design Solves the Brief & Stakeholder Conflicts
This implementation resolves competing stakeholder mandates and addresses key user drop-off bottlenecks identified in the product brief:
CEO vs. Marketing (The Mascot Conflict): To address executive concerns regarding financial trustworthiness without sacrificing Marketing's engagement goals, we introduced "Ankur" (The Geometric Seed)—an abstract, Apple-inspired minimal SVG botanical symbol styled with clean CSS gradients and golden-ratio geometry. It evolves progressively across the 5 onboarding screens, giving Marketing a memorable visual hook while preserving professional credibility. 
Engineering & Performance Constraints: Built entirely with native web technologies, system fonts, and pure CSS keyframe animations (< 100 KB). Total page weight remains under 25 KB (well below the 1.5 MB limit), guaranteeing instant rendering on budget devices under ₹10,000.
Compliance Officer Mandate: A sticky compliance bar locked to the bottom of the viewport displays the mandatory SEBI risk disclaimer in high-contrast text (>= 12px), visible without scrolling. All copy strictly avoids restricted terms such as "safe", "guaranteed", or "risk-free".  
Customer Support Fixes (62% KYC Drop-Off):
Screen 2 acts as a 60-Second Document Checklist, instructing users to keep their PAN Card and Aadhaar-linked mobile ready before initiating the verification flow, preventing mid-way drop-offs. 
Screen 4 replaces static loading spinners with an active, step-by-step live heartbeat tracker so users on fluctuating 4G networks never mistakenly assume the app has crashed.  
Accessibility & Localization: Includes a live English / हिन्दी (Hindi) toggle that dynamically swaps strings without layout breaking, alongside 48px minimum tap targets (surpassing WCAG AA guidelines).   
