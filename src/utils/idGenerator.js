export function generateUserId() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export function formatUserId(id) {
  return `#${id}`;
}