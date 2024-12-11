export function generateMessageId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatMessageTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
}