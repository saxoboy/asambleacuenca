import { defineField, defineType } from "sanity";

export const transmision = defineType({
  name: "transmision",
  title: "Transmisión en Vivo",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL de la transmisión",
      type: "url",
      description: "Link de YouTube o Facebook Live",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "plataforma",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Facebook", value: "facebook" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "activa",
      title: "¿Está en vivo ahora?",
      type: "boolean",
      description: "Activa esto cuando la transmisión esté ocurriendo",
      initialValue: false,
    }),
    defineField({
      name: "fecha",
      title: "Fecha del servicio",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "plataforma",
      active: "activa",
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active ? "🔴 EN VIVO — " : ""}${title}`,
        subtitle: subtitle === "youtube" ? "YouTube" : "Facebook",
      };
    },
  },
});
