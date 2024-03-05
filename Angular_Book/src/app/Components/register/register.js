app.controller("booksCtrl", [
    "$scope",
    "booksService",
    "$window",
    function (sc, booksService, $window) {
      //First code that shouls be implemented in all Controllers
      if ($window.localStorage.getItem("user") == null) {
        booksService.logoutService();
      }
      sc.SearchImage = true;
      //Logout Implementation
      sc.logout = function () {
        console.log("I am logged out");
        booksService.logoutService();
      };
      //Fetching User Name From Local Storage
      sc.UserDisplyName = JSON.parse(
        $window.localStorage.getItem("user")
      ).fullName;
  
      //The Input Search Box is Initialized to null
      sc.searchBook = "";
      sc.searchedBookResult = [];
  
      //Sorting Function
      sc.sortValue = "";
      sc.sortingDD = false;
  
      sc.SortingFun = function () {
        console.log(sc.selectedItem);
        if (sc.selectedItem == "Title") {
          sc.sortValue = "title";
        } else if (sc.selectedItem == "Author Name") {
          sc.sortValue = "author_name[0]";
        } else if (sc.selectedItem == "Year") {
          sc.sortValue = "publish_year[0]";
        } else if (sc.selectedItem == "Rating") {
          sc.sortValue = "ratings_average";
        }
      };
  
      //Filtering Function
      sc.FilteredNewArray = [];
      sc.filterValue = "";
      sc.selectFltr = "";
      sc.filteringDD = false;
      let element;
      let rra;
      let arr;
  
      sc.FilterFun = function (value) {
        try {
          sc.FilteredNewArray = [] 
          sc.displayFilter = true;
          sc.displaySearch = false;
          if (value !== "" && sc.FilteredNewArray.length !== 0) {
            sc.searchedBookResultF = sc.FilteredNewArray;
            console.log(sc.searchedBookResultF);
          }
          console.log(value);
          if (value == "History") {
            sc.filterValue = "history";
          } else if (value == "Fiction") {
            sc.filterValue = "fiction";
          } else if (value == "Mystery") {
            sc.filterValue = "mystery";
          } else if (value == "Horror") {
            sc.filterValue = "horror";
          } else if (value == "Finance") {
            sc.filterValue = "finance";
          } else if (value == "Adventure") {
            sc.filterValue = "adventure";
          } else if (value == "General") {
            sc.filterValue = "general";
          }
          arr = sc.searchedBookResult;
          if (arr !== undefined) {
            for (let i = 0; i < arr.length; i++) {
              element = arr[i];
              rra = element.subject;
              console.log(sc.FilteredNewArray);
              if (rra !== undefined) {
                for (let j = 0; j < rra.length; j++) {
                  sub = rra[j];
                  sub = sub.toLowerCase();
                  if (sub.includes(sc.filterValue)) {
                    sc.FilteredNewArray.push(element);
                  }
                }
              }
            }
          }
        } catch (error) {
          console.log("Some Error", error);
        }
      };
  
      // Calling the serach Service method from Service
      sc.sortValue = "";
  
      sc.searchBookFun = function () {
        sc.searchedBookResult = []
        // console.log("Searching book in Controller");
        sc.SearchImage = true;
        sc.displaySearch = false;
        if (sc.searchBook) {
          // console.log("Searching Book function entered in Controller");
          console.log(sc.searchBook);
  
          booksService
            .searchBooks(sc.searchBook)
  
            .then(function (searchedBookResult) {
              sc.searchedBookResult = searchedBookResult;
              console.log(sc.searchedBookResult);
              sc.displaySearch = true;
              //Sort
              sc.sortingDD = true;
              sc.Sitems = ["Title", "Author Name", "Year", "Rating"];
              sc.selectedItem = "Title";
              sc.Fitems = [
                "General",
                "History",
                "Fiction",
                "Mystery",
                "Finance",
                "Horror",
                "Adventure",
              ];
              sc.filterValue = "";
              sc.SearchImage = false;e;
            })
  
            .catch(function () {
              sc.searchedBookResult.push({
                title:
                  "Sorry There is SomeThing Error in Finding Book You Searched",
              });
            })
  
            .finally(function () {
              sc.searchBook = "";
            });
        }
      };
    },
  ]);