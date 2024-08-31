import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secret:'JWT_secret',
      secretOrKey: configService.get('hard!to-guess_secret'),
      
    });
  }

  validate(payload: any) {
    // Extract user information from the payload
    const { userId, username } = payload;
    // Return the user object or any necessary data for authentication
    return { userId, username };
  }
}