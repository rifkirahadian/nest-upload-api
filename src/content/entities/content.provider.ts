import { Content } from './content.entity';

export const contentsProviders = [
  {
    provide: 'CONTENT_REPOSITORY',
    useValue: Content,
  },
];
