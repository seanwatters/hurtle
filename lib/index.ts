type Cleanup = () => void;

export class Sender<T> {
    target: EventTarget;

    constructor(target: EventTarget) {
        this.target = target;
    }

    send(msg: T) {
        this.target.dispatchEvent(new CustomEvent('e', { detail: msg }));
    }
}

type ReceiverCB<T> = (msg: T) => void;

export class Receiver<T> {
    target: EventTarget;

    constructor(target: EventTarget) {
        this.target = target;
    }

    recv(cb: ReceiverCB<T>): Cleanup {
        const listener = (e: Event) => {
            const { detail: msg } = e as CustomEvent<T>;
            cb(msg);
        };

        this.target.addEventListener('e', listener);

        return () => {
            this.target.removeEventListener('e', listener);
        };
    }
}

export class Channel<T> {
    tx: Sender<T>;
    rx: Receiver<T>;

    constructor() {
        const target = new EventTarget();

        this.tx = new Sender(target);
        this.rx = new Receiver(target);
    }
}
