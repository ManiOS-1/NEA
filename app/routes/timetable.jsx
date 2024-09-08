import React from 'react';
import { useTable } from 'react-table';
import "../styles/Timetable.css";
import Navbar from "../components/Navbar";


const Timetable = () => {
  const { user } = useUser(); // Get user from context
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Fetch timetable data and columns based on user role
    fetch('/api/timetable') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setData(data.timetableData);
        setColumns(data.columns);
      });
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const isTrainer = user && user.role === 'trainer'; // Check if user is a trainer

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {isTrainer ? (
                      <input
                        type="text"
                        value={cell.value}
                        onChange={(e) => {
                          // Handle cell value change
                          const updatedData = [...data];
                          updatedData[row.index][cell.column.id] = e.target.value;
                          setData(updatedData);
                        }}
                      />
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
