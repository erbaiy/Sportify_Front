import React from 'react';

function TableF() {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Age</th>
                        <th className="py-2 px-4 border-b">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b">John Doe</td>
                        <td className="py-2 px-4 border-b">30</td>
                        <td className="py-2 px-4 border-b">john@example.com</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">Jane Smith</td>
                        <td className="py-2 px-4 border-b">25</td>
                        <td className="py-2 px-4 border-b">jane@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableF;