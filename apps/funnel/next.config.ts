import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * `@ecomania/shared` ships ESM from its own `dist/`. Transpiling it here keeps the funnel
   * building when the shared package is edited without a rebuild being strictly ordered.
   */
  transpilePackages: ['@ecomania/shared'],
};

export default nextConfig;
