const rateLimit = require("express-rate-limit");

const fetchLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // limit each IP to 30 requests per windowMs
    message: { success: false, err_code: 429, err_message: "Too many fetch requested, please try again after an 15 minutes", stack: null }
});
const createLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: { success: false, err_code: 429, err_message: "Too many tokens/request created, please try again after an 15 minutes", stack: null }
});

module.exports = {
    fetchLimiter,
    createLimiter
};