import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('Status');
  const [sorting, setSorting] = useState('None');

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);   

    };
    fetchData();   

  }, []);

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  
  const sortTickets = (ticketsToSort) => {
    if (sorting === 'Priority') {
      return ticketsToSort.sort((a, b) => b.priorityLevel - a.priorityLevel);
    } else if (sorting === 'Title') {
      return ticketsToSort.sort((a, b) => a.title.localeCompare(b.title));
    }
    return ticketsToSort; 
  };

  
  const groupTickets = (ticketsToGroup) => {
    const sortedTickets = sortTickets(ticketsToGroup);
    if (grouping === 'Status') {
      return sortedTickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'User') {
      return sortedTickets.reduce((acc, ticket) => {
        acc[ticket.assignedUser] = acc[ticket.assignedUser] || [];
        acc[ticket.assignedUser].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'Priority') {
      return sortedTickets.reduce((acc, ticket) => {
        const priorityLevel = ticket.priorityLevel === 0 ? 'No priority' : ticket.priorityLevel;
        acc[priorityLevel] = acc[priorityLevel] || [];
        acc[priorityLevel].push(ticket);
        return acc;
      }, {});
    }
    return {}; 
  };

  const groupedTickets = groupTickets(tickets);

  
  const columns = Object.entries(groupedTickets).map(([columnName, ticketsInColumn]) => (
    <KanbanColumn key={columnName} title={columnName} tickets={ticketsInColumn} />
  ));

  return (
    <div className="kanban-board">
      <div className="controls">
        <select value={grouping} onChange={handleGroupingChange}>
          <option value="Status">Group By Status</option>
          <option value="User">Group By User</option>
          <option value="Priority">Group By Priority</option>
        </select>
        <select value={sorting} onChange={handleSortingChange}>
          <option value="None">Sort None</option>
          <option value="Priority">Sort By Priority</option>
          <option value="Title">Sort By Title</option>
        </select>
      </div>
      <div className="board-container">{columns}</div>
    </div>
  );
};

export default KanbanBoard;
