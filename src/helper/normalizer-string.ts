export function normalizerString(input?: string): string {
  if (!input) return "";
  // Reemplaza los caracteres acentuados por sus equivalentes sin acentos
  const normalized = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Elimina todos los caracteres que no sean letras o números
  const cleanString = normalized.replace(/[^a-zA-Z0-9 ]/g, "");

  // Reemplaza múltiples espacios en blanco por un solo espacio
  const finalString = cleanString.replace(/\s+/g, " ").trim();

  return finalString;
}
