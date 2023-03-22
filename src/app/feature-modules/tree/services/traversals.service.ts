import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NodeTree } from '../models/node';
import { dfsInOrder } from './algorithms/dfs-in-order';
import { dfsPostOrder } from './algorithms/dfs-post-order';
import { dfsPreOrder } from './algorithms/dfs-pre-order';

@Injectable({
  providedIn: 'root'
})
export class TraversalsService {
  private runningCode: Subject<boolean> = new Subject()
  private traversedCode: Subject<boolean> = new Subject()

  constructor() {}

  async dfsInOrder(arr: NodeTree[]): Promise<void> {
    this.change(true, 'running')
    dfsInOrder(arr).then(() => {
      this.change(false, 'running')
      this.change(true, 'traversed')
    })
  }

  async dfsPostOrder(arr: NodeTree[]): Promise<void> {
    this.change(true, 'running')
    dfsPostOrder(arr).then(() => {
      this.change(false, 'running')
      this.change(true, 'traversed')
    })
  }

  async dfsPreOrder(arr: NodeTree[]): Promise<void> {
    this.change(true, 'running')
    dfsPreOrder(arr).then(() => {
      this.change(false, 'running')
      this.change(true, 'traversed')
    })
  }

  get runningState(): Observable<boolean> {
    return this.runningCode.asObservable()
  }

  get traversedState(): Observable<boolean> {
    return this.traversedCode.asObservable()
  }

  change(event: boolean, obs: string): void {
    if (obs === 'running') this.runningCode.next(event)
    else if (obs === 'traversed') this.traversedCode.next(event)
  }
}
