import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Request } from 'express';
import { User, UserKey } from 'src/app/schemas/user.schema';
import { handleError } from 'src/app/shared/error.functions';
import { UserRole } from 'src/app/core/constants/domain.constants';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @InjectModel('User')
    private readonly model: Model<User, UserKey>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractApiKeyFromHeader(request);

    if (!apiKey) {
      throw new Error('MS014');
    }

    try {
      // Buscar directamente el usuario con ese apiKey exactamente como se recibe del frontend
      const users = await this.model
        .scan()
        .where('apiKey')
        .eq(apiKey)
        .where('status')
        .eq(true)
        .exec();

      if (!users || users.length === 0) {
        throw new Error('MS007');
      }

      // Obtener el usuario usando toJSON para asegurar que todas las propiedades estén incluidas
      const userData = users[0].toJSON() as User;

      // Verificar que el usuario sea admin
      if (userData.role !== UserRole.admin) {
        throw new Error('MS019');
      }

      // Verificar que el usuario tenga idBusiness
      if (!userData.idBusiness) {
        throw new Error('MS014');
      }

      // Limpiar datos sensibles pero mantener idBusiness
      const cleanUserData: User = {
        ...userData,
        password: undefined,
        apiKey: undefined,
      };

      // Asegurar que el usuario se establezca correctamente en el request
      request['user'] = cleanUserData;

      // Log para depuración
      console.log('ApiKeyGuard - User establecido:', {
        id: cleanUserData.id,
        email: cleanUserData.email,
        role: cleanUserData.role,
        idBusiness: cleanUserData.idBusiness,
      });
    } catch (error) {
      console.log('ApiKeyGuard - Error:', error);
      throw handleError(error);
    }

    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    // Buscar en diferentes headers comunes para API keys
    return (
      request.headers['x-api-key'] as string | undefined ||
      request.headers['api-key'] as string | undefined ||
      request.headers['x-apikey'] as string | undefined
    );
  }
}
