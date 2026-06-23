import { RegistryRecord } from '../registry';
export type InitConditionCb = (element: HTMLElement, record: RegistryRecord) => boolean;
export declare function setGlobalInitCondition(cb: InitConditionCb): void;
export declare function addComponentRecord<T extends HTMLElement>(element: T, name: string, ref: any, selector?: string): void;
export declare function initComponents(root: HTMLElement): void;
