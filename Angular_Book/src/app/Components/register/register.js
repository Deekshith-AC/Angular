app.controller("registerCtrl", [
    "$scope",
    "registerService",
    "$window",
    function (sc, registerService, $window) {
  
      // // Check user logged in or not.
      // var checkAuth = $window.localStorage.getItem("user");
      // if (checkAuth) {
      //   // Redirect: To movies page. If the user already logged-in.
      //   registerService.goTobooks();
      //   $window.localStorage.clear()
      // }
  
      // //Redirecting to LogIn page
      // sc.redirectLogin = function () {
      //   console.log("Clicked on LogIn link");
      //   registerService.redirectToLogin();
      // }
  
  
      // // Name field
      // sc.fullName = "";
  
      // // Email field
      // sc.email = "";
  
      // // Password field
      // sc.password = "";
  
      // // Confrim Password field
      // sc.cPassword = "";
  
      // Register form Submit
      sc.handleFormSubmit = () => {
        // var validRegex =
        //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
        // check name validation.
        // if (sc.fullName.trim() === "") {
        //   alert("Name can't be empty.");
        //   return;
        // }
  
        // check email validation.
        // if (!validRegex.test(sc.email)) {
        //   alert("Enter valid email.");
        //   return;
        // }
  
        // password validation.
        // if (sc.password.length < 6) {
        //   alert("Password must contain atleast 6 characters.");
        //   return;
        // } else if (sc.password.includes(" ")) {
        //   alert("Password shouldn't contain any space.");
        //   return;
        // }
  
        // confirm password check validation.
        // if (sc.cPassword.length < 6) {
        //   alert("Confrim Password must contain atleast 6 characters.");
        //   return;
        // } else if (sc.cPassword.includes(" ")) {
        //   alert("Confirm Password shouldn't contain any space.");
        //   return;
        // } else if (sc.password !== sc.cPassword) {
        //   alert("Password and confrim password didn't matched.");
        //   return;
        // }
  
        // check if the user already exist or not.
        registerService.getUsers(function (data) {
        //   sc.user = data.filter((data) => {
        //     return data.email === sc.email;
        //   });
  
          if (sc.user.length === 0) {
            registerService.addUser({
              fullName: sc.fullName,
              email: sc.email,
              password: sc.password,
              cPassword: sc.password,
            });
            
            sc.fullName = "";
            sc.email = "";
            sc.password = "";
            sc.cPassword = "";
  
            alert("You are registered Successfully.");
            registerService.goToLogin();
          } else {
            alert("User already exist.");
            return;
          }
        });
      };
    },
  ]);