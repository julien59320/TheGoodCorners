import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable  } from "typeorm";
import AdEntity from "../entities/Ad.entity";

@Entity()
 class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  
//   @ManyToMany(() => AdEntity, ads => ads.tagsId) // Nom de la colonne associée
//   @JoinTable()
//   ads: AdEntity[];
}

export default Tag