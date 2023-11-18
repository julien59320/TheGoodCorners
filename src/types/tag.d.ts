export interface Tag {
    id: number;
    title: string;
  }

export type TagCreateInput =  Omit <Tag, "id">;