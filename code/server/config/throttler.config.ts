import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';

const throttlerConfig: ThrottlerModuleOptions = [
  {
    ttl: 60000,
    limit: 10,
  },
];

const ConfiguredThrottler = ThrottlerModule.forRoot(throttlerConfig);

export default ConfiguredThrottler;
