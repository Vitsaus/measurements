import "reflect-metadata";
import express, { Express } from "express";
import { createConnection, Connection } from "typeorm";
import cors from "cors";
import { Measurement } from "./entity/Measurement";
import { validateMeasurement, validateId } from "./validators";

export async function server(run: boolean, connection: Connection): Promise<Express> {
    const measurementRepository = connection.getRepository(Measurement);

    const app: Express = express();

    app.use(
        express.json({
            type: "application/json",
        })
    );

    app.use(cors());

    app.get("/", async (req, res) => {
        try {
            const result: Measurement[] = await measurementRepository.find();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    });

    app.get("/:id", async (req, res) => {
        try {
            const isValidId = await validateId(parseInt(req.params.id));
            if (!isValidId) return res.status(400).json({ error: "invalid id" });
            const result: Measurement | undefined = await measurementRepository.findOne(req.params.id);
            if (!result) return res.status(400).json({ error: "not found" });
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    });

    app.post("/", async (req, res) => {
        try {
            const isValidMeasurement = await validateMeasurement(req.body);
            if (!isValidMeasurement) return res.status(400).json({ error: "invalid measurement data" });
            const data: Measurement = new Measurement();
            data.name = req.body.name;
            data.unit = req.body.unit;
            data.lower = parseInt(req.body.lower);
            data.upper = parseInt(req.body.upper);
            const row: Measurement = await measurementRepository.save(data);
            return res.status(201).json(row);
        } catch (e) {
            return res.status(400).json(e);
        }
    });

    app.put("/:id", async (req, res) => {
        try {
            const isValidId = await validateId(parseInt(req.params.id));
            if (!isValidId) {
                return res.status(400).json({ error: "invalid id" });
            }
            const data: Measurement | undefined = await measurementRepository.findOne(req.params.id);
            if (!data) return res.status(400).json({ error: "not found" });
            data.name = req.body.name;
            data.unit = req.body.unit;
            data.lower = parseInt(req.body.lower);
            data.upper = parseInt(req.body.upper);
            const isValidMeasurement = await validateMeasurement(data);
            if (!isValidMeasurement) return res.status(400).json({ error: "invalid measurement data" });
            const row = await measurementRepository.save(data);
            return res.status(200).json(row);
        } catch (e) {
            return res.status(400).json(e);
        }
    });

    app.delete("/:id", async (req, res) => {
        try {
            const isValidId = await validateId(parseInt(req.params.id));
            if (!isValidId) return res.status(400).json({ error: "invalid id" });
            const result = await connection
                .createQueryBuilder()
                .delete()
                .from(Measurement)
                .where("id = :id", { id: req.params.id })
                .execute();
            if (result && result.affected && result.affected > 0) {
                return res.status(200).json({ affected: result.affected });
            } else {
                return res.status(400).json({ affected: 0 });
            }
        } catch (e) {
            return res.status(400).json(e);
        }
    });

    if (run) {
        app.listen(3010, () => {
            console.log(`Api listening at http://localhost:3010`);
        });
    }

    return app;
}
