import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }
  route= "";

  ngOnInit(): void {
    this.route = this.router.snapshot.params['id'];
  }

}
