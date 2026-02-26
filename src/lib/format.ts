export function formatFecha(fechaStr: string) {
  return new Date(fechaStr + "T00:00:00").toLocaleDateString("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
