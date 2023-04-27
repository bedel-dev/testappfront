import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.css']
})
export class SucessComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }
  route= "";

  ngOnInit(): void {
   this.route = this.router.snapshot.params['id'];
  }

}
