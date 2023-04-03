const Permission = require('../models').Permission;

exports.addPer = async (req,res) => {
    try {
        const perm = await Permission.create(req.body)
            res.status(201).send(perm);
                
    } catch (e) {
        console.log(e)

    }
}


exports.getPer = async (req,res) => {
    try {
        const perms = await Permission.findAll();
        res.status(200).send(perms)  } catch (e) {
        console.log(e)

    }
}