import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//   imports: [UserModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
@Module({
  imports: [UserModule,
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '146.19.215.17',
      port: 5566,
      username: 'postgres',
      password: '5zdlJFRBKh3zsutdOptQkNNiWCSgAeaNBUA6LIYWm3L4lo4bVc0o5OMlSLBJr6HU',
      database: 'AjibadeAdeleke',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

