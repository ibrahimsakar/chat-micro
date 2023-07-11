import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import EventsModule from 'src/events/events.module';
import SocketModule from 'src/modules/socket/socket.module';
import ChatModule from './api/chat/chat.module';
import HealthModule from './api/health/health.module';
import configuration from 'src/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
    EventsModule,
    SocketModule,
    ChatModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
