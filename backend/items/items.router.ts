import express, { Request, Response } from "express";
import * as itemsController from "./items.controller";

export const itemsRouter = express.Router();

itemsRouter.get("/", itemsController.getItems);
itemsRouter.get("/:id", itemsController.getItem);