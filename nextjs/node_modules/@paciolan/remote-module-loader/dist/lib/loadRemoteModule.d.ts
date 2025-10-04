import { Fetcher } from "../models";
export interface CreateLoadRemoteModuleOptions {
    requires?: any;
    fetcher?: Fetcher;
}
interface LoadRemoteModule {
    (url: string): Promise<any>;
}
interface CreateLoadRemoteModule {
    (options?: CreateLoadRemoteModuleOptions): LoadRemoteModule;
}
export declare const createLoadRemoteModule: CreateLoadRemoteModule;
export {};
