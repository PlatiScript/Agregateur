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
 * /flights/planes:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Return all planes
 *     produces:
 *       - application/json
 *     tags:
 *       - Flight
 *     responses:
 *       200:
 *         description: planes
 */
flightsRouter.get('/planes', auth, async (req, res) => {
  let planeArrayReturned = [];

  try {
    const array1 = await axios.get('https://trivaphp.herokuapp.com/api/planes', {
      headers: {
        'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
      }
    });

    const array2 = await axios.get('https://tp-api-rest-service-avion.herokuapp.com/index.php/api/planes', {});

    planeArrayReturned = array1.data.data.map((element: any) => {
      return {
        id: element.id,
        name: element.name,
        capacity: element.capacity,
        company: 'Trivaphp'
      }
    });

    planeArrayReturned = [...planeArrayReturned, ...(array2.data['hydra:member'].map((element: any) => {
      return {
        id: element.id,
        name: element.label,
        capacity: element.seats,
        company: 'Wati Airways'
      }
    }))];

    res.status(200).send(planeArrayReturned);
  } catch (error) {
    res.sendStatus(404);
  }

});

/**
 * @swagger
 * /flights:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Return all flights
 *     produces:
 *       - application/json
 *     tags:
 *       - Flight
 *     responses:
 *       200:
 *         description: flights
 */
flightsRouter.get('/', auth, async (req, res) => {
  let flightsArrayReturned = [];

  try {
    const array1 = await axios.get('https://trivaphp.herokuapp.com/api/flights', {
      headers: {
        'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
      }
    });

    const array2 = await axios.get('https://tp-api-rest-service-avion.herokuapp.com/index.php/api/flights', {});

    flightsArrayReturned = array1.data.data.map((element: any) => {
      return {
        id: element.id,
        plane: {
          plane_id: element.plane_id,
          plane_name: element.plane.name,
          plane_capacity: element.plane.capacity
        },
        price: element.price,
        date: element.date,
        start_city: element.start_city.name,
        end_city: element.end_city.name,
        company: 'Trivaphp'
      }
    });

    let array3 = await Promise.all(array2.data['hydra:member'].map(async (element: any) => {
      let promises = [];
      let plane : any;
      let departurePoint : any;
      let arrivalPoint : any;

      promises.push(axios.get('https://tp-api-rest-service-avion.herokuapp.com' + element.plane, {}));
      promises.push(axios.get('https://tp-api-rest-service-avion.herokuapp.com' + element.departurePoint, {}));
      promises.push(axios.get('https://tp-api-rest-service-avion.herokuapp.com' + element.arrivalPoint, {}));

      await Promise.all(promises).then((values: any) => {
        values.forEach((datas: any) => {
          switch (datas.data["@id"]) {
            case element.plane:
              plane = datas.data;
              break;
            case element.departurePoint:
              departurePoint = datas.data;
              break;
            case element.arrivalPoint:
              arrivalPoint = datas.data;
              break;
          }
        });
      })

      return {
        id: element.id,
        plane: {
          plane_id: plane.id,
          plane_name: plane.label,
          plane_capacity: plane.seats
        },
        price: element.price,
        date: element.departureDate,
        start_city: departurePoint.label,
        end_city: arrivalPoint.label,
        company: 'Wati Airways'
      }
    }));

    res.status(200).send([...flightsArrayReturned, ...array3]);
  } catch (error) {
    console.log(error)
    res.sendStatus(404);
  }

});

//flightsRouter.get('/reserve', function (req, res) {
//  axios.post('https://trivaphp.herokuapp.com/api/reservations/add', {
//    headers: {
//      'Api-Token': `ZPDpXWyKDeavzEDXtMHip89eGN9gSuRzasoDrTc9vKo27YIxJ9`
//    },
//    'buyer_name': "peter le bg",
//    'flight_id': 5
//  })
//    .then((response1: { data: any; }) => {
//      res.status(200).send({ data: response1.data });
//
//
//    })
//    .catch((error: any) => {
//      console.error(error)
//    })
//
//
//});