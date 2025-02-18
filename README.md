# Pretty Table Documentation

Welcome to the *Pretty Table* official documentation. This library provide a React table component to enhance your website data presentation. We try to gather here all usefull information dealing with the Pretty Table App and further developments, to make sure everyone can participate to its improvement.

## Functionalities
- Responsive react table component
- Create your table with a simple "data" object
- Configure your table with a simple "config" object
- Select how many table rows to display 
- Navigate through page by clicking "prev" and "next button
- Manage display order (ascending, descending)
- Search bar to filter data (optional)
- Add accent color to match your website design (optional)

## Install Pretty Table on you project

First of all, start your favorite code editor and open the project you would like to add PrettyTable to.
Then, open the terminal and install Pretty Table using NPM :<br>
`npm install pretty-table-ds`

### Creating you first Pretty Table

Now you can start using Pretty Table on your project. Start by importing its main React component on the page you would like to display the table. To do so, write this this line on top of your file :<br>
`import PrettyTable from 'pretty-table-ds'`

The library is installed and the components is now available on our page. We can now call it on our React page by adding `<PrettyTable />` where we want to display the table.

The library has been installed, you've added your first table, congrats !
But as you can see when loading the page, an error message pops up. Prety Table component needs two arguments to work as expected and we gaved none of them. Let's add them right  now.

### The `{data}` and `{config}` mandatory objects

Our Pretty Table component needs two arguments to work fine. The first one is `{data}` which expect to receive a object of two entries :

1. First entry: an object or JSON file of data to be displayed on our table. (Ex: yourDataToDisplay)
2. Second entry: an array of objects to configure the table columns. These objects must have a `title` and a `data` entry.
    The `title` is the string that will be shown of the thead table column. 
    The `data` is the string that is used to run logical conditions when sorting the table for instance.
Those informations are mandatory for the table to work as expected.

**Example :**
```
    const yourDataToDisplay = [
        {
            firstName: "Lorène",
            lastName: "Génot",
            startDate: "26/02/2025"
        },
        {
            firstName: "Clémentine",
            lastName: "Henry",
            startDate: "12/02/2025"
        },
        {
            ...
        }
    ]

    const data = {
        data: yourDataToDisplay,
        columns: [
            { title: 'First Name', data: 'firstName' },
            { title: 'Last Name', data: 'lastName' },
            { title: 'Start Date', data: 'startDate' }
        ]
    }

    function MyPage () {
        return (
            <PrettyTable data={data} />
        )
    }
```

**! important :** As you can see in the above two examples, the data objects to be displayed on our table must have the exact same structure as the columns data configuration.

## Pretty Table Architecture

Pretty Table Library<br>
├── Pretty Table<br>
│ ├── assets<br>
│ │ └── asset.svg<br>
│ ├── utils<br>
│ │ └── logic.js<br>
│ ├── PrettyTable.jsx<br>
│ ├── pretty-table.css<br>

Its structure follows the React basics recommendations, using specific folders for pages, components, and assets. The `App.jsx` file allows us to configure the *React Router* while the `Main.jsx` file displays the app on the page's `<body>`.

At this stage of the app development, which is still early, the structure is not fixed and may change based on upcoming development steps.

### Pretty Table App Structure

