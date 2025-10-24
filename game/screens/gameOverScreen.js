{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    { "source": "/api/health", "destination": "/index.js" },
    { "source": "/api/:path*", "destination": "/index.js" },
    { "source": "/game/assets/:path*", "destination": "/game/assets/:path*" },
    { "source": "/game/screens/:path*", "destination": "/game/screens/:path*" },
    { "source": "/game/styles.css", "destination": "/game/styles.css" },
    { "source": "/game/app.js", "destination": "/game/app.js" },
    { "source": "/game", "destination": "/game/index.html" },
    { "source": "/results/assets/:path*", "destination": "/app2/assets/:path*" },
    { "source": "/results/screens/:path*", "destination": "/app2/screens/:path*" },
    { "source": "/results/styles.css", "destination": "/app2/styles.css" },
    { "source": "/results/app.js", "destination": "/app2/app.js" },
    { "source": "/results", "destination": "/app2/index.html" },
    { "source": "/assets/:path*", "destination": "/game/assets/:path*" },
    { "source": "/screens/:path*", "destination": "/game/screens/:path*" },
    { "source": "/styles.css", "destination": "/game/styles.css" },
    { "source": "/app.js", "destination": "/game/app.js" },
    { "source": "/", "destination": "/index.js" },
    { "source": "/:path*", "destination": "/index.js" }
  ],
  "headers": [
    {
      "source": "/game/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/app2/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
