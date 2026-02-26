export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-25";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Fallback a "placeholder" para que el build no falle antes de configurar el proyecto
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
