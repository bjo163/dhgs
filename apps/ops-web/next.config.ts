import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@dhgs/ui', '@dhgs/orm', '@dhgs/orm-base']
};

export default nextConfig;
