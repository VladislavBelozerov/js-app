import { RegistryRecord } from '../registry';
export type InitConditionCb = (record: RegistryRecord) => boolean;
export declare function setGlobalInitIgnore(cb: InitConditionCb): void;
export declare function initComponents(root: HTMLElement): void;
