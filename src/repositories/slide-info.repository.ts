import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {SlideInfo, SlideInfoRelations} from '../models';

export class SlideInfoRepository extends DefaultCrudRepository<
  SlideInfo,
  typeof SlideInfo.prototype.id,
  SlideInfoRelations
> {
  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
  ) {
    super(SlideInfo, dataSource);
  }
}
