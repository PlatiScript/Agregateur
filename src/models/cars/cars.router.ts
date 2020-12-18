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

export const carsRouter = express.Router();
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
carsRouter.get('/cars', function(req, res) { 


    axios.get('https://webservicecar.herokuapp.com/cars/all',{
        headers: {
          'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
        }
      })
      .then((response1: { data: any; }) => {

        axios.post('https://mysterious-eyrie-25660.herokuapp.com/users/login', 
        {
            'user':'admin',
            'password':'admin'
        })
        .then((response: { data: any; }) => {
            axios.get('https://mysterious-eyrie-25660.herokuapp.com/cars',{
                headers: {
                  'Authorization': `Bearer `+response.data.token 
                }
              })
              .then((response4: { data: any; }) => {
                res.status(200).send({ data:response4.data});

                })
              .catch((error: any) => {
                console.error(error)
              })

          })
        .catch((error: any) => {
          console.error(error)
        })
      
        })
      .catch((error: any) => {
        console.error(error)
      })


});
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
carsRouter.post('/cars', function(req, res) { 

    axios.post('https://webservicecar.herokuapp.com/cars/rentals/setrental?customerName=Wati&carId=1&departureDate=27/09/2020&arrivalDate=27/10/2020price=250 ', 
    {
        'user':'admin',
        'password':'admin'
    })
    .then((response: { data: any; }) => {
        
      })
    .catch((error: any) => {
      console.error(error)
    })
  
});
