"use client";

import { useCallback, useRef, useState } from "react";
import { set, useClient } from "sanity";
import type { ArrayOfObjectsInputProps } from "sanity";

export function GaleriaInput(props: ArrayOfObjectsInputProps) {
  const { value, onChange, renderDefault } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  const handleFiles = useCallback(
    async (files: FileList) => {
      const fileArray = Array.from(files);
      if (!fileArray.length) return;

      setProgress({ done: 0, total: fileArray.length });

      try {
        const newItems = await Promise.all(
          fileArray.map(async (file) => {
            const asset = await client.assets.upload("image", file, {
              filename: file.name,
            });
            setProgress((p) => p && { ...p, done: p.done + 1 });
            return {
              _type: "image" as const,
              _key: crypto.randomUUID(),
              asset: { _type: "reference" as const, _ref: asset._id },
            };
          })
        );

        const current = Array.isArray(value) ? value : [];
        onChange(set([...current, ...newItems]));
      } catch (err) {
        console.error("Error subiendo fotos:", err);
      } finally {
        setProgress(null);
      }
    },
    [client, onChange, value]
  );

  const isUploading = progress !== null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        style={{
          alignSelf: "flex-start",
          padding: "8px 18px",
          background: isUploading ? "#555" : "#2276fc",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: isUploading ? "not-allowed" : "pointer",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.01em",
        }}
      >
        {isUploading
          ? `Subiendo ${progress.done} de ${progress.total}...`
          : "⬆ Subir varias fotos"}
      </button>

      {renderDefault(props)}
    </div>
  );
}
