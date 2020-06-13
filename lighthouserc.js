module.exports = {
  ci: {
    collect: {
      url: ["http://localhost/index.html", "http://localhost/about/index.html"],
      staticDistDir: "./public",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
}
