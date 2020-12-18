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

export const hotelsRouteur = express.Router();
/**
 * @swagger
 * /hotels:
 *   post:
 *     description: get all hotels
 *     produces:
 *       - application/json
 *     tags:
 *       - Hotels
 *     responses:
 *       200:
 *         description: hotels
 */
hotelsRouteur.get('/hotels', function(req, res) { 


    axios.get('http://watihotelapi.azurewebsites.net/watiHotel')
      .then((response1: { data: any; }) => {
        axios.get('http://watihotelapi.azurewebsites.net/watiHotel', {
           
          })
          .then((response2: { data: any; }) => {
    
            res.status(200).send({ data:response1.data});
              
            })

        })
      .catch((error: any) => {
        console.error(error)
      })


});