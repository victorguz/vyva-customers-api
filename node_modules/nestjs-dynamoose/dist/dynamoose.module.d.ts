import { DynamicModule } from '@nestjs/common';
import { ModelDefinition } from './interfaces';
import { AsyncModelFactory } from './interfaces/async-model-factory.interface';
import { DynamooseModuleAsyncOptions, DynamooseModuleOptions } from './interfaces/dynamoose-options.interface';
export declare class DynamooseModule {
    static forRoot(options?: DynamooseModuleOptions): DynamicModule;
    static forRootAsync(options: DynamooseModuleAsyncOptions): DynamicModule;
    static forFeature(models?: ModelDefinition[]): DynamicModule;
    static forFeatureAsync(factories?: AsyncModelFactory[]): DynamicModule;
}
