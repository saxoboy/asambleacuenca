"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Asamblea de Dios Cuenca",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Transmisiones en Vivo")
              .child(S.documentTypeList("transmision")),
            S.listItem()
              .title("Próximos Eventos")
              .child(S.documentTypeList("evento")),
            S.listItem()
              .title("Categorías de Eventos")
              .child(S.documentTypeList("categoriaEvento")),
            S.divider(),
            S.listItem()
              .title("Ministerios")
              .child(S.documentTypeList("ministerio")),
            S.listItem()
              .title("Noticias / Reseñas")
              .child(S.documentTypeList("noticia")),
            S.divider(),
            S.listItem()
              .title("Historia de la Iglesia")
              .child(
                S.document()
                  .schemaType("historia")
                  .documentId("historia-iglesia")
              ),
          ]),
    }),
    visionTool(),
    media(),
  ],
});
