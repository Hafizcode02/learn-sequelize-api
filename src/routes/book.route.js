const { celebrate, Segments } = require('celebrate');
const bookController = require('../controllers/book.controller');
const schemas = require('../utils/book.schema');
const { authJwt } = require('../middleware');
const router = require('express').Router();

// Celebrate used as middleware
router.post('/', celebrate({ [Segments.BODY]: schemas.bookPost }), bookController.create);
router.get('/', [authJwt.verifyToken, authJwt.isAdmin],bookController.findAll);
router.put('/:id', celebrate({ [Segments.BODY]: schemas.bookUpdate }), bookController.update);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);
router.get('/:id', bookController.findOne);

module.exports = router;
