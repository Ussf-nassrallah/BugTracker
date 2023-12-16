import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Ticket from "./Ticket";

// Styles
import './KanbanBoard.scss';

export default function KanbanBoard() {
  const [ticketsList, setTicketsList] = useState([
    {
      id: 1,
      name: "Style the table header to make it visually appealing.",
      description: "Improve the visual appearance of the table header using modern styling.",
      assignedTo: "Youssef Nassrallah",
      type: "feature",
      status: "Proposed",
      created_at: "2023-12-06T12:00:00Z",
    },
    {
      id: 2,
      name: "Implement sorting functionality for the 'Ticket owner' column.",
      description: "Enable users to sort the table based on the 'Ticket owner' column.",
      assignedTo: "Redwan ben yecho",
      type: "bug",
      status: "In Progress",
      created_at: "2023-12-07T09:30:00Z",
    },
    {
      id: 3,
      name: "Add a confirmation dialog for delete actions.",
      description: "Prompt users with a confirmation dialog before deleting a ticket.",
      assignedTo: "Youssef Nassrallah",
      type: "issue",
      status: "In Progress",
      created_at: "2023-12-08T15:45:00Z",
    },
    {
      id: 4,
      name: "Create Edit functionality to update ticket information.",
      description: "Implement the ability to edit and update ticket information.",
      assignedTo: "Redwan ben yecho",
      type: "feature",
      status: "Proposed",
      created_at: "2023-12-09T10:15:00Z",
    },
    {
      id: 5,
      name: "Apply formatting for the 'Created_at' column.",
      description: "Format the 'Created_at' column to display dates in a user-friendly manner.",
      assignedTo: "Youssef Nassrallah",
      type: "issue",
      status: "In Progress",
      created_at: "2023-12-10T08:00:00Z",
    },
    {
      id: 6,
      name: "Add filtering options for the 'Ticket type' column.",
      description: "Allow users to filter the table based on different 'Ticket type' values.",
      assignedTo: "Redwan ben yecho",
      type: "feature",
      status: "Dev Complete",
      created_at: "2023-12-11T14:20:00Z",
    },
  ]);

  const proposed = ticketsList.filter((ticket) => ticket.status === 'Proposed');
  const inProgress = ticketsList.filter((ticket) => ticket.status === 'In Progress');
  const devComplete = ticketsList.filter((ticket) => ticket.status === 'Dev Complete');

  // const handleDragEnd = (result) => {
  //   if (!result.destination) return; // Dropped outside the droppable area

  //   const sourceIndex = result.source.index;
  //   const destinationIndex = result.destination.index;

  //   const updatedTicketsList = [...ticketsList];
  //   const [draggedTicket] = updatedTicketsList.splice(sourceIndex, 1);
  //   updatedTicketsList.splice(destinationIndex, 0, draggedTicket);

  //   // Determine the status based on the destination droppableId
  //   let newStatus;
  //   switch (result.destination.droppableId) {
  //     case 'proposed':
  //       newStatus = 'Proposed';
  //       break;
  //     case 'inProgress':
  //       newStatus = 'In Progress';
  //       break;
  //     case 'devComplete':
  //       newStatus = 'Dev Complete';
  //       break;
  //     // Add more cases if you have additional columns
  //     default:
  //       newStatus = draggedTicket.status;
  //   }

  //   // Update the status of the dragged ticket
  //   draggedTicket.status = newStatus;

  //   // Update your state with the modified tickets list
  //   setTicketsList(updatedTicketsList);
  // };


  return (
    // <DragDropContext onDragEnd={handleDragEnd}>
    //   <div className="tickets__board">
    //     {/* Proposed Column */}
    //     <Droppable droppableId="proposed">
    //       {(provided) => (
    //         <div {...provided.droppableProps} ref={provided.innerRef} className="column">
    //           <h4>Proposed</h4>
    //           {proposed.map((ticket, index) => (
    //             <Draggable key={ticket.id} draggableId={ticket.id.toString()} index={index}>
    //               {(provided) => (
    //                 <div
    //                   ref={provided.innerRef}
    //                   {...provided.draggableProps}
    //                   {...provided.dragHandleProps}
    //                 >
    //                   <Ticket ticket={ticket} />
    //                 </div>
    //               )}
    //             </Draggable>
    //           ))}
    //           {provided.placeholder}
    //         </div>
    //       )}
    //     </Droppable>

    //     {/* In Progress Column */}
    //     <Droppable droppableId="inProgress">
    //       {(provided) => (
    //         <div {...provided.droppableProps} ref={provided.innerRef} className="column">
    //           <h4>In Progress</h4>
    //           {inProgress.map((ticket, index) => (
    //             <Draggable key={ticket.id} draggableId={ticket.id.toString()} index={index}>
    //               {(provided) => (
    //                 <div
    //                   ref={provided.innerRef}
    //                   {...provided.draggableProps}
    //                   {...provided.dragHandleProps}
    //                 >
    //                   <Ticket ticket={ticket} />
    //                 </div>
    //               )}
    //             </Draggable>
    //           ))}
    //           {provided.placeholder}
    //         </div>
    //       )}
    //     </Droppable>

    //     {/* Dev Complete Column */}
    //     <Droppable droppableId="devComplete">
    //       {(provided) => (
    //         <div {...provided.droppableProps} ref={provided.innerRef} className="column">
    //           <h4>Dev Complete</h4>
    //           {devComplete.map((ticket, index) => (
    //             <Draggable key={ticket.id} draggableId={ticket.id.toString()} index={index}>
    //               {(provided) => (
    //                 <div
    //                   ref={provided.innerRef}
    //                   {...provided.draggableProps}
    //                   {...provided.dragHandleProps}
    //                 >
    //                   <Ticket ticket={ticket} />
    //                 </div>
    //               )}
    //             </Draggable>
    //           ))}
    //           {provided.placeholder}
    //         </div>
    //       )}
    //     </Droppable>
    //   </div>
    // </DragDropContext>

    <div className="tickets__board">
      <div className="column" id="proposed">
        <h4>Proposed</h4>
        {proposed.map((ticket, index) => <Ticket key={index} ticket={ticket} />)}
      </div>

      <div className="column" id="inProgress">
        <h4>Proposed</h4>
        {inProgress.map((ticket, index) => <Ticket key={index} ticket={ticket} />)}
      </div>

      <div className="column" id="devComplete">
        <h4>Proposed</h4>
        {devComplete.map((ticket, index) => <Ticket key={index} ticket={ticket} />)}
      </div>
    </div>

  );
}