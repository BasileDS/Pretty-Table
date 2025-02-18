export default function TableBody ({id, data}) {

    // Format data from simple object to array of objects for each row
    function formatEmployees(employee) {
        const key = Object.keys(employee)
        const value = Object.values(employee)
        const employeeData = []
        for (let i = 0; i < value.length; i++) {
            const data = { key: key[i], value: value[i] }
            employeeData.push(data)
        }
        return employeeData
    }

    return <>
        <tbody className="pretty-tbody" id={`ptbody-${id}`}>
            {
                data?.map((employee, i) => {
                    // Format employee object to return an array of object (ex: [{firstName: Tom}, {}, ... ]
                    const employeeData = formatEmployees(employee)
                    return (
                        <tr className="pretty-tbody-rows"
                            id={`ptable-${id}-${i}`} 
                            key={`ptable-emp-tr-${employee[0]}-${i}`}
                        >
                            {
                                employeeData.map((employee, i) => {
                                    const id = employee.value.trim().toLowerCase().replace(/\s/g,"").split("/").join("")
                                    return <td
                                            className={`pretty-tbody-cells ${employee.key}`}
                                            key={`ptable-emp-td-${id}-${i}`}>
                                                {employee.value}
                                            </td>
                                })
                            }
                        </tr>
                        )
                    }
                )
            }
        </tbody>
    </>
}