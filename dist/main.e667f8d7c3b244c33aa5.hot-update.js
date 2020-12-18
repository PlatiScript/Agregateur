exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Required External Modules\n */\nconst dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nconst swagger_jsdoc_1 = __importDefault(__webpack_require__(/*! swagger-jsdoc */ \"swagger-jsdoc\"));\nconst swagger_ui_express_1 = __importDefault(__webpack_require__(/*! swagger-ui-express */ \"swagger-ui-express\"));\nconst users_router_1 = __webpack_require__(/*! ./models/users/users.router */ \"./src/models/users/users.router.ts\");\nconst flights_router_1 = __webpack_require__(/*! ./models/flights/flights.router */ \"./src/models/flights/flights.router.ts\");\n(() => __awaiter(void 0, void 0, void 0, function* () {\n    dotenv.config();\n    /**\n     * App Variables\n     */\n    const PORT = parseInt(\"7000\", 10);\n    const app = express_1.default();\n    /**\n     * Swagger documentation\n     */\n    const options = {\n        definition: {\n            openapi: \"3.0.0\",\n            info: {\n                title: \"Beautiful Car API\",\n                version: \"1.0.2\",\n                description: \"This is a beautiful car API made with love by Benjamin & Simon\"\n            },\n            servers: [\n                {\n                    url: \"http://mysterious-eyrie-25660.herokuapp.com\",\n                },\n            ],\n        },\n        apis: [\"./**/**/*.router.ts\"],\n    };\n    const specs = swagger_jsdoc_1.default(options);\n    /**\n     *  App Configuration\n     */\n    app.use(helmet_1.default());\n    app.use((req, res, next) => { next(); }, cors_1.default());\n    app.use(express_1.default.json());\n    app.use(\"/users\", users_router_1.usersRouter);\n    app.use(\"/flights\", flights_router_1.flightsRouter);\n    app.use(\"/api-docs\", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));\n    /**\n     * Server Activation\n     */\n    const server = app.listen(PORT, () => {\n        console.log(`Listening on port ${PORT}`);\n    });\n    if (true) {\n        module.hot.accept();\n        module.hot.dispose(() => server.close());\n    }\n}))();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/middleware/Auth.ts":
/*!********************************!*\
  !*** ./src/middleware/Auth.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nexports.default = (req, res, next) => {\n    try {\n        const token = req.headers.authorization.split(' ')[1];\n        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');\n        const userId = decodedToken.userId;\n        if (req.body.userId && req.body.userId !== userId) {\n            throw 'Invalid user ID';\n        }\n        else {\n            next();\n        }\n    }\n    catch (e) {\n        throw 'Invalid token';\n    }\n};\n\n\n//# sourceURL=webpack:///./src/middleware/Auth.ts?");

/***/ }),

/***/ "./src/models/flights/flights.router.ts":
/*!**********************************************!*\
  !*** ./src/models/flights/flights.router.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.flightsRouter = void 0;\n/**\n * Required External Modules and Interfaces\n */\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst axios = __webpack_require__(/*! axios */ \"axios\");\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst Auth_1 = __importDefault(__webpack_require__(/*! ../../middleware/Auth */ \"./src/middleware/Auth.ts\"));\n/**\n * Router Definition\n */\nexports.flightsRouter = express_1.default.Router();\n/**\n * @swagger\n * /users/login:\n *   post:\n *     description: Login to the application\n *     produces:\n *       - application/json\n *     tags:\n *       - Users\n *     parameters:\n *       - name: user\n *         description: Username to use for login.\n *         in: formData\n *         required: true\n *         type: string\n *       - name: password\n *         description: User's password.\n *         in: formData\n *         required: true\n *         type: string\n *     responses:\n *       200:\n *         description: login\n */\nexports.flightsRouter.post('/', Auth_1.default, function (req, res) {\n    axios.get('https://trivaphp.herokuapp.com/api/planes?Api-Token=ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9')\n        .then((response) => {\n        res.status(200).send(response.data);\n    })\n        .catch((error) => {\n        console.log(error);\n    });\n});\n\n\n//# sourceURL=webpack:///./src/models/flights/flights.router.ts?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ })

};