import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,

  response,
  Response as LBResponse,
  RestBindings,

} from '@loopback/rest';
import {SlideInfo} from '../models';
import fetch from 'node-fetch';
import {SlideInfoRepository} from '../repositories';

export class SlideInfoController {
  constructor(
    @repository(SlideInfoRepository)
    public slideInfoRepository : SlideInfoRepository,
  ) {}

  @post('/slide-infos')
  @response(200, {
    description: 'SlideInfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(SlideInfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SlideInfo, {
            title: 'NewSlideInfo',
            exclude: ['id'],
          }),
        },
      },
    })
    slideInfo: Omit<SlideInfo, 'id'>,
  ): Promise<SlideInfo> {
    return this.slideInfoRepository.create(slideInfo);
  }

  @get('/slide-infos/count')
  @response(200, {
    description: 'SlideInfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SlideInfo) where?: Where<SlideInfo>,
  ): Promise<Count> {
    return this.slideInfoRepository.count(where);
  }

  @get('/slide-infos')
  @response(200, {
    description: 'Array of SlideInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SlideInfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SlideInfo) filter?: Filter<SlideInfo>,
  ): Promise<SlideInfo[]> {
    return this.slideInfoRepository.find(filter);
  }

  @patch('/slide-infos')
  @response(200, {
    description: 'SlideInfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SlideInfo, {partial: true}),
        },
      },
    })
    slideInfo: SlideInfo,
    @param.where(SlideInfo) where?: Where<SlideInfo>,
  ): Promise<Count> {
    return this.slideInfoRepository.updateAll(slideInfo, where);
  }

  @get('/slide-infos/{id}')
  @response(200, {
    description: 'SlideInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SlideInfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SlideInfo, {exclude: 'where'}) filter?: FilterExcludingWhere<SlideInfo>
  ): Promise<SlideInfo> {
    return this.slideInfoRepository.findById(id, filter);
  }

  @patch('/slide-infos/{id}')
  @response(204, {
    description: 'SlideInfo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SlideInfo, {partial: true}),
        },
      },
    })
    slideInfo: SlideInfo,
  ): Promise<void> {
    await this.slideInfoRepository.updateById(id, slideInfo);
  }

  @put('/slide-infos/{id}')
  @response(204, {
    description: 'SlideInfo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() slideInfo: SlideInfo,
  ): Promise<void> {
    await this.slideInfoRepository.replaceById(id, slideInfo);
  }

  @del('/slide-infos/{id}')
  @response(204, {
    description: 'SlideInfo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.slideInfoRepository.deleteById(id);
  }



@get('/slide-deck/')
  @response(200,
    {
      description: 'Download slide deck',
      content: {
        'multipart/form-data': {
          'x-parser': 'stream',
          schema: {
            type: 'string',
            format: 'binary'
          },
        },
      },
    }
  )
  async generateSlideDeck(
    @inject(RestBindings.Http.RESPONSE) resp: LBResponse,
  ): Promise<any> {

    const result = await fetch(dox42Url).then( res => res.buffer() );

    resp.status(200)
    .contentType('application/vnd.openxmlformats-officedocument.presentationml.presentation')
    .attachment("result.pptx")
    .send(result);

    return resp;

  }
}


//TODO change url to one pointing to your template
export const dox42Url = "https://qperiordemo.dox42.online/dox42restService.ashx?Operation=GenerateSlides&DocTemplate=https://qperiordox42storage.blob.core.windows.net/slidetemplate/reference_slides_template.pptx&ReturnAction.format=pptx&ReturnAction.fileName=result.pptx&ReturnAction.disp=attachment"

