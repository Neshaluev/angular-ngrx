import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/redux/reducers';
import { CategoryService } from 'src/app/shared/services/category.service';
import { selectAllPositions } from '../shared/redux/selector/positions.selector';
import { Update } from '@ngrx/entity';
import { Category } from 'src/app/shared/model/interface';
import { CategorySave } from '../shared/redux/actions/category.actions';

@Component({
    selector: 'app-course-dialog',
    templateUrl: './category-dialog.component.html',
    styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

    categoryId: String;
    category: Category
    form: FormGroup;
    name:string;
    list$: any;
    constructor(
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CategoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) category: any,
        private store: Store<AppState>
        ) {
        this.category = category;
        this.categoryId = category._id;
        console.log('dialog curse', category, 'list', this.list$)
        this.name = category.name;
        this.form = fb.group({
            name: [category.name, Validators.required],
            category: [category.positions, Validators.required],
            description: [category.description, Validators.required],
        });

    }
    ngOnInit() {
      this.list$ = this.store.pipe(select(selectAllPositions))
    }
    save() {
        const data: Category = {
          id: this.category.id,
          imageSrc: this.category.imageSrc,
          name: this.form.value.name,
          positions: this.form.value.category,
          description: this.form.value.description
        }
        console.log('Form value', this.form.value)

        this.categoryService.updateCategoryId(this.categoryId, data).subscribe(
          (changes) => {
            console.log('res', changes)
            const categories: Update<Category> = {
              id: this.category.id,
              changes
            }
            this.store.dispatch(new CategorySave({categories: categories}))
            this.dialogRef.close()
          },
          (err) => {console.log('error', err)}
        )
    }

    close() {
        this.dialogRef.close();
    }

}
