//It is one approach

const checkAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Not Allowed');
  }
}

const checkUser = (req, res, next) => {
  if (req.user.role === 'user') {
    next();
  } else {
    res.status(403).send('Not Allowed');
  }
}

const checkRole = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'user') {
    next();
  } else {
    res.status(403).send('Not Allowed');
  }
}



//It is second approach

const checkSRole = (roles) => async (req, res, next) => {

  !roles.includes(req.user.role)
    ? res.status(401).json("Sorry you do not have access to this route")
    : next();
};


//3rd Approach

const roles = {
  admin: ['create', 'read', 'update', 'delete'],
  user: ['read', 'update'],
  guest: ['read']
};

const checkPRole = (permission) => async (req, res, next) => {

  if (!roles[req.user.role].includes(permission)) {
    return res.status(403).send('Access denied');
  }
  next();
};



module.exports = { checkAdmin, checkRole, checkUser, checkSRole,checkPRole };