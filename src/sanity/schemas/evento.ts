import { defineField, defineType } from "sanity";

export const evento = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fecha",
      title: "Fecha",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hora",
      title: "Hora",
      type: "string",
      description: "Ej: 19:00",
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "reference",
      to: [{ type: "categoriaEvento" }],
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Fecha (más próximo primero)",
      name: "fechaAsc",
      by: [{ field: "fecha", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "fecha",
    },
  },
});
