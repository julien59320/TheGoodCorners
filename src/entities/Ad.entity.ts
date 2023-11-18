import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable  } from "typeorm";
import Category from "../entities/Categories.entity";
import TagEntity from "../entities/Tag.entity";
import Tag from "../entities/Tag.entity";


@Entity()

class Ad {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    owner: string;

    @Column()
    price: number;

    @Column()
    picture: string;

    @Column()
    location: string;

    @Column()
    createdAt: string;

    @ManyToOne(() => Category, (category) => category.ads)
    category: Category;
    
    @ManyToMany(() => Tag)
    @JoinTable()
    tag: Tag[];

}
export default Ad