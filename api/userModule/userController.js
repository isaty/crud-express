const router = require('express').Router();
const userService = require('./userService');
const validator = require('../../common/validation/validator')

//registering get request
router.get('/:id', async (req, res, next) => {
    try {
       
        const userId = req.params['id'];
        if (!userId) {
            throw { "details": "userId not found" };
        }
        const user = await userService.getUser(userId);
        return res.status(200).send(user);
    }
    catch (e) {
        console.log("Error occured while fetching user", e);
        return res.status(400).json(e);
    }
});


//registering post request
router.post('/', async (req, res, next) => {
    try {
        await validator.validateAndSanitize(req.body);
        const user = await userService.createUser(req.body);
        return res.status(200).send(user);
    }
    catch (e) {
        console.log("Error occured while creating user", e);
        return res.status(400).json(e);
    }
});

//registering put request
router.put('/:id', async (req, res, next) => {
    try {
        const userId = req.params['id'];
        if (!userId) {
            throw { "details": "userId not found" };
        }
        await validator.validateAndSanitize(req.body);
        const user = await userService.replaceUser(userId,req.body);
        console.log(user)
        return res.status(200).send(user);
    }
    catch (e) {
        console.log("Error occured while replace user", e);
        return res.status(400).send(e);
    }
});

//registering patch request
router.patch('/:id', async (req, res, next) => {
    try {
        const userId = req.params['id'];
        if (!userId) {
            throw { "details": "userId not found" };
        }
        await validator.validateAndSanitize(req.body);
        console.log(req.body)
        const user = await userService.patchUser(userId,req.body);
        return res.status(200).send(user);
    }
    catch (e) {
        console.log("Error occured while updating user", e);
        return res.status(400).send(e);
    }
});

//registering get request
router.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.params['id'];
        if (!userId) {
            throw { "details": "userId not found" };
        }
        const user = await userService.deleteUser(userId);
        return res.status(200).send(user);
    }
    catch (e) {
        console.log("Error occured while deleting user", e);
        return res.status(400).send(e);
    }
});

module.exports = router;