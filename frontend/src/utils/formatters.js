export const formatWeight = (kg) => {
  if (kg === null || kg === undefined || isNaN(kg)) return '0.0 kg';
  return `${Number(kg).toFixed(1)} kg`;
};

export const formatPercentage = (val) => {
  if (val === null || val === undefined || isNaN(val)) return '0%';
  return `${Number(val).toFixed(1)}%`;
};

export const truncateHash = (hash, len = 8) => {
  if (!hash) return '';
  if (hash.length <= len * 2) return hash;
  return `${hash.substring(0, len)}...${hash.substring(hash.length - len)}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return 'Just now';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + d.toLocaleDateString();
  } catch (e) {
    return dateStr;
  }
};
