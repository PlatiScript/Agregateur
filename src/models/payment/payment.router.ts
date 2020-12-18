/**
 * Required External Modules and Interfaces
 */
var jwt = require('jsonwebtoken');

import express, { Request, Response } from "express";
var soap = require('soap');

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
 *
 *
 */
export const paymentRouter = express.Router();

const PaymentAPIURl = "https://safe-shore-86002.herokuapp.com/wsdl/Paiement.wsdl";
//TEST UUI COMPANY = "ce633276-4110-11eb-b378-0242ac130002"

/**
 * @swagger
 * /payment:
 *   post:
 *     description: Post payment
 *     produces:
 *       - application/json
 *     tags:
 *       - Payments
 *     parameters:
 *       - name: id
 *         description: UUID of the company
 *         in: body
 *         required: true
 *         type: string
 *       - name: valeur
 *         description: Payment Amount
 *         in: body
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Payment
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
    const id: number = parseInt(req.params.id, 10);

    soap.createClient(PaymentAPIURl, function (err : any, client : any) {
        if (err){
            throw err;
        }
        var args = {
            id: id
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
        var uuid = "ce633276-4110-11eb-b378-0242ac1"+(Math.floor(Math.random()*90000) + 10000).toString();
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