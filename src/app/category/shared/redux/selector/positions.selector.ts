import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StatePosition } from '../reducer/positions.reducer';
import * as fromPositionReducer from '../reducer/positions.reducer';

export const selectPositionState = createFeatureSelector<StatePosition>('positions')

export const selectPositionLoaded = createSelector(
  selectPositionState,
  positions => positions.allPositionsLoaded
)

export const selectAllPositions = createSelector(
  selectPositionState,
  fromPositionReducer.selectAll
)


