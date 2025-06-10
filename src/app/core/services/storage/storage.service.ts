import { Injectable, signal, Signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageReady = false;
  private storageInstance: Storage | null = null;

  private nameSignal = signal('');
  private keySignal = signal('');
  private hasKey$ = new BehaviorSubject<boolean>(false);

  constructor(private storage: Storage) {
    this.initStorage();
  }

  /**
   * Init Storage and get name and key
   * Emit name and key if already exists
   */
  private async initStorage() {
    this.storageInstance = await this.storage.create();
    this.storageReady = true;
    // this.clean()
    const name = await this.storageInstance.get('name');
    const key = await this.storageInstance.get('key');


    if (name && key) {
      console.log('Tem name and key')
      this.nameSignal.set(name);
      this.keySignal.set(key);
      this.hasKey$.next(true);
    }
  }


  /**
   * Create User if does not have key
   *
   * @param name User's Name
   * @returns
   */
  public async createUser(name: string): Promise<void> {
    if (!this.storageReady) await this.initStorage();

    const alreadyHasKey = await this.storageInstance?.get('key');

    if (alreadyHasKey) return;

    const key = uuidv4();

    await this.storageInstance?.set('name', name);
    await this.storageInstance?.set('key', key);

    this.nameSignal.set(name);
    this.keySignal.set(key);
    this.hasKey$.next(true)
  }

  public getHasKey$(): Observable<boolean> {
    return this.hasKey$.asObservable()
  }

  public get getName(): Signal<string> {
    return this.nameSignal
  }

  public get getKey(): Signal<string> {
    return this.keySignal
  }

  public async clean() {
    await this.storageInstance?.clear();

    this.nameSignal.set('');
    this.keySignal.set('');
    this.hasKey$.next(false);

    await this.storageInstance?.remove('name');
    await this.storageInstance?.remove('key');

  }
}
