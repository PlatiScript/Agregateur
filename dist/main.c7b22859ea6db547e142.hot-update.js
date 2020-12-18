exports.id = "main";
exports.modules = {

/***/ "./src/models/hotels/hotels.router.ts":
/*!********************************************!*\
  !*** ./src/models/hotels/hotels.router.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.hotelsRouteur = void 0;\n/**\n * Required External Modules and Interfaces\n */\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst axios = __webpack_require__(/*! axios */ \"axios\");\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\n/**\n * Router Definition\n */\nexports.hotelsRouteur = express_1.default.Router();\n/**\n * @swagger\n * /hotels:\n *   post:\n *     description: get all hotels\n *     produces:\n *       - application/json\n *     tags:\n *       - Hotels\n *     responses:\n *       200:\n *         description: hotels\n */\nexports.hotelsRouteur.get('/hotels', function (req, res) {\n    axios.get('http://watihotelapi.azurewebsites.net/watiHotel', {\n        headers: {\n            'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`\n        }\n    })\n        .then((response1) => {\n        axios.get('https://tp-api-rest-service-avion.herokuapp.com/index.php/api/planes?page=1', {})\n            .then((response2) => {\n            res.status(200).send({ data: response1.data });\n        });\n    })\n        .catch((error) => {\n        console.error(error);\n    });\n});\n\n\n//# sourceURL=webpack:///./src/models/hotels/hotels.router.ts?");

/***/ })

};