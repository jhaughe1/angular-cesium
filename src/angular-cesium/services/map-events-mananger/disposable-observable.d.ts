import { Observable } from 'rxjs/Observable';
export declare class DisposableObservable<T> extends Observable<T> {
    dispose: Function;
}
