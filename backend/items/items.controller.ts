import express, { NextFunction, Request, Response } from "express";
import { BaseData } from "./items.interface";
import { Item } from "./item.interface";
import { findAll, find } from "./items.services";

export const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search: string = req.query.q as string;
    let items: BaseData = await findAll(search);
    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const getItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    let item: Item = await find(id);
    res.status(200).send(item);
  } catch (e) {
    res.status(500).send(e.message);
  }
};