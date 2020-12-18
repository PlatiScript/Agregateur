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


    const PORT: number = parseInt("7000", 10);

    const app = express();

    /**
     * Swagger documentation
     */
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Beautiful Car API",
                version: "1.0.2",
                description:
                    "This is a beautiful car API made with love by Benjamin & Simon"
            },
            servers: [
                {
                    url: "http://mysterious-eyrie-25660.herokuapp.com",
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
