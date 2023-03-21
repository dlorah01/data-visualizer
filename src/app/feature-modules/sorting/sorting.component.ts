import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './models/item';
import { AlgorithmsService } from './services/algorithms.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})

export class SortingComponent {
  numbersArray!: Item[]
  backupArray!: Item[]
  algorithmSelected = 'Bubble'
  runningState = false
  sortedState = false

  constructor(private algorithmsService: AlgorithmsService) {
    this.createNumbesArray()
    this.algorithmsService.runningState.subscribe((state: boolean) => {
      this.runningState = state
    })
    this.algorithmsService.sortedeState.subscribe((state: boolean) => {
      this.sortedState = state
    })
  }

  generateArray(quantity: number = 20): Item[] {
    const arr = Array(quantity)
    for (let index = 0; index < arr.length; index++) {
      arr[index] = {
        value: Math.floor(Math.random() * 100) + 1,
        selected: false,
        sorted: false
      }
    }
    return arr
  }

  async sort(): Promise<void> {
    switch (this.algorithmSelected) {
      case 'Selection': {
        this.algorithmsService.selectionSorting(this.numbersArray)
        break
      }
      case 'Insertion': {
        this.algorithmsService.insertionSorting(this.numbersArray)
        break
      }
      case 'Quick': {
        this.algorithmsService.quickSorting(this.numbersArray)
        break
      }
      case 'Merge': {
        this.algorithmsService.mergeSorting(this.numbersArray)
        break
      }
      default: {
        this.algorithmsService.bubbleSorting(this.numbersArray)
      }

    }
  }

  emitAlgorithmSelection(algorithm: string): void {
    this.algorithmSelected = algorithm
    this.resetArray()
    this.algorithmsService.change(false, 'sorted')
  }

  createNumbesArray(): void {
    this.numbersArray = this.generateArray()
    this. backupArray = [...this.numbersArray]
    this.algorithmsService.change(false, 'sorted')
  }

  resetArray(): void {
    this.numbersArray = [...this.backupArray]
    this.numbersArray.forEach((x: Item) => {
      x.sorted = false
      x.selected = false
    })
    this.algorithmsService.change(false, 'sorted')
  }
}
