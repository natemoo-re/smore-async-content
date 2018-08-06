import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  copy: [{ src: 'docs' }],
  globalStyle: 'src/global/app.css'
};
