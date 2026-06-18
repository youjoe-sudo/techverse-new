/** @type {import('next').NextConfig} */
const nextConfig = {
  // عمل حظر كامل لأي محاولة قراءة لملفات الداتا بيز الداخلية
  async redirects() {
    return [
      {
        source: '/data/:path*',
        destination: '/404',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;