import { AuthService } from 'src/app/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir = ""; // champ du formulaire
  dateDeRendu?:Date;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              public AuthService:AuthService,
              public snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(event:Event) {

    const newAssignment:Assignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    

    //this.assignments.push(newAssignment);
    // On envoie le nouvel assignment sous la forme d'un événement
    //this.nouvelAssignment.emit(newAssignment);

    // On utilise directement le service.
    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log(reponse.message);

      // On re-affiche la liste
      this.router.navigate(['/home']);

    })
    this.snackbar.open("L'assignment a été bien ajouter ",'Succes !!',{
      duration:2000,
     // verticalPosition: 'top',
      horizontalPosition:'center'
    });

    
  }
}
