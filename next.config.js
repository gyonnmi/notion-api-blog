/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // 이 도메인에서 온 건 안전하다고 등록
    domains: ['s3.us-west-2.amazonaws.com', 'www.notion.so'],
  },
};

module.exports = nextConfig;
