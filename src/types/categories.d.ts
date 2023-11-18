export interface Category {
    id: number;
    name: string;
  }

  export type CategoryCreateInput =  Omit <Category, "id">;