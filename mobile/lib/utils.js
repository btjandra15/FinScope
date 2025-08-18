export function formatDate(dateString) {
  // Formats date nicely
  // Ex: Changes this "2025-05-20" to this "May 20, 2025"
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}