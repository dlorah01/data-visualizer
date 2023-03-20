import { Component } from '@angular/core';
import { Item } from './models/item';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})

export class SortingComponent {
  numbersArray!: Item[]
  backupArray!: Item[]
  algorithmSelected = 'Bubble'

  constructor() {
    this.createNumbesArray()
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
    console.log(this.algorithmSelected)
    switch (this.algorithmSelected) {
      case 'Selection':
        {
          this.selectionSorting()
        break
        }
      case 'Insertion': {
        this.insertionSorting()
        break
      }
      default: {
        this.bubbleSorting()
      }

    }
  }

  async bubbleSorting(): Promise<void> {
    for (let i = this.numbersArray.length; i > 0; i--) {
      for (let j = 0; j < i -1; j++) {
        this.numbersArray[j].selected = true
        this.numbersArray[j + 1].selected = true
          if (this.numbersArray[j].value > this.numbersArray[j + 1].value) {
            [this.numbersArray[j], this.numbersArray[j+1]] = [this.numbersArray[j + 1], this.numbersArray[j]]
          }
          await this.sleep()
        this.numbersArray[j].selected = false
        this.numbersArray[j + 1].selected = false
      }
      this.numbersArray[i - 1].sorted = true
    }
  }

  async selectionSorting(): Promise<void> {
    for (let i = 0; i < this.numbersArray.length; i++) {
      let smallest = i
      for (let j = i + 1; j < this.numbersArray.length; j++) {
        this.numbersArray[i].selected = true
        this.numbersArray[j].selected = true
          if (this.numbersArray[j].value < this.numbersArray[smallest].value) {
              smallest = j
            }
            await this.sleep()
          this.numbersArray[i].selected = false
          this.numbersArray[j].selected = false
      }
      if (i !== smallest){
        [this.numbersArray[smallest], this.numbersArray[i]] = [this.numbersArray[i], this.numbersArray[smallest]]
        await this.sleep()
      }
      this.numbersArray[i].sorted = true
    }
  }

  async insertionSorting(): Promise<void> {
    for (let i = 0; i < this.numbersArray.length; i++) {
      console.log('i', i)
        this.numbersArray[i].selected = true
        let currentVal =  this.numbersArray[i]
        let finalJ = i - 1 >= 0 ? i - 1 : 0
        for (let j = i - 1; j >= 0  && this.numbersArray[j].value > currentVal.value; j--) {
            console.log('j', j);
            this.numbersArray[j].selected = true;
            this.numbersArray[j + 1].selected = true;
            [this.numbersArray[j], this.numbersArray[j+1]] = [currentVal, this.numbersArray[j]]
            await this.sleep()
            this.numbersArray[j].selected = false;
            this.numbersArray[j + 1].selected = false;
            finalJ = j
        }
        this.numbersArray[finalJ].sorted = true
        this.numbersArray[i].selected = false
    }
    this.numbersArray[this.numbersArray.length - 1].sorted = true
  }

  async sleep(ms: number = 200): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  }

  emitAlgorithmSelection(algorithm: string): void {
    this.algorithmSelected = algorithm
    this.resetArray()
  }

  createNumbesArray(): void {
    this.numbersArray = this.generateArray()
    this. backupArray = [...this.numbersArray]
  }

  resetArray(): void {
    console.log('reset')
    this.numbersArray = [...this.backupArray]
    this.numbersArray.forEach((x: Item) => {
      x.sorted = false
      x.selected = false
    })
  }
}
