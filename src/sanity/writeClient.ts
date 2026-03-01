import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/** Cliente con permisos de escritura — usar solo en rutas de servidor/API */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
