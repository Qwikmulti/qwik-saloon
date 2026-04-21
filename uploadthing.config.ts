import { defineConfig } from 'uploadthing';
import type { UploadthingConfig } from 'uploadthing/server';

export const config: UploadthingConfig = {
  api: {
    transporter: 'fetch',
  },
};

export { defineConfig };