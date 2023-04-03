const models = require('../models');
const Permission = models.Permission;
const RolePermission = models.Role_Permission;

const checkPermission = (permName) => async (req,res,next)=>{
    const perm = await Permission.findOne({ where: { perm_name: permName } });

    const rolePermission = await RolePermission.findOne({
        where: {
            role_id: req.user.role_id,
            perm_id: perm.id
        }
    })

    if (rolePermission) {
        next();
    } else {
        return res.json({ msg: "Sorry you have not access" });
    }

}

module.exports = checkPermission;

