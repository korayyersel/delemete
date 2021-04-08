import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class SlideInfo extends Entity {
  @property({
    type: 'string',
  })
  titel?: string;

  @property({
    type: 'string',
  })
  sektor?: string;

  @property({
    type: 'string',
  })
  kunde?: string;

  @property({
    type: 'string',
  })
  ort?: string;

  @property({
    type: 'string',
  })
  vorgehen?: string;

  @property({
    type: 'string',
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ziele_Des_Projektes?: string;

  @property({
    type: 'string',
  })
  ergebnisse?: string;

  @property({
    type: 'string',
  })
  logo?: string;

  @property({
    type: 'string',
  })
  bild?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SlideInfo>) {
    super(data);
  }
}

export interface SlideInfoRelations {
  // describe navigational properties here
}

export type SlideInfoWithRelations = SlideInfo & SlideInfoRelations;
