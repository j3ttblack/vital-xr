import { Component } from '@angular/core';

@Component({
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  btnText: String;
  navigate(){
    window.open('https://add.albertadoctors.org/issues/january-february-2022/failing-forward/', '_blank');
  }
}
