## RBDND

https://egghead.io/lessons/react-create-reorderable-horizontal-lists-with-react-beautiful-dnd-direction-prop

<DragDropContext/> => Page Wrapper 

<Droppable /> => Column
-Expects its child to be a function
	-first argument is ‘provided’ object
	-‘type’ & ‘isDropDisabled’ => regulate what can be dropped

<Draggable /> => Item 
-Expects its child to be a function
	-first argument is ‘provided’ object
		=> provided.draggableProps
		=> provided.dragHandleProps
			-add to hamburger
		=> Need to provide a ref
			(innerRef={provided.innerRef})


Snapshot = how you style item during drag