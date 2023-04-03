const checkPermission = require('../middleware/checkPermission');
const models = require('../models');
const User = models.User;

exports.createNewUser = async (req, res) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            fullname: req.body.fullname,
            phone: req.body.phone,
            role_id: req.body.role_id
        })

        res.json("register")
    } catch (e) {
        console.log(e)
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.findAll()

        res.json(users)
    } catch (e) {
        console.log(e)
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        res.json(user)

    } catch (e) {
        console.log(e)
    }
}

exports.UpdateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.json({ msg: 'user not exist' });
        }
        const data = await User.update({
            email: req.body.email || user.email,
            password: req.body.password || user.password,
            fullname: req.body.fullname || user.fullname,
            phone: req.body.phone || user.phone,
            role_id: req.body.role_id || user.role_id
        }, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({ 'message': 'User updated' });



    } catch (e) {
        console.log(e)
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.json({ msg: 'user not exist' });
        }
        const data = await User.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({ 'message': 'User deleted' });


    } catch (e) {
        console.log(e)
    }
}
