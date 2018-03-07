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
      //  console.log("hit controller");
    const dbInstance = req.app.get("db");
    
    

    dbInstance
      .get_subs([req.params.id])
      .then(subs =>res.status(200).json(subs))
      .catch(() => res.status(500).json());
  }
};
