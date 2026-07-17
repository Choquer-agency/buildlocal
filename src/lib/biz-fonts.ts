// Curated per-business font options. Set BusinessProfile.fontKey to switch the
// whole site's typeface. Default keeps the BuildLocal house font (Neue Montreal).
export interface BizFont {
  name: string;
  stack: string; // CSS font-family value
  googleHref?: string; // Google Fonts stylesheet to load (omit for default)
}

export const BIZ_FONTS: Record<string, BizFont> = {
  default: { name: "House (Neue Montreal)", stack: "var(--font-neue-montreal)" },
  modern: { name: "Modern (Poppins)", stack: "'Poppins'", googleHref: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" },
  clean: { name: "Clean (Inter)", stack: "'Inter'", googleHref: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
  elegant: { name: "Elegant (Playfair)", stack: "'Playfair Display'", googleHref: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" },
  bold: { name: "Bold (Archivo)", stack: "'Archivo'", googleHref: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap" },
  friendly: { name: "Friendly (Nunito)", stack: "'Nunito'", googleHref: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" },
};

export function getBizFont(key?: string): BizFont {
  return (key && BIZ_FONTS[key]) || BIZ_FONTS.default;
}
