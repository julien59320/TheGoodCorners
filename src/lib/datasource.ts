import { DataSource } from "typeorm";
import Ad from "../entities/Ad.entity";
import Categories from "../entities/Categories.entity";
import Tag from "../entities/Tag.entity";

export default new DataSource({
  type: "sqlite",
  database: "thegoodcornerorm.sqlite",
  entities: [Ad, Categories, Tag],
  synchronize: true,//à ne pas utiliser en production
  logging: ["error", "query"], // Ne pas utiliser en prod
});
