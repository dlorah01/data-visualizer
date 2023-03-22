import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { NodeTree } from './models/node';
import { TraversalsService } from './services/traversals.service';
declare let LeaderLine: any

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements AfterViewInit, OnDestroy{
  @ViewChildren('reference') reference!: QueryList<ElementRef<HTMLElement>>;
  linesArray: any[] = []
  numbersArray!: NodeTree[]
  backupArray!: NodeTree[]
  traversalSelected = 'PostOrder'
  runningState = false
  traversedState = false

  constructor(private traversalsService: TraversalsService){
    this.createNumbesArray()
  }
  ngOnDestroy(): void {
    console.log(this.linesArray)
    for (let index = 0; index < this.linesArray.length; index++) {
      this.linesArray[index].remove()

    }
  }
  ngAfterViewInit(): void {
    const optionsLeft = {startSocket: 'bottom', endSocket: 'top', endPlug: 'behind', path: 'fluid', size: 8, color: '#f8f8fa', animation: true}
    const optionsRight = {startSocket: 'bottom', endSocket: 'top', endPlug: 'behind', path: 'fluid', size: 8, color: '#f8f8fa'}
    for (let index = 0; index < this.numbersArray.length - 2; index++) {
      const origin = this.reference.find((x: ElementRef<HTMLElement>) => x.nativeElement.id === `node-${index}`)
      const firstChild = this.reference.find((x: ElementRef<HTMLElement>) => x.nativeElement.id === `node-${(2 * index) + 1}`)
      const secondChild = this.reference.find((x: ElementRef<HTMLElement>) => x.nativeElement.id === `node-${(2 * index) + 2}`)
      try {
        const firstLine = new LeaderLine(origin?.nativeElement, firstChild?.nativeElement, optionsLeft)
        const secondLine = new LeaderLine(origin?.nativeElement, secondChild?.nativeElement, optionsRight)
        this.linesArray.push(firstLine)
        this.linesArray.push(secondLine)
      } catch (error) {}
    }
  }

  generateArray(quantity: number = 7): NodeTree[] {
    const arr = Array(quantity)
    for (let index = 0; index < arr.length; index++) {
      arr[index] = {
        id: `node-${index}`,
        value: Math.floor(Math.random() * 100) + 1,
        selected: false,
        sorted: false
      }
    }
    return arr
  }

  async traverse(): Promise<void> {
    switch (this.traversalSelected) {
      case 'InOrder': {
        this.traversalsService.dfsInOrder(this.numbersArray)
        break
      }
      case 'PreOrder': {
        this.traversalsService.dfsPreOrder(this.numbersArray)
        break
      }
      default: {
        this.traversalsService.dfsPostOrder(this.numbersArray)
      }

    }
  }

  emitTraversalSelection(traversal: string): void {
    this.traversalSelected = traversal
    this.resetArray()
    this.traversalsService.change(false, 'traversed')
  }

  createNumbesArray(): void {
    this.numbersArray = this.generateArray()
    this. backupArray = [...this.numbersArray]
    this.traversalsService.change(false, 'traversed')
  }

  resetArray(): void {
    this.numbersArray = [...this.backupArray]
    this.numbersArray.forEach((x: NodeTree) => {
      x.sorted = false
      x.selected = false
    })
    this.traversalsService.change(false, 'traversed')
  }


}
