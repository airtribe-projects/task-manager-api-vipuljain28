const { body, validationResult } = require('express-validator');

const validateTask = [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .notEmpty()
        .withMessage('Title is required'),
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .optional(),
    body('completed')
        .isBoolean()
        .withMessage('Completed must be a boolean')
        .optional(),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateTask,
    validateRequest,
};