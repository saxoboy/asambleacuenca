import { defineField, defineType } from "sanity";

export const categoriaEvento = defineType({
  name: "categoriaEvento",
  title: "Categoría de Evento",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color del badge",
      type: "string",
      description: "Color en formato HEX (ej: #006096)",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "nombre" },
  },
});
