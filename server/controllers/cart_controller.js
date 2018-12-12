const swag = require("../models/swag");

module.exports = {
  add: (req, res, next) => {
    const { id } = req.query;
    let { cart } = req.session.user;

    const index = cart.findIndex(swag => swag.id == id);
    console.log("i", index);
    if (index === -1) {
      const swagIndex = swag.findIndex(swag => swag.id == id);
      console.log("selected", swag[swagIndex]);
      cart.push(swag[swagIndex]);
      req.session.user.total += swag[swagIndex].price;
    }

    res.status(200).send(req.session.user);
  },

  delete: (req, res, next) => {
    const { id } = req.query;
    let { cart } = req.session.user;

    const selectedSwag = cart.find(swag => swag.id == id);

    if (selectedSwag) {
      const i = cart.findIndex(swag => swag.id == id);
      cart.splice(i, 1);
      req.session.cart;
      req.session.user.total -= selectedSwag.price;
    }
    res.status(200).send(req.session.user);
  },

  checkout: (req, res, next) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;
    res.status(200).send(req.session.user);
  }
};
