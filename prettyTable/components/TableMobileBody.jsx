export default function TableMobileBody ({id, data}) {

    // Format data from simple object to array of objects for each row
    const formatEmployees = (employee) => {
        const key = Object.keys(employee)
        const value = Object.values(employee)
        const employeeData = []
        for (let i = 0; i < value.length; i++) {
            const title = formatKey(key[i])
            const data = { key: key[i], value: value[i], title: title }
            employeeData.push(data)
        }
        return employeeData
    }

    function formatKey(key) {
        // Add space before uppercase letters
        let result = key.replace(/([a-z])([A-Z])/g, '$1 $2');
        // Capitalize the first letter
        result = result.replace(/^(.)/, (match) => match.toUpperCase())
        return result
      }
      


    return <>
        <div className="pretty-cards" id={`ptbody-${id}`}>
            {
                data?.map((employee, i) => {
                    // Format employee object to return an array of object (ex: [{firstName: Tom}, {}, ... ]
                    const employeeData = formatEmployees(employee)
                    return (
                        <div
                            className="pretty-data-card"
                            id={`ptable-${id}-${i}`} 
                            key={`ptable-emp-tr-${employee[0]}-${i}`}
                        >
                            {
                                employeeData.map((employee, i) => {
                                    const id = employee.value.trim().toLowerCase().replace(/\s/g,"").split("/").join("")
                                    return <>
                                        <p 
                                            className={`pretty-data-card-line ${employee.key}`}
                                            key={`ptable-emp-td-${id}-${i}`}
                                        >
                                            <strong>{employee.title} : </strong> {employee.value}
                                        </p>
                                    </>
                                })
                            }
                        </div>
                    )}
                )
            }
        </div>
    </>
}