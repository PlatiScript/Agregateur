/**
 * Required External Modules and Interfaces
 */
var jwt = require('jsonwebtoken');
const axios = require('axios');

import express, { Request, Response } from "express";
import auth from '../../middleware/Auth';
/**
 * Router Definition
 */

export const flightsRouter = express.Router();
/**
 * @swagger
 * /planes:
 *   post:
 *     description: Return all planes
 *     produces:
 *       - application/json
 *     tags:
 *       - Flight
 *     responses:
 *       200:
 *         description: planes
 */
flightsRouter.get('/planes', async (req, res) => {
  const array1 = await axios.get('https://trivaphp.herokuapp.com/api/planes', {
    headers: {
      'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
    }
  });
  const array2 = await axios.get('https://tp-api-rest-service-avion.herokuapp.com/index.php/api/planes', {})

  console.log(array2.data['hydra:member']);

  res.status(200).send(array1.data);
});

flightsRouter.get('/flights', function (req, res) {


  axios.get('https://trivaphp.herokuapp.com/api/flights', {
    headers: {
      'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
    }
  })
    .then((response1: { data: any; }) => {
      res.status(200).send({ data: response1.data });


    })
    .catch((error: any) => {
      console.error(error)
    })


});

flightsRouter.get('/reserve', function (req, res) {
  axios.post('https://trivaphp.herokuapp.com/api/reservations/add', {
    headers: {
      'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
    },
    'buyer_name': "peter le bg",
    'flight_id': 5
  })
    .then((response1: { data: any; }) => {
      res.status(200).send({ data: response1.data });


    })
    .catch((error: any) => {
      console.error(error)
    })


});