import { Router, Request, Response } from "express";
import { Category, CategoryCreateInput } from "../types/categories";

import CategoriesServices from "../services/categories.service";
const router = Router();

router.post("/create", async function (req: Request, res: Response) {
  const {
    name,
    
  }: CategoryCreateInput = req.body;

  try {
    const result: Category[] = await new CategoriesServices().create({
      name,
    });
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.get("/list", async function (req: Request, res: Response) {
  const result = await new CategoriesServices().list();
  res.send(result);
});

router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ad = await new CategoriesServices().find(id);
    // console.log("AD ====>", ad);
    res.send(ad);
  } catch (err: any) {
    console.log("ERR", err)
    res.send({ message: err, success: false });
  }
});

router.patch("/update/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<Category> = req.body;
  try {
    const ad = await new CategoriesServices().update(id, data);
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ads = await new CategoriesServices().delete(id);
    res.send(ads);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
