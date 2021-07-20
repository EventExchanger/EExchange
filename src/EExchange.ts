interface Hash<T> { [s: string]: T }

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


class EExchange {

    subscribeEvent<T>(groups: string[], cb: CB<T>): void {

        for (let i = 0, l = groups.length; i < l; i++) {
            let group = SUBS.callbacks[groups[i]];
            if (typeof group === 'undefined') {
                SUBS.callbacks[groups[i]] = [];
                group = SUBS.callbacks[groups[i]];
            }
            if (group.findIndex((_cb) => _cb === cb) < 0) group.push(cb);
        }
    }

    unsubscribeEvent<T>(groups: string[], cb: CB<T>): void {

        for (let i = 0, l = groups.length; i < l; i++) {
            const group = SUBS.callbacks[groups[i]];
            if (typeof group === 'undefined') {
                break;
            }
            SUBS.callbacks[groups[i]] = group.filter((_cb) => _cb !== cb);
        }
    }
    raiseEvent<T>(event: iEvent<T>): void {
        const group = event.name;
        const egroup = SUBS.callbacks[group];

        if (typeof egroup !== 'undefined') {
            egroup.map((_cb) => _cb(event));
        }
    }
}
const eexchange = new EExchange();
export default eexchange;