import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-read-button',
  templateUrl: './read-button.component.html',
  styleUrls: ['./read-button.component.css']
})
export class ReadButtonComponent {
@Input() chapter_id=''
}
