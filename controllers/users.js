const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200). json(users);
    }); 

};

// Ensure ObjectId is not already declared
if (!ObjectId) {
    const { ObjectId } = require('bson');
}

const getSingle = async (req, res) => {
    const userId = req.params.id;

    // Sanitize userId to remove non-hexadecimal characters
    const sanitizedUserId = userId.replace(/[^0-9a-fA-F]/g, '');

    // Validate that sanitizedUserId is a 24-character hex string
    if (sanitizedUserId.length !== 24) {
        res.status(400).json({ error: 'Invalid user ID format' });
        return;
    }

    try {
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: new ObjectId(sanitizedUserId) });
        const users = await result.toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const createUser = async (req, res) => {+
    console.log('testing')
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(201).send(response);
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.');
    }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId});
    if (response.deleteCount > 0) {
        res.status(204). send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};