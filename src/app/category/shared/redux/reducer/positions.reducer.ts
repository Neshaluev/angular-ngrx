import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { PositionsActionsTypes, PositionsAction } from '../actions/positions.actions';
import { Position } from 'src/app/shared/model/interface';


export interface StatePosition extends EntityState<Position>{
  allPositionsLoaded: boolean;
}


export const adapter: EntityAdapter<Position> = createEntityAdapter<Position>();

export const initialState: StatePosition = adapter.getInitialState({
  allPositionsLoaded: false
});

export function reducer(state = initialState, action: PositionsAction): StatePosition{
  switch (action.type) {
    case PositionsActionsTypes.AllPositionsLoaded:
      return adapter.addAll(action.payload.positions,
        {
          ...state,
          allPositionsLoaded: true
        }
      )
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
