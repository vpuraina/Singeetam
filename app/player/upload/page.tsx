"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const getDuration = (audioFile: File) =>
    new Promise<number>((resolve) => {
      const audio = document.createElement("audio");
      audio.preload = "metadata";
      audio.onloadedmetadata = () => resolve(Math.round(audio.duration) || 0);
      audio.onerror = () => resolve(0);
      audio.src = URL.createObjectURL(audioFile);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Choose an audio file first.");
      return;
    }
    setError(null);
    setBusy(true);

    try {
      setStatus("Requesting upload slot...");
      const presignRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, contentType: file.type }),
      });
      const presignData = await presignRes.json();
      if (!presignRes.ok) throw new Error(presignData.error || "Could not get upload URL.");

      setStatus("Uploading to storage...");
      const putRes = await fetch(presignData.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putRes.ok) throw new Error("Upload to storage failed.");

      setStatus("Reading track length...");
      const durationSeconds = await getDuration(file);

      setStatus("Saving track...");
      const saveRes = await fetch("/api/tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || file.name.replace(/\.[^.]+$/, ""),
          artistName,
          storageKey: presignData.key,
          publicUrl: presignData.publicUrl,
          durationSeconds,
        }),
      });
      const saveData = await saveRes.json();
      if (!saveRes.ok) throw new Error(saveData.error || "Could not save track.");

      setStatus("Done! Redirecting to your library...");
      router.push("/player");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-14">
      <h1 className="brand-word text-2xl font-bold">Upload a track</h1>
      <p className="mt-2 text-sm text-muted">
        MP3, WAV, OGG, M4A, AAC, or FLAC. Free plan allows up to 10 uploads.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-muted">
          Audio file
          <input
            type="file"
            accept="audio/mpeg,audio/wav,audio/ogg,audio/mp4,audio/aac,audio/flac,.mp3,.wav,.ogg,.m4a,.aac,.flac"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="rounded-lg border border-white/10 bg-panel px-3 py-2 text-white file:mr-3 file:rounded-full file:border-0 file:bg-brand file:px-3 file:py-1 file:text-[#04121f]"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-muted">
          Title (optional — defaults to file name)
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg border border-white/10 bg-panel px-3 py-2 text-white outline-none focus:border-brand"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-muted">
          Artist name
          <input
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            className="rounded-lg border border-white/10 bg-panel px-3 py-2 text-white outline-none focus:border-brand"
          />
        </label>

        {status && <p className="text-sm text-brand">{status}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-brand py-2 font-semibold text-[#04121f] hover:bg-[#63cfff] disabled:opacity-50"
        >
          {busy ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
