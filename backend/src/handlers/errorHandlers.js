exports.catchErrors = (fn) => {
    return function (req, res, next) {
      return fn(req, res, next).catch((error) => {
        if (error.name == 'ValidationError') {
          return res.status(400).json({
            success: false,
            result: null,
            message: 'Required fields are not supplied',
            controller: fn.name,
            error: error,
          });
        } else {
          // Server Error
          return res.status(500).json({
            success: false,
            result: null,
            message: error.message,
            controller: fn.name,
            error: error,
          });
        }
      });
    };
  };