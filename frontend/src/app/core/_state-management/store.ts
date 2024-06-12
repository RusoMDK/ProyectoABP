import { Subject } from 'rxjs';
import { ActionTypes } from './actions';
// import { Note } from '../note-card/note-card.component';

// here we define he initial state of app equal to empty
interface InitialState {
  objects: Array<Object>;
}

let state: InitialState = {
  objects: [],
};

interface Event {
  type: String;
  payload?: Object;
}

export const store = new Subject<InitialState>();
export const eventDispatcher = new Subject<Event>();

eventDispatcher.subscribe((data: Event) => {
  switch (data.type) {
    case ActionTypes.GET_OBJECT:
      store.next(state);
      break;

    case ActionTypes.CREATE_OBJECT:
      state = {
        objects: [...state.objects, data.payload],
      };
      store.next(state);
      break;

    case ActionTypes.DELETE_OBJECT:
      const { objects } = state;
      const id = data.payload;
      const updatedObjects = objects.filter((object: any) => object.id != id);
      state = {
        objects: updatedObjects,
      };
      store.next(state);
      break;
    default:
      break;
  }
});
