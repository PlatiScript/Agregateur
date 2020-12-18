/**
 * Required External Modules and Interfaces
 */
var jwt = require('jsonwebtoken');

import express, { Request, Response } from "express";
var soap = require('soap');
import { v1 as uuidv1 } from "uuid";
import auth from '../../middleware/Auth';
/**
 * Router Definition
 */
/**
 * @swagger
 *
 * definitions:
 *   GetPayment:
 *     type: object
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 */

/**
 * Controller Definitions
 */
/**
 * @swagger
 *
 * definitions:
 *   NewPayment:
 *     type: object
 *     required:
 *       - id
 *       - valeur
 *     properties:
 *       id:
 *         type: string
 *       valeur:
 *         type: number
 *   Payment:
 *     allOf:
 *       - $ref: '#/definitions/NewPayment'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */

export const paymentRouter = express.Router();

const PaymentAPIURl = "https://safe-shore-86002.herokuapp.com/wsdl/Paiement.wsdl";

/**
 * @swagger
 *
 * /payment:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Payments
 *     description: Creates a Payment
 *     produces:
 *       - application/json
 *     requestBody:
 *         content:
 *            application/json:
 *              description: payment
 *              schema:
 *               type: object
 *               required:
 *                     - id
 *                     - valeur
 *               properties:
 *                   id:
 *                          type: string
 *                   valeur:
 *                          type: number
 *     responses:
 *       200:
 *         description: Payments created
 */
paymentRouter.post('/', auth, function (req, res) {
    try {
        soap.createClient(PaymentAPIURl, function (err: any, client: any) {
            if (err) {
                throw err;
            }
            var args = {
                id: req.body.id,
                valeur: req.body.valeur
            }
            client.addPayement(args, function (err: any, response: any) {
                if (err)
                    throw err;
                return res.status(200).send({ data: response });
            });
        });
    }
    catch (error) {
        return res.sendStatus(500);
    }
});

/**
 * @swagger
 * /payment/getCompanySold/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Payments
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: payment
 *       500:
 *         description: error
 */
paymentRouter.get('/getCompanySold/:id', auth, function (req, res) {
    const id : string = req.params.id;

    try {
        soap.createClient(PaymentAPIURl, function (err: any, client: any) {
            if (err) {
                throw err;
            }
            var args = {
                id: id
            }
            client.getSoldCompagnie(args, function (err: any, response: any) {
                if (err)
                    throw err;
                // print the service returned result
                return res.status(200).send({ data: response });
            });
        });
    }
    catch (error) {
        return res.sendStatus(500);
    }
});
/**
 * @swagger
 * /payment/createCompany:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Create Company
 *     produces:
 *       - application/json
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Created company
 *       500:
 *         description: error
 */
paymentRouter.get('/createCompany', auth, function (req, res) {
    try {
        soap.createClient(PaymentAPIURl, function (err: any, client: any) {
            if (err) {
                throw err;
            }
            var uuid = uuidv1();
            //var uuid = "f32dfca0-4131-11eb-b378-0242ac130002";

            var args = {
                id: uuid
            }
            client.newCompagnie(args, function (err: any, response: any) {
                if (err)
                    throw err;

                return res.status(200).send({ data: response, UUID: uuid });
            })
        });
    }
    catch (error) {
        return res.sendStatus(500);
    }
});