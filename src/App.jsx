import "./App.css";
import Header from "./Components/Header/Header";
import Pagination from "./Components/Pagination/Pagination";
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

  let usersPerPage = 10;
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

  let performSearch = (value) => {
    let filterData = filteredData.filter(
      ({ name, role, email }) =>
        name.toLowerCase().includes(value) ||
        role.includes(value) ||
        email.includes(value)
    );

    setUserData(filterData);
    setCurrentPage(1);
    return null;
  };

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

  useEffect(() => {
    fetchData();
  }, []);

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
    setFiteredData(updatedUserData);
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
  let isFewChecked = userData.some((user) => user.isChecked === true);

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
    console.log("dataperpage", dataPerPage);
    console.log("delet", deleteAbleData);
    currentPage !== 1 && setCurrentPage(currentPage - 1);
  }

  
  
  //  updating deletable data when user will switch to another page  
  useEffect(() => {
    if (checkedAll) {
      setDeletAbleData(dataPerPage);
    }
  }, [currentPage]);
  
  //  updating deletable data when userData will Be Update  
  useEffect(() => {
    if (checkedAll) {
      setDeletAbleData(dataPerPage);
    }
  }, [userData]);

  return (
    <>
      <div className={isBlurActive ? "app active" : "app"}>
        <Header
          searchHandler={debounceSearch}
          deleteAllSelectedUsers={deleteAllSelectedUsers}
          isDisable={deleteAbleData == [] ? true : false}
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
    </>
  );
}

export default App;
