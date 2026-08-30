"use client";

import Script from "next/script";

type UserTrack = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number;
  cover: string;
  genre: string;
  year: number;
  explicit: boolean;
  hasVideo: boolean;
  localUrl: string;
  lyrics: unknown[];
};

export default function LegacyPlayerMount({ userTracks }: { userTracks: UserTrack[] }) {
  // Escape "<" so a malicious track title (e.g. containing "</script>")
  // can't break out of this inline script tag.
  const safeTracksJson = JSON.stringify(userTracks).replace(/</g, "\\u003c");

  return (
    <>
      <link rel="stylesheet" href="/player/styles.css" />
      <div id="app" className="boot-shell">
        <div className="boot-card">
          <img className="boot-mark" src="/logo.png" alt="" />
          <p>Loading Singeetam...</p>
        </div>
      </div>
      <div id="toast-region" className="toast-region" aria-live="polite" aria-atomic="true" />
      <audio id="localAudio" preload="metadata" />

      {/* Plain inline script (not next/script) so it runs in document order,
          guaranteed to execute before the app.js tag right after it. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__SINGEETAM_USER_TRACKS__ = ${safeTracksJson};`,
        }}
      />
      <Script src="/player/app.js" strategy="afterInteractive" />
    </>
  );
}
