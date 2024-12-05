import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameStatModule } from './game-stat/game-stat.module';
import { ReportModule } from './report/report.module';
import { ScheduleClassModule } from './schedule/schedule.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:"127.0.0.1",
    port:3306,
    username: "root",
    password:"password",
    database:"pshchallenge",
    entities: [__dirname + '/../**/*.model.{js,ts}'],
    autoLoadEntities: true,
    synchronize:true
    
  }),GameStatModule, ReportModule, ScheduleClassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
