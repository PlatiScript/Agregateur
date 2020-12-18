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
flightsRouter.get('/planes', function(req, res) { 


    axios.get('https://trivaphp.herokuapp.com/api/planes', {
        headers: {
          'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
        }
      })
      .then((response1: { data: any; }) => {
        axios.get('https://tp-api-rest-service-avion.herokuapp.com/index.php/api/planes?page=1', {
           
          })
          .then((response2: { data: any; }) => {
    
            res.status(200).send({ data:response1.data});

            })

        })
      .catch((error: any) => {
        console.error(error)
      })


});

flightsRouter.get('/flights', function(req, res) { 


    axios.get('https://trivaphp.herokuapp.com/api/flights', {
        headers: {
          'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
        }
      })
      .then((response1: { data: any; }) => {
        res.status(200).send({ data:response1.data});


        })
      .catch((error: any) => {
        console.error(error)
      })


});
flightsRouter.get('/reserve', function(req, res) { 


    axios.post('https://trivaphp.herokuapp.com/api/reservations/add', {
        headers: {
            'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
          },
        'buyer_name' : "peter le bg",
        'flight_id': 5
      })
      .then((response1: { data: any; }) => {
        res.status(200).send({ data:response1.data});


        })
      .catch((error: any) => {
        console.error(error)
      })


});


axios.post('https://trivaphp.herokuapp.com/api/reservations/add', 
{
    'buyer_name':'admin',
    'password':'admin'
})
.then((response: { data: any; }) => {
    
  })
.catch((error: any) => {
  console.error(error)
})