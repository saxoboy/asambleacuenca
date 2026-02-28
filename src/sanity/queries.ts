import { groq } from "next-sanity";

// Transmisión activa o la más reciente
export const transmisionActivaQuery = groq`
  *[_type == "transmision"] | order(activa desc, fecha desc)[0] {
    _id, titulo, url, plataforma, activa, fecha, _updatedAt
  }
`;

// 3 más recientes para el home (estado no en vivo)
export const transmisionesRecentesQuery = groq`
  *[_type == "transmision"] | order(fecha desc) [0...3] {
    _id, titulo, url, plataforma, activa, fecha, _updatedAt
  }
`;

// Últimas 12 transmisiones para la página /web/transmisiones
export const transmisionesQuery = groq`
  *[_type == "transmision"] | order(fecha desc) [0...12] {
    _id, titulo, url, plataforma, activa, fecha, _updatedAt
  }
`;

// Eventos futuros (desde hoy)
export const eventosProximosQuery = groq`
  *[_type == "evento" && fecha >= $hoy] | order(fecha asc) {
    _id, titulo, fecha, hora,
    categoria->{ nombre, color },
    descripcion
  }
`;

// Lista de ministerios ordenados
export const ministeriosQuery = groq`
  *[_type == "ministerio"] | order(orden asc) {
    _id, nombre, slug, liderNombre,
    imagenPortada
  }
`;

// Primeros 3 ministerios para el home
export const ministeriosDestacadosQuery = groq`
  *[_type == "ministerio"] | order(orden asc) [0...3] {
    _id, nombre, slug, liderNombre,
    imagenPortada
  }
`;

// Detalle de un ministerio por slug
export const ministerioBySlugQuery = groq`
  *[_type == "ministerio" && slug.current == $slug][0] {
    _id, nombre, liderNombre, liderFoto,
    descripcion, horarios, fotos, imagenPortada
  }
`;

// Lista de noticias (más recientes primero) — para la página /noticias
export const noticiasQuery = groq`
  *[_type == "noticia"] | order(fecha desc) {
    _id, titulo, slug, fecha,
    imagenPortada,
    categoria->{ nombre, color }
  }
`;

// Las 4 más recientes para el home (muestra 3, detecta si hay más con la 4ª)
export const noticiasRecentesQuery = groq`
  *[_type == "noticia"] | order(fecha desc) [0...4] {
    _id, titulo, slug, fecha,
    imagenPortada,
    categoria->{ nombre, color }
  }
`;

// Detalle de noticia por slug
export const noticiaBySlugQuery = groq`
  *[_type == "noticia" && slug.current == $slug][0] {
    _id, titulo, fecha,
    imagenPortada,
    categoria->{ nombre, color },
    descripcion,
    "galeria": galeria[]{ _key, asset, hotspot, crop }
  }
`;

// Historia de la iglesia (singleton)
export const historiaQuery = groq`
  *[_type == "historia"][0] {
    titulo, contenido, fotosAntiguas
  }
`;
