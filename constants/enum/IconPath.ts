const IconPath = {
  ADD: '<path d="M6 12H18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18V6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  CLOSE_CIRCLE: '<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.16998 14.83L14.83 9.17004" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.83 14.83L9.16998 9.17004" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  CLOSE_SQUARE: '<path d="M9.16998 14.83L14.83 9.17004" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.83 14.83L9.16998 9.17004" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  INSTAGRAM: '<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.6361 7H17.6477" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  MENU: '<path d="M3 7H21" stroke-width="1.5" stroke-linecap="round"/><path d="M3 12H21" stroke-width="1.5" stroke-linecap="round"/><path d="M3 17H21" stroke-width="1.5" stroke-linecap="round"/>',
  SEND_2: '<path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.11 13.6501L13.69 10.0601" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
} as const;

type IconPath = keyof typeof IconPath

export default IconPath;
