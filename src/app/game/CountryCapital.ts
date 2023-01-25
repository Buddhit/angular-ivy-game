import { Component, Input } from '@angular/core';

type Data = {
  [key: string]: string;
};

@Component({
  selector: 'app-country-capital',
  styleUrls: ['game.scss'],
  templateUrl: './game.html',
})
// Do not change the way the component is named and exported.
export class CountryCapitalComponent {
  @Input() data;
  items: string[] = [];
  selectedFirstItem: string = '';
  selectedSecondItem: string = '';
  //Use console.log() for debugging

  randomiseData(data: Data, force: boolean = false): string[] {
    if (this.items.length && !force) return this.items;
    this.items = [];
    for (const key in data) {
      this.items.push(key);
      this.items.push(data[key]);
    }

    this.items = this.shuffle(this.items);
    return this.items;
  }

  selectButton(item: string): void {
    if (this.selectedFirstItem && this.selectedSecondItem) {
      //reset the game
      this.selectedFirstItem = '';
      this.selectedSecondItem = '';
    }
    if (!this.selectedFirstItem) {
      this.selectedFirstItem = item;
      return;
    }
    if (!this.selectedSecondItem) {
      this.selectedSecondItem = item;
    }

    if (!this.selectedFirstItem || !this.selectedSecondItem) return;

    this.verifySelection();
  }

  getColor(item: string): string {
    if (this.selectedFirstItem === item && !this.selectedSecondItem)
      return 'first-item-select';
    if (
      (this.selectedFirstItem === item || this.selectedSecondItem === item) &&
      this.selectedSecondItem &&
      this.selectedFirstItem
    )
      return 'wrong-selection';

    return '';
  }

  private shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  verifySelection(): void {
    for (const key in this.data) {
      if (this.hasMatached(key)) {
        this.selectedFirstItem = '';
        this.selectedSecondItem = '';
        delete this.data[key];
        this.randomiseData(this.data, true);
        return;
      }
    }
  }
  private hasMatached(key: string): boolean {
    if (
      this.selectedFirstItem === key &&
      this.selectedSecondItem === this.data[key]
    )
      return true;

    if (
      this.selectedSecondItem === key &&
      this.selectedFirstItem === this.data[key]
    )
      return true;

    return false;
  }
}
