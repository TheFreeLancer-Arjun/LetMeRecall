/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.prod.website-files.com',
      'letmerecall.vercel.app',
      'encrypted-tbn0.gstatic.com',
      '1.bp.blogspot.com',
      'u100s.s3.amazonaws.com',
      'upload.wikimedia.org' // ✅ add this line
    ],
  },
};

module.exports = nextConfig;
