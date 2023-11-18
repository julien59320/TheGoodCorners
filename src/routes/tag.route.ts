import { Router, Request, Response } from "express";
import { Tag, TagCreateInput } from "../types/tag";

import TagServices from "../services/tag.service";
const router = Router();

router.post("/create", async function (req: Request, res: Response) {
  const {
    title,
    
  }: TagCreateInput = req.body;

  try {
    const result: Tag[] = await new TagServices().create({
      title,
    });
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.get("/list", async function (req: Request, res: Response) {
  const result = await new TagServices().list();
  res.send(result);
});

router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ad = await new TagServices().find(id);
    // console.log("AD ====>", ad);
    res.send(ad);
  } catch (err: any) {
    console.log("ERR", err)
    res.send({ message: err, success: false });
  }
});

router.patch("/update/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<Tag> = req.body;
  try {
    const ad = await new TagServices().update(id, data);
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ads = await new TagServices().delete(id);
    res.send(ads);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
