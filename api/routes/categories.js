const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/checkAuth');
const categoriesController = require('../controllers/categories');

router.get('/', categoriesController.index);
router.get('/:name', categoriesController.detail);
router.post('/', checkAuth, categoriesController.post_categories);
router.delete('/:id', checkAuth, categoriesController.delete_categories);
router.put('/:id', checkAuth, categoriesController.update_categories);

module.exports = router;
