import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['*'],
  portalUrl: process.env.PORTAL_URL || 'http://localhost:4200',
}));