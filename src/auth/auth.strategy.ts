import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';
import { credentials } from './firebaseCredentials';
import { GlobalsService } from 'src/globals/globals.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private defaultApp: any;

  constructor(
    private readonly _configService: ConfigService,
    private readonly _globalsService: GlobalsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });

    this.defaultApp = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        ...credentials,
        privateKey: _configService.get('FIREBASE_PRIVATE_KEY_ID'),
      }),
    });
  }

  async validate(token: string) {
    try {
      const firebaseUser: any = await firebaseAdmin
        .auth(this.defaultApp)
        .verifyIdToken(token, true);

      if (!firebaseUser) {
        return await this._globalsService.handleError(
          new Error('User not found'),
        );
      }

      return firebaseUser;
    } catch (error) {
      return await this._globalsService.handleError(error);
    }
  }
}
