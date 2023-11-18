import { Repository, In } from "typeorm";
import { ads } from "../data";
import { Ad, AdCreateInput } from "../types/ads";
import sqlite3 from "sqlite3";
import AdEntity from "../entities/Ad.entity";
import CategoriesEntity from "../entities/Categories.entity";
import TagEntity from "../entities/Tag.entity";
import datasource from "../lib/datasource";

// const db = new sqlite3.Database('../../thegoodcorner.sqlite')



class AdServices {

  db: sqlite3.Database
  dbOrm: Repository<AdEntity>
  dbOr: Repository<TagEntity>

  constructor(){
      this.db = new sqlite3.Database('thegoodcorner.sqlite');
      this.dbOrm = datasource.getRepository(AdEntity)
      
      
  }
  
  async create(data: AdCreateInput, categoryId: number, tagId: number[]) {
    const category = await datasource.getRepository(CategoriesEntity).findOneBy({ id: categoryId });
  
    if (!category) {
      throw new Error("Catégorie non trouvée");
    }
    
    const newAd = this.dbOrm.create({ ...data, category});
    const tags = await datasource.getRepository(TagEntity).find({ where: { id: In(tagId) } });
    
    
    // console.log('Tags:', tags); // Affichage des tags récupérés pour le débogage
  
    if (!tags || tags.length !== tagId.length) {
      throw new Error("Certains tags n'ont pas été trouvés ou les identifiants des tags sont incorrects");
    }
    newAd.tag = tags;
    await this.dbOrm.save(newAd);
    return newAd;
  }

  async list() {
    return await this.dbOrm.find();
    
  }
 
  async find(id: number) {
    const ad = await this.dbOrm.findOneBy({  id: id  });
    if(!ad){
      throw new Error("Cette annonce n'existe pas");
    }
    return ad
  }
    

   async delete(id: number ) {
    const adToRemove = await this.dbOrm.findOneBy({  id: id  });
    if (!adToRemove) {
      throw new Error("L'annonce n'existe pas");
    }
    await this.dbOrm.remove(adToRemove);
    return await this.list();
  }
    

    
  async update(id: number, data: Partial<AdCreateInput>) {
    const adToUpdate = await this.dbOrm.findOneBy({  id: id  });
    if (!adToUpdate) {
      throw new Error("L'annonce n'existe pas");
    }
  
    const keysToUpdate: (keyof Partial<AdCreateInput>)[] = Object.keys(data) as (keyof Partial<AdCreateInput>)[];
    const allowedKeys: (keyof Partial<AdCreateInput>)[] = ['description', 'location', 'createdAt', 'owner', 'picture', 'price', 'title'];
    const invalidKeys = keysToUpdate.filter((key) => !allowedKeys.includes(key));
  
    if (invalidKeys.length > 0) {
      throw new Error(`Clés non autorisées: ${invalidKeys.join(', ')}`);
    }
    this.dbOrm.merge(adToUpdate, data);
    await this.dbOrm.save(adToUpdate);
    return adToUpdate;
  }  
}

export default AdServices;



