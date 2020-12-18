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

/**
 * @swagger
 * /hotels/reservations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: get all reservations
 *     produces:
 *       - application/json
 *     tags:
 *       - Hotels
 *     responses:
 *       200:
 *         description: reservations
 */
hotelsRouteur.get('/reservations', auth, async (req, res) => { 
  try {
    let arrayReturned = [];
    let array1 = await axios.get('https://watihotelapi.azurewebsites.net/watiHotel');

    arrayReturned = array1.data.Reservations.map((element : any) => {
      return {
        id: element.Id,
        date_start: element.Date_start,
        date_end: element.Date_end,
        hotel: element.Hotel,
        status: element.Status,
        company: "Wati Hotel"
      }
    });

    res.status(200).send(arrayReturned);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /hotels/destinations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: get all destinations
 *     produces:
 *       - application/json
 *     tags:
 *       - Hotels
 *     responses:
 *       200:
 *         description: destinations
 */
hotelsRouteur.get('/destinations', auth, async (req, res) => { 
  try {
    let arrayReturned = [];
    let array1 = await axios.get('https://watihotelapi.azurewebsites.net/watiHotel');

    arrayReturned = array1.data.Destinations.map((element : any) => {
      return {
        id: element.Id,
        city: element.City,
        country: element.Country,
        image: element.Image,
        company: "Wati Hotel"
      }
    });

    res.status(200).send(arrayReturned);
  } catch (error) {
    res.sendStatus(500);
  }
});