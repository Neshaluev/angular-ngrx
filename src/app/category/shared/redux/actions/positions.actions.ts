import { Position } from 'src/app/shared/model/interface';
import { Action } from '@ngrx/store';

export enum PositionsActionsTypes {
  AllPositionsRequested = '[Запрос на получцение позиций] Position Request',
  AllPositionsLoaded = '[Загрузка всех позиций] Position Request'
}

export class AllPositionsRequested implements Action  {
  readonly type = PositionsActionsTypes.AllPositionsRequested;
}
export class AllPositionsLoaded implements Action {
  readonly type = PositionsActionsTypes.AllPositionsLoaded;
  constructor(public payload: {positions: Position[]}) {}
}



export type PositionsAction = AllPositionsRequested | AllPositionsLoaded;
