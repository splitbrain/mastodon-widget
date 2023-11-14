import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'mastodon-widget',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      isPrimaryPackageOutputTarget: true,
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  validatePrimaryPackageOutputTarget: true,
  testing: {
    browserHeadless: 'new',
  },
};
