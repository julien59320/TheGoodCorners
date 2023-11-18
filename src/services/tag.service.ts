import { Repository } from "typeorm";
import { Tag, TagCreateInput } from "../types/tag";
import sqlite3 from "sqlite3";
import TagEntity from "../entities/Tag.entity";
import datasource from "../lib/datasource";

// const db = new sqlite3.Database('../../thegoodcorner.sqlite')



class TagServices {

  db: sqlite3.Database
  dbOrm: Repository<TagEntity> 

  constructor(){
      this.db = new sqlite3.Database('thegoodcorner.sqlite');
      this.dbOrm = datasource.getRepository(TagEntity)
      
  }
  
  async create(data: TagCreateInput) {
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
    

    
  async update(id: number, data: Partial<TagCreateInput>) {
    const adToUpdate = await this.dbOrm.findOneBy({  id: id  });
    if (!adToUpdate) {
      throw new Error("L'annonce n'existe pas");
    }
  
    const keysToUpdate: (keyof Partial<TagCreateInput>)[] = Object.keys(data) as (keyof Partial<TagCreateInput>)[];
    const allowedKeys: (keyof Partial<TagCreateInput>)[] = ['title'];
    const invalidKeys = keysToUpdate.filter((key) => !allowedKeys.includes(key));
  
    if (invalidKeys.length > 0) {
      throw new Error(`Clés non autorisées: ${invalidKeys.join(', ')}`);
    }
    this.dbOrm.merge(adToUpdate, data);
    await this.dbOrm.save(adToUpdate);
    return adToUpdate;
  }  
}

export default TagServices;


