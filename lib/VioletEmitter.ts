type EventMap = {
    [key: string]: (...args: any[]) => void;
}

export default class<K extends EventMap> {
    private listening: { [key: string]: Array<(...args: any[]) => void> } = {};

    public subscribe<T extends keyof K>(event: T, fn: K[T]) {
        this.listening[event as string] = this.listening[event as string] ?? [];
        this.listening[event as string].push(fn);
        return this;
    }

    public remove<T extends keyof K>(event: T, fn: K[T]) {
        let lis = this.listening[event as string];
        if (!lis) return this;
        for(let i = lis.length; i > 0; i--) {
          if (lis[i] === fn) {
            lis.splice(i,1);
            break;
          }
        }
        return this;
    }

    public once<T extends keyof K>(event: T, fn: K[T]) {
        this.listening[event as string] = this.listening[event as string] ?? [];
        const once = () => {
            fn();
            // @ts-ignore
            this.remove(event, once);
        }
        this.listening[event as string].push(once);
        return this;
    }

    public emit<T extends keyof K>(event: T, ...args: any[]) {
        let fns = this.listening[event as string];
        if (!fns) return false;
        fns.forEach(f => f(...args));

        return true;
    }

    public count(event: string) {
        return ((e: any[] | undefined) => e ? e.length : 0)(this.listening[event]);
    }
}