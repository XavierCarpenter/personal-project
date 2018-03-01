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
res.status(200).json(obj)
      }
    ).catch(() => res.status(500).json());
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
  }
};
