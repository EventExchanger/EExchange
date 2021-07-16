export interface Hash<T> { [s: string]: T; }

export type CB<T> = (event: iEvent<T>) => void;

export interface iEvent<T> {
    name: string;    // имя события
    initiator: object; // ref to creator
    data?: T;
}

interface iSubs {
    // подписки на события
    callbacks: Hash<CB<any>[]>; // хэш с ключем название события и знаечние массив колбэков

    // в теории если будет ппц как много колбэков то переделать их на хэш колбэков 
    // у каждого объекта колбэка заводим уникальный ид и вперед
    // https://stackoverflow.com/questions/1997661/unique-object-identifier-in-javascript
}

const SUBS: iSubs = {
    callbacks: {},
};


export class EExchange {

    static subscribeEvent<T>(groups: string[], cb: CB<T>): void {
        Console.log('.....SUBSCRIBE_EVENT', groups);

        for (let i = 0, l = groups.length; i < l; i++) {
            let group = SUBS.callbacks[groups[i]];
            if (typeof group === 'undefined') {
                SUBS.callbacks[groups[i]] = [];
                group = SUBS.callbacks[groups[i]];
            }
            if (group.findIndex((_cb) => _cb === cb) < 0) group.push(cb);
        }
    }

    static unsubscribeEvent<T>(groups: string[], cb: CB<T>): void {
        //if (typeof document === 'undefined') return; // проверка нужна для предотвращения сериализации ссылок при серверном рендеринге

        for (let i = 0, l = groups.length; i < l; i++) {
            let group = SUBS.callbacks[groups[i]];
            if (typeof group === 'undefined') {
                break;
            }
            SUBS.callbacks[groups[i]] = group.filter((_cb) => _cb !== cb);
        }
    }
    static raiseEvent<T>(event: iEvent<T>): void {
        const group = event.name;
        Console.log('...STORE=', SUBS);
        Console.log('...raiseEvent', group, event);
        const egroup = SUBS.callbacks[group];
        Console.log('...raiseEvent!', group, egroup);

        if (typeof egroup !== 'undefined') {
            egroup.map((_cb) => _cb(event));
        }
    }
}

export class Console {
    public static log = process.env.NODE_ENV === 'development' ? console.log : (arg: any, ...args: any[]) => { /* empty */ };
    public static info = process.env.NODE_ENV === 'development' ? console.info : (arg: any, ...args: any[]) => { /* empty */ };
    public static error = console.error;//process.env.NODE_ENV === 'development' ? console.error : (arg: any, ...args: any[]) => { /* empty */ };
    public static debug = process.env.NODE_ENV === 'development' ? console.debug : (arg: any, ...args: any[]) => { /* empty */ };
    public static warn = process.env.NODE_ENV === 'development' ? console.warn : (arg: any, ...args: any[]) => { /* empty */ };
}
