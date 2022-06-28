import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {InsertMovie} from "../../../actions/Movie.actions";
import {Observable} from "rxjs";
import {Category} from "../../../models/Category";



@Component({
  selector: 'app-insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.css']
})
export class InsertFormComponent implements OnInit {


  constructor(private fb:FormBuilder,
              private store:Store) {
    this.insertForm=this.createForm();
  }

  addMoreCounter:number=0;
  insertForm: FormGroup;

  @Input() categories$?:Observable<Category[]>;

  ngOnInit(): void {

  }

  createForm(){
    return this.fb.group({
      title:["",[Validators.required,Validators.minLength(3)]],
      duration:["",[Validators.required,Validators.pattern("([1-9]|[1-9][0-9]|[1-9][0-9][0-9])")]],
      releaseDate:["",[Validators.required]],
      videoUrl:["",[Validators.required,Validators.pattern("(^(https?\\:\\/\\/)?(www\\.youtube\\.com|youtu\\.be)\\/.+$)")]],
      categories:this.fb.array([
        this.fb.control("")
      ],[Validators.required,Validators.min(1)]),
      summary:["",Validators.required],
      file:["",Validators.required],
      fileSource: ['', [Validators.required]]
    });
  }

  addCat(){
    this.addMoreCounter++;
    this.categories.push(this.fb.control(""));
  }

  removeCat(index:number){
    this.addMoreCounter--;
    this.categories.removeAt(index);
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.insertForm.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit(){
    let data=this.insertForm.value;
    console.log(data);
    if(this.insertForm.valid) {
      const formData: FormData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          formData.append(key, element);
        }
      }

      this.store.dispatch(new InsertMovie(formData));
    }
  }

  get categories(): FormArray{
    return this.insertForm.get("categories") as FormArray;
  }

  get title(){
    return this.insertForm.get("title");
  }
  get duration(){
    return this.insertForm.get("duration");
  }
  get releaseDate(){
    return this.insertForm.get("releaseDate");
  }
  get videoUrl(){
    return this.insertForm.get("videoUrl");
  }
  get summary(){
    return this.insertForm.get("summary");
  }

}
