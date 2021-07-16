export interface Hash<T> {
    [s: string]: T;
}
export declare type CB<T> = (event: iEvent<T>) => void;
export interface iEvent<T> {
    name: string;
    initiator: object;
    data?: T;
}
export declare class EExchange {
    static subscribeEvent<T>(groups: string[], cb: CB<T>): void;
    static unsubscribeEvent<T>(groups: string[], cb: CB<T>): void;
    static raiseEvent<T>(event: iEvent<T>): void;
}
export declare class Console {
    static log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    static info: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    static error: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    static debug: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    static warn: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
}
