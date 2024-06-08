  
  
  
  function setUI(){
    let token = localStorage.getItem("token")
      let logoutBtn = document.getElementById("div-logout")
      let loginBtn = document.getElementById("div-login")
      const addPost = document.getElementById("add-post")
    if(token == null)
        {

          if(addPost != null){
            addPost.style.setProperty("display" , "none" , "important")
          }
         
          loginBtn.style.setProperty("display" , "flex" , "important")
          logoutBtn.style.setProperty("display" , "none" , "important")
         

        }else{
          if(addPost != null){
            addPost.style.setProperty("display" , "block" , "important")
          }

           
            loginBtn.style.setProperty("display" , "none" , "important")
            logoutBtn.style.setProperty("display" , "flex" , "important")
            const user = currentUser()
            document.getElementById("nav-name").innerHTML = user.username
            document.getElementById("img-login").src = user.profile_image
          
            
        }
}

//<--AUTH FUNCTION==>

  


  function logout (){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    // alert("logout is done")
    showSuccessAlert("logged out successfully", "success")
    setUI()
   
 }

//  function currentUser(){
//    let user = null
//    const storgeuser = localStorage.getItem("user")
//    if(storgeuser != null){
//     user = JSON.parse(storgeuser)
//    }

//    return user
//  }


        function showSuccessAlert(customMassage, type){
          const alertPlaceholder = document.getElementById('success-alert')
          const appendAlert = (message, type) => {
          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
              `<div class="alert alert-${type} alert-dismissible" role="alert">`,
              `<div>${message}</div>`,
              `<button type="button" class="btn-class" data-bs-dismiss="alert" aria-lable="Close"></button>`,
              `</div>`
            
          ].join('')

          alertPlaceholder.append(wrapper)
          }

            appendAlert(customMassage, type)
        }  


function RegisterNewUser(){
      
      
  let name =   document.getElementById("register-UserName-name").value
  let registerusername =   document.getElementById("register-UserName-name").value
  let  registerpassword =   document.getElementById("register-Password-pass").value
  let imageregister = document.getElementById("image-register").files[0]
  let formDataImage = new FormData()
  formDataImage.append("name" , name)
  formDataImage.append("username",  registerusername )
  formDataImage.append("password", registerpassword )
  formDataImage.append("image" , imageregister)
 
 

  // let params = {
  //   "username": registerusername,
  //   "password":  registerpassword,
  //   "name" : name
  // }
 
  axios.post("https://tarmeezacademy.com/api/v1/register", formDataImage,{
    headers: {
      "Content-Type": "multipart/form-data",
    }
  
      

  })
  .then((response) =>{
     localStorage.setItem("token", response.data.token)
     localStorage.setItem("user",JSON.stringify(response.data.user) )

    let modal = document.getElementById("register-Modal")
    let modalInstance =  bootstrap.Modal.getInstance(modal)
    modalInstance.hide()
    showSuccessAlert("User Registerd  successfully","success")
    setUI()
  }).catch((erorr)=>{
    
    let message = erorr.response.data.message
    console.log(erorr)
   showSuccessAlert(message, "danger")
  })
  
}



function logInBtnClicked(){
  let username =   document.getElementById("UserName-name").value
  let password =   document.getElementById("Password-pass").value
  let params = {
    "username": username,
    "password": password
  }
 
  axios.post("https://tarmeezacademy.com/api/v1/login", params)
  .then((response) =>{
     localStorage.setItem("token", response.data.token)
     localStorage.setItem("user",JSON.stringify(response.data.user) )

    let modal = document.getElementById("login-Modal")
    let modalInstance =  bootstrap.Modal.getInstance(modal)
    modalInstance.hide()
    showSuccessAlert("logged in successfully", "success")
    setUI()
    
    
  })
}
  //<--//AUTH FUNCTION//==>

      const urlparams = new URLSearchParams(window.location.search)
      let id = urlparams.get("post")
      console.log(id)

  
      function getpost(){
        axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
        .then((response) => {
          // console.log(response.data)
            let post= response.data.data
            let comments = post.comments
            let author = post.author
            console.log(author.username)

            document.getElementById("username-span").innerHTML = author.username
            let aut = post.author 
            let postTitle = ""
            if(post.title != null){
              postTitle = post.title
            }

            let commentContent = ``
             for(com of comments){
                      commentContent += `
                      
                      <!--COPMMENT-->
                                                <div>
                                                  <img src="${com.author.profile_image}" alt="" class="rounded-circle" style="width: 30px;height: 30px;">
                                                  <b>${com.author.username}</b>
                                                </div>
                                                <!--COPMMENT-->

                                                <!--BODY-->
                                                <div>
                                                 ${com.body}
                                                </div>
                                                 <!--//BODY//-->
                      
                      `
             }
            
            
          

            let postcontent = `
             <div class="card mt-5 shadow ">
                  <div id="post-z" class="card-header">
                  <img src="${aut.profile_image}" class="rounded-circle" alt="" style="width: 30px; height: 30px;">
                      <b>${author.username}</b>
                  </div>
                  <div class="card-body">
                          <img class="w-100" src="${post.image}" alt="">
                          
                          <h6 style="color: rgb(212, 216, 220); " class="mt-2">2 min ago</h6>
                              <h3>
                              ${ postTitle}
                          
                              </h3>
                              <p id="body">
                              ${post.body}
                             </p>

                          <hr>

                      <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                          </svg>

                          <span>
                          (${post.comments_count}) comments
                          </span>
                      </div>
                          <div id="comment-user" class="mt-3" style="background-color: rgb(247, 245, 245);">
                          ${commentContent}
                          </div>

                          <div class="input-group m-3" id="com-div" >
                           <input class="form-control" type="text" id="input-comment" placeholder="type your comment here..">
                           <button class="btn btn-outline-primary" onclick="addbtnclicked()">
                             send
                           </button>
                          </div>
                     </div>
            
            `

                   document.getElementById("post-z").innerHTML = postcontent
        })
      }

      getpost()

      function addbtnclicked(){
        let commentbody = document.getElementById("input-comment").value
        let paramscom = {
          "body": commentbody
        }
    
        let token = localStorage.getItem("token")

      axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`, paramscom , {

        headers:{

          "authorization": `Bearer ${token}`
        }
      })
      .then((response)=>{
        console.log(response.data)
        showSuccessAlert("the comment has been created successfully", "success")
        getpost()
      })
      .catch((error) =>{
        const erorrmassage = error.response.data.message
        showSuccessAlert(erorrmassage, "danger")
      })
    }