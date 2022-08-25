import { Component, Input, OnInit } from '@angular/core';
import { Guest } from '../interface/guest';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-guest-name',
  templateUrl: './guest-name.component.html',
  styleUrls: ['./guest-name.component.scss']
})
export class GuestNameComponent implements OnInit {

  constructor(public AuthService : AuthenticationService) { }
  @Input() GusetName;
  guest: Guest;

  ngOnInit(): void {
  }

  Update() {
    this.AuthService.GuestName = this.GusetName;
    this.AuthService.guestLogin();
  }
}
