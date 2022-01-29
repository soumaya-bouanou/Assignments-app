import { AuthService } from 'src/app/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment?: string;
  dateDeRendu?: Date;
  assignmentTransmis: any;

  constructor(
    public assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log("-----------")
    // Récupération des queryParams et fragment (ce qui suit le ? et le # dans l'URL)
    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment d'URL (ce qui suit le #) :");
    console.log(this.route.snapshot.fragment);
    console.log("-----------")

    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService
      .getAssignment(id)
      .subscribe((assignment) => {
        this.assignment = assignment;

        this.nomAssignment = assignment?.nom;
        this.dateDeRendu = assignment?.dateDeRendu;
      });
  }
  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((reponse) => {
          console.log(reponse.message);
          // Pour cacher l'affichage du détail (ne change pas la
          // valeur de l'assignment dans le tableau)
          this.assignmentTransmis = undefined;

          // On re-affiche la liste
          this.router.navigate(['/home']);
        });
    }
  }
  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe(reponse => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });

      this.snackbar.open("C'est modifier ",'Succes !!',{
        duration:2000,
       // verticalPosition: 'top',
        horizontalPosition:'center'
      });

  }
}
