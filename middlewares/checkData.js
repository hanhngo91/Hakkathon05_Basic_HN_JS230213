//Check if input value is empty:
const checkData = (req, res, next) => {
  const { Content } = req.body;
  if (Content === "" || Content === undefined || Content === null) {
    return res.status(400).json("Content is empty!");
  }
  next();
};

module.exports = checkData;
