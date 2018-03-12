module.exports = {
  updateInfo: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;

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
  newUser: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;
    console.log(params, body);
    
    

    dbInstance
      .new_user([
        params.id,
        body.name,
        body.city,
        body.state,
        body.profilepic,
        body.profileType
      ])
      .then(() => res.status(200).json())
      .catch((err) =>  res.status(500).json());
  },
  profilePic: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_profilepic([params.id])
      .then(pic => res.status(200).json(pic))
      .catch(err => console.log(err));
  },
  createBus: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, profileType } = req;

    dbInstance
      .new_bus([params.id, profileType])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  }
};
