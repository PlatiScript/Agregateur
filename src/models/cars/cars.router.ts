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
 * /cars:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Return all cars
 *     produces:
 *       - application/json
 *     tags:
 *       - Cars
 *     responses:
 *       200:
 *         description: cars
 */
carsRouter.get('/', auth, async (req, res) => {
  try {
    let carArrayReturned = [];

    const carArray1  = await axios.get('https://webservicecar.herokuapp.com/cars/all', {
      headers: {
        'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
      }
    });

    const dataToken = await axios.post('https://mysterious-eyrie-25660.herokuapp.com/users/login',
      {
        'user': 'admin',
        'password': 'admin'
      });

    const carArray2 = await axios.get('https://mysterious-eyrie-25660.herokuapp.com/cars', {
      headers: {
        'Authorization': `Bearer ` + dataToken.data.token
      }
    })

    carArrayReturned = carArray1.data._embedded.carList.map((element : any) => {
      return {
          id: element.id,
          immat: "XX-XXX-XX",
          name: element.name,
          brand: element.marque,
          description: "",
          dailyPrice: 100,
          company: "YannigJeremAuto"
      }
    });

    carArrayReturned = [...carArrayReturned, ...(carArray2.data.map((element : any) => {
      return {
        id: element.id,
        immat: element.immat,
        name: element.name,
        brand: element.brand,
        description: element.description,
        dailyPrice: element.dailyPrice,
        company: "Team BS Car"
    }
    }))];

    res.status(200).send(carArrayReturned);

  } catch (error) {
    res.sendStatus(404);
  }
});

/**
 * @swagger
 * /cars/reservations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Return all reservations
 *     produces:
 *       - application/json
 *     tags:
 *       - Cars
 *     responses:
 *       200:
 *         description: reservations
 */
carsRouter.get('/reservations', auth, async (req, res) => {
  try {
    let carArrayReturned = [];

    const carArray1  = await axios.get('https://webservicecar.herokuapp.com/rentals/all', {
      headers: {
        'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
      }
    });

    const dataToken = await axios.post('https://mysterious-eyrie-25660.herokuapp.com/users/login',
      {
        'user': 'admin',
        'password': 'admin'
      });

    const carArray2 = await axios.get('https://mysterious-eyrie-25660.herokuapp.com/reservations', {
      headers: {
        'Authorization': `Bearer ` + dataToken.data.token
      }
    })

    carArrayReturned = carArray1.data._embedded.rentalList.map((element : any) => {
      return {
          id: element.id,
          carId: element.car.id,
          begin: element.departureDate,
          end: element.arrivalDate,
          company: "YannigJeremAuto"
      }
    });

    carArrayReturned = [...carArrayReturned, ...(carArray2.data.map((element : any) => {
      return {
        id: element.id,
          carId: element.carId,
          begin: element.begin,
          end: element.end,
          company: "Team BS Car"
    }
    }))];

    res.status(200).send(carArrayReturned);

  } catch (error) {
    res.sendStatus(404);
  }
});

