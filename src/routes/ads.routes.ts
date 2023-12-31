import { Router, Request, Response } from "express";
import { Ad, AdCreateInput } from "../types/ads";
import AdServices from "../services/ads.services";
const router = Router();

router.post("/create", async function (req: Request, res: Response) {
  const {
    description,
    location,
    createdAt,
    owner,
    picture,
    price,
    title,
    categoryId,
    tagId
  }: AdCreateInput & { categoryId: number; tagId: number[] } = req.body;

  try {
    const result = await new AdServices().create({
      description,
      location,
      createdAt,
      owner,
      picture,
      price,
      title,
    }, categoryId, tagId);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.get("/list", async function (req: Request, res: Response) {
  const result = await new AdServices().list();
  res.send(result);
});

router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ad = await new AdServices().find(id);
    // console.log("AD ====>", ad);
    res.send(ad);
  } catch (err: any) {
    console.log("ERR", err)
    res.send({ message: err, success: false });
  }
});

router.patch("/update/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<Ad> = req.body;
  //! prévoir que on envoi pas tout le data, mais que on envoi que les clés qui ont été renseignées
  try {
    const ad = await new AdServices().update(id, data);
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ads = await new AdServices().delete(id);
    res.send(ads);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
