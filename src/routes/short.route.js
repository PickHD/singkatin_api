const router = require("express").Router();
const { body, param } = require("express-validator");

//!IMPORT CONTROLLER & MIDDLEWARE
const { getAllUrl, createShortUrlHandler, getRedirectUrl, delOneShortUrlHandler } = require("../controllers/short.controller");
const verifyApiKey = require("../middlewares/verifyApiKey.middleware");
const { fetchLimiter, createLimiter } = require("../middlewares/rateLimitHandler.middleware");

router.get("/", [verifyApiKey, fetchLimiter], getAllUrl);
router.post("/", [verifyApiKey, createLimiter, body("full_url").notEmpty().isLength({ max: 255 }).isURL()], createShortUrlHandler);

router.get("/:shortUrl", [verifyApiKey, fetchLimiter, param("shortUrl").notEmpty().isLength({ min: 10 }).isString()], getRedirectUrl);
router.delete("/:shortUrl", [verifyApiKey, createLimiter, param("shortUrl").notEmpty().isLength({ min: 10 }).isString()], delOneShortUrlHandler);

module.exports = router;