
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'https://local-global-translate.herokuapp.com/media/:path*' // Proxy to Backend
      }
    ]
  }
}
