export const getTimeAgo = (datetime: Date) => {
  const date = new Date(datetime);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // Разница в секундах

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} Min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} Hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} Days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} Months ago`;
  return `${Math.floor(diff / 31536000)} Years ago`;
};
