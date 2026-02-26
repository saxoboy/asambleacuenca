import { defineField, defineType } from "sanity";

export const historia = defineType({
  name: "historia",
  title: "Historia de la Iglesia",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      initialValue: "Historia de la Iglesia",
    }),
    defineField({
      name: "contenido",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Descripción de la foto",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "fotosAntiguas",
      title: "Fotos Antiguas",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Descripción / año aproximado",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "titulo" },
  },
});
