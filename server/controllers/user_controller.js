module.exports = {
  updateInfo: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;
    console.log(params, body);

    dbInstance
      .update_info([
        params.id,
        body.name,
        body.city,
        body.state,
        body.profilepic
      ])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },
  profilePic: (req, res, next) => {
    console.log("hit controller");
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_profilepic([params.id])
      .then(pic => res.status(200).json(pic))
      .catch(err => console.log(err));
  },
  createBus: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;
 

    dbInstance
      .new_bus([
        params.id,
        body.profileType,
      ])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  }
};