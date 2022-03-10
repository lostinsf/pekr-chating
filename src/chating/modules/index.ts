import { Module } from '@nestjs/common';
import { ChatingGateWay } from 'src/chating/gateways';

@Module({
  imports: [],
  providers: [ChatingGateWay],
})
export class ChatModule {}
