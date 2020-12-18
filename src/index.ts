/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { usersRouter } from "./models/users/users.router";
import { flightsRouter } from "./models/flights/flights.router";
import { hotelsRouteur } from "./models/hotels/hotels.router";
import { carsRouter } from "./models/cars/cars.router";
import {paymentRouter} from "./models/payment/payment.router";

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module : WebpackHotModule;

(async () => {
    dotenv.config();

    /**
     * App Variables
     */

    if (!process.env.PORT) {
        process.exit(1);
    }

    const PORT: number = parseInt(process.env.PORT as string, 10);

    const app = express();

    /**
     * Swagger documentation
     */
    const options = {
        definition: {
            openapi: "3.0.0",
            components: {
                securitySchemes: {
                  bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                  }
                }
              },
            info: {
                title: "Team BS Agregateur",
                version: "1.0.2",
                description:
                "To launch request with this documentation you need to send a request to /users/login at the end with the credentials admin/admin and then put the token in authorize in the top right corner. After that you will be able to test all of our request within the documentation. To launch request within your app you need to do the same. Note: the 500 internal server error when launching without token is due to heroku."
            },
            security:{
                bearerAuth: [] ,
            },
            servers: [
                {
                    url: "https://ancient-harbor-51591.herokuapp.com",
                },
            ],
        },
        apis: ["./**/**/*.router.ts"],
    };

    const specs = swaggerJsdoc(options);

    /**
     *  App Configuration
     */
    app.use(helmet());
    app.use((req, res, next) => { next(); }, cors());
    app.use(express.json());
    app.use("/flights", flightsRouter);
    app.use("/hotels", hotelsRouteur);
    app.use("/users", usersRouter);
    app.use("/cars", carsRouter);
    app.use("/payment", paymentRouter);

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    );
    
    /**
     * Server Activation
     */
    const server = app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => server.close());
    }
})();
