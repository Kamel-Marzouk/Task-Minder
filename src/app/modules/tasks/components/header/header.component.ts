import { Component, EventEmitter, Output } from '@angular/core';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  searchValue: string = '';

  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Output() onRemoveSearch: EventEmitter<any> = new EventEmitter();

  constructor(public translation: TranslationService) { }

  onKey(event: any): void {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.onSearch.emit(event);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.onRemoveSearch.emit();
  }

}
