import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/prisma/prisma.service';

import * as pactum from 'pactum'
import { AuthDto } from 'src/Auth/dto';
import { EditUserDto } from 'src/user/dto';


describe('App e2e',()=>{
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async()=>{
    const moduleRef = 
    await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }),
    );
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  });
  afterAll(()=>{
    app.close();
  })
  it.todo('should do');

  describe('Auth', () =>{
    describe('Signup', ()=>{
      it('should sign up',()=>{
        const dto: AuthDto ={
          email: 'israel@gmail.com',
          password: '1234'
        }
        return pactum
        .spec()
        .post(
          '/auth/signup',
        ).withBody(dto)
        .expectStatus(201)
        .inspect()
      })

    })
    describe('Signin', ()=>{
      it('should sign in',()=>{
        const dto: AuthDto ={
          email: 'israel@gmail.com',
          password: '1234'
        }
        return pactum
        .spec()
        .post(
          '/auth/signin',
        ).withBody(dto)
        .expectStatus(201)
        .inspect()
        .stores('userAt', 'access_token');
      }) 
    })
  });

  describe('User', ()=>{
    describe('Get me',()=>{
      it('should return user', ()=>{
        return pactum
    .spec()
    .get('/users/me')
    .withHeaders({
      Authorization: 'Bearer $S{userAt}',
    })
    .expectStatus(200);

      })
    })

    describe('Edit User',()=>{
      it('should update user', ()=>{
        const dto: EditUserDto ={
          firstName: 'Aduragbemi',
          email: 'israeliss@gmail.com'
        }
        return pactum
      .spec()
      .patch('/users')
      .withHeaders({
        Authorization: 'Bearer $S{userAt}',
      })
      .withBody(dto)
      .expectStatus(500)
      .inspect()
      })
    })
    

  });
})