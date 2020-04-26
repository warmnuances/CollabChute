exports.shouldCompress = (req,res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }
  return compression.filter(req,res);
}