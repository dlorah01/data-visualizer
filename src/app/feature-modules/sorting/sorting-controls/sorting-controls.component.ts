import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sorting-controls',
  templateUrl: './sorting-controls.component.html',
  styleUrls: ['./sorting-controls.component.scss']
})
export class SortingControlsComponent {
  @Output() emitAlgorithm: EventEmitter<string> = new EventEmitter<string>()
  @Output() emitGenerate: EventEmitter<void> = new EventEmitter<void>()
  @Output() emitReset: EventEmitter<void> = new EventEmitter<void>()
  @Output() emitSort: EventEmitter<void> = new EventEmitter<void>()
  @Input() runningState!: boolean | null
  @Input() sortedState!: boolean | null

  constructor() {}

 onChange(selection: HTMLSelectElement): void {
    this.emitAlgorithm.emit(selection.value)
  }

  generateArray(): void {
    this.emitGenerate.emit()
  }

  resetArray(): void {
    this.emitReset.emit()
  }

  sortArray(): void {
    this.emitSort.emit()
  }

}
