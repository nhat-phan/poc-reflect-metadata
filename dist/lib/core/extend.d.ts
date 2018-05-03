import { ClassDefinition } from '../types';
export declare type Decorator = (target: any) => any;
export declare type InstanceExtending = (instance: any) => any;
export declare function extend(className: string): Decorator;
export declare function extend<T>(classDefinition: ClassDefinition<T>): Decorator;
export declare function extend(className: string, decorator: InstanceExtending): void;
export declare function extend<T>(classDefinition: ClassDefinition<T>, decorator: InstanceExtending): void;
