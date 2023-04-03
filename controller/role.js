const Role = require('../models').Role;

exports.createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body)
        res.json({ role });

    } catch (e) {
        console.log(e);
    }
}

exports.getRole = async (req, res) => {
    try {
        const role = await Role.findAll({
            include: [
                {
                    model: Permission,
                },
                {
                    model: User,
                }
            ]
        })
        res.status(200).send(role);
    } catch (error) {
        res.status(403).send(error);
    }
}

exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
            const data = await Role.destroy({where: {id: req.params.id}})
            res.status(200).send({ 'message': 'Role deleted' });
        } else {
            res.status(404).send({'message': 'Role not found'});
        }
    } catch (error) {
        res.status(403).send(error);
    }
}