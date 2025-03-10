const express = require("express");

const {
  getAllProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getAllProperties);

router.use(requireAuth)

router.post("/", createProperty);
router.get("/:propertyId", getPropertyById);
router.put("/:propertyId", updateProperty);
router.delete("/:propertyId", deleteProperty);

module.exports = router;
