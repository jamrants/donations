module.exports = {
  ci: {
    collect: {
      url: ["http://localhost/index.html", "http://localhost/about.html"],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
}
