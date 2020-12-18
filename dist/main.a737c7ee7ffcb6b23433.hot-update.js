exports.id = "main";
exports.modules = {

/***/ "./src/models/flights/flights.router.ts":
/*!**********************************************!*\
  !*** ./src/models/flights/flights.router.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.flightsRouter = void 0;\n/**\n * Required External Modules and Interfaces\n */\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst axios = __webpack_require__(/*! axios */ \"axios\");\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\n/**\n * Router Definition\n */\nexports.flightsRouter = express_1.default.Router();\n/**\n * @swagger\n * /planes:\n *   post:\n *     description: Return all planes\n *     produces:\n *       - application/json\n *     tags:\n *       - Flight\n *     responses:\n *       200:\n *         description: planes\n */\nexports.flightsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const array1 = yield axios.get('https://trivaphp.herokuapp.com/api/planes', {\n        headers: {\n            'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`\n        }\n    });\n    const array2 = yield axios.get('https://tp-api-rest-service-avion.herokuapp.com/index.php/api/planes?page=1', {});\n    console.log(array2);\n    res.status(200).send(array1.data);\n}));\nexports.flightsRouter.get('/flights', function (req, res) {\n    axios.get('https://trivaphp.herokuapp.com/api/flights', {\n        headers: {\n            'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`\n        }\n    })\n        .then((response1) => {\n        res.status(200).send({ data: response1.data });\n    })\n        .catch((error) => {\n        console.error(error);\n    });\n});\nexports.flightsRouter.get('/reserve', function (req, res) {\n    axios.post('https://trivaphp.herokuapp.com/api/reservations/add', {\n        headers: {\n            'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`\n        },\n        'buyer_name': \"peter le bg\",\n        'flight_id': 5\n    })\n        .then((response1) => {\n        res.status(200).send({ data: response1.data });\n    })\n        .catch((error) => {\n        console.error(error);\n    });\n});\n\n\n//# sourceURL=webpack:///./src/models/flights/flights.router.ts?");

/***/ })

};