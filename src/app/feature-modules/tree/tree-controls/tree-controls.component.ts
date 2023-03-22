import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tree-controls',
  templateUrl: './tree-controls.component.html',
  styleUrls: ['./tree-controls.component.scss']
})
export class TreeControlsComponent {
  @Output() emitTraversal: EventEmitter<string> = new EventEmitter<string>()
  @Output() emitGenerate: EventEmitter<void> = new EventEmitter<void>()
  @Output() emitReset: EventEmitter<void> = new EventEmitter<void>()
  @Output() emitTraverse: EventEmitter<void> = new EventEmitter<void>()
  @Input() runningState!: boolean | null
  @Input() traversedState!: boolean | null

  constructor() {}

 onChange(selection: HTMLSelectElement): void {
    this.emitTraversal.emit(selection.value)
  }

  generateArray(): void {
    this.emitGenerate.emit()
  }

  resetArray(): void {
    this.emitReset.emit()
  }

  traverseArray(): void {
    this.emitTraverse.emit()
  }

}
