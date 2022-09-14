import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 10px;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  public saveAndEditForm: FormGroup = this.fb.group({
    superHero: ['', [Validators.required]],
    alterEgo: ['', [Validators.required]],
    firstAppearance: ['', [Validators.required]],
    characters: this.fb.array([], Validators.required),
    publisher: ['', [Validators.required]],
    altImg: ['', [Validators.required]],
  });

  public publishers = [
    {
      id: Publisher.DCComics,
      desc: Publisher.DCComics.replace(' ', ' - '),
    },
    {
      id: Publisher.MarvelComics,
      desc: Publisher.MarvelComics.replace(' ', ' - '),
    },
  ];

  public hero: Hero = {
    superHero: '',
    alterEgo: '',
    characters: [],
    firstAppearance: '',
    publisher: Publisher.DCComics,
    altImg: '',
  };

  newCharacter: FormControl = this.fb.control('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        this.hero = hero;
        hero.characters.forEach((character: string) =>
          this.charactersArr.push(
            this.fb.control(character, Validators.required)
          )
        );
        this.saveAndEditForm.controls['superHero'].setValue(hero.superHero);
        this.saveAndEditForm.controls['alterEgo'].setValue(hero.alterEgo);
        this.saveAndEditForm.controls['firstAppearance'].setValue(
          hero.firstAppearance
        );
        this.saveAndEditForm.controls['publisher'].setValue(hero.publisher);
        this.saveAndEditForm.controls['altImg'].setValue(hero.altImg || '');
      });
  }

  changeImg() {
    this.hero.altImg = this.saveAndEditForm.controls['altImg'].value;
  }

  addCharacter() {
    if (this.newCharacter.invalid) return;

    this.charactersArr.push(
      this.fb.control(this.newCharacter.value, Validators.required)
    );
    this.newCharacter.reset();
    this.newCharacter.setValidators([]);
    this.newCharacter.updateValueAndValidity();
  }

  deleteCharacter(index: number) {
    this.charactersArr.removeAt(index);
    if (this.charactersArr.length === 0) {
      this.newCharacter.setValidators([Validators.required]);
      this.newCharacter.updateValueAndValidity();
    }
  }

  getHasRequiredError(formControlName: string) {
    return this.saveAndEditForm.controls[formControlName].hasError('required');
  }

  getMessageIsRequired() {
    return 'El campo es requerido';
  }

  saveHero() {
    if (this.saveAndEditForm.invalid) {
      this.saveAndEditForm.markAllAsTouched();
      this.newCharacter.markAsTouched();
      return;
    }

    let id: string = this.hero.id || '';

    this.hero = { id, ...this.saveAndEditForm.value };

    if (this.hero.id != '') {
      this.heroesService.updateHero(this.hero).subscribe((hero) => {
        this.showSnackbar('Registro actualizado');
      });
    } else {
      this.heroesService.addHero(this.hero).subscribe((_) => {
        this.router.navigate(['/heroes/editar', this.hero.id]);
        this.showSnackbar('Registro creado');
      });
    }
  }
  deleteHero() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { ...this.hero },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHero(this.hero.id!).subscribe((_) => {
          this.router.navigate(['/heroes/list']);
          this.showSnackbar('Registro eliminado');
        });
      }
    });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'ok!', {
      duration: 2500,
    });
  }

  get charactersArr() {
    return this.saveAndEditForm.get('characters') as FormArray;
  }
}
