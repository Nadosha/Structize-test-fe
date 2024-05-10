/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    app_name: 'Structize Test',
    node_env: process.env.NODE_ENV,
    applicationURL: process.env.APPLICATION_URL,
    email: process.env.GOOGLE_EMAIL,
    password: process.env.GOOGLE_PASSWORD,
    smtpHost: process.env.SMTP_FROM_EMAIL,
    backendURL: process.env.BACKEND_URL,
  },
  output: 'standalone',
};

export default nextConfig;
