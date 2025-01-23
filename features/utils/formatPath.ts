export const formatPath = (str: string) => {
  if (!str.trim()) return '/';
  return str.toLowerCase().replace(/-/g, ' ').replace(/_/g, ' ');
};