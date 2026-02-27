const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || "Something went wrong on the server.";

  res.status(status).render("error", {
    title: `Error ${status}`,
    message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
};

module.exports = errorHandler;
