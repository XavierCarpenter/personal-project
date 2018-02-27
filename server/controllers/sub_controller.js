module.exports = {
  createSub: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { userid, busid } = req.body;
    // console.log(req.body);

    dbInstance
      .create_sub([userid, busid])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },
  getSubs: (req, res, next) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .get_subs()
      .then(products => res.status(200).json(products))
      .catch(() => res.status(500).json());
  }
};
