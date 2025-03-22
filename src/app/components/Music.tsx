"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PLAYLIST_IDS = [
  "0qhkqNmvqlb663MoWccx5z",
  "2M7Uoo0ToVPBAtYy2iEjkE",
  "723fc0q8MFCbcVAV7zbTMg",
];

export default function Music() {
  const [tracks, setTracks] = useState<any[]>([]);

  // Fetch playlist tracks from the server-side API
  useEffect(() => {
    async function fetchTracks() {
      const response = await fetch("/api/spotify");
      const data = await response.json();
      setTracks(data);
    }
    fetchTracks();
  }, []);

  return (
    <section id="music" className="p-10 text-center bg-stars text-white">
      {/* Headline */}
      <motion.h2
        className="mb-12 text-5xl font-bold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
          My Music
        </span>
      </motion.h2>

      {/* Playlists Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
        {PLAYLIST_IDS.map((playlistId, index) => (
          <div key={index} className="w-full md:w-1/3">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${playlistId}`}
              width="100%"
              height="200"
              frameBorder="0"
              allow="encrypted-media"
              className="rounded-lg shadow-lg"
              title={`Playlist ${index + 1}`}
            ></iframe>
          </div>
        ))}
      </div>

      {/* Weekly Song Recommendations */}
      <div className="mt-16">
        <h3 className="text-4xl font-semibold mb-6" style={{ color: "#FFFFFF" }}>
          Weekly Song Recommendations
        </h3>

        {/* Big embedded Spotify playlist */}
        <div className="flex justify-center mb-10">
          <iframe
            src="https://open.spotify.com/embed/playlist/1QgDb3erxoD0IuJWtTCoB9?si=96b2c22dc34a4d47"
            width="100%"
            height="400"
            frameBorder="0"
            allow="encrypted-media"
            className="rounded-xl shadow-lg max-w-4xl w-full"
            title="Weekly Recommendations Playlist"
          ></iframe>
        </div>

        {/* Dynamic song list */}
        <div className="mt-6">
          {tracks.length > 0 && (
            <ul className="space-y-5">
              {tracks.slice(0, 20).map((track) => (
                <li
                  key={track.track.id}
                  className="flex items-center space-x-4 bg-gray-800/40 p-3 rounded-lg backdrop-blur-md"
                >
                  <img
                    src={track.track.album.images[0]?.url}
                    alt={track.track.name}
                    className="w-16 h-16 rounded-md shadow-md"
                  />
                  <div className="text-left">
                    <p className="text-lg font-medium text-white">{track.track.name}</p>
                    <p className="text-sm text-gray-400">
                      {track.track.artists.map((a: any) => a.name).join(", ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
