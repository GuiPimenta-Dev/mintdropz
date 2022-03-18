const UserModel = require("../models/user");

module.exports = {
  loginUser: function (email, password, callback) {
    UserModel.findOne({ email: email }).exec(function (error, user) {
      if (error) {
        callback({ error: true });
      } else if (!user) {
        callback({ error: true });
      } else {
        user.comparePassword(password, function (matchError, isMatch) {
          if (matchError) {
            callback({ error: true });
          } else if (!isMatch) {
            callback({ error: true });
          } else {
            callback({ success: true });
          }
        });
      }
    });
  },
};
