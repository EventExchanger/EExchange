export declare type CB<T> = (event: iEvent<T>) => void;
export interface iEvent<T> {
    name: string;
    initiator: object;
    data?: T;
}
declare class EExchange {
    subscribeEvent<T>(groups: string[], cb: CB<T>): void;
    unsubscribeEvent<T>(groups: string[], cb: CB<T>): void;
    raiseEvent<T>(event: iEvent<T>): void;
}
declare const eexchange: EExchange;
export default eexchange;
