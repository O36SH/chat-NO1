export function generateRoomId() {
  // Generate a 10-digit number between 1000000000 and 9999999999
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export function formatRoomId(id) {
  return `#${id}`;
}