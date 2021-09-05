const express = require('express');
const router = express.Router();
const {
  getNodesTree,
  updateNodeById,
  deleteNodeById,
  createNodeById,
  getCSV,
} = require('../controllers/nodesTreeController');

router
  .route('/node_tree')
  .get(getNodesTree)
  .put(updateNodeById)
  .delete(deleteNodeById)
  .post(createNodeById);
////////////////////////
// Get  tab-delimited CSV
router.route('/node_tree_csv').get(getCSV);

module.exports = router;
