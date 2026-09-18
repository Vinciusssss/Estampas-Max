const paths = {
  printer: '<path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2" /><rect x="6" y="14" width="12" height="7" rx="1" /><circle cx="17" cy="11.5" r="0.8" fill="currentColor" stroke="none" />',
  film: '<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 5v14M17 5v14M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4" />',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" />',
  frame: '<rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="m4 15 4.5-4.5a2 2 0 0 1 2.8 0L16 15" /><circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none" />',
  mug: '<path d="M5 4h11v9a5 5 0 0 1-5 5H9a4 4 0 0 1-4-4V4Z" /><path d="M16 7h1.5a2.5 2.5 0 0 1 0 5H16" /><path d="M8 2v2M11 2v2" />',
  shirt: '<path d="M8 4 4 7l2 3 2-1.4V20h8V8.6L18 10l2-3-4-3-2 2h-4L8 4Z" />',
  cup: '<path d="M6 8h12l-1 11a2 2 0 0 1-2 1.8H9A2 2 0 0 1 7 19L6 8Z" /><path d="M5 8h14M9 4c-.6 1 .6 1.5 0 2.5M13 3.5c-.6 1 .6 1.5 0 2.5" />',
  cap: '<path d="M4 15a8 8 0 0 1 15.5-2.7c.3.8-.3 1.7-1.2 1.7H12" /><path d="M12 14H4.5A1.5 1.5 0 0 1 3 12.5" /><path d="M12 6v4" />',
  bag: '<path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />',
  tile: '<rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="M4 9.5h16M4 14.5h16M9.5 4v16M14.5 4v16" />',
  mousepad: '<rect x="3" y="7" width="18" height="10" rx="2" /><circle cx="16.5" cy="12" r="1.6" />',
  gift: '<rect x="3.5" y="9" width="17" height="4" rx="1" /><path d="M5 13v7h14v-7M12 9v11" /><path d="M12 9S10.5 4 8 5.5 12 9 12 9Zm0 0s1.5-5 4-3.5S12 9 12 9Z" />',
  infinity: '<path d="M6.5 8.5a3.5 3.5 0 1 0 0 7c2.2 0 3.5-1.9 5.5-4s3.3-3 5.5-3a3.5 3.5 0 1 1 0 7c-2.2 0-3.5-1.9-5.5-4s-3.3-3-5.5-3Z" />',
  star: '<path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6L12 3Z" />',
  briefcase: '<rect x="3" y="7.5" width="18" height="12" rx="1.5" /><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12h18" />',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.9-1 1.4-2s-.2-2.2 1-2.5c3.3-.8 5.6-3.1 5.6-6.2C20 6.4 16.4 3 12 3Z" /><circle cx="8" cy="11" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" />',
  brush: '<path d="M14.5 3.5 20.5 9.5 10 20H4v-6L14.5 3.5Z" /><path d="M13 5 19 11" />',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />',
  shield: '<path d="M12 3 4.5 6v5.5C4.5 16.4 7.8 20.4 12 21c4.2-.6 7.5-4.6 7.5-9.5V6L12 3Z" /><path d="m9 12 2 2 4-4" />',
  check: '<path d="M4 12.5 9 17.5 20 6.5" />',
  x: '<path d="M6 6 18 18M18 6 6 18" />',
  plus: '<path d="M12 5v14M5 12h14" />',
  alert: '<path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4" /><circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />',
  spark: '<path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19" />',
  target: '<circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />',
  flame: '<path d="M12 2c1 3-3 4.5-3 8a3 3 0 0 0 6 0c1.5 1 2 2.8 2 4.2A5.2 5.2 0 0 1 12 22a5.5 5.5 0 0 1-5.5-5.5C6.5 12 9 9.5 9 7c0 1.5.7 2 1.3 2.3C10.7 6 10 4 12 2Z" />',
  search: '<circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />',
  gamepad: '<rect x="2" y="7" width="20" height="11" rx="5" /><path d="M7 10v4M5 12h4" /><circle cx="15.5" cy="10.5" r="1" fill="currentColor" stroke="none" /><circle cx="18" cy="13" r="1" fill="currentColor" stroke="none" />',
};

export function icon(name, className = 'w-6 h-6') {
  const inner = paths[name] || paths.star;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="${className}">${inner}</svg>`;
}

export function iconBadge(name, size = 'md') {
  const dims = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14';
  const iconSize = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';
  return `
    <div class="icon-badge ${dims}">
      ${icon(name, iconSize)}
    </div>
  `;
}
