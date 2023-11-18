import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from "typeorm";
import AdEntity from "../entities/Ad.entity";

@Entity()
 class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AdEntity, (adEntity) => adEntity.category)
  ads: AdEntity[];

}

export default Categories