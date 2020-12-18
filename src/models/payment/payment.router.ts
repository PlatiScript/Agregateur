/**
 * Required External Modules and Interfaces
 */
var jwt = require('jsonwebtoken');

import express, { Request, Response } from "express";
var soap = require('soap');
import { v1 as uuidv1 } from "uuid";
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
paymentRouter.post('/', function(req, res) {
    soap.createClient(PaymentAPIURl, function (err : any, client : any) {
        if (err){
            throw err;
        }
        var args = {
            id: req.body.id,
            valeur: req.body.valeur
        }
        client.addPayement(args, function (err : any, response : any) {
            if (err)
                throw err;
            return res.status(200).send({ data:response});
        });
    });
});

/**
 * @swagger
 * /payment/getCompanySold/{id}:
 *   get:
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
 *         schema:
 *           type: payment
 */
paymentRouter.get('/getCompanySold/:id', function(req, res) {

    soap.createClient(PaymentAPIURl, function (err : any, client : any) {
        if (err){
            throw err;
        }
        var args = {
            id: req.params.id
        }
        client.getSoldCompagnie(args, function (err : any, response : any) {
            if (err)
                throw err;
            // print the service returned result
            return res.status(200).send({ data:response});
        });
    });
});
/**
 * @swagger
 * /payment/createCompany:
 *   get:
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
paymentRouter.get('/createCompany', function(req, res) {
    soap.createClient(PaymentAPIURl, function (err : any, client : any) {
        if (err){
            throw err;
        }
        var uuid = uuidv1();
        //var uuid = "f32dfca0-4131-11eb-b378-0242ac130002";

        var args = {
            id: uuid
        }
        client.newCompagnie(args, function (err : any, response : any) {
            if (err)
                throw err;

            return res.status(200).send({ data:response, UUID: uuid});
        })
    });
});