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
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: get all hotels
 *     produces:
 *       - application/json
 *     tags:
 *       - Hotels
 *     responses:
 *       200:
 *         description: hotels
 */
hotelsRouteur.get('/', auth, async (req, res) => { 
  try {
    let arrayReturned = [];
    let array1 = await axios.get('https://watihotelapi.azurewebsites.net/watiHotel');

    arrayReturned = array1.data.Hotels.map((element : any) => {
      return {
        id: element.Id,
        name: element.Name,
        description: element.Descritpion,
        address: element.Address,
        price: element.Price,
        room_max: element.Room_max,
        image: element.Image,
        destination: element.Destination,
        disponibilites: element.Disponibilites,
        company: "Wati Hotel"
      }
    });

    res.status(200).send(arrayReturned);
  } catch (error) {
    res.sendStatus(500);
  }
    
      

});