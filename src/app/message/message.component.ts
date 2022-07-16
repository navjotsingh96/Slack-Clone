import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: any;

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
