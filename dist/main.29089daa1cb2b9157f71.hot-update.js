exports.id = "main";
exports.modules = {

/***/ "./src/models/cars/cars.router.ts":
/*!****************************************!*\
  !*** ./src/models/cars/cars.router.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.carsRouter = void 0;\n/**\n * Required External Modules and Interfaces\n */\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst axios = __webpack_require__(/*! axios */ \"axios\");\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\n/**\n * Router Definition\n */\nexports.carsRouter = express_1.default.Router();\n/**\n * @swagger\n * /planes:\n *   post:\n *     description: Return all planes\n *     produces:\n *       - application/json\n *     tags:\n *       - Flight\n *     responses:\n *       200:\n *         description: planes\n */\nexports.carsRouter.get('/cars', function (req, res) {\n    axios.get('https://webservicecar.herokuapp.com/cars/all', {\n        headers: {\n            'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`\n        }\n    })\n        .then((response1) => {\n        axios.post('https://mysterious-eyrie-25660.herokuapp.com/users/login', {\n            'user': 'admin',\n            'password': 'admin'\n        })\n            .then((response) => {\n            axios.get('https://mysterious-eyrie-25660.herokuapp.com/cars', {\n                headers: {\n                    'Authorization': `Bearer ` + response.data.token\n                }\n            })\n                .then((response4) => {\n                res.status(200).send({ data: response4.data });\n            })\n                .catch((error) => {\n                console.error(error);\n            });\n        })\n            .catch((error) => {\n            console.error(error);\n        });\n    })\n        .catch((error) => {\n        console.error(error);\n    });\n});\n\n\n//# sourceURL=webpack:///./src/models/cars/cars.router.ts?");

/***/ })

};