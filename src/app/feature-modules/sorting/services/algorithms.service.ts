import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item } from '../models/item';
import { bubbleSorting } from './algorithms/bubble-sorting';
import { insertionSorting } from './algorithms/insertion-sorting';
import { mergeSorting } from './algorithms/merge-sorting';
import { quickSorting } from './algorithms/quick-sorting';
import { selectionSorting } from './algorithms/selection-sorting';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {

  private runningCode: Subject<boolean> = new Subject()
  private sortedCode: Subject<boolean> = new Subject()

  constructor() {}

  async bubbleSorting(arr: Item[]): Promise<void> {
    this.change(true, 'running')
    bubbleSorting(arr).then(() => {
      this.change(false, 'running')
      this.change(true, 'sorted')
    })
  }

  async selectionSorting(arr: Item[]): Promise<void> {
    this.change(true, 'running')
    selectionSorting(arr).then(() => {
      this.change(false, 'running')
      this.change(true, 'sorted')
    })
  }

  async insertionSorting(arr: Item[]): Promise<void> {
    this.change(true, 'running')
    insertionSorting(arr).then(() => {
      this.change(false, 'running')
      this.change(true, 'sorted')
    })
  }

  async quickSorting(arr: Item[]): Promise<void> {
    this.change(true, 'running')
    quickSorting(arr).then(() => {
      this.change(false, 'running')
      this.change(true, 'sorted')
    })
  }

  async mergeSorting(arr: Item[]): Promise<void> {
    this.change(true, 'running')
    mergeSorting(arr).then(() => {
      this.change(false, 'running')
      this.change(true, 'sorted')
    })
  }

  get runningState(): Observable<boolean> {
    return this.runningCode.asObservable()
  }

  get sortedeState(): Observable<boolean> {
    return this.sortedCode.asObservable()
  }

  change(event: boolean, obs: string): void {
    if (obs === 'running') this.runningCode.next(event)
    else if (obs === 'sorted') this.sortedCode.next(event)
  }

}
