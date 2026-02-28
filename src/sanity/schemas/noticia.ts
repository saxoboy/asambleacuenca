import { defineField, defineType } from "sanity";
import { GaleriaInput } from "../components/galeria-input";

export const noticia = defineType({
  name: "noticia",
  title: "Noticia / Reseña",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "titulo" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fecha",
      title: "Fecha del evento",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imagenPortada",
      title: "Imagen de Portada",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "reference",
      to: [{ type: "categoriaEvento" }],
    }),
    defineField({
      name: "descripcion",
      title: "Contenido / Reseña",
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
      name: "galeria",
      title: "Galería de Fotos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
      components: { input: GaleriaInput },
    }),
  ],
  orderings: [
    {
      title: "Más reciente primero",
      name: "fechaDesc",
      by: [{ field: "fecha", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "fecha",
      media: "imagenPortada",
    },
  },
});
