const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {

  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID,
  },
  /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: isProd ? 'export' : undefined,

  /**
    * Set base path. This is the slug of your GitHub repository.
    *
    * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
    */
  basePath: isProd ? '/radio-nopal' : '',

  /**
    * Disable server-based image optimization. Next.js does not support
    * dynamic features with static exports.
    *
    * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
    */
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
