module.exports = {
  updateInfo: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;
    console.log(params, body);

    dbInstance
      .update_businfo([
        params.id,
        body.name,
        body.city,
        body.state,
        body.profilepic
      ])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  }
};