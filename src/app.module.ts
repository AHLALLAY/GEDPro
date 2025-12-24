import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodbConfig, postgresConfig } from './database/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongodbConfig.uri || 'mongodb://localhost:27017/gedpro', {}),
    TypeOrmModule.forRoot({
      type: 'postgres' as const,
      host: postgresConfig.host,
      port: postgresConfig.port ? parseInt(postgresConfig.port, 10) : 5432,
      username: postgresConfig.username,
      password: postgresConfig.password,
      database: postgresConfig.database,
      entities: ['/**/*.entity{.ts,.js}'],
      migrations: ['../database/migrations/*']
    }),
    DatabaseModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
