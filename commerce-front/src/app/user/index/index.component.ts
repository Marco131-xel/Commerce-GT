import { Component } from '@angular/core';
import { HeaderComponent } from "../../user/layout/header/header.component";
import { FooterComponent } from "../../user/layout/footer/footer.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
