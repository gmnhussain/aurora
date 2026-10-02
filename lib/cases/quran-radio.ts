import type { CaseStudy } from "./types";

export const quranRadio: CaseStudy = {
  live: "https://play.google.com/store/apps/details?id=com.deeniinfotech.quran.radio",
  role: "Frontend developer",
  org: "Deeni Info Tech",
  platform: "Mobile, 2022",
  stack: "JavaScript, React, Node.js, Express, MongoDB",
  tags: ["Mobile", "Audio", "JavaScript", "React", "Node.js", "Express", "MongoDB"],
  summary:
    "Quran Radio is a dedicated mobile app offering a rich audio experience of Al Quran recitations. With recitations from various renowned qaris, the app provides users with a convenient and immersive way to listen to the divine verses of the Quran.",
  objective:
    "Ship a mobile listening experience for Quranic recitations — browse renowned qaris, play audio smoothly, and keep the catalog served from a lightweight Node/Express API and MongoDB store.",
  tasks: [
    "Frontend development of the React mobile client for browsing and playing recitations",
    "Audio playback UX for continuous listening across surahs and qaris",
    "Integration with the Node.js / Express API for catalog and metadata",
    "Working against MongoDB-backed content for qaris, recitations and related media",
  ],
  features: [
    ["Qari catalog", "Browse recitations from various renowned qaris."],
    ["Audio listening", "Immersive playback for continuous Quranic listening."],
    ["Mobile client", "React frontend tuned for phone-sized audio UX."],
    ["API-backed catalog", "Node.js / Express + MongoDB for recitation content and metadata."],
  ],
  arch: [
    [
      "React mobile app",
      "Audio · catalog UI",
      "Client for browsing qaris and playing recitations with a phone-first audio UX.",
    ],
    [
      "Express API",
      "Node.js",
      "Serves catalog and metadata to the mobile client over REST.",
    ],
    [
      "MongoDB",
      "Recitations · media",
      "Stores qaris, recitation records and related media metadata.",
    ],
  ],
  archCaption:
    "The React mobile client talks to a Node.js / Express API, which reads qari and recitation metadata from MongoDB so listeners can browse and play without a heavy native stack.",
  gallery: [
    "audio-mode",
    "live-radio-mode",
    "reciters",
    "radio-channels",
  ].map((n) => `/img/projects/quran-radio/${n}-16x10.webp`),
};
