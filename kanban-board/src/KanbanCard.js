import React from 'react';

const KanbanCard = ({ ticket }) => {
  const priorityColors = {
    4: 'red',
    3: 'orange',
    2: 'yellow',
    1: 'green',
    0: 'gray',
  };

  return (
    <div className="kanban-card">
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        <span className="card-title">{ticket.title}</span>
      </div>
      <div className="card-content">
        <p className="card-description">{ticket.description}</p>
        <div className="card-details">
          <span className="card-priority" style={{ backgroundColor: priorityColors[ticket.priorityLevel] }}>
            {ticket.priorityLevel === 0 ? 'No priority' : ticket.priorityLevel}
          </span>
          <span className="card-status">{ticket.status}</span>
          <span className="card-assignee">{ticket.assignedUser}</span>
        </div>
      </div>
      <div className="card-footer">
        <button className="card-action">Edit</button>
        <button className="card-action">Delete</button>
      </div>
    </div>
  );
};

export default KanbanCard;