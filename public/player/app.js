(() => {
  "use strict";

  const app = document.getElementById("app");
  const toastRegion = document.getElementById("toast-region");
  const localAudio = document.getElementById("localAudio");
  const STORAGE_KEY = "singeetam-state-v1";

  const icons = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    library: '<path d="M4 19V5"/><path d="M8 19V5"/><path d="m12 19-1-14"/><path d="m18 19-4-13"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    arrowLeft: '<path d="m15 18-6-6 6-6"/>',
    arrowRight: '<path d="m9 18 6-6-6-6"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    play: '<path class="fill" d="M8 5v14l11-7z"/>',
    pause: '<path class="fill" d="M7 5h4v14H7z"/><path class="fill" d="M13 5h4v14h-4z"/>',
    skipBack: '<path class="fill" d="M11 12 20 5v14z"/><path d="M4 5v14"/>',
    skipForward: '<path class="fill" d="m13 12-9 7V5z"/><path d="M20 5v14"/>',
    shuffle: '<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    repeatOne: '<path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/><path d="M12 10v5"/><path d="M10.5 11.5 12 10l1.5 1.5"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    more: '<circle class="fill" cx="5" cy="12" r="1.6"/><circle class="fill" cx="12" cy="12" r="1.6"/><circle class="fill" cx="19" cy="12" r="1.6"/>',
    volume: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    mute: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',
    queue: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
    lyrics: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h9"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
    devices: '<rect x="3" y="5" width="14" height="10" rx="2"/><path d="M7 19h6"/><path d="M10 15v4"/><path d="M20 8v8"/><path d="M22 10v4"/>',
    settings: '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1A1.7 1.7 0 0 0 10 3.2V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    radio: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4"/><path d="M7.8 16.2a6 6 0 0 1 0-8.4"/><path d="M19 5a10 10 0 0 1 0 14"/><path d="M5 19A10 10 0 0 1 5 5"/>',
    mic: '<path d="M12 14a4 4 0 0 0 4-4V5a4 4 0 0 0-8 0v5a4 4 0 0 0 4 4z"/><path d="M19 10a7 7 0 0 1-14 0"/><path d="M12 17v4"/><path d="M8 21h8"/>',
    video: '<path d="M15 10 21 7v10l-6-3z"/><rect x="3" y="6" width="12" height="12" rx="2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    album: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/>',
    podcast: '<circle cx="12" cy="11" r="3"/><path d="M17 11a5 5 0 1 0-10 0"/><path d="M19 11a7 7 0 1 0-14 0"/><path d="M12 14v7"/><path d="m9 18 3 3 3-3"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    check: '<path d="m20 6-11 11-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
    sparkles: '<path d="M12 3 9.7 8.3 4 10.5l5.7 2.2L12 18l2.3-5.3 5.7-2.2-5.7-2.2z"/><path d="M19 16v5"/><path d="M21.5 18.5h-5"/>',
    sliders: '<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    folder: '<path d="M3 7h6l2 2h10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    chevronUp: '<path d="m18 15-6-6-6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
  };

  const icon = (name, extra = "") =>
    `<svg class="icon ${extra}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.music}</svg>`;

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const duration = (minutes, seconds) => minutes * 60 + seconds;

  const formatTime = (value) => {
    const safe = Math.max(0, Math.floor(Number(value) || 0));
    const minutes = Math.floor(safe / 60);
    const seconds = String(safe % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const initials = (name) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  const lyricSet = (theme) => [
    { time: 0, text: `${theme} starts with a low light on the floor` },
    { time: 18, text: "We move through the city like a hidden chorus" },
    { time: 42, text: "Every turn becomes a rhythm we can follow" },
    { time: 68, text: "Hold the signal, let the night unfold" },
    { time: 94, text: "The room comes alive when the bassline answers" },
    { time: 126, text: "No static in the heart, just motion" },
    { time: 158, text: "Turn it up until the skyline hears us" },
    { time: 194, text: "Fade out slow, but keep the feeling close" },
  ];

  const tracks = [
    {
      id: "t1",
      title: "Neon Harbor",
      artist: "Mira Vale",
      artistId: "ar1",
      album: "City Lights",
      albumId: "al1",
      duration: duration(3, 41),
      cover: "cover-a",
      genre: "Pop",
      year: 2026,
      explicit: false,
      hasVideo: true,
      lyrics: lyricSet("Neon Harbor"),
    },
    {
      id: "t2",
      title: "Glass Elevator",
      artist: "Mira Vale",
      artistId: "ar1",
      album: "City Lights",
      albumId: "al1",
      duration: duration(4, 5),
      cover: "cover-b",
      genre: "Pop",
      year: 2026,
      explicit: false,
      hasVideo: false,
      lyrics: lyricSet("Glass Elevator"),
    },
    {
      id: "t3",
      title: "Late Checkout",
      artist: "The Satellites",
      artistId: "ar2",
      album: "Rooftop Static",
      albumId: "al2",
      duration: duration(2, 58),
      cover: "cover-c",
      genre: "Indie",
      year: 2025,
      explicit: false,
      hasVideo: true,
      lyrics: lyricSet("Late Checkout"),
    },
    {
      id: "t4",
      title: "Rooftop Static",
      artist: "The Satellites",
      artistId: "ar2",
      album: "Rooftop Static",
      albumId: "al2",
      duration: duration(3, 28),
      cover: "cover-d",
      genre: "Indie",
      year: 2025,
      explicit: true,
      hasVideo: false,
      lyrics: lyricSet("Rooftop Static"),
    },
    {
      id: "t5",
      title: "Soft Launch",
      artist: "Ada North",
      artistId: "ar3",
      album: "Quiet Engines",
      albumId: "al3",
      duration: duration(3, 19),
      cover: "cover-e",
      genre: "Electronic",
      year: 2026,
      explicit: false,
      hasVideo: true,
      lyrics: lyricSet("Soft Launch"),
    },
    {
      id: "t6",
      title: "Quiet Engines",
      artist: "Ada North",
      artistId: "ar3",
      album: "Quiet Engines",
      albumId: "al3",
      duration: duration(5, 2),
      cover: "cover-f",
      genre: "Electronic",
      year: 2026,
      explicit: false,
      hasVideo: false,
      lyrics: lyricSet("Quiet Engines"),
    },
    {
      id: "t7",
      title: "Golden Hour Commute",
      artist: "Kairo Sun",
      artistId: "ar4",
      album: "Windows Down",
      albumId: "al4",
      duration: duration(3, 34),
      cover: "cover-g",
      genre: "R&B",
      year: 2024,
      explicit: false,
      hasVideo: true,
      lyrics: lyricSet("Golden Hour Commute"),
    },
    {
      id: "t8",
      title: "Windows Down",
      artist: "Kairo Sun",
      artistId: "ar4",
      album: "Windows Down",
      albumId: "al4",
      duration: duration(4, 11),
      cover: "cover-h",
      genre: "R&B",
      year: 2024,
      explicit: false,
      hasVideo: false,
      lyrics: lyricSet("Windows Down"),
    },
    {
      id: "t9",
      title: "Index of Rain",
      artist: "North Terminal",
      artistId: "ar5",
      album: "Night Platform",
      albumId: "al5",
      duration: duration(2, 47),
      cover: "cover-i",
      genre: "Ambient",
      year: 2026,
      explicit: false,
      hasVideo: false,
      lyrics: lyricSet("Index of Rain"),
    },
    {
      id: "t10",
      title: "Night Platform",
      artist: "North Terminal",
      artistId: "ar5",
      album: "Night Platform",
      albumId: "al5",
      duration: duration(6, 12),
      cover: "cover-j",
      genre: "Ambient",
      year: 2026,
      explicit: false,
      hasVideo: true,
      lyrics: lyricSet("Night Platform"),
    },
    {
      id: "t11",
      title: "Pocket Universe",
      artist: "June Method",
      artistId: "ar6",
      album: "Signal Bloom",
      albumId: "al6",
      duration: duration(3, 3),
      cover: "cover-k",
      genre: "Alternative",
      year: 2025,
      explicit: true,
      hasVideo: true,
      lyrics: lyricSet("Pocket Universe"),
    },
    {
      id: "t12",
      title: "Signal Bloom",
      artist: "June Method",
      artistId: "ar6",
      album: "Signal Bloom",
      albumId: "al6",
      duration: duration(4, 44),
      cover: "cover-l",
      genre: "Alternative",
      year: 2025,
      explicit: false,
      hasVideo: false,
      lyrics: lyricSet("Signal Bloom"),
    },
    {
      id: "t13",
      title: "Green Room",
      artist: "Mira Vale",
      artistId: "ar1",
      album: "Afterparty Notes",
      albumId: "al7",
      duration: duration(3, 16),
      cover: "cover-c",
      genre: "Dance",
      year: 2026,
      explicit: false,
      hasVideo: true,
      lyrics: lyricSet("Green Room"),
    },
    {
      id: "t14",
      title: "Metro Flowers",
      artist: "Ada North",
      artistId: "ar3",
      album: "Afterparty Notes",
      albumId: "al7",
      duration: duration(3, 53),
      cover: "cover-d",
      genre: "Dance",
      year: 2026,
      explicit: false,
      hasVideo: false,
      lyrics: lyricSet("Metro Flowers"),
    },
    {
      id: "t15",
      title: "Left on Read",
      artist: "The Satellites",
      artistId: "ar2",
      album: "Afterparty Notes",
      albumId: "al7",
      duration: duration(2, 51),
      cover: "cover-e",
      genre: "Dance",
      year: 2026,
      explicit: true,
      hasVideo: true,
      lyrics: lyricSet("Left on Read"),
    },
    {
      id: "t16",
      title: "Open Tab",
      artist: "Kairo Sun",
      artistId: "ar4",
      album: "Afterparty Notes",
      albumId: "al7",
      duration: duration(3, 25),
      cover: "cover-f",
      genre: "Dance",
      year: 2026,
      explicit: false,
      hasVideo: false,
      lyrics: lyricSet("Open Tab"),
    },
    {
      id: "t17",
      title: "Small Talk Supernova",
      artist: "June Method",
      artistId: "ar6",
      album: "Afterparty Notes",
      albumId: "al7",
      duration: duration(3, 7),
      cover: "cover-g",
      genre: "Dance",
      year: 2026,
      explicit: false,
      hasVideo: true,
      lyrics: lyricSet("Small Talk Supernova"),
    },
    {
      id: "t18",
      title: "Twelve Floors Up",
      artist: "North Terminal",
      artistId: "ar5",
      album: "Afterparty Notes",
      albumId: "al7",
      duration: duration(5, 29),
      cover: "cover-h",
      genre: "Dance",
      year: 2026,
      explicit: false,
      hasVideo: false,
      lyrics: lyricSet("Twelve Floors Up"),
    },
  ];

  const artists = [
    {
      id: "ar1",
      name: "Mira Vale",
      cover: "cover-a",
      listeners: "4,982,203",
      verified: true,
      bio: "Mira Vale makes bright pop for night drives, half remembered parties, and brave walks home.",
      trackIds: ["t1", "t2", "t13"],
    },
    {
      id: "ar2",
      name: "The Satellites",
      cover: "cover-c",
      listeners: "2,114,940",
      verified: true,
      bio: "A sharp indie band with clean hooks, restless drums, and songs that feel built for the last train.",
      trackIds: ["t3", "t4", "t15"],
    },
    {
      id: "ar3",
      name: "Ada North",
      cover: "cover-e",
      listeners: "1,803,876",
      verified: false,
      bio: "Ada North turns soft electronics into widescreen motion, balancing detail with pulse.",
      trackIds: ["t5", "t6", "t14"],
    },
    {
      id: "ar4",
      name: "Kairo Sun",
      cover: "cover-g",
      listeners: "3,341,589",
      verified: true,
      bio: "Warm R&B, open-window basslines, and vocals that land with a little grin.",
      trackIds: ["t7", "t8", "t16"],
    },
    {
      id: "ar5",
      name: "North Terminal",
      cover: "cover-i",
      listeners: "832,412",
      verified: false,
      bio: "Ambient work for commuters, coders, and anyone who likes a skyline with rain in it.",
      trackIds: ["t9", "t10", "t18"],
    },
    {
      id: "ar6",
      name: "June Method",
      cover: "cover-k",
      listeners: "1,552,038",
      verified: true,
      bio: "Alternative pop with dry wit, big choruses, and the occasional beautifully strange synth.",
      trackIds: ["t11", "t12", "t17"],
    },
  ];

  const albums = [
    {
      id: "al1",
      name: "City Lights",
      artist: "Mira Vale",
      cover: "cover-a",
      year: 2026,
      type: "Album",
      trackIds: ["t1", "t2", "t13"],
    },
    {
      id: "al2",
      name: "Rooftop Static",
      artist: "The Satellites",
      cover: "cover-c",
      year: 2025,
      type: "Album",
      trackIds: ["t3", "t4", "t15"],
    },
    {
      id: "al3",
      name: "Quiet Engines",
      artist: "Ada North",
      cover: "cover-e",
      year: 2026,
      type: "Album",
      trackIds: ["t5", "t6", "t14"],
    },
    {
      id: "al4",
      name: "Windows Down",
      artist: "Kairo Sun",
      cover: "cover-g",
      year: 2024,
      type: "Album",
      trackIds: ["t7", "t8", "t16"],
    },
    {
      id: "al5",
      name: "Night Platform",
      artist: "North Terminal",
      cover: "cover-i",
      year: 2026,
      type: "Album",
      trackIds: ["t9", "t10", "t18"],
    },
    {
      id: "al6",
      name: "Signal Bloom",
      artist: "June Method",
      cover: "cover-k",
      year: 2025,
      type: "Album",
      trackIds: ["t11", "t12", "t17"],
    },
    {
      id: "al7",
      name: "Afterparty Notes",
      artist: "Various Artists",
      cover: "cover-d",
      year: 2026,
      type: "Compilation",
      trackIds: ["t13", "t14", "t15", "t16", "t17", "t18"],
    },
  ];

  const playlists = [
    {
      id: "p1",
      name: "Today Top Hits",
      owner: "Singeetam",
      description: "The brightest songs in your orbit, refreshed for a long web player session.",
      cover: "cover-a",
      pinned: true,
      public: true,
      collaborative: false,
      downloaded: false,
      trackIds: ["t1", "t7", "t11", "t3", "t5", "t13", "t17", "t15"],
    },
    {
      id: "p2",
      name: "Discover Weekly",
      owner: "Singeetam",
      description: "A personalized mixtape of new music and familiar corners.",
      cover: "cover-b",
      pinned: false,
      public: true,
      collaborative: false,
      downloaded: false,
      trackIds: ["t9", "t2", "t12", "t4", "t16", "t6", "t8"],
    },
    {
      id: "p3",
      name: "Release Radar",
      owner: "Singeetam",
      description: "New releases from artists you follow and artists you might like.",
      cover: "cover-c",
      pinned: false,
      public: true,
      collaborative: false,
      downloaded: false,
      trackIds: ["t13", "t14", "t15", "t16", "t17", "t18"],
    },
    {
      id: "p4",
      name: "Focus Flow",
      owner: "Singeetam",
      description: "Steady electronic and ambient tracks for getting real work done.",
      cover: "cover-i",
      pinned: true,
      public: false,
      collaborative: false,
      downloaded: true,
      trackIds: ["t5", "t6", "t9", "t10", "t18"],
    },
    {
      id: "p5",
      name: "Car Karaoke",
      owner: "You",
      description: "Big hooks, open windows, and songs that know exactly when to lift.",
      cover: "cover-j",
      pinned: false,
      public: false,
      collaborative: true,
      downloaded: false,
      trackIds: ["t7", "t8", "t1", "t11", "t16"],
    },
    {
      id: "p6",
      name: "Daily Mix 01",
      owner: "Singeetam",
      description: "Mira Vale, Kairo Sun, June Method, and related songs.",
      cover: "cover-l",
      pinned: false,
      public: true,
      collaborative: false,
      downloaded: false,
      trackIds: ["t1", "t2", "t7", "t8", "t11", "t12"],
    },
  ];

  const podcasts = [
    {
      id: "pod1",
      name: "Productive Noise",
      host: "Harper Lane",
      cover: "cover-f",
      description: "A weekly show about focus, taste, software, and making things with less drama.",
      episodes: [
        {
          id: "ep1",
          title: "How Playlists Shape Your Day",
          duration: duration(42, 12),
          date: "Aug 26",
          description: "Harper talks to curators about mood, memory, and discovery systems.",
        },
        {
          id: "ep2",
          title: "A Better Queue",
          duration: duration(36, 47),
          date: "Aug 19",
          description: "Why small controls like queue order can make or break a listening flow.",
        },
      ],
    },
    {
      id: "pod2",
      name: "The Mix Room",
      host: "Nico Reyes",
      cover: "cover-h",
      description: "Artists break down arrangement choices, hooks, lyrics, and studio rituals.",
      episodes: [
        {
          id: "ep3",
          title: "Synths Without Clutter",
          duration: duration(51, 5),
          date: "Aug 21",
          description: "Ada North explains the layers behind Quiet Engines.",
        },
      ],
    },
  ];

  const audiobooks = [
    {
      id: "book1",
      name: "The Long Shortcut",
      author: "Iris Dean",
      cover: "cover-k",
      description: "A compact audiobook about creativity, patience, and choosing the next right step.",
      chapters: 18,
      length: "7 hr 18 min",
    },
    {
      id: "book2",
      name: "Night City Atlas",
      author: "Cole Mercer",
      cover: "cover-d",
      description: "A mystery told through maps, voice notes, and one suspiciously good playlist.",
      chapters: 31,
      length: "11 hr 6 min",
    },
    {
      id: "book3",
      name: "Tiny Systems",
      author: "Maya Shell",
      cover: "cover-e",
      description: "Useful systems for home, work, and the little routines that hold a day together.",
      chapters: 22,
      length: "8 hr 44 min",
    },
  ];

  const browseCategories = [
    { name: "Made For You", cover: "cover-a", query: "mix" },
    { name: "New Releases", cover: "cover-b", query: "2026" },
    { name: "Pop", cover: "cover-c", query: "Pop" },
    { name: "Indie", cover: "cover-d", query: "Indie" },
    { name: "Electronic", cover: "cover-e", query: "Electronic" },
    { name: "R&B", cover: "cover-g", query: "R&B" },
    { name: "Ambient", cover: "cover-i", query: "Ambient" },
    { name: "Podcasts", cover: "cover-h", query: "podcast" },
    { name: "Audiobooks", cover: "cover-k", query: "audiobook" },
    { name: "Live Events", cover: "cover-j", query: "tour" },
    { name: "Charts", cover: "cover-l", query: "top" },
    { name: "Mood", cover: "cover-f", query: "focus" },
  ];

  const devices = [
    { id: "web", name: "This web player", detail: "Chrome on Windows", type: "Browser" },
    { id: "desk", name: "Desk Speakers", detail: "Singeetam Connect ready", type: "Speaker" },
    { id: "phone", name: "Alex's Phone", detail: "Nearby device", type: "Mobile" },
    { id: "tv", name: "Living Room TV", detail: "Video supported", type: "TV" },
  ];

  const friends = [
    { name: "Ari", trackId: "t5", when: "2 min ago" },
    { name: "Sam", trackId: "t11", when: "18 min ago" },
    { name: "Noor", trackId: "t7", when: "1 hr ago" },
    { name: "Vik", trackId: "t10", when: "Yesterday" },
  ];

  const seedUserPlaylists = [
    {
      id: "up1",
      name: "Liked Road Trip",
      owner: "You",
      description: "A personal playlist built inside this clone.",
      cover: "cover-g",
      pinned: false,
      public: false,
      collaborative: true,
      downloaded: false,
      trackIds: ["t1", "t7", "t8", "t16"],
    },
  ];

  const state = {
    view: "home",
    selectedId: null,
    history: [{ view: "home", id: null }],
    historyIndex: 0,
    mainSearch: "",
    librarySearch: "",
    libraryFilter: "all",
    playingId: "t1",
    isPlaying: false,
    elapsed: 38,
    volume: 72,
    muted: false,
    shuffleMode: 0,
    repeatMode: 0,
    currentContext: "p1",
    queue: ["t7", "t11", "t3", "t5", "t13"],
    playedStack: [],
    liked: new Set(["t1", "t5", "t7", "t11", "t13"]),
    savedCollections: new Set(["p1", "p2", "p4", "al1", "al3", "ar1", "ar4", "pod1", "book1"]),
    hiddenTracks: new Set(),
    downloaded: new Set(["p4"]),
    excludedTaste: new Set(),
    userPlaylists: seedUserPlaylists.map((item) => ({ ...item, trackIds: [...item.trackIds] })),
    localTracks: [],
    rightPanel: "now",
    activeDevice: "web",
    videoMode: false,
    modal: null,
    contextMenu: null,
    dragQueueIndex: null,
    sortMode: "custom",
    settings: {
      autoplay: true,
      gapless: true,
      normalize: true,
      showFriendActivity: true,
      privateSession: false,
      offlineMode: false,
      smartShuffle: true,
      lossless: false,
      lyrics: true,
      crossfade: 4,
      videoAutoplay: false,
      downloadOnSave: false,
    },
  };

  const allPlaylists = () => [...playlists, ...state.userPlaylists];
  const allTracks = () => [...tracks, ...state.localTracks];
  const findTrack = (id) => allTracks().find((track) => track.id === id) || tracks[0];
  const findArtist = (id) => artists.find((artist) => artist.id === id);
  const findAlbum = (id) => albums.find((album) => album.id === id);
  const findPlaylist = (id) => allPlaylists().find((playlist) => playlist.id === id);
  const findPodcast = (id) => podcasts.find((podcast) => podcast.id === id);
  const findAudiobook = (id) => audiobooks.find((book) => book.id === id);
  const currentTrack = () => findTrack(state.playingId);

  const getContextTrackIds = (contextId) => {
    if (!contextId) return [];
    if (contextId === "liked") return allTracks().filter((track) => state.liked.has(track.id)).map((track) => track.id);
    if (contextId === "local") return state.localTracks.map((track) => track.id);
    const playlist = findPlaylist(contextId);
    if (playlist) return [...playlist.trackIds];
    const album = findAlbum(contextId);
    if (album) return [...album.trackIds];
    const artist = findArtist(contextId);
    if (artist) return [...artist.trackIds];
    return [];
  };

  const collectionById = (id) => {
    if (id === "liked") {
      return {
        id: "liked",
        type: "Playlist",
        name: "Liked Songs",
        owner: "You",
        cover: "cover-b",
        description: "Every song you have saved in this web clone.",
        trackIds: getContextTrackIds("liked"),
      };
    }
    if (id === "local") {
      return {
        id: "local",
        type: "Local Files",
        name: "Local Files",
        owner: "This browser",
        cover: "cover-i",
        description: "Audio files added from this device.",
        trackIds: getContextTrackIds("local"),
      };
    }
    return findPlaylist(id) || findAlbum(id) || findArtist(id) || findPodcast(id) || findAudiobook(id);
  };

  const totalDuration = (ids) => ids.reduce((sum, id) => sum + (findTrack(id)?.duration || 0), 0);

  const saveState = () => {
    const payload = {
      view: state.view,
      selectedId: state.selectedId,
      mainSearch: state.mainSearch,
      libraryFilter: state.libraryFilter,
      playingId: state.playingId,
      elapsed: state.elapsed,
      volume: state.volume,
      muted: state.muted,
      shuffleMode: state.shuffleMode,
      repeatMode: state.repeatMode,
      currentContext: state.currentContext,
      queue: state.queue,
      liked: [...state.liked],
      savedCollections: [...state.savedCollections],
      hiddenTracks: [...state.hiddenTracks],
      downloaded: [...state.downloaded],
      excludedTaste: [...state.excludedTaste],
      userPlaylists: state.userPlaylists,
      settings: state.settings,
      activeDevice: state.activeDevice,
      rightPanel: state.rightPanel,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* Local files or private windows may block storage. The app still works. */
    }
  };

  const hydrateState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      Object.assign(state, {
        view: saved.view || state.view,
        selectedId: saved.selectedId || state.selectedId,
        mainSearch: saved.mainSearch || "",
        libraryFilter: saved.libraryFilter || "all",
        playingId: saved.playingId || state.playingId,
        elapsed: Number(saved.elapsed) || 0,
        volume: Number(saved.volume) || state.volume,
        muted: Boolean(saved.muted),
        shuffleMode: Number(saved.shuffleMode) || 0,
        repeatMode: Number(saved.repeatMode) || 0,
        currentContext: saved.currentContext || state.currentContext,
        queue: Array.isArray(saved.queue) ? saved.queue : state.queue,
        userPlaylists: Array.isArray(saved.userPlaylists) ? saved.userPlaylists : state.userPlaylists,
        settings: { ...state.settings, ...(saved.settings || {}) },
        activeDevice: saved.activeDevice || state.activeDevice,
        rightPanel: saved.rightPanel || state.rightPanel,
      });
      state.liked = new Set(saved.liked || [...state.liked]);
      state.savedCollections = new Set(saved.savedCollections || [...state.savedCollections]);
      state.hiddenTracks = new Set(saved.hiddenTracks || []);
      state.downloaded = new Set(saved.downloaded || [...state.downloaded]);
      state.excludedTaste = new Set(saved.excludedTaste || []);
    } catch {
      showToast("Saved app state could not be loaded, so a fresh session started.");
    }
  };

  const captureFocus = () => {
    const element = document.activeElement;
    if (!element || !element.dataset || !element.dataset.field) return null;
    return {
      field: element.dataset.field,
      start: element.selectionStart,
      end: element.selectionEnd,
    };
  };

  const restoreFocus = (snapshot) => {
    if (!snapshot) return;
    const next = app.querySelector(`[data-field="${snapshot.field}"]`);
    if (!next) return;
    next.focus({ preventScroll: true });
    if (typeof next.setSelectionRange === "function") {
      next.setSelectionRange(snapshot.start || 0, snapshot.end || snapshot.start || 0);
    }
  };

  const cover = (item, size = "", label = "") => {
    const name = label || item.name || item.title || item.album || "Music";
    return `<div class="cover ${size} ${item.cover || "cover-a"}"><span class="cover-label">${escapeHtml(initials(name))}</span></div>`;
  };

  const playingWave = () => '<span class="playing-wave" aria-label="Playing"><i></i><i></i><i></i></span>';

  const filteredVisibleTracks = (ids) =>
    ids
      .map((id) => findTrack(id))
      .filter(Boolean)
      .filter((track) => !state.hiddenTracks.has(track.id));

  const routeIs = (view, id = null) => state.view === view && (id === null || state.selectedId === id);

  const navigate = (view, id = null, push = true, options = {}) => {
    state.view = view;
    state.selectedId = id;
    state.contextMenu = null;
    state.modal = options.keepModal ? state.modal : null;
    if (push) {
      const route = { view, id };
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(route);
      state.historyIndex = state.history.length - 1;
    }
    saveState();
    render({ preserveFocus: options.preserveFocus });
  };

  const navigateHistory = (direction) => {
    const nextIndex = state.historyIndex + direction;
    if (nextIndex < 0 || nextIndex >= state.history.length) return;
    state.historyIndex = nextIndex;
    const route = state.history[nextIndex];
    state.view = route.view;
    state.selectedId = route.id;
    state.contextMenu = null;
    state.modal = null;
    saveState();
    render();
  };

  const showToast = (message) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
    const toast = { id, message };
    state.toastQueue = [...(state.toastQueue || []), toast].slice(-4);
    renderToasts();
    window.setTimeout(() => {
      state.toastQueue = (state.toastQueue || []).filter((item) => item.id !== id);
      renderToasts();
    }, 2600);
  };

  const renderToasts = () => {
    toastRegion.innerHTML = (state.toastQueue || [])
      .map((toast) => `<div class="toast">${escapeHtml(toast.message)}</div>`)
      .join("");
  };

  const render = (options = {}) => {
    const focusSnapshot = options.preserveFocus ? captureFocus() : null;
    app.className = "app-shell";
    app.innerHTML = `
      <aside class="sidebar">${renderSidebar()}</aside>
      <main class="main-view"><div class="main-scroll">${renderTopbar()}${renderMain()}</div></main>
      <aside class="right-rail">${renderRightRail()}</aside>
      ${renderPlayer()}
      ${renderMobileNav()}
      ${renderModal()}
      ${renderContextMenu()}
    `;
    renderToasts();
    restoreFocus(focusSnapshot);
    updatePlaybackUI();
  };

  const renderSidebar = () => `
    <div>
      <div class="brand">
        <img class="brand-mark" src="./logo.png" alt="" aria-hidden="true" />
        <span class="brand-word">Singeetam</span>
      </div>
      <nav class="nav-block" aria-label="Primary">
        ${navButton("home", null, "Home", "home")}
        ${navButton("search", null, "Search", "search")}
        ${navButton("library", null, "Your Library", "library")}
      </nav>
      <div class="library-head">
        <button class="library-title" data-action="navigate" data-view="library">
          ${icon("library")}<span>Your Library</span>
        </button>
        <div class="library-actions">
          <button class="icon-button" title="Create playlist" data-action="open-modal" data-modal="create-playlist">${icon("plus")}</button>
          <button class="icon-button" title="Expand library" data-action="navigate" data-view="library">${icon("arrowRight")}</button>
        </div>
      </div>
      <div class="filter-row" aria-label="Library filters">
        ${libraryFilterButton("all", "All")}
        ${libraryFilterButton("playlists", "Playlists")}
        ${libraryFilterButton("artists", "Artists")}
        ${libraryFilterButton("albums", "Albums")}
        ${libraryFilterButton("podcasts", "Podcasts")}
      </div>
      <div class="library-search">
        <label class="field-wrap">
          ${icon("search")}
          <input class="field with-icon" data-field="library-search" data-input="library-search" value="${escapeHtml(state.librarySearch)}" placeholder="Search your library" />
        </label>
      </div>
    </div>
    <div class="side-scroll">
      ${renderLibraryRows()}
    </div>
    <div class="sidebar-footer">
      <button class="mini-action" data-action="open-modal" data-modal="shortcuts">${icon("settings")} Keyboard shortcuts</button>
      <button class="mini-action" data-action="navigate" data-view="local">${icon("folder")} Local files</button>
      <button class="mini-action" data-action="navigate" data-view="settings">${icon("sliders")} Settings</button>
    </div>
  `;

  const navButton = (view, id, label, iconName) => `
    <button class="nav-link ${routeIs(view, id) ? "active" : ""}" data-action="navigate" data-view="${view}" ${id ? `data-id="${id}"` : ""}>
      ${icon(iconName)}
      <span>${escapeHtml(label)}</span>
    </button>
  `;

  const libraryFilterButton = (filter, label) => `
    <button class="filter-chip ${state.libraryFilter === filter ? "active" : ""}" data-action="set-library-filter" data-filter="${filter}">
      ${escapeHtml(label)}
    </button>
  `;

  const libraryItems = () => {
    const items = [
      {
        id: "liked",
        name: "Liked Songs",
        type: "Playlist",
        owner: "You",
        cover: "cover-b",
        pinned: true,
        trackCount: state.liked.size,
        view: "playlist",
      },
      ...allPlaylists().map((item) => ({ ...item, type: "Playlist", view: "playlist", trackCount: item.trackIds.length })),
      ...artists.map((item) => ({ ...item, type: "Artist", view: "artist" })),
      ...albums.map((item) => ({ ...item, type: item.type || "Album", owner: item.artist, view: "album", trackCount: item.trackIds.length })),
      ...podcasts.map((item) => ({ ...item, type: "Podcast", owner: item.host, view: "podcast" })),
      ...audiobooks.map((item) => ({ ...item, type: "Audiobook", owner: item.author, view: "audiobook" })),
      {
        id: "local",
        name: "Local Files",
        type: "Folder",
        owner: "This browser",
        cover: "cover-i",
        view: "local",
        trackCount: state.localTracks.length,
      },
    ];
    const filteredByType = items.filter((item) => {
      if (state.libraryFilter === "all") return true;
      if (state.libraryFilter === "playlists") return item.type === "Playlist";
      if (state.libraryFilter === "artists") return item.type === "Artist";
      if (state.libraryFilter === "albums") return item.type === "Album" || item.type === "Compilation";
      if (state.libraryFilter === "podcasts") return item.type === "Podcast";
      return true;
    });
    const query = state.librarySearch.trim().toLowerCase();
    return filteredByType
      .filter((item) => !query || `${item.name} ${item.owner || item.artist || item.host || ""}`.toLowerCase().includes(query))
      .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || a.name.localeCompare(b.name));
  };

  const renderLibraryRows = () => {
    const rows = libraryItems();
    if (!rows.length) {
      return `<div class="empty-state"><strong>No matches</strong><span class="subtle">Try another library search or filter.</span></div>`;
    }
    return rows
      .map((item) => {
        const meta = [item.pinned ? "Pinned" : "", item.type, item.owner || item.listeners || "", item.trackCount ? `${item.trackCount} songs` : ""]
          .filter(Boolean)
          .join(" • ");
        return `
          <button class="library-row ${routeIs(item.view, item.id) ? "active" : ""}" data-action="navigate" data-view="${item.view}" data-id="${item.id}">
            ${cover(item, "small")}
            <span>
              <strong>${escapeHtml(item.name)}</strong>
              <span class="library-meta">${escapeHtml(meta)}</span>
            </span>
            ${item.pinned ? '<span class="pin-dot" title="Pinned"></span>' : ""}
          </button>
        `;
      })
      .join("");
  };

  const renderTopbar = () => `
    <header class="topbar">
      <div class="history-controls">
        <button class="icon-button" title="Back" data-action="history" data-direction="-1" ${state.historyIndex <= 0 ? "disabled" : ""}>${icon("arrowLeft")}</button>
        <button class="icon-button" title="Forward" data-action="history" data-direction="1" ${state.historyIndex >= state.history.length - 1 ? "disabled" : ""}>${icon("arrowRight")}</button>
      </div>
      <label class="field-wrap">
        ${icon("search")}
        <input class="field with-icon" data-field="global-search" data-input="global-search" value="${escapeHtml(state.mainSearch)}" placeholder="What do you want to play?" />
      </label>
      <div class="top-actions">
        <button class="ghost-button" data-action="navigate" data-view="premium">${icon("sparkles")}<span>Explore Premium</span></button>
        <button class="pill-button dark" data-action="open-modal" data-modal="install">${icon("download")}<span>Install App</span></button>
        <button class="icon-button" title="Notifications" data-action="open-modal" data-modal="notifications">${icon("bell")}</button>
        <button class="avatar" title="Profile" data-action="open-modal" data-modal="profile">AC</button>
      </div>
    </header>
  `;

  const renderMain = () => {
    if (state.view === "search") return renderSearchView();
    if (state.view === "library") return renderLibraryView();
    if (state.view === "playlist") return renderCollectionView(collectionById(state.selectedId || "p1"));
    if (state.view === "album") return renderAlbumView(findAlbum(state.selectedId || "al1"));
    if (state.view === "artist") return renderArtistView(findArtist(state.selectedId || "ar1"));
    if (state.view === "podcast") return renderPodcastView(findPodcast(state.selectedId || "pod1"));
    if (state.view === "audiobook") return renderAudiobookView(findAudiobook(state.selectedId || "book1"));
    if (state.view === "local") return renderLocalFilesView();
    if (state.view === "settings") return renderSettingsView();
    if (state.view === "premium") return renderPremiumView();
    return renderHomeView();
  };

  const renderHomeView = () => {
    const current = currentTrack();
    const statTracks = allTracks().length;
    const statLists = allPlaylists().length + albums.length + artists.length;
    return `
      <section class="hero-grid">
        <div class="hero-panel">
          ${cover(findPlaylist("p1"), "large")}
          <div class="hero-copy">
            <p class="eyebrow">Good evening</p>
            <h1>Pick up where the music left off</h1>
            <p>Browse mixes, search the catalog, manage your queue, follow artists, open lyrics, connect a device, and tune playback from a single web player clone.</p>
            <div class="inline-actions">
              <button class="primary-button" data-action="play-context" data-id="p1">${icon("play")} Play top hits</button>
              <button class="ghost-button" data-action="open-modal" data-modal="jam">${icon("users")} Start Jam</button>
              <button class="ghost-button" data-action="set-panel" data-panel="lyrics">${icon("lyrics")} Lyrics</button>
            </div>
          </div>
        </div>
        <div class="stats-strip">
          <div class="stat-tile"><span class="stat-label">Now playing</span><strong class="stat-value">${escapeHtml(current.title)}</strong><span class="subtle">${escapeHtml(current.artist)}</span></div>
          <div class="stat-tile"><span class="stat-label">Catalog</span><strong class="stat-value">${statTracks}</strong><span class="subtle">Songs, podcasts, audiobooks, and local file support</span></div>
          <div class="stat-tile"><span class="stat-label">Library surface</span><strong class="stat-value">${statLists}</strong><span class="subtle">Playlists, albums, artists, shows, and books</span></div>
        </div>
      </section>
      <section class="section">
        <div class="section-head"><h2>Recently played</h2><button class="ghost-button" data-action="navigate" data-view="library">Show all</button></div>
        <div class="wide-grid">
          ${quickTile(collectionById("liked"), "playlist", "liked")}
          ${quickTile(findPlaylist("p1"), "playlist", "p1")}
          ${quickTile(findPlaylist("p4"), "playlist", "p4")}
          ${quickTile(findAlbum("al7"), "album", "al7")}
          ${quickTile(findArtist("ar4"), "artist", "ar4")}
          ${quickTile(findPodcast("pod1"), "podcast", "pod1")}
        </div>
      </section>
      <section class="section">
        <div class="section-head"><h2>Made for you</h2><button class="ghost-button" data-action="navigate" data-view="search">Browse all</button></div>
        <div class="card-grid">
          ${mediaCard(findPlaylist("p2"), "playlist")}
          ${mediaCard(findPlaylist("p3"), "playlist")}
          ${mediaCard(findPlaylist("p6"), "playlist")}
          ${mediaCard(findAlbum("al3"), "album")}
          ${mediaCard(findAlbum("al5"), "album")}
          ${mediaCard(findArtist("ar6"), "artist")}
        </div>
      </section>
      <section class="section">
        <div class="section-head"><h2>Everything panel</h2><span class="subtle">Feature shortcuts</span></div>
        <div class="browse-grid">
          ${featureCard("Search Autocomplete", "search", "navigate", "search")}
          ${featureCard("Play Queue", "queue", "set-panel", "queue")}
          ${featureCard("Lyrics", "lyrics", "set-panel", "lyrics")}
          ${featureCard("Singeetam Connect", "devices", "open-modal", "devices")}
          ${featureCard("Music Videos", "video", "toggle-video")}
          ${featureCard("DJ", "radio", "dj")}
          ${featureCard("Local Files", "folder", "navigate", "local")}
          ${featureCard("Equalizer", "sliders", "open-modal", "equalizer")}
          ${featureCard("Private Session", "lock", "toggle-setting", "privateSession")}
          ${featureCard("Offline Mode", "download", "toggle-setting", "offlineMode")}
          ${featureCard("Friend Activity", "users", "set-panel", "friends")}
          ${featureCard("Keyboard Shortcuts", "settings", "open-modal", "shortcuts")}
        </div>
      </section>
    `;
  };

  const quickTile = (item, view, id) => `
    <button class="quick-tile" data-action="navigate" data-view="${view}" data-id="${id}">
      ${cover(item, "small")}
      <span><strong>${escapeHtml(item.name)}</strong><span class="library-meta">${escapeHtml(item.owner || item.artist || item.host || item.type || "")}</span></span>
      <span class="play-fab" data-action="play-context" data-id="${id}">${icon("play")}</span>
    </button>
  `;

  const featureCard = (label, iconName, action, value = "") => {
    const actionAttr =
      action === "navigate"
        ? `data-action="navigate" data-view="${value}"`
        : action === "set-panel"
          ? `data-action="set-panel" data-panel="${value}"`
          : action === "open-modal"
            ? `data-action="open-modal" data-modal="${value}"`
            : action === "toggle-setting"
              ? `data-action="toggle-setting" data-setting="${value}"`
              : `data-action="${action}"`;
    return `<button class="browse-card" ${actionAttr}><strong>${escapeHtml(label)}</strong><span class="icon-button solid-green">${icon(iconName)}</span></button>`;
  };

  const mediaCard = (item, view) => {
    if (!item) return "";
    const subtitle = item.description || item.owner || item.artist || item.host || item.bio || item.type || "";
    return `
      <button class="media-card" data-action="navigate" data-view="${view}" data-id="${item.id}">
        ${cover(item)}
        <span>
          <strong>${escapeHtml(item.name)}</strong>
          <span class="card-meta">${escapeHtml(subtitle)}</span>
        </span>
        <span class="play-fab" data-action="play-context" data-id="${item.id}">${icon("play")}</span>
      </button>
    `;
  };

  const renderSearchView = () => {
    const query = state.mainSearch.trim().toLowerCase();
    if (!query) {
      return `
        <div class="view-head">
          <div><p class="eyebrow">Search</p><h1 class="view-title">Browse all</h1></div>
        </div>
        <div class="browse-grid">
          ${browseCategories
            .map(
              (category) => `
                <button class="browse-card" data-action="search-query" data-query="${escapeHtml(category.query)}">
                  <strong>${escapeHtml(category.name)}</strong>
                  ${cover(category, "small")}
                </button>
              `,
            )
            .join("")}
        </div>
      `;
    }

    const trackMatches = allTracks().filter((track) =>
      `${track.title} ${track.artist} ${track.album} ${track.genre} ${track.year}`.toLowerCase().includes(query),
    );
    const playlistMatches = allPlaylists().filter((playlist) =>
      `${playlist.name} ${playlist.description} ${playlist.owner}`.toLowerCase().includes(query),
    );
    const artistMatches = artists.filter((artist) => `${artist.name} ${artist.bio}`.toLowerCase().includes(query));
    const albumMatches = albums.filter((album) => `${album.name} ${album.artist} ${album.year}`.toLowerCase().includes(query));
    const podcastMatches = podcasts.filter((podcast) => `${podcast.name} ${podcast.host} ${podcast.description}`.toLowerCase().includes(query));
    const bookMatches = audiobooks.filter((book) => `${book.name} ${book.author} ${book.description}`.toLowerCase().includes(query));
    const topResult =
      trackMatches[0] ||
      playlistMatches[0] ||
      artistMatches[0] ||
      albumMatches[0] ||
      podcastMatches[0] ||
      bookMatches[0] ||
      null;

    return `
      <div class="view-head">
        <div><p class="eyebrow">Search</p><h1 class="view-title">Results for ${escapeHtml(state.mainSearch)}</h1></div>
      </div>
      ${
        topResult
          ? `<section class="search-results">
              <div>
                <div class="section-head"><h2>Top result</h2></div>
                ${renderTopResult(topResult)}
              </div>
              <div>
                <div class="section-head"><h2>Songs</h2><button class="ghost-button" data-action="add-all-results">Add all to queue</button></div>
                ${renderTrackTable(trackMatches.slice(0, 8).map((track) => track.id), "search")}
              </div>
            </section>`
          : `<div class="empty-state"><strong>No results found</strong><span class="subtle">Try another artist, song, playlist, podcast, genre, or year.</span></div>`
      }
      <section class="section">
        <div class="section-head"><h2>Playlists</h2></div>
        <div class="card-grid">${playlistMatches.slice(0, 6).map((item) => mediaCard(item, "playlist")).join("") || emptySmall("No playlist matches")}</div>
      </section>
      <section class="section">
        <div class="section-head"><h2>Artists, albums, shows, and books</h2></div>
        <div class="card-grid">
          ${artistMatches.slice(0, 3).map((item) => mediaCard(item, "artist")).join("")}
          ${albumMatches.slice(0, 3).map((item) => mediaCard(item, "album")).join("")}
          ${podcastMatches.slice(0, 2).map((item) => mediaCard(item, "podcast")).join("")}
          ${bookMatches.slice(0, 2).map((item) => mediaCard(item, "audiobook")).join("")}
          ${!artistMatches.length && !albumMatches.length && !podcastMatches.length && !bookMatches.length ? emptySmall("No more matches") : ""}
        </div>
      </section>
    `;
  };

  const renderTopResult = (item) => {
    if (item.title) {
      return `
        <div class="top-result">
          ${cover(item, "large", item.title)}
          <div><strong class="card-title">${escapeHtml(item.title)}</strong><span class="card-meta">Song • ${escapeHtml(item.artist)}</span></div>
          <div class="inline-actions">
            <button class="play-fab" data-action="play-track" data-id="${item.id}" data-context="search">${icon("play")}</button>
            <button class="icon-button ${state.liked.has(item.id) ? "liked" : ""}" data-action="toggle-like" data-id="${item.id}">${icon("heart", state.liked.has(item.id) ? "fill" : "")}</button>
          </div>
        </div>
      `;
    }
    const view = item.trackIds ? (findAlbum(item.id) ? "album" : findArtist(item.id) ? "artist" : "playlist") : findPodcast(item.id) ? "podcast" : "audiobook";
    return `
      <div class="top-result">
        ${cover(item, "large")}
        <div><strong class="card-title">${escapeHtml(item.name)}</strong><span class="card-meta">${escapeHtml(item.type || item.owner || item.artist || item.host || item.author || "Collection")}</span></div>
        <div class="inline-actions">
          <button class="primary-button" data-action="navigate" data-view="${view}" data-id="${item.id}">Open</button>
          <button class="play-fab" data-action="play-context" data-id="${item.id}">${icon("play")}</button>
        </div>
      </div>
    `;
  };

  const emptySmall = (text) => `<div class="empty-state"><strong>${escapeHtml(text)}</strong></div>`;

  const renderLibraryView = () => `
    <div class="view-head">
      <div><p class="eyebrow">Collection</p><h1 class="view-title">Your Library</h1><p class="subtle">Save music, follow artists, filter by type, create playlists, and manage downloads.</p></div>
      <button class="primary-button" data-action="open-modal" data-modal="create-playlist">${icon("plus")} Create playlist</button>
    </div>
    <div class="filter-row">
      ${libraryFilterButton("all", "All")}
      ${libraryFilterButton("playlists", "Playlists")}
      ${libraryFilterButton("artists", "Artists")}
      ${libraryFilterButton("albums", "Albums")}
      ${libraryFilterButton("podcasts", "Podcasts")}
    </div>
    <div class="wide-grid">
      ${libraryItems().map((item) => quickTile(item, item.view, item.id)).join("")}
    </div>
  `;

  const renderCollectionView = (collection) => {
    const item = collection || collectionById("liked");
    const ids = item.trackIds || [];
    const isSaved = item.id === "liked" || state.savedCollections.has(item.id);
    const meta = [
      item.owner || item.artist || "You",
      `${ids.length} songs`,
      formatLongDuration(totalDuration(ids)),
      item.public === false ? "Private" : "Public",
      item.collaborative ? "Collaborative" : "",
      state.downloaded.has(item.id) || item.downloaded ? "Downloaded" : "",
    ]
      .filter(Boolean)
      .join(" • ");
    return `
      <section class="entity-header">
        ${cover(item, "large")}
        <div>
          <p class="entity-type">${escapeHtml(item.type || "Playlist")}</p>
          <h1 class="entity-title">${escapeHtml(item.name)}</h1>
          <p class="entity-description">${escapeHtml(item.description || "A collection of tracks in your library.")}</p>
          <div class="entity-meta"><span>${escapeHtml(meta)}</span></div>
        </div>
      </section>
      <div class="entity-actions">
        <button class="play-main" data-action="play-context" data-id="${item.id}" title="Play">${icon(state.isPlaying && state.currentContext === item.id ? "pause" : "play")}</button>
        <button class="ghost-button" data-action="toggle-shuffle">${icon("shuffle")} ${shuffleLabel()}</button>
        <button class="ghost-button" data-action="toggle-save-collection" data-id="${item.id}">${icon(isSaved ? "check" : "plus")} ${isSaved ? "Saved" : "Save"}</button>
        <button class="ghost-button" data-action="toggle-download" data-id="${item.id}">${icon("download")} ${state.downloaded.has(item.id) || item.downloaded ? "Downloaded" : "Download"}</button>
        <button class="ghost-button" data-action="open-modal" data-modal="add-social" data-id="${item.id}">${icon("users")} Invite collaborators</button>
        <button class="icon-button" data-action="open-collection-menu" data-id="${item.id}" title="More options">${icon("more")}</button>
      </div>
      ${renderSortControls()}
      ${ids.length ? renderTrackTable(sortTrackIds(ids), item.id) : `<div class="empty-state"><strong>This playlist is empty</strong><span class="subtle">Use song menus to add tracks here.</span></div>`}
    `;
  };

  const renderAlbumView = (album) => renderCollectionView({ ...album, owner: album.artist, description: `${album.type} by ${album.artist}.`, type: album.type });

  const renderArtistView = (artist) => {
    const isSaved = state.savedCollections.has(artist.id);
    return `
      <section class="entity-header artist">
        ${cover(artist, "large circle")}
        <div>
          <p class="entity-type">${artist.verified ? "Verified Artist" : "Artist"}</p>
          <h1 class="entity-title">${escapeHtml(artist.name)}</h1>
          <p class="entity-description">${escapeHtml(artist.bio)}</p>
          <div class="entity-meta"><strong>${escapeHtml(artist.listeners)}</strong><span>monthly listeners</span></div>
        </div>
      </section>
      <div class="entity-actions">
        <button class="play-main" data-action="play-context" data-id="${artist.id}" title="Play artist">${icon("play")}</button>
        <button class="ghost-button" data-action="toggle-save-collection" data-id="${artist.id}">${icon(isSaved ? "check" : "plus")} ${isSaved ? "Following" : "Follow"}</button>
        <button class="ghost-button" data-action="start-radio" data-id="${artist.trackIds[0]}">${icon("radio")} Artist radio</button>
        <button class="ghost-button" data-action="open-modal" data-modal="artist-events" data-id="${artist.id}">${icon("globe")} On Tour</button>
      </div>
      <section class="section">
        <div class="section-head"><h2>Popular</h2></div>
        ${renderTrackTable(artist.trackIds, artist.id)}
      </section>
      <section class="section">
        <div class="section-head"><h2>Albums featuring ${escapeHtml(artist.name)}</h2></div>
        <div class="card-grid">${albums.filter((album) => album.trackIds.some((id) => findTrack(id).artistId === artist.id)).map((item) => mediaCard(item, "album")).join("")}</div>
      </section>
    `;
  };

  const renderPodcastView = (podcast) => `
    <section class="entity-header">
      ${cover(podcast, "large")}
      <div>
        <p class="entity-type">Podcast</p>
        <h1 class="entity-title">${escapeHtml(podcast.name)}</h1>
        <p class="entity-description">${escapeHtml(podcast.description)}</p>
        <div class="entity-meta"><span>${escapeHtml(podcast.host)}</span><span>${podcast.episodes.length} episodes</span></div>
      </div>
    </section>
    <div class="entity-actions">
      <button class="play-main" data-action="play-episode" data-id="${podcast.episodes[0].id}" title="Play latest">${icon("play")}</button>
      <button class="ghost-button" data-action="toggle-save-collection" data-id="${podcast.id}">${icon(state.savedCollections.has(podcast.id) ? "check" : "plus")} ${state.savedCollections.has(podcast.id) ? "Following" : "Follow"}</button>
      <button class="ghost-button" data-action="open-modal" data-modal="podcast-transcript" data-id="${podcast.id}">${icon("lyrics")} Transcript</button>
    </div>
    <section class="section">
      <div class="section-head"><h2>Episodes</h2></div>
      <div class="dense-list">
        ${podcast.episodes
          .map(
            (episode) => `
              <article class="episode-card">
                ${cover(podcast, "small")}
                <div>
                  <strong>${escapeHtml(episode.title)}</strong>
                  <p>${escapeHtml(episode.description)}</p>
                  <div class="inline-actions">
                    <button class="ghost-button" data-action="play-episode" data-id="${episode.id}">${icon("play")} Play</button>
                    <span class="subtle">${escapeHtml(episode.date)} • ${formatTime(episode.duration)}</span>
                  </div>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;

  const renderAudiobookView = (book) => `
    <section class="entity-header">
      ${cover(book, "large")}
      <div>
        <p class="entity-type">Audiobook</p>
        <h1 class="entity-title">${escapeHtml(book.name)}</h1>
        <p class="entity-description">${escapeHtml(book.description)}</p>
        <div class="entity-meta"><span>${escapeHtml(book.author)}</span><span>${book.chapters} chapters</span><span>${book.length}</span></div>
      </div>
    </section>
    <div class="entity-actions">
      <button class="play-main" data-action="play-audiobook" data-id="${book.id}" title="Start listening">${icon("play")}</button>
      <button class="ghost-button" data-action="toggle-save-collection" data-id="${book.id}">${icon(state.savedCollections.has(book.id) ? "check" : "plus")} ${state.savedCollections.has(book.id) ? "Saved" : "Save"}</button>
      <button class="ghost-button" data-action="open-modal" data-modal="audiobook-topup">${icon("plus")} Add listening hours</button>
    </div>
    <section class="section">
      <div class="section-head"><h2>Chapters</h2></div>
      <div class="dense-list">
        ${Array.from({ length: Math.min(book.chapters, 10) }, (_, index) => `
          <button class="queue-row" data-action="play-audiobook" data-id="${book.id}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <span><strong>Chapter ${index + 1}</strong><span class="library-meta">${index === 0 ? "Preview" : "Included in audiobook session"}</span></span>
            <span class="subtle">${formatTime(duration(18 + index, 30))}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;

  const renderLocalFilesView = () => `
    <div class="view-head">
      <div><p class="eyebrow">Your device</p><h1 class="view-title">Local Files</h1><p class="subtle">Add audio files from this computer. Browser security keeps them local to this session.</p></div>
    </div>
    <label class="drop-zone">
      ${icon("upload")}
      <strong>Add audio files</strong>
      <span class="subtle">Choose MP3, WAV, M4A, OGG, or any audio file your browser can play.</span>
      <input type="file" accept="audio/*" multiple data-change="local-files" />
    </label>
    <section class="section">
      <div class="section-head"><h2>Added files</h2><button class="ghost-button" data-action="play-context" data-id="local" ${state.localTracks.length ? "" : "disabled"}>Play local files</button></div>
      ${state.localTracks.length ? renderTrackTable(state.localTracks.map((track) => track.id), "local") : `<div class="empty-state"><strong>No local files yet</strong><span class="subtle">Your uploaded files will appear here with playable audio.</span></div>`}
    </section>
  `;

  const renderSettingsView = () => `
    <div class="view-head">
      <div><p class="eyebrow">Account and playback</p><h1 class="view-title">Settings</h1><p class="subtle">Playback, privacy, quality, social, and device preferences.</p></div>
    </div>
    <div class="settings-grid">
      <section class="settings-card">
        <h2 class="compact-title">Playback</h2>
        ${settingsToggle("autoplay", "Autoplay", "Keep similar tracks playing after a playlist ends.")}
        ${settingsToggle("gapless", "Gapless playback", "Remove silence between tracks when possible.")}
        ${settingsToggle("normalize", "Normalize volume", "Balance loud and quiet songs.")}
        ${settingsToggle("smartShuffle", "Include Smart Shuffle", "Cycle standard shuffle, fewer repeats, and recommendations.")}
        <label class="field-label">Crossfade: <span id="crossfade-value">${state.settings.crossfade}s</span><input class="range" type="range" min="0" max="12" value="${state.settings.crossfade}" data-input="crossfade" /></label>
      </section>
      <section class="settings-card">
        <h2 class="compact-title">Privacy and social</h2>
        ${settingsToggle("privateSession", "Private session", "Temporarily pause friend activity and taste profile updates.")}
        ${settingsToggle("showFriendActivity", "Friend Activity", "Show what friends are listening to in the side panel.")}
        ${settingsToggle("offlineMode", "Offline mode", "Only play downloaded and local content.")}
        ${settingsToggle("downloadOnSave", "Download on save", "Mark saved playlists and albums as downloaded.")}
      </section>
      <section class="settings-card">
        <h2 class="compact-title">Quality and video</h2>
        ${settingsToggle("lossless", "Lossless audio", "Show lossless quality controls for supported devices.")}
        ${settingsToggle("lyrics", "Lyrics", "Enable synchronized lyrics in the Now Playing panel.")}
        ${settingsToggle("videoAutoplay", "Video autoplay", "Open music video mode when a track supports it.")}
        <button class="ghost-button" data-action="open-modal" data-modal="equalizer">${icon("sliders")} Open equalizer</button>
      </section>
    </div>
  `;

  const settingsToggle = (setting, title, description) => `
    <label class="settings-row" data-action="toggle-setting" data-setting="${setting}">
      <span><strong>${escapeHtml(title)}</strong><span class="library-meta">${escapeHtml(description)}</span></span>
      <span class="switch" aria-label="${escapeHtml(title)}">
        <input type="checkbox" ${state.settings[setting] ? "checked" : ""} tabindex="-1" />
        <span></span>
      </span>
    </label>
  `;

  const renderPremiumView = () => `
    <div class="view-head">
      <div><p class="eyebrow">Premium preview</p><h1 class="view-title">More control, better quality</h1><p class="subtle">A non-billing clone view for Premium-style benefits and switches.</p></div>
      <button class="primary-button" data-action="open-modal" data-modal="premium">${icon("sparkles")} View plans</button>
    </div>
    <div class="wide-grid">
      <div class="settings-card"><h2 class="compact-title">Ad-free playback</h2><p class="subtle">The clone has no ads, but this models the Premium surface.</p></div>
      <div class="settings-card"><h2 class="compact-title">Lossless quality</h2><p class="subtle">Enable the lossless switch in Settings and select a compatible device.</p></div>
      <div class="settings-card"><h2 class="compact-title">Music videos</h2><p class="subtle">Tracks with video can switch between audio and the animated video panel.</p></div>
      <div class="settings-card"><h2 class="compact-title">Audiobook hours</h2><p class="subtle">Audiobooks include a top-up modal and chapter list.</p></div>
      <div class="settings-card"><h2 class="compact-title">Jam sessions</h2><p class="subtle">Start a Jam, invite friends, and share control of the queue.</p></div>
      <div class="settings-card"><h2 class="compact-title">Offline listening</h2><p class="subtle">Download toggles appear on playlists and albums.</p></div>
    </div>
  `;

  const renderSortControls = () => `
    <div class="entity-actions">
      <div class="segmented" role="tablist" aria-label="Sort tracks">
        ${sortButton("custom", "Custom order")}
        ${sortButton("title", "Title")}
        ${sortButton("artist", "Artist")}
        ${sortButton("album", "Album")}
        ${sortButton("duration", "Duration")}
      </div>
    </div>
  `;

  const sortButton = (mode, label) =>
    `<button class="${state.sortMode === mode ? "active" : ""}" data-action="set-sort" data-sort="${mode}">${escapeHtml(label)}</button>`;

  const sortTrackIds = (ids) => {
    if (state.sortMode === "custom") return [...ids];
    return [...ids].sort((a, b) => {
      const left = findTrack(a);
      const right = findTrack(b);
      if (state.sortMode === "duration") return left.duration - right.duration;
      return String(left[state.sortMode] || "").localeCompare(String(right[state.sortMode] || ""));
    });
  };

  const formatLongDuration = (seconds) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return `${hours} hr ${rest} min`;
  };

  const renderTrackTable = (ids, contextId) => {
    const visibleTracks = filteredVisibleTracks(ids);
    if (!visibleTracks.length) {
      return `<div class="empty-state"><strong>No playable tracks</strong><span class="subtle">Hidden songs are skipped until you unhide them.</span></div>`;
    }
    return `
      <table class="track-table">
        <thead>
          <tr>
            <th class="track-index">#</th>
            <th>Title</th>
            <th class="track-album">Album</th>
            <th class="track-actions-cell"></th>
            <th class="track-duration">${icon("clock")}</th>
          </tr>
        </thead>
        <tbody>
          ${visibleTracks
            .map((track, index) => {
              const isCurrent = track.id === state.playingId;
              const liked = state.liked.has(track.id);
              return `
                <tr data-track-id="${track.id}">
                  <td class="track-index">
                    <button class="icon-button ${isCurrent ? "active-green" : ""}" data-action="play-track" data-id="${track.id}" data-context="${contextId}" title="Play ${escapeHtml(track.title)}">
                      ${isCurrent && state.isPlaying ? playingWave() : `<span>${index + 1}</span>`}
                    </button>
                  </td>
                  <td>
                    <div class="track-title-cell">
                      ${cover(track, "tiny", track.title)}
                      <span>
                        <span class="track-title">${escapeHtml(track.title)}</span>
                        <span class="track-meta">${track.explicit ? '<span class="explicit">E</span>' : ""}<span>${escapeHtml(track.artist)}</span>${track.hasVideo ? `<span>${icon("video")}</span>` : ""}</span>
                      </span>
                    </div>
                  </td>
                  <td class="track-album">${escapeHtml(track.album)}</td>
                  <td class="track-actions-cell">
                    <div class="inline-actions">
                      <button class="icon-button ${liked ? "liked" : ""}" data-action="toggle-like" data-id="${track.id}" title="${liked ? "Remove from Liked Songs" : "Save to Liked Songs"}">${icon("heart", liked ? "fill" : "")}</button>
                      <button class="icon-button" data-action="add-queue" data-id="${track.id}" title="Add to queue">${icon("queue")}</button>
                      <button class="icon-button" data-action="open-track-menu" data-id="${track.id}" title="More options">${icon("more")}</button>
                    </div>
                  </td>
                  <td class="track-duration">${formatTime(track.duration)}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;
  };

  const renderRightRail = () => `
    <div class="rail-header">
      <div class="rail-top">
        <h2 class="rail-title">${rightPanelTitle()}</h2>
        <button class="icon-button" data-action="open-modal" data-modal="devices" title="Connect to a device">${icon("devices")}</button>
      </div>
      <div class="tab-list" role="tablist">
        ${rightTab("now", "Now")}
        ${rightTab("queue", "Queue")}
        ${rightTab("lyrics", "Lyrics")}
        ${rightTab("connect", "Connect")}
        ${rightTab("friends", "Friends")}
      </div>
    </div>
    <div class="rail-scroll">
      ${renderRightPanel()}
    </div>
  `;

  const rightPanelTitle = () => {
    const titles = { now: "Now Playing", queue: "Next in queue", lyrics: "Lyrics", connect: "Connect", friends: "Friend Activity" };
    return titles[state.rightPanel] || "Now Playing";
  };

  const rightTab = (panel, label) =>
    `<button class="tab-button ${state.rightPanel === panel ? "active" : ""}" data-action="set-panel" data-panel="${panel}">${escapeHtml(label)}</button>`;

  const renderRightPanel = () => {
    if (state.rightPanel === "queue") return renderQueuePanel();
    if (state.rightPanel === "lyrics") return renderLyricsPanel();
    if (state.rightPanel === "connect") return renderConnectPanel();
    if (state.rightPanel === "friends") return renderFriendsPanel();
    return renderNowPanel();
  };

  const renderNowPanel = () => {
    const track = currentTrack();
    const artist = artists.find((item) => item.id === track.artistId);
    return `
      <div class="now-cover">${cover(track, "", track.title)}</div>
      <h3 class="now-title">${escapeHtml(track.title)}</h3>
      <p class="now-artist">${escapeHtml(track.artist)}</p>
      <div class="inline-actions" style="margin-top:12px">
        <button class="icon-button ${state.liked.has(track.id) ? "liked" : ""}" data-action="toggle-like" data-id="${track.id}">${icon("heart", state.liked.has(track.id) ? "fill" : "")}</button>
        <button class="ghost-button" data-action="open-track-menu" data-id="${track.id}">${icon("more")} Options</button>
      </div>
      ${
        state.videoMode && track.hasVideo
          ? `<div class="video-card"><div class="video-stage"></div><h3>Music video</h3><p>Audio and video stay linked to the same playback position in this clone.</p></div>`
          : ""
      }
      <div class="artist-info">
        <h3>About the artist</h3>
        <p>${escapeHtml(artist?.bio || "Artist details appear here.")}</p>
      </div>
      <div class="tour-card">
        <h3>On Tour</h3>
        <p>${escapeHtml(track.artist)} has simulated dates in Mumbai, Berlin, London, and New York.</p>
      </div>
      <div class="merch-card">
        <h3>Merch</h3>
        <p>Artist merch actions are represented with this panel and the More menu.</p>
      </div>
    `;
  };

  const renderQueuePanel = () => `
    <div class="panel-actions">
      <button class="ghost-button" data-action="clear-queue" ${state.queue.length ? "" : "disabled"}>${icon("trash")} Clear queue</button>
      <button class="ghost-button" data-action="open-modal" data-modal="jam">${icon("users")} Start Jam</button>
    </div>
    <section class="section" style="margin-top:16px">
      <div class="section-head"><h2>Now playing</h2></div>
      ${queueRow(state.playingId, -1, false)}
    </section>
    <section class="section">
      <div class="section-head"><h2>Next</h2><span class="subtle">${state.queue.length} tracks</span></div>
      <div class="dense-list">
        ${state.queue.length ? state.queue.map((id, index) => queueRow(id, index, true)).join("") : `<div class="empty-state"><strong>Your queue is empty</strong><span class="subtle">Add tracks from any song menu.</span></div>`}
      </div>
    </section>
  `;

  const queueRow = (trackId, index, draggable) => {
    const track = findTrack(trackId);
    return `
      <div class="queue-row" ${draggable ? `draggable="true" data-queue-index="${index}"` : ""}>
        ${cover(track, "tiny", track.title)}
        <span><strong>${escapeHtml(track.title)}</strong><span class="library-meta">${escapeHtml(track.artist)}</span></span>
        ${
          draggable
            ? `<span class="queue-tools">
                <button class="icon-button" data-action="move-queue" data-index="${index}" data-direction="-1" title="Move up">${icon("chevronUp")}</button>
                <button class="icon-button" data-action="move-queue" data-index="${index}" data-direction="1" title="Move down">${icon("chevronDown")}</button>
                <button class="icon-button" data-action="remove-queue" data-index="${index}" title="Remove">${icon("x")}</button>
              </span>`
            : `<span class="status-dot"></span>`
        }
      </div>
    `;
  };

  const renderLyricsPanel = () => {
    const track = currentTrack();
    if (!state.settings.lyrics) {
      return `<div class="empty-state"><strong>Lyrics are off</strong><span class="subtle">Enable lyrics in Settings to show synced lines.</span><button class="ghost-button" data-action="toggle-setting" data-setting="lyrics">Enable lyrics</button></div>`;
    }
    return `
      <div class="lyrics-box" id="rail-lyrics">
        ${(track.lyrics || lyricSet(track.title))
          .map((line) => `<div class="lyric-line" data-lyric-time="${line.time}">${escapeHtml(line.text)}</div>`)
          .join("")}
      </div>
    `;
  };

  const renderConnectPanel = () => `
    <div class="dense-list">
      ${devices
        .map(
          (device) => `
            <button class="device-row ${state.activeDevice === device.id ? "active" : ""}" data-action="select-device" data-id="${device.id}">
              ${icon(device.id === "phone" ? "music" : device.id === "tv" ? "video" : "devices")}
              <span><strong>${escapeHtml(device.name)}</strong><span class="library-meta">${escapeHtml(device.detail)}</span></span>
              ${state.activeDevice === device.id ? icon("check") : ""}
            </button>
          `,
        )
        .join("")}
    </div>
    <div class="artist-info">
      <h3>Jam</h3>
      <p>Invite friends to listen together and add to the queue in real time.</p>
      <button class="primary-button" style="margin-top:12px" data-action="open-modal" data-modal="jam">${icon("users")} Start a Jam</button>
    </div>
  `;

  const renderFriendsPanel = () => {
    if (!state.settings.showFriendActivity || state.settings.privateSession) {
      return `<div class="empty-state"><strong>Friend Activity is paused</strong><span class="subtle">Turn it back on in Settings or end Private Session.</span><button class="ghost-button" data-action="navigate" data-view="settings">Open Settings</button></div>`;
    }
    return `
      <div class="dense-list">
        ${friends
          .map((friend) => {
            const track = findTrack(friend.trackId);
            return `
              <button class="friend-row" data-action="play-track" data-id="${track.id}" data-context="friends">
                <span class="friend-avatar">${escapeHtml(initials(friend.name))}</span>
                <span><strong>${escapeHtml(friend.name)}</strong><span class="library-meta">${escapeHtml(track.title)} • ${escapeHtml(track.artist)} • ${escapeHtml(friend.when)}</span></span>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  };

  const renderPlayer = () => {
    const track = currentTrack();
    const liked = state.liked.has(track.id);
    return `
      <footer class="player">
        <div class="now-mini">
          ${cover(track, "small", track.title)}
          <div class="now-mini-text">
            <div class="now-title">${escapeHtml(track.title)}</div>
            <div class="now-artist">${escapeHtml(track.artist)}</div>
          </div>
          <button class="icon-button ${liked ? "liked" : ""}" data-action="toggle-like" data-id="${track.id}" title="${liked ? "Remove from Liked Songs" : "Save to Liked Songs"}">${icon("heart", liked ? "fill" : "")}</button>
        </div>
        <div class="player-center">
          <div class="control-row">
            <button class="icon-button ${state.shuffleMode ? "active-green" : ""}" data-action="toggle-shuffle" title="${shuffleLabel()}">${icon("shuffle")}</button>
            <button class="icon-button" data-action="previous" title="Previous">${icon("skipBack")}</button>
            <button class="icon-button solid play-toggle" data-action="toggle-play" title="${state.isPlaying ? "Pause" : "Play"}">${icon(state.isPlaying ? "pause" : "play")}</button>
            <button class="icon-button" data-action="next" title="Next">${icon("skipForward")}</button>
            <button class="icon-button ${state.repeatMode ? "active-green" : ""}" data-action="toggle-repeat" title="${repeatLabel()}">${icon(state.repeatMode === 2 ? "repeatOne" : "repeat")}</button>
          </div>
          <div class="progress-row">
            <span id="player-current-time">${formatTime(state.elapsed)}</span>
            <input id="player-seek" class="range" type="range" min="0" max="${track.duration}" value="${Math.min(state.elapsed, track.duration)}" data-input="seek" aria-label="Seek" />
            <span id="player-duration">${formatTime(track.duration)}</span>
          </div>
        </div>
        <div class="player-actions">
          <button class="icon-button ${state.videoMode ? "active-green" : ""}" data-action="toggle-video" title="Switch audio/video" ${track.hasVideo ? "" : "disabled"}>${icon("video")}</button>
          <button class="icon-button ${state.rightPanel === "lyrics" ? "active-green" : ""}" data-action="set-panel" data-panel="lyrics" title="Lyrics">${icon("lyrics")}</button>
          <button class="icon-button ${state.rightPanel === "queue" ? "active-green" : ""}" data-action="set-panel" data-panel="queue" title="Queue">${icon("queue")}</button>
          <button class="icon-button ${state.rightPanel === "connect" ? "active-green" : ""}" data-action="set-panel" data-panel="connect" title="Connect">${icon("devices")}</button>
          <div class="volume-box">
            <button class="icon-button" data-action="toggle-mute" title="${state.muted ? "Unmute" : "Mute"}">${icon(state.muted ? "mute" : "volume")}</button>
            <input class="range" type="range" min="0" max="100" value="${state.muted ? 0 : state.volume}" data-input="volume" aria-label="Volume" />
          </div>
        </div>
      </footer>
    `;
  };

  const renderMobileNav = () => `
    <nav class="mobile-nav" aria-label="Mobile">
      <button class="${state.view === "home" ? "active" : ""}" data-action="navigate" data-view="home" title="Home">${icon("home")}</button>
      <button class="${state.view === "search" ? "active" : ""}" data-action="navigate" data-view="search" title="Search">${icon("search")}</button>
      <button class="${state.view === "library" ? "active" : ""}" data-action="navigate" data-view="library" title="Library">${icon("library")}</button>
      <button class="${state.rightPanel === "queue" ? "active" : ""}" data-action="set-panel" data-panel="queue" title="Queue">${icon("queue")}</button>
      <button class="${state.view === "settings" ? "active" : ""}" data-action="navigate" data-view="settings" title="Settings">${icon("settings")}</button>
    </nav>
  `;

  const renderModal = () => {
    if (!state.modal) return "";
    const { type, id } = state.modal;
    const close = `<button class="icon-button" data-action="close-modal" title="Close">${icon("x")}</button>`;
    const modal = (title, body, footer = "", wide = false) => `
      <div class="modal-backdrop" data-action="close-modal">
        <section class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}" data-modal-box>
          <div class="modal-head"><h2 class="modal-title">${escapeHtml(title)}</h2>${close}</div>
          <div class="modal-body">${body}</div>
          ${footer ? `<div class="modal-foot">${footer}</div>` : ""}
        </section>
      </div>
    `;

    if (type === "create-playlist") {
      return modal(
        "Create playlist",
        `<div class="form-grid">
          <label class="field-label">Name<input class="field" data-field="playlist-name" placeholder="My playlist" /></label>
          <label class="field-label">Description<textarea class="text-area" data-field="playlist-description" placeholder="Add an optional description"></textarea></label>
          <label class="settings-row" data-action="toggle-modal-check" data-check="playlist-public"><span><strong>Public playlist</strong><span class="library-meta">Show this playlist on your profile.</span></span><span class="switch"><input type="checkbox" data-field="playlist-public" checked tabindex="-1" /><span></span></span></label>
          <label class="settings-row" data-action="toggle-modal-check" data-check="playlist-collab"><span><strong>Collaborative playlist</strong><span class="library-meta">Let friends add, remove, and reorder songs.</span></span><span class="switch"><input type="checkbox" data-field="playlist-collab" tabindex="-1" /><span></span></span></label>
        </div>`,
        `<span class="subtle">You can add songs from any track menu.</span><button class="primary-button" data-action="create-playlist">Create</button>`,
      );
    }

    if (type === "add-to-playlist") {
      const track = findTrack(id);
      return modal(
        "Add to playlist",
        `<p class="subtle">Choose a playlist for <strong>${escapeHtml(track.title)}</strong>.</p>
        <div class="dense-list">
          ${state.userPlaylists
            .map(
              (playlist) => `
                <button class="library-row" data-action="add-track-to-playlist" data-track-id="${track.id}" data-playlist-id="${playlist.id}">
                  ${cover(playlist, "small")}
                  <span><strong>${escapeHtml(playlist.name)}</strong><span class="library-meta">${playlist.trackIds.length} songs</span></span>
                  ${playlist.trackIds.includes(track.id) ? icon("check") : ""}
                </button>
              `,
            )
            .join("")}
        </div>
        <label class="field-label">New playlist name<input class="field" data-field="quick-playlist-name" placeholder="Create and add" /></label>`,
        `<button class="ghost-button" data-action="close-modal">Cancel</button><button class="primary-button" data-action="create-playlist-with-track" data-track-id="${track.id}">Create and add</button>`,
      );
    }

    if (type === "devices") {
      return modal("Connect to a device", renderConnectPanel(), `<button class="primary-button" data-action="open-modal" data-modal="jam">${icon("users")} Start Jam</button>`);
    }

    if (type === "jam") {
      return modal(
        "Start a Jam",
        `<div class="settings-card">
          <h3 class="compact-title">Invite friends to join</h3>
          <p class="subtle">Friends can listen together, add songs to the queue, and share control.</p>
          <div class="cover cover-e" style="width:180px;margin:auto"><span class="cover-label">JAM</span></div>
          <label class="field-label">Invite link<input class="field" value="https://open.singeetam.app/jam/ac-2026" readonly /></label>
        </div>`,
        `<button class="ghost-button" data-action="share" data-label="Jam invite copied">${icon("share")} Share link</button><button class="primary-button" data-action="close-modal">Done</button>`,
      );
    }

    if (type === "equalizer") {
      const bands = ["60 Hz", "150 Hz", "400 Hz", "1 kHz", "2.4 kHz", "6 kHz", "15 kHz"];
      return modal(
        "Equalizer",
        `<div class="settings-grid">
          ${bands
            .map(
              (band, index) => `
                <label class="field-label">${band}<input class="range" type="range" min="-12" max="12" value="${index % 2 ? 2 : 0}" /></label>
              `,
            )
            .join("")}
        </div>
        <div class="segmented">
          <button class="active" data-action="toast" data-label="Balanced equalizer preset selected">Balanced</button>
          <button data-action="toast" data-label="Bass boost preset selected">Bass boost</button>
          <button data-action="toast" data-label="Podcast preset selected">Podcast</button>
          <button data-action="toast" data-label="Vocal clarity preset selected">Vocal</button>
        </div>`,
        `<button class="primary-button" data-action="close-modal">Apply</button>`,
        true,
      );
    }

    if (type === "shortcuts") {
      const shortcuts = [
        ["Space", "Play or pause"],
        ["N", "Next track"],
        ["P", "Previous track"],
        ["S", "Shuffle mode"],
        ["R", "Repeat mode"],
        ["L", "Like current track"],
        ["/", "Focus search"],
        ["Left/Right", "Seek 5 seconds"],
      ];
      return modal(
        "Keyboard shortcuts",
        `<div class="shortcut-grid">
          ${shortcuts.map(([key, label]) => `<div class="shortcut"><span>${escapeHtml(label)}</span><kbd>${escapeHtml(key)}</kbd></div>`).join("")}
        </div>`,
      );
    }

    if (type === "profile") {
      return modal(
        "Profile",
        `<div class="dense-list">
          <button class="menu-item" data-action="toast" data-label="Profile opened">${icon("users")} Profile</button>
          <button class="menu-item" data-action="toast" data-label="Account overview opened">${icon("globe")} Account</button>
          <button class="menu-item" data-action="toggle-setting" data-setting="privateSession">${icon("lock")} ${state.settings.privateSession ? "End private session" : "Start private session"}</button>
          <button class="menu-item" data-action="navigate" data-view="settings">${icon("settings")} Settings</button>
          <button class="menu-item" data-action="toast" data-label="Logged out of the clone session">${icon("x")} Log out</button>
        </div>`,
      );
    }

    if (type === "notifications") {
      return modal(
        "Notifications",
        `<div class="dense-list">
          ${["Mira Vale released Green Room", "Your Discover Weekly is ready", "Kairo Sun announced a simulated show", "A friend joined your Jam"].map(
            (note) => `<div class="settings-card"><strong>${escapeHtml(note)}</strong><span class="subtle">Just now</span></div>`,
          ).join("")}
        </div>`,
      );
    }

    if (type === "install") {
      return modal(
        "Install App",
        `<p class="subtle">This static clone can be opened directly from the HTML file. In a production app, this is where a PWA install prompt and offline asset cache would live.</p>
        <div class="settings-card"><strong>Ready for PWA extension</strong><span class="subtle">Manifest, service worker, cached assets, and install prompt can be added next.</span></div>`,
      );
    }

    if (type === "premium") {
      return modal(
        "Premium preview",
        `<div class="settings-grid">
          <div class="settings-card"><h3>Individual</h3><strong class="stat-value">$10.99</strong><span class="subtle">Mock price surface</span></div>
          <div class="settings-card"><h3>Duo</h3><strong class="stat-value">$14.99</strong><span class="subtle">Two clone accounts</span></div>
          <div class="settings-card"><h3>Family</h3><strong class="stat-value">$16.99</strong><span class="subtle">Six clone accounts</span></div>
        </div>`,
        `<button class="primary-button" data-action="toast" data-label="Premium checkout is mocked in this clone">Continue</button>`,
        true,
      );
    }

    if (type === "artist-events") {
      const artist = findArtist(id) || findArtist("ar1");
      return modal(
        "On Tour",
        `<div class="dense-list">
          ${["Mumbai", "Berlin", "London", "New York"].map((city, index) => `<div class="settings-card"><strong>${escapeHtml(artist.name)} in ${city}</strong><span class="subtle">Sep ${12 + index}, 2026 • Simulated event</span></div>`).join("")}
        </div>`,
      );
    }

    if (type === "podcast-transcript") {
      return modal(
        "Podcast transcript",
        `<div class="lyrics-box">
          <div class="lyric-line active">Welcome back to the show.</div>
          <div class="lyric-line">Today we are talking about music discovery, focus, and queue design.</div>
          <div class="lyric-line">This transcript panel mirrors Singeetam's podcast transcript surface.</div>
        </div>`,
      );
    }

    if (type === "audiobook-topup") {
      return modal(
        "Audiobook listening hours",
        `<p class="subtle">This clone includes the top-up flow as an interactive mock.</p>
        <div class="settings-grid">
          <button class="settings-card" data-action="toast" data-label="5 audiobook hours added"><strong>5 hours</strong><span class="subtle">Small top-up</span></button>
          <button class="settings-card" data-action="toast" data-label="10 audiobook hours added"><strong>10 hours</strong><span class="subtle">Standard top-up</span></button>
        </div>`,
      );
    }

    if (type === "add-social") {
      const collection = collectionById(id);
      return modal(
        "Invite collaborators",
        `<p class="subtle">Share this link so friends can add songs to <strong>${escapeHtml(collection?.name || "your playlist")}</strong>.</p>
        <label class="field-label">Collaborative invite<input class="field" value="https://open.singeetam.app/playlist/${escapeHtml(id || "playlist")}/collaborate" readonly /></label>`,
        `<button class="ghost-button" data-action="share" data-label="Collaborator invite copied">${icon("share")} Share</button><button class="primary-button" data-action="close-modal">Done</button>`,
      );
    }

    return "";
  };

  const renderContextMenu = () => {
    const menu = state.contextMenu;
    if (!menu) return "";
    const style = `left:${menu.x}px;top:${menu.y}px`;
    if (menu.type === "track") {
      const track = findTrack(menu.id);
      const liked = state.liked.has(track.id);
      return `
        <div class="context-menu" style="${style}" data-menu-box>
          <button class="menu-item" data-action="play-track" data-id="${track.id}">${icon("play")} Play now</button>
          <button class="menu-item" data-action="add-queue" data-id="${track.id}">${icon("queue")} Add to queue</button>
          <button class="menu-item" data-action="open-modal" data-modal="add-to-playlist" data-id="${track.id}">${icon("plus")} Add to playlist</button>
          <button class="menu-item" data-action="toggle-like" data-id="${track.id}">${icon("heart", liked ? "fill" : "")} ${liked ? "Remove from Liked Songs" : "Save to Liked Songs"}</button>
          <div class="menu-divider"></div>
          <button class="menu-item" data-action="navigate" data-view="artist" data-id="${track.artistId}">${icon("users")} Go to artist</button>
          <button class="menu-item" data-action="navigate" data-view="album" data-id="${track.albumId}">${icon("album")} Go to album</button>
          <button class="menu-item" data-action="start-radio" data-id="${track.id}">${icon("radio")} Go to song radio</button>
          <button class="menu-item" data-action="set-panel" data-panel="lyrics">${icon("lyrics")} View lyrics</button>
          <button class="menu-item" data-action="toggle-video" ${track.hasVideo ? "" : "disabled"}>${icon("video")} Switch to video</button>
          <div class="menu-divider"></div>
          <button class="menu-item" data-action="exclude-taste" data-id="${track.id}">${icon("lock")} Exclude from taste profile</button>
          <button class="menu-item" data-action="hide-track" data-id="${track.id}">${icon("x")} Hide song</button>
          <button class="menu-item" data-action="share" data-label="Song link copied">${icon("share")} Share</button>
        </div>
      `;
    }
    const collection = collectionById(menu.id);
    return `
      <div class="context-menu" style="${style}" data-menu-box>
        <button class="menu-item" data-action="play-context" data-id="${collection.id}">${icon("play")} Play</button>
        <button class="menu-item" data-action="toggle-save-collection" data-id="${collection.id}">${icon("plus")} Save to library</button>
        <button class="menu-item" data-action="toggle-download" data-id="${collection.id}">${icon("download")} Download</button>
        <button class="menu-item" data-action="open-modal" data-modal="add-social" data-id="${collection.id}">${icon("users")} Invite collaborators</button>
        <button class="menu-item" data-action="share" data-label="Collection link copied">${icon("share")} Share</button>
      </div>
    `;
  };

  const shuffleLabel = () => (state.shuffleMode === 2 ? "Smart Shuffle" : state.shuffleMode === 1 ? "Shuffle" : "Shuffle off");
  const repeatLabel = () => (state.repeatMode === 2 ? "Repeat one" : state.repeatMode === 1 ? "Repeat all" : "Repeat off");

  const playContext = (contextId) => {
    const ids = filteredVisibleTracks(getContextTrackIds(contextId)).map((track) => track.id);
    if (!ids.length) {
      showToast("Nothing playable in this collection yet.");
      return;
    }
    const first = state.shuffleMode ? ids[Math.floor(Math.random() * ids.length)] : ids[0];
    const rest = ids.filter((id) => id !== first);
    state.currentContext = contextId;
    state.queue = state.shuffleMode ? shuffle(rest) : rest;
    playTrack(first, contextId, { keepQueue: true, noToast: true });
    showToast(`Playing ${collectionById(contextId)?.name || "collection"}.`);
  };

  const playTrack = (id, contextId = null, options = {}) => {
    const track = findTrack(id);
    if (!track) return;
    if (state.playingId && state.playingId !== id) {
      state.playedStack.push(state.playingId);
      state.playedStack = state.playedStack.slice(-30);
    }
    state.playingId = id;
    state.elapsed = 0;
    state.isPlaying = true;
    state.videoMode = state.settings.videoAutoplay && track.hasVideo ? true : state.videoMode && track.hasVideo;
    if (contextId && !options.keepQueue) {
      const ids = filteredVisibleTracks(getContextTrackIds(contextId)).map((item) => item.id);
      const index = ids.indexOf(id);
      state.currentContext = contextId;
      state.queue = ids.slice(index + 1);
    }
    if (!track.hasVideo) state.videoMode = false;
    playLocalIfNeeded(track);
    saveState();
    render();
    if (!options.noToast) showToast(`Playing ${track.title}.`);
  };

  const playLocalIfNeeded = (track) => {
    syncAudioVolume();
    if (!track.localUrl) {
      localAudio.pause();
      localAudio.removeAttribute("src");
      return;
    }
    if (localAudio.src !== track.localUrl) {
      localAudio.src = track.localUrl;
    }
    localAudio.currentTime = 0;
    localAudio.play().catch(() => showToast("Browser blocked local audio playback. Press play again."));
  };

  const togglePlay = () => {
    const track = currentTrack();
    state.isPlaying = !state.isPlaying;
    if (track.localUrl) {
      syncAudioVolume();
      if (state.isPlaying) {
        localAudio.play().catch(() => {
          state.isPlaying = false;
          showToast("Browser blocked local audio playback. Try clicking the play button again.");
          render();
        });
      } else {
        localAudio.pause();
      }
    }
    saveState();
    render();
  };

  const nextTrack = () => {
    if (state.queue.length) {
      const nextId = state.queue[0];
      state.queue = state.queue.slice(1);
      playTrack(nextId, null, { keepQueue: true, noToast: true });
      return;
    }
    if (state.repeatMode === 1 && state.currentContext) {
      playContext(state.currentContext);
      return;
    }
    if (state.settings.autoplay) {
      const candidates = allTracks().filter((track) => track.id !== state.playingId && !state.hiddenTracks.has(track.id));
      const next = candidates[Math.floor(Math.random() * candidates.length)];
      playTrack(next.id, null, { keepQueue: true, noToast: true });
      state.queue = candidates.filter((track) => track.id !== next.id).slice(0, 5).map((track) => track.id);
      showToast("Autoplay added similar tracks.");
      return;
    }
    state.isPlaying = false;
    render();
  };

  const previousTrack = () => {
    if (state.elapsed > 5) {
      state.elapsed = 0;
      if (currentTrack().localUrl) localAudio.currentTime = 0;
      updatePlaybackUI();
      return;
    }
    const previous = state.playedStack.pop();
    if (previous) {
      state.queue.unshift(state.playingId);
      playTrack(previous, null, { keepQueue: true, noToast: true });
    }
  };

  const shuffle = (items) => {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  };

  const handleTrackEnd = () => {
    if (state.repeatMode === 2) {
      state.elapsed = 0;
      if (currentTrack().localUrl) {
        localAudio.currentTime = 0;
        localAudio.play().catch(() => {});
      }
      updatePlaybackUI();
      return;
    }
    nextTrack();
  };

  const addToQueue = (id) => {
    const track = findTrack(id);
    state.queue.push(id);
    saveState();
    render();
    showToast(`${track.title} added to queue.`);
  };

  const openContextMenu = (type, id, sourceElement) => {
    const rect = sourceElement.getBoundingClientRect();
    const width = 260;
    const x = Math.min(rect.left, window.innerWidth - width - 10);
    const y = Math.min(rect.bottom + 6, window.innerHeight - 260);
    state.contextMenu = { type, id, x: Math.max(10, x), y: Math.max(10, y) };
    render();
  };

  const syncAudioVolume = () => {
    localAudio.volume = state.muted ? 0 : state.volume / 100;
  };

  const updatePlaybackUI = () => {
    const track = currentTrack();
    const current = document.getElementById("player-current-time");
    const durationEl = document.getElementById("player-duration");
    const seek = document.getElementById("player-seek");
    if (current) current.textContent = formatTime(state.elapsed);
    if (durationEl) durationEl.textContent = formatTime(track.duration);
    if (seek) {
      seek.max = String(track.duration);
      seek.value = String(Math.min(state.elapsed, track.duration));
    }
    updateLyricsActiveLine();
  };

  const updateLyricsActiveLine = () => {
    const lines = [...document.querySelectorAll("[data-lyric-time]")];
    if (!lines.length) return;
    let active = lines[0];
    for (const line of lines) {
      if (Number(line.dataset.lyricTime) <= state.elapsed) active = line;
    }
    lines.forEach((line) => line.classList.toggle("active", line === active));
  };

  const handleClick = (event) => {
    const modalBox = event.target.closest("[data-modal-box]");
    const menuBox = event.target.closest("[data-menu-box]");
    const target = event.target.closest("[data-action]");
    if (!target) {
      if (!menuBox && state.contextMenu) {
        state.contextMenu = null;
        render();
      }
      return;
    }
    const action = target.dataset.action;
    if (action !== "close-modal" && event.target.closest(".modal-backdrop") && !modalBox) return;
    event.preventDefault();
    event.stopPropagation();

    const id = target.dataset.id;
    const trackId = target.dataset.trackId;
    const context = target.dataset.context;

    if (action !== "open-track-menu" && action !== "open-collection-menu") {
      state.contextMenu = null;
    }

    switch (action) {
      case "navigate":
        navigate(target.dataset.view, id || null);
        break;
      case "history":
        navigateHistory(Number(target.dataset.direction));
        break;
      case "set-library-filter":
        state.libraryFilter = target.dataset.filter;
        render();
        break;
      case "search-query":
        state.mainSearch = target.dataset.query || "";
        navigate("search", null, true, { preserveFocus: false });
        break;
      case "play-context":
        playContext(id);
        break;
      case "play-track":
        playTrack(id, context);
        break;
      case "toggle-play":
        togglePlay();
        break;
      case "next":
        nextTrack();
        break;
      case "previous":
        previousTrack();
        break;
      case "toggle-like":
        toggleLike(id);
        break;
      case "add-queue":
        addToQueue(id);
        break;
      case "remove-queue":
        state.queue.splice(Number(target.dataset.index), 1);
        saveState();
        render();
        break;
      case "move-queue":
        moveQueue(Number(target.dataset.index), Number(target.dataset.direction));
        break;
      case "clear-queue":
        state.queue = [];
        saveState();
        render();
        showToast("Queue cleared.");
        break;
      case "toggle-shuffle":
        state.shuffleMode = (state.shuffleMode + 1) % 3;
        if (state.shuffleMode && state.queue.length) state.queue = shuffle(state.queue);
        saveState();
        render();
        showToast(shuffleLabel());
        break;
      case "toggle-repeat":
        state.repeatMode = (state.repeatMode + 1) % 3;
        saveState();
        render();
        showToast(repeatLabel());
        break;
      case "toggle-save-collection":
        toggleSaveCollection(id);
        break;
      case "toggle-download":
        toggleDownload(id);
        break;
      case "set-panel":
        state.rightPanel = target.dataset.panel;
        saveState();
        render();
        break;
      case "toggle-video":
        toggleVideo();
        break;
      case "toggle-mute":
        state.muted = !state.muted;
        syncAudioVolume();
        saveState();
        render();
        break;
      case "open-modal":
        state.modal = { type: target.dataset.modal, id: id || trackId || null };
        render();
        break;
      case "close-modal":
        state.modal = null;
        render();
        break;
      case "create-playlist":
        createPlaylist();
        break;
      case "create-playlist-with-track":
        createPlaylist(target.dataset.trackId);
        break;
      case "add-track-to-playlist":
        addTrackToPlaylist(trackId, target.dataset.playlistId);
        break;
      case "toggle-modal-check":
        toggleModalCheck(target.dataset.check);
        break;
      case "toggle-setting":
        toggleSetting(target.dataset.setting);
        break;
      case "select-device":
        state.activeDevice = id;
        saveState();
        render();
        showToast(`Playing on ${devices.find((device) => device.id === id)?.name}.`);
        break;
      case "set-sort":
        state.sortMode = target.dataset.sort;
        render();
        break;
      case "open-track-menu":
        openContextMenu("track", id, target);
        break;
      case "open-collection-menu":
        openContextMenu("collection", id, target);
        break;
      case "start-radio":
        startRadio(id);
        break;
      case "hide-track":
        state.hiddenTracks.add(id);
        saveState();
        render();
        showToast("Song hidden from lists.");
        break;
      case "exclude-taste":
        state.excludedTaste.add(id);
        saveState();
        render();
        showToast("Excluded from taste profile.");
        break;
      case "share":
        showToast(target.dataset.label || "Link copied.");
        state.modal = null;
        render();
        break;
      case "toast":
        showToast(target.dataset.label || "Done.");
        break;
      case "dj":
        startDj();
        break;
      case "add-all-results":
        addAllSearchResults();
        break;
      case "play-episode":
        showToast("Podcast playback is mocked. The episode control is wired.");
        break;
      case "play-audiobook":
        showToast("Audiobook playback is mocked. The chapter surface is ready.");
        break;
      default:
        break;
    }
  };

  const handleInput = (event) => {
    const target = event.target;
    const input = target.dataset.input;
    if (!input) return;
    if (input === "global-search") {
      state.mainSearch = target.value;
      if (state.view !== "search") {
        navigate("search", null, true, { preserveFocus: true });
      } else {
        render({ preserveFocus: true });
      }
      return;
    }
    if (input === "library-search") {
      state.librarySearch = target.value;
      render({ preserveFocus: true });
      return;
    }
    if (input === "seek") {
      state.elapsed = Number(target.value);
      if (currentTrack().localUrl) localAudio.currentTime = state.elapsed;
      updatePlaybackUI();
      saveState();
      return;
    }
    if (input === "volume") {
      state.volume = Number(target.value);
      state.muted = state.volume === 0;
      syncAudioVolume();
      saveState();
      render();
      return;
    }
    if (input === "crossfade") {
      state.settings.crossfade = Number(target.value);
      const label = document.getElementById("crossfade-value");
      if (label) label.textContent = `${state.settings.crossfade}s`;
      saveState();
    }
  };

  const handleChange = (event) => {
    const change = event.target.dataset.change;
    if (change === "local-files") {
      addLocalFiles(event.target.files);
      event.target.value = "";
    }
  };

  const handleContextMenu = (event) => {
    const row = event.target.closest("[data-track-id]");
    if (!row) return;
    event.preventDefault();
    const width = 260;
    state.contextMenu = {
      type: "track",
      id: row.dataset.trackId,
      x: Math.min(event.clientX, window.innerWidth - width - 10),
      y: Math.min(event.clientY, window.innerHeight - 260),
    };
    render();
  };

  const toggleLike = (id) => {
    const track = findTrack(id);
    if (state.liked.has(id)) {
      state.liked.delete(id);
      showToast(`${track.title} removed from Liked Songs.`);
    } else {
      state.liked.add(id);
      showToast(`${track.title} saved to Liked Songs.`);
      if (state.settings.downloadOnSave) state.downloaded.add("liked");
    }
    saveState();
    render();
  };

  const toggleSaveCollection = (id) => {
    if (!id || id === "liked") return;
    const item = collectionById(id);
    if (state.savedCollections.has(id)) {
      state.savedCollections.delete(id);
      showToast(`${item?.name || "Collection"} removed from your library.`);
    } else {
      state.savedCollections.add(id);
      if (state.settings.downloadOnSave) state.downloaded.add(id);
      showToast(`${item?.name || "Collection"} saved to your library.`);
    }
    saveState();
    render();
  };

  const toggleDownload = (id) => {
    const item = collectionById(id);
    if (state.downloaded.has(id)) {
      state.downloaded.delete(id);
      showToast(`${item?.name || "Collection"} removed from downloads.`);
    } else {
      state.downloaded.add(id);
      showToast(`${item?.name || "Collection"} marked for offline listening.`);
    }
    saveState();
    render();
  };

  const toggleVideo = () => {
    const track = currentTrack();
    if (!track.hasVideo) {
      showToast("This track does not have a video.");
      return;
    }
    state.videoMode = !state.videoMode;
    state.rightPanel = "now";
    saveState();
    render();
    showToast(state.videoMode ? "Switched to video." : "Switched to audio.");
  };

  const toggleSetting = (setting) => {
    if (!(setting in state.settings)) return;
    state.settings[setting] = !state.settings[setting];
    if (setting === "privateSession" && state.settings[setting]) state.rightPanel = "now";
    saveState();
    render();
    showToast(`${settingLabel(setting)} ${state.settings[setting] ? "enabled" : "disabled"}.`);
  };

  const settingLabel = (setting) =>
    setting
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (letter) => letter.toUpperCase());

  const moveQueue = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= state.queue.length) return;
    [state.queue[index], state.queue[nextIndex]] = [state.queue[nextIndex], state.queue[index]];
    saveState();
    render();
  };

  const createPlaylist = (trackToAdd = null) => {
    const nameInput = app.querySelector('[data-field="playlist-name"], [data-field="quick-playlist-name"]');
    const descriptionInput = app.querySelector('[data-field="playlist-description"]');
    const publicInput = app.querySelector('[data-field="playlist-public"]');
    const collabInput = app.querySelector('[data-field="playlist-collab"]');
    const name = nameInput?.value.trim() || "My Playlist";
    const newPlaylist = {
      id: `up-${Date.now()}`,
      name,
      owner: "You",
      description: descriptionInput?.value.trim() || "Created in the web clone.",
      cover: ["cover-a", "cover-c", "cover-e", "cover-g", "cover-i"][state.userPlaylists.length % 5],
      pinned: false,
      public: publicInput ? publicInput.checked : false,
      collaborative: collabInput ? collabInput.checked : false,
      downloaded: false,
      trackIds: trackToAdd ? [trackToAdd] : [],
    };
    state.userPlaylists.push(newPlaylist);
    state.savedCollections.add(newPlaylist.id);
    state.modal = null;
    saveState();
    navigate("playlist", newPlaylist.id);
    showToast(`${name} created${trackToAdd ? " and song added" : ""}.`);
  };

  const addTrackToPlaylist = (trackId, playlistId) => {
    const playlist = state.userPlaylists.find((item) => item.id === playlistId);
    const track = findTrack(trackId);
    if (!playlist) return;
    if (!playlist.trackIds.includes(trackId)) {
      playlist.trackIds.push(trackId);
      showToast(`${track.title} added to ${playlist.name}.`);
    } else {
      showToast(`${track.title} is already in ${playlist.name}.`);
    }
    state.modal = null;
    saveState();
    render();
  };

  const toggleModalCheck = (field) => {
    const checkbox = app.querySelector(`[data-field="${field}"]`);
    if (checkbox) checkbox.checked = !checkbox.checked;
  };

  const startRadio = (trackId) => {
    const seed = findTrack(trackId);
    const ids = allTracks()
      .filter((track) => track.genre === seed.genre || track.artistId === seed.artistId)
      .filter((track) => track.id !== seed.id && !state.hiddenTracks.has(track.id))
      .map((track) => track.id);
    state.queue = shuffle(ids).slice(0, 10);
    playTrack(seed.id, null, { keepQueue: true, noToast: true });
    showToast(`Started radio from ${seed.title}.`);
  };

  const startDj = () => {
    const ids = shuffle(allTracks().filter((track) => !state.hiddenTracks.has(track.id)).map((track) => track.id)).slice(0, 8);
    state.queue = ids.slice(1);
    playTrack(ids[0], null, { keepQueue: true, noToast: true });
    showToast("DJ picked a fresh set.");
  };

  const addAllSearchResults = () => {
    const query = state.mainSearch.trim().toLowerCase();
    const ids = allTracks()
      .filter((track) => `${track.title} ${track.artist} ${track.album} ${track.genre} ${track.year}`.toLowerCase().includes(query))
      .map((track) => track.id);
    state.queue.push(...ids);
    saveState();
    render();
    showToast(`${ids.length} search results added to queue.`);
  };

  const addLocalFiles = (fileList) => {
    const files = [...fileList].filter((file) => file.type.startsWith("audio/") || /\.(mp3|wav|m4a|ogg|aac|flac)$/i.test(file.name));
    if (!files.length) {
      showToast("No compatible audio files selected.");
      return;
    }
    const newTracks = files.map((file, index) => ({
      id: `local-${Date.now()}-${index}`,
      title: file.name.replace(/\.[^.]+$/, ""),
      artist: "Local file",
      artistId: "local-artist",
      album: "Local Files",
      albumId: "local",
      duration: duration(3, 0),
      cover: "cover-i",
      genre: "Local",
      year: 2026,
      explicit: false,
      hasVideo: false,
      localUrl: URL.createObjectURL(file),
      lyrics: lyricSet(file.name.replace(/\.[^.]+$/, "")),
    }));
    state.localTracks.push(...newTracks);
    saveState();
    render();
    showToast(`${newTracks.length} local file${newTracks.length > 1 ? "s" : ""} added.`);
  };

  const handleDragStart = (event) => {
    const row = event.target.closest("[data-queue-index]");
    if (!row) return;
    state.dragQueueIndex = Number(row.dataset.queueIndex);
    row.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    if (event.target.closest("[data-queue-index]")) event.preventDefault();
  };

  const handleDrop = (event) => {
    const row = event.target.closest("[data-queue-index]");
    if (!row || state.dragQueueIndex === null) return;
    event.preventDefault();
    const from = state.dragQueueIndex;
    const to = Number(row.dataset.queueIndex);
    if (from !== to) {
      const [item] = state.queue.splice(from, 1);
      state.queue.splice(to, 0, item);
      saveState();
    }
    state.dragQueueIndex = null;
    render();
  };

  const handleDragEnd = () => {
    state.dragQueueIndex = null;
    document.querySelectorAll(".dragging").forEach((row) => row.classList.remove("dragging"));
  };

  const handleKeydown = (event) => {
    const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
    if (typing && event.key !== "Escape") return;
    if (event.key === " ") {
      event.preventDefault();
      togglePlay();
    } else if (event.key === "ArrowRight") {
      state.elapsed = Math.min(currentTrack().duration, state.elapsed + 5);
      updatePlaybackUI();
    } else if (event.key === "ArrowLeft") {
      state.elapsed = Math.max(0, state.elapsed - 5);
      updatePlaybackUI();
    } else if (event.key.toLowerCase() === "n") {
      nextTrack();
    } else if (event.key.toLowerCase() === "p") {
      previousTrack();
    } else if (event.key.toLowerCase() === "s") {
      state.shuffleMode = (state.shuffleMode + 1) % 3;
      render();
      showToast(shuffleLabel());
    } else if (event.key.toLowerCase() === "r") {
      state.repeatMode = (state.repeatMode + 1) % 3;
      render();
      showToast(repeatLabel());
    } else if (event.key.toLowerCase() === "l") {
      toggleLike(state.playingId);
    } else if (event.key === "/") {
      event.preventDefault();
      state.view = "search";
      render();
      app.querySelector('[data-field="global-search"]')?.focus();
    } else if (event.key === "Escape") {
      state.modal = null;
      state.contextMenu = null;
      render();
    }
  };

  const tick = () => {
    if (!state.isPlaying) return;
    const track = currentTrack();
    if (track.localUrl) return;
    state.elapsed += 1;
    if (state.elapsed >= track.duration) {
      handleTrackEnd();
      return;
    }
    updatePlaybackUI();
  };

  localAudio.addEventListener("timeupdate", () => {
    if (!currentTrack().localUrl) return;
    state.elapsed = localAudio.currentTime;
    updatePlaybackUI();
  });

  localAudio.addEventListener("loadedmetadata", () => {
    const track = currentTrack();
    if (track.localUrl && Number.isFinite(localAudio.duration)) {
      track.duration = Math.round(localAudio.duration);
      render();
    }
  });

  localAudio.addEventListener("ended", handleTrackEnd);

  app.addEventListener("click", handleClick);
  app.addEventListener("input", handleInput);
  app.addEventListener("change", handleChange);
  app.addEventListener("contextmenu", handleContextMenu);
  app.addEventListener("dragstart", handleDragStart);
  app.addEventListener("dragover", handleDragOver);
  app.addEventListener("drop", handleDrop);
  app.addEventListener("dragend", handleDragEnd);
  document.addEventListener("keydown", handleKeydown);
  window.setInterval(tick, 1000);

  hydrateState();
  // Merge in tracks the signed-in user has uploaded to Singeetam (fetched
  // server-side from Supabase, R2 URLs) so they show up in "Local Files" /
  // "Your Library" alongside mock data and any drag-dropped local files.
  if (Array.isArray(window.__SINGEETAM_USER_TRACKS__)) {
    const existingIds = new Set(state.localTracks.map((track) => track.id));
    window.__SINGEETAM_USER_TRACKS__.forEach((track) => {
      if (!existingIds.has(track.id)) state.localTracks.push(track);
    });
  }
  syncAudioVolume();
  render();
})();
