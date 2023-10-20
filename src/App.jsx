import "./App.css";
import Header from "./Components/Header/Header";
import Pagination from "./Components/Pagination/Pagination";
import AddNewUserForm from "./Components/AddNewUserForm/AddNewUserForm";
import Table from "./Components/Table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function App() { 
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState();
  const [deleteAbleData, setDeletAbleData] = useState([]);
  const [filteredData, setFiteredData] = useState([]);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [checkedAll, setCheckedAll] = useState(false);
  const [isBlurActive, setBlurActive] = useState(false);

 let usersPerPage = 10
  let numOfPage = Math.ceil(userData.length / usersPerPage);
  let totalNoOfPages = Array.from([...Array(numOfPage + 1)].keys()).slice(1);
  let lastIndex = usersPerPage * currentPage;
  let startIndex = lastIndex - usersPerPage;
  let dataPerPage = userData.slice(startIndex, lastIndex);

  const fetchData = async () => {
    try {
      let response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      let data = response.data;
      setUserData(data);
      setFiteredData(data);
    } catch (err) {
      console.log(err);
    }
  };

  /* 
  
  * function to update newUser object while filling input field for  new user using new user form
  @param {{  target : {value : string . name: string}  }} event
  
  */

  const inputChangeHandler = (event) => {
    setNewUser({
      ...newUser,
      id: (userData.length + 1).toString(),
      [event.target.name]: event.target.value,
    });
  };

  /*
  
  * @param {String}  value
  Taking user input from search  
  
  */

  let performSearch = (value) => {
    let filterData = filteredData.filter(
      ({ name, role, email }) =>
        name.toLowerCase().includes(value) ||
        role.includes(value) ||
        email.includes(value)
    );

    console.log(userData);
    setUserData(filterData);
    setCurrentPage(1);
    return null;
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* 
      * 
      To add new user in list of the table
      
      @param {{  preventDefault : function()}} event
      
      */

  const addNewUserHandler = (event) => {
    event.preventDefault();
    setUserData([...userData, newUser]);
    setFiteredData([...filteredData, newUser]);
    setBlurActive(!isBlurActive);
    setNewUser({
      id: "",
      name: "",
      email: "",
      role: "",
    });
  };

  /*
      To update user information form the list
      
      @oaram {number}  id
  @oaram {{preventDeafult : function()}}  event
  @oaram {object}  user - Data for updating existing user in the list
  @param {string} name  - name of the user
  @param {string} email - email of the user
  @param {string} role - role of the user    


  */
  const updateHandler = (id, event, user) => {
    event.preventDefault();
    const index = userData.findIndex((user) => user.id === id);
    const updatedUserData = [...userData];
    updatedUserData.splice(index, 1, user);
    setUserData(updatedUserData);
  };

  /*
   This function   will update the propert {isChecked} of the  
   that user whenever we click on the checkbox

  * @param{object} data - data of the user when we will click on checkbox of the particular user
  * @param{number} id - id of the user 
  
  */

  const singleCHeched = (id, data) => {
    const index = userData.findIndex((user) => user.id === id);
    const updatedUserData = [...userData];
    updatedUserData.splice(index, 1, { ...data, isChecked: !data.isChecked });
    setUserData(updatedUserData);
    const isPresent = deleteAbleData.some((user) => user.id === id);
    if (isPresent) {
      const idx = deleteAbleData.findIndex((user) => user.id === id);
      const data = [...deleteAbleData];
      data.splice(idx, 1);
      setDeletAbleData(data);
    } else {
      let user = userData.find((user) => user.id === id);
      setDeletAbleData([...deleteAbleData, user]);
    }
  };

  let isAllChecked = userData.every((user) => user.isChecked === true);
  let isFewChecked = userData.some((user) => user.isChecked ===true);

  /*
  Function to select all or deselect  all the users on the currentpage   
  */

  const onSelectAll = () => {
    setCheckedAll(true);
    setCheckedAll(!checkedAll);

    let data = userData.map((user) => {
      return {
        ...user,
        isChecked:
          deleteAbleData.length && checkedAll
            ? false
            : deleteAbleData.length && !checkedAll
            ? true
            : !user.isChecked,
      };
    });
    setUserData(data);
    setDeletAbleData(dataPerPage);

    if (isFewChecked || isAllChecked) {
      setDeletAbleData(dataPerPage);
    }

    if (isAllChecked || (isFewChecked && checkedAll)) {
      setDeletAbleData([]);
    }
  };

  /*
   Function to delete all selected users from the table
   
     */
  const deleteAllSelectedUsers = () => {
    let selectedUsers = new Set(deleteAbleData.map((user) => user.id));
    let data_After_delete = userData.filter(
      (user) => !selectedUsers.has(user.id)
    );
    setUserData(data_After_delete);
  };

  /*
     function to delete the user from the list
    * @param {number} id - id of the that user
     */
  const deleteHandler = (id) => {
    const deleteUser = userData.filter((user) => user.id !== id);
    setUserData(deleteUser);
  };

  /*
    function to update the current page number
    * @param {number}  pageNum - current page number   
 */

  function updatePageNmmber(pageNum) {
    setCurrentPage(pageNum);
    
  }

  //  Function to go to next page
  function nextPage() {
    currentPage !== numOfPage && setCurrentPage(currentPage + 1);    
  }

  //  Function to go to previous page
  function prevPage() {
    currentPage !== 1 && setCurrentPage(currentPage - 1);
      
       
  }

  /*
  Debounce = This function ise to be called wheneven user types in the search field

  * @param{{target : {value : string}}}  event
  * JS event object emitted from the search input field
  
  */

  const debounceSearch = (event) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    let timer = setTimeout(() => {
      performSearch(event.target.value.toLowerCase().trim());
    }, 800);
    setDebounceTimeout(timer);
  };

  /*

  * To hide or unhide the addNewUserForm  whenever we click on AddUser button to add new member in the list
  * @param{{preventDefault : function()}}  event  

  */
  const displayForm = (event) => {
    event.preventDefault();
    setBlurActive(!isBlurActive);
  };

  useEffect(() => {
    if (checkedAll) {
      setDeletAbleData(dataPerPage);
    }
  }, [currentPage]);

  return (
    <>
      <div className={isBlurActive ? "app active" : "app"}>
        <Header
          searchHandler={debounceSearch}
          deleteAllSelectedUsers={deleteAllSelectedUsers}
          displayForm={displayForm}
        />
        <main>
          <Table
            deleteHandler={deleteHandler}
            userData={dataPerPage}
            onSelectAll={onSelectAll}
            updateHandler={updateHandler}
            singleCHeched={singleCHeched}
            checkedAll={checkedAll}
          />
          <Pagination
            totalNoOfPages={totalNoOfPages}
            updatePageNmmber={updatePageNmmber}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </main>
      </div>

      <AddNewUserForm
        newUser={newUser}
        addNewUserHandler={addNewUserHandler}
        inputChangeHandler={inputChangeHandler}
        displayForm={displayForm}
        isBlurActive={isBlurActive}
      />
    </>
  );
}

export default App;
