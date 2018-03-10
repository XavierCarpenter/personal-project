module.exports = {
  getAll: (req, res, next) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .get_businesses()
      .then(businesses => {
        let obj = {};
        //loop though array and sort so that they're grouped by jobtype
        for (let i = 0; i < businesses.length; i++) {
          businesses[i].jobtype = businesses[i].jobtype.replace(/ /gi, "");
          if (!obj[businesses[i].jobtype]) obj[businesses[i].jobtype] = [];
          obj[businesses[i].jobtype].push(businesses[i]);
        }
        res.status(200).json(obj);
      })
      .catch(() => res.status(500).json());
  },
  getType: (req, res, next) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .get_type()
      .then(businesses => res.status(200).json(businesses))
      .catch(() => res.status(500).json());
  },
  getOne: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_business([params.id])
      .then(business => res.status(200).json(business))
      .catch(() => res.status(500).json());
  },
  getHours: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_hours([params.id])
      .then(hours => res.status(200).json(hours))
      .catch(() => res.status(500).json());
  },
  profilePic: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_buspic([params.id])
      .then(pic => res.status(200).json(pic))
      .catch(() => res.status(500).json());
  },
  createBus: (req, res, next) => {
    const dbInstance = req.app.get("db");
    // const { params, body } = req;
    // const {busid} = req.user.id;
    const { id, name } = req.body;
    console.log("hit controller");
    console.log(req.body);

    dbInstance
      .create_bus([id, name])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  }
};
