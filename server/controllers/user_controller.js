module.exports = {
  updateName: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;

    dbInstance
      .update_name([params.id, body])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },
  updateCity: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;

    dbInstance
      .update_city([params.id, body])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },
  updateState: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;

    dbInstance
      .update_State([params.id, body])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  }
};