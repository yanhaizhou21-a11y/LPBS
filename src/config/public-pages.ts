import type { MessageKey } from '../i18n';

export type PublicPageId = 'landing' | 'landing2' | 'products';

export type PublicPageDefinition = {
  id: PublicPageId;
  path: '/' | '/home2' | '/products';
  labelKey: MessageKey;
  descriptionKey?: MessageKey;
  group: 'homepages' | 'primary';
  navigationVisible: boolean;
};

export const PUBLIC_PAGES: readonly PublicPageDefinition[] = [
  { id: 'landing', path: '/', labelKey: 'nav.homeOne', descriptionKey: 'nav.homeOneDescription', group: 'homepages', navigationVisible: true },
  { id: 'landing2', path: '/home2', labelKey: 'nav.homeTwo', descriptionKey: 'nav.homeTwoDescription', group: 'homepages', navigationVisible: true },
  { id: 'products', path: '/products', labelKey: 'nav.products', group: 'primary', navigationVisible: false },
];

export const publicPageFromPath = (pathname: string): PublicPageId | null =>
  PUBLIC_PAGES.find((page) => page.path === pathname)?.id ?? null;

export const isPublicPage = (view: string): view is PublicPageId =>
  PUBLIC_PAGES.some((page) => page.id === view);
