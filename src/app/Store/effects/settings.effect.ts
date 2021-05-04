import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { catchError, map, mergeMap } from 'rxjs/Operators';
import { ProductsService } from 'src/app/services/products-service.service';
import { FailedAction, LOAD, LoadSettingsAction, SuccessAction } from '../actions/settings.action';

@Injectable()
export class SettingsEeffect{
/**
 *
 */
settingsEffect$=createEffect(()=>this.actions.pipe(
    ofType<LoadSettingsAction>(LOAD),
    mergeMap(()=>this.service.getSettings()
    .pipe(
        map((data)=>new SuccessAction(data)),
        catchError((err)=>of(new FailedAction(err)))
    ))   
))            
constructor(private service:ProductsService,
    private actions:Actions) {
    
   
}

}