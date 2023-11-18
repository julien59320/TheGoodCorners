import { Repository } from "typeorm";
import { Category, CategoryCreateInput } from "../types/categories";
import sqlite3 from "sqlite3";
import CategoriesEntity from "../entities/Categories.entity";
import datasource from "../lib/datasource";

// const db = new sqlite3.Database('../../thegoodcorner.sqlite')



class CategoriesServices {

  db: sqlite3.Database
  dbOrm: Repository<CategoriesEntity> 

  constructor(){
      this.db = new sqlite3.Database('thegoodcorner.sqlite');
      this.dbOrm = datasource.getRepository(CategoriesEntity)
      
  }
  
  async create(data: CategoryCreateInput) {
    const newAd = this.dbOrm.create(data); 
    await this.dbOrm.save(newAd); 
    return await this.list();
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
    

    
  async update(id: number, data: Partial<CategoryCreateInput>) {
    const adToUpdate = await this.dbOrm.findOneBy({  id: id  });
    if (!adToUpdate) {
      throw new Error("L'annonce n'existe pas");
    }
  
    const keysToUpdate: (keyof Partial<CategoryCreateInput>)[] = Object.keys(data) as (keyof Partial<CategoryCreateInput>)[];
    const allowedKeys: (keyof Partial<CategoryCreateInput>)[] = ['name'];
    const invalidKeys = keysToUpdate.filter((key) => !allowedKeys.includes(key));
  
    if (invalidKeys.length > 0) {
      throw new Error(`Clés non autorisées: ${invalidKeys.join(', ')}`);
    }
    this.dbOrm.merge(adToUpdate, data);
    await this.dbOrm.save(adToUpdate);
    return adToUpdate;
  }  
}

export default CategoriesServices;



