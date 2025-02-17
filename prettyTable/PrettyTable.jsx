/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react"
import getRandomId from "./utils/randomId"
import { useEffect } from "react"

import "./pretty-table.css"

import searchIcon from "./assets/search-button.svg"

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

/** 
 * React component : returns the pretty table based on data object and config
 * data - Array of object containing user data
 * config  string - Object of paired key/values to define table design and data display
 */
export default function PrettyTable ({data, config}) {
    const [ascending, setAscending] = useState(null)
    const [firstEntry, setFirstEntry] = useState(0)
    const [entriesNb, setEntriesNb] = useState(null)
    const [entriesNbToDisplay, setEntriesNbToDisplay] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortingType, setSortingType] = useState(null)
    const [employeesList] = useState(data.data ? data.data : null)
    const [sortedEmployeesList, setSortedEmployeesList] = useState(employeesList)
    const [filteredEmployeesList, setFilteredEmployeesList] = useState(null)
    
    const activeNbToDisplayRef = useRef(5)
    const activeCellFilterRef = useRef(null)
    const prevCellFilterRef = useRef(null)

    const randomId = getRandomId(10)
    const activeEntriesNb = entriesNbToDisplay > entriesNb ? entriesNb : entriesNbToDisplay

    // Stores a part of table config into const
        const accentColor = config.accentColor && config.useAccentColor ? {
        color: config.accentColor,
        borderColor: config.accentColor
    } : null

    // Triggered on table thead cells click.
    const handleTableClick = (type, e) => {
        setEntriesNbToDisplay(Number(entriesNbToDisplay))
        setFirstEntry(0)
        setSortingType(type)
        activeCellFilterRef.current = e.target

        const cellAriaSort = activeCellFilterRef.current.getAttribute("aria-sort")
        const isCellActive = cellAriaSort === "none" ? false : true        
        
        if (isCellActive) {
            toggleActiveFilter(activeCellFilterRef.current)
        } else {
            changeFilterType(activeCellFilterRef.current)
        }
    }
    
    const handleFilterOrderClick = () => {
        toggleActiveFilter(activeCellFilterRef.current)
    }
    
    // Toogle current filter display order (ascending / descending)
    const toggleActiveFilter = (cell) => {
        if (cell === null) {
            return
        }
        const isAscending = cell.getAttribute("aria-sort")
        if (isAscending === "ascending") {
            setAscending(false)
            cell.setAttribute("aria-sort", "descending")
        } else {
            setAscending(true)
            cell.setAttribute("aria-sort", "ascending")
        }
    }
    
    // Switch to a new filter. Displays data by ascending order
    const changeFilterType = (cell) => {
        setAscending(true)
        prevCellFilterRef.current && prevCellFilterRef.current.classList.remove("active")
        prevCellFilterRef.current && prevCellFilterRef.current.setAttribute("aria-sort", "none")
        cell.setAttribute("aria-sort", "ascending")
        cell.classList.add("active")

        prevCellFilterRef.current = cell
    }

    // Change number of entrie to be displayed on the table
    const handleEntriesNbChange = (e) => {
            const selectValue = e.target.value
            setFirstEntry(0)
            setEntriesNbToDisplay(selectValue)
            activeNbToDisplayRef.current = Number(e.target.value)
            setCurrentPage(1)
    }

    // Filter table content based on search bar value
    const handleSearchByFilter = (e) => {
        const searchInputValue = e.target.value.trim()
        const matchingElements = []

        const employeesCopy = [...employeesList]
        employeesCopy.forEach(employee => {
            Object.entries(employee).forEach(entry => {
                entry[1].toLowerCase().includes(searchInputValue.toLowerCase()) && 
                !matchingElements.includes(employee) &&
                matchingElements.push(employee)
            })
        })

        if (searchInputValue === "") {
            setFilteredEmployeesList(null)
        } else {
            setFilteredEmployeesList(matchingElements)
        }
    }

    // Load next entries based on curent entries and the number of entrie to display
    const handleNextButton = () => {
        setFirstEntry(Number(entriesNbToDisplay))
        setEntriesNbToDisplay(Number(entriesNbToDisplay) + activeNbToDisplayRef.current)
        setCurrentPage(currentPage + 1)
    }
    
    // Load previous entries based on curent entries and the number of entrie to display
    const handlePrevButton = () => {
        setFirstEntry(firstEntry - activeNbToDisplayRef.current)
        setEntriesNbToDisplay(Number(entriesNbToDisplay) - activeNbToDisplayRef.current)
        setCurrentPage(currentPage - 1)
    }
    
    // Triggered when user change : 
    // the sorting type, the order (asc/decs), the entry number to display, employee search, new table page load
    useEffect(() => {
        const employeesCopy = filteredEmployeesList !== null ? filteredEmployeesList : [...employeesList]

        const sortByType = employeesCopy.sort(( a, b ) => {
            const A = a[sortingType]
            const B = b[sortingType]
    
            if ( A > B ){
                return 1
            }
            if ( A < B ){
                return -1
            }
            return 0
        } )

        const sortedEmployees = ascending ? sortByType : sortByType.reverse()
        const sortedEmployeesToDisplay = sortedEmployees.slice(firstEntry, Number(entriesNbToDisplay))

        setSortedEmployeesList(sortedEmployeesToDisplay)
        setEntriesNb(sortedEmployees.length)
    }, [sortingType, ascending, entriesNbToDisplay, filteredEmployeesList, firstEntry])
    
    return <>
    <div id={`pt-table-${randomId}`}>
            {
                <div id={`pt-filters-${randomId}`} className="pt-active-filters">
                    {
                        config.showSearchBar && config.searchBarToLeft && (
                            <div className="pt-search-wrapper">
                                <input
                                    type="search"
                                    placeholder="Search employee(s)"
                                    id="pt-filters-search" 
                                    onChange={(e) => handleSearchByFilter(e)} 
                                    className="pt-filters-search"
                                />
                                <img src={searchIcon} id="pt-search-icon" alt="search icon" className="pt-search-icon"/>
                            </div>
                        )
                    }
                    <p className="pt-filters-order">
                        Order:
                        <span
                        id="pt-filters-order-value"
                        onClick={(e) => handleFilterOrderClick(sortingType, e)}
                        className="pt-filters-value pt-filters-order-value">{
                            ascending === null ?
                                "+ recent" :
                                ascending ?
                                    "ascending" :
                                    "descending"
                        }</span>
                    </p>
                    <p className="pt-filters-order">Total entries:<span className="pt-filters-value">{entriesNb}</span></p>
                    <p className="pt-filters-order">
                        Show
                        <select 
                        id="entries-to-display"
                        defaultValue={entriesNbToDisplay} 
                        onChange={(e) => handleEntriesNbChange(e)} 
                        className="pt-filters-value">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        entries
                    </p>
                    {
                        config.showSearchBar && !config.searchBarToLeft && (
                            <div className="pt-search-wrapper">
                                <input 
                                    type="search"
                                    placeholder="Search employee(s)"
                                    id="pt-filters-search" 
                                    onChange={(e) => handleSearchByFilter(e)} 
                                    className="pt-filters-search"
                                />
                                <img src={searchIcon} id="pt-search-icon" className="pt-search-icon"/>
                            </div>
                        )
                    }
                </div>
            }
            <div className="pretty-table-container">
                <table className="pretty-table" id={`ptable-${randomId}`}>
                    <thead className="pretty-thead">
                        <tr className="pretty-thead-row">
                            {
                                data.columns.map( (col, i) => {
                                    const key = `ptable-col-${col.data}-${i}`
                                    return <th 
                                            className={`pretty-thead-cells ${col.data}`}
                                            id={`pt-${col.data}`}
                                            scope="col"
                                            key={key}
                                            aria-sort="none"
                                            onClick={(e) => handleTableClick(col.data, e)}>
                                                {col.title}
                                            </th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className="pretty-tbody" id={`ptbody-${randomId}`}>
                        {
                            sortedEmployeesList.map((employee, i) => {
                                // Format employee object to return an array of object (ex: [{firstName: Tom}, {}, ... ]
                                const employeeData = formatEmployees(employee)
                                return (
                                    <tr className="pretty-tbody-rows"
                                        id={`ptable-${randomId}-${i}`} 
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
                </table>
            </div>
            <div className="pt-footer">
                <div className="pt-footer-nav">
                    <button
                        style={accentColor && accentColor}
                        onClick={handlePrevButton} 
                        className={
                            firstEntry === 0 ?
                                "pt-footer-button-prev no-action" :
                                "pt-footer-button-prev"
                        }
                    >
                        Prev
                    </button>
                    <p className="pt-filters-value">Page {currentPage}</p>
                    <button
                        style={accentColor && accentColor}
                        onClick={handleNextButton}
                        className={
                            Number(activeEntriesNb) === Number(entriesNb) ?
                                "pt-footer-button-next no-action" :
                                firstEntry === 0 ?
                                    "pt-footer-button-next" :
                                    activeEntriesNb === entriesNb ?
                                        "pt-footer-button-next no-action" :
                                        "pt-footer-button-next"
                    }>
                        Next
                    </button>
                    </div>
                <p className="pt-filters-order">
                    Showing {firstEntry} to {activeEntriesNb} from {entriesNb} entries 
                    {
                        filteredEmployeesList !== null ?
                            ` (filtered from ${employeesList.length} total entries)` :
                            ""
                    }
                </p>
            </div>
        </div>
    </>
}