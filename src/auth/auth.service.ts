import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  type UserCredential
} from 'firebase/auth';
import { ConfigService } from '@nestjs/config';
import { RegisterDTO } from './dto/register.dto';
import { type User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { get } from 'http';

@Injectable()
export class AuthService {
  readonly _firebaseApp: any;

  constructor(
    private readonly _configService: ConfigService,
    private readonly _usersService: UsersService,
  ) {
    this._firebaseApp = initializeApp({
      apiKey: this._configService.get('FIREBASE_API_KEY'),
      authDomain: this._configService.get('FIREBASE_AUTH_DOMAIN'),
      projectId: this._configService.get('FIREBASE_PROJECT_ID'),
      storageBucket: this._configService.get('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this._configService.get(
        'FIREBASE_MESSAGING_SENDER_ID',
      ),
      appId: this._configService.get('FIREBASE_APP_ID'),
    });
  }

  async register(registerDTO: RegisterDTO): Promise<User> {
    const { email, password } = registerDTO;
    const userCredentials: UserCredential = await createUserWithEmailAndPassword(
      getAuth(this._firebaseApp),
      email,
      password,
    );
    return await this._usersService.create(registerDTO, userCredentials.user.uid);
  }

  async login(loginDTO: LoginDTO): Promise<{ user: User; token: string }> {
    const { email, password } = loginDTO;
    const user: User = await this._usersService.findOneByEmail(email);
    if (!user) throw new Error('User not found');

    const userCredentials = await signInWithEmailAndPassword(
      getAuth(this._firebaseApp),
      email,
      password,
    );
    return { user, token: await userCredentials.user.getIdToken() };
  }

  async loginWithJWT(firebaseUid: string) {
    return await this._usersService.findOneByFirebaseUid(firebaseUid);
  }
}
