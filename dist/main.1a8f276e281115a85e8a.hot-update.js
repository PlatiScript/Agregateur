exports.id = "main";
exports.modules = {

/***/ "./src/models/flights/flights.router.ts":
/*!**********************************************!*\
  !*** ./src/models/flights/flights.router.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.flightsRouter = void 0;\n/**\n * Required External Modules and Interfaces\n */\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst axios = __webpack_require__(/*! axios */ \"axios\");\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst Auth_1 = __importDefault(__webpack_require__(/*! ../../middleware/Auth */ \"./src/middleware/Auth.ts\"));\n/**\n * Router Definition\n */\nexports.flightsRouter = express_1.default.Router();\n/**\n * @swagger\n * /users/login:\n *   post:\n *     description: Login to the application\n *     produces:\n *       - application/json\n *     tags:\n *       - Users\n *     parameters:\n *       - name: user\n *         description: Username to use for login.\n *         in: formData\n *         required: true\n *         type: string\n *       - name: password\n *         description: User's password.\n *         in: formData\n *         required: true\n *         type: string\n *     responses:\n *       200:\n *         description: login\n */\nexports.flightsRouter.get('/', Auth_1.default, function (req, res) {\n    axios.get('https://trivaphp.herokuapp.com/api/planes?Api-Token=ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9')\n        .then((response) => {\n        res.status(200).send(response.data);\n    })\n        .catch((error) => {\n        console.log(error);\n    });\n});\n\n\n//# sourceURL=webpack:///./src/models/flights/flights.router.ts?");

/***/ })

};