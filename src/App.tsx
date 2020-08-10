import React, { useReducer } from "react";
import InputData from "./InputData";
import Task from "./Task";

import "./styles.css";

enum TodoActionsConsts {
  ADD_TODO = "ADD_TODO",
  REMOVE_TODO = "REMOVE_TODO",
  TOGGLE_COMPLETE = "TOGGLE_COMPLETE"
}

interface Action {
  type: TodoActionsConsts;
  data?: Todo | number;
}

interface Todo {
  description: string;
  done: boolean;
  complete: boolean;
}

interface State {
  todoList: Todo[];
}

class TodoClass implements Todo {
  public description: string;
  public done = false;
  public complete = false;

  constructor(description: string) {
    this.description = description;
  }
}

const reducer = (state: State, action: Action): State => {
  console.log(action);

  switch (action.type) {
    case TodoActionsConsts.REMOVE_TODO:
      return {
        ...state,
        todoList: [...state.todoList.filter((todo, i) => i !== action.data)]
      };
    case TodoActionsConsts.ADD_TODO:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            description: (action.data as Todo).description,
            done: (action.data as Todo).done,
            complete: (action.data as Todo).complete
          }
        ]
      };
    default:
      return state;
  }
};

const initialState: State = {
  todoList: []
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1> To Do APP </h1>

      <InputData
        onChange={(value) => {
          if (value.length <= 0) {
            return false;
          }

          dispatch({
            type: TodoActionsConsts.ADD_TODO,
            data: new TodoClass(value)
          });
        }}
      />
      <div className="tasks">
        {state.todoList.map((todo, i) => (
          <Task
            description={todo.description}
            key={i}
            onComplete={(status) => {
              dispatch({
                type: TodoActionsConsts.TOGGLE_COMPLETE,
                data: status
              });
            }}
            onRemove={() => {
              console.log(i);
              dispatch({
                type: TodoActionsConsts.REMOVE_TODO,
                data: i
              });
            }}
          />
        ))}
      </div>
    </>
  );
}
