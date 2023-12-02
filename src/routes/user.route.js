const { authJwt, verifyUser } = require("../middleware");
const controller = require("../controllers/user.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/users/register",
    [verifyUser.checkDuplicateUsername],
    controller.create
  );

  app.post("/api/users/login", controller.login);

  app.post("/api/users/refreshtoken", controller.refreshToken);

  app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isNotUser],
    controller.delete
  );

  app.get("/api/users", [authJwt.verifyToken], controller.getAll);

  app.get("/api/users/:id", [authJwt.verifyToken], controller.getOne);

  app.patch(
    "/api/users/:id",
    [
      authJwt.verifyToken,
      verifyUser.checkDuplicateUsername,
      verifyUser.checkRolesExisted,
    ],
    controller.update
  );
};
