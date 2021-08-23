import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'userRole', 'adminRole', "actions"];

  isLoggedIn!: boolean;
  usersList: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {

    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route });
    }

    this.userService.getUsersList().subscribe(
      response => {
        this.usersList = new MatTableDataSource(response);
      },
      error => {
        
      }
    )
  }

  addAdmin(id: string) {
    this.userService.changeRole(id, "ADD").subscribe(
      response => {
        window.location.reload();
      }
    );
  }

  deleteAdmin(id: string) {
    this.userService.changeRole(id, "DELETE").subscribe(
      response => {
        window.location.reload();
      }
    );
  }
}
