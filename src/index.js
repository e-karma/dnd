import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import initialData from './initial-data';
import Column from './column';

const App = () => {
  const [state, setState] = useState(initialData)

  const columnsData = state.columnOrder

  // const onDragStart = () => {
  //   document.body.style.color = 'orange'
  // };

  // const onDragUpdate = update => {
  //   const { destination } = update;
  //   const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
  //   document.body.style.backgroundColor = `rgba(153,141,217,${opacity}`
  // };

  // persist reorder
  const onDragEnd = result => {
    document.body.style.color = 'inherit';

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    // did order change?
    if (
      destination.droppableId === source.droppableId && destination.index === source.index
    ) {
      return;
    }

    // retrieve column from state
    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    // remove item
    newTaskIds.splice(source.index, 1);
    // add destination item draggableId
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    }

    setState(newState);
    // call Server for persistence here!
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      // onDragUpdate={onDragUpdate}
      // onDragStart={onDragStart}
    >
    {
        columnsData.map(columnId => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />
        })
    }
    </DragDropContext>
  )
  };
ReactDOM.render(<App />, document.getElementById('root'));