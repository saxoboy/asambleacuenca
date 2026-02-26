import { defineField, defineType } from "sanity";

export const ministerio = defineType({
  name: "ministerio",
  title: "Ministerio",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre del Ministerio",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "nombre" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imagenPortada",
      title: "Imagen de Portada",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "liderNombre",
      title: "Nombre del Líder",
      type: "string",
    }),
    defineField({
      name: "liderFoto",
      title: "Foto del Líder",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "horarios",
      title: "Horarios",
      type: "text",
      rows: 3,
      description: "Ej: Sábados 16:30 — Domingos 11:30",
    }),
    defineField({
      name: "fotos",
      title: "Galería de Fotos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "orden",
      title: "Orden de aparición",
      type: "number",
      description: "Número para ordenar los ministerios en la lista",
    }),
  ],
  orderings: [
    {
      title: "Orden de aparición",
      name: "ordenAsc",
      by: [{ field: "orden", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "nombre",
      subtitle: "liderNombre",
      media: "imagenPortada",
    },
  },
});
