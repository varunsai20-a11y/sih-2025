export function getAggregateRating(type, id) {
  const all = JSON.parse(localStorage.getItem("reviews") || "{}");
  const arr = all[`${type}:${id}`] || [];
  if (arr.length === 0) return { avg: 4.2, count: 0 };
  const avg = arr.reduce((s, r) => s + r.stars, 0) / arr.length;
  return { avg, count: arr.length };
}
