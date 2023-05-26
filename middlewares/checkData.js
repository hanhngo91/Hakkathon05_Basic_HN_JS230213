//Check if input value is empty:
const checkData = (req, res, next) => {
  const { Content } = req.body;
  if (Content === "") {
    return res.status(400).json({
      status: "Bad request",
      message: "Content is empty!",
    });
  }
  next();
};

module.exports = checkData;
