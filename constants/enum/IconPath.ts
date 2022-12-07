const IconPath = {
  ARROW_LEFT: '<path stroke-miterlimit="10" stroke-width="1.5" d="M16.5 21l-9-9 9-9"/>',
  ARROW_RIGHT: '<path stroke-miterlimit="10" stroke-width="1.5" d="M7.5 3l9 9-9 9"/>',
  CROSS: '<style>.st0{stroke-width:1.5;stroke-linecap:square}</style><path d="M4 4l16 16" class="st0"/><path d="M4 20L20 4" class="st0"/>',
  HEART_OUTLINE: '<path stroke-miterlimit="10" stroke-width="1.5" d="M19.7 4.7C17.6 2.6 13.9 3 12 6.1 10.1 3 6.4 2.6 4.3 4.7 3.1 5.8 2.6 7.3 2.6 8.8c0 1.3.4 2.5 1.2 3.6.1.2.3.4.5.5l7.7 7.7h0l7.7-7.7c.2-.2.3-.4.5-.5.8-1 1.2-2.3 1.2-3.6 0-1.5-.5-3-1.7-4.1z"/>',
  HEART_FILLED: '<path d="M19.7 4.7C17.6 2.6 13.9 3 12 6.1 10.1 3 6.4 2.6 4.3 4.7 3.1 5.8 2.6 7.3 2.6 8.8c0 1.3.4 2.5 1.2 3.6.1.2.3.4.5.5l7.7 7.7 7.7-7.7c.2-.2.3-.4.5-.5.8-1 1.2-2.3 1.2-3.6 0-1.5-.5-3-1.7-4.1z"/>',
  INSTAGRAM: '<style>.st1{stroke-width:1.5;stroke-miterlimit:10}</style><g id="Layer_2"><path d="M3 3h18.1v18.1H3z" class="st1"/><circle cx="12" cy="12" r="4.5" class="st1"/><circle cx="17.7" cy="6.3" r="1.2" stroke-miterlimit="10"/></g>',
  MAIL: '<style>.st0{stroke-width:1.5;stroke-miterlimit:10}</style><g><path d="M2.9 4.5H21v15H2.9z" class="st0"/><path d="M2.9 4.5l9 9 9.1-9" class="st0"/></g>',
  MENU: '<style>.st0{stroke-width:1.5;stroke-linecap:square}</style><path d="M3 7h18" class="st0"/><path d="M3 12h18" class="st0"/><path d="M3 17h18" class="st0"/>',
  SPIN: '<path d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44712 2 1.96997 6.47715 1.96997 12C1.96997 17.5228 6.44712 22 11.97 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.20996 16C8.25996 17.51 10.02 18.5 12 18.5C13.98 18.5 15.73 17.51 16.79 16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  TELEGRAM: '<style>.st0{stroke-width:1.5;stroke-miterlimit:10}</style><g><path d="M21 3L3 8.7l7.5 4.7 4.8 7.6zM10.5 13.4L21 3" class="st0"/></g>',
} as const;

type IconPath = keyof typeof IconPath

export default IconPath;
