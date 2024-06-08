
getposts()


let currentpage = 1
 let lastpage = 1
//<--SCROLLING PAGE-->
window.addEventListener("scroll", function(){

  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight //offset//
  console.log( window.innerHeight,window.pageYOffset,document.body.offsetHeight)
  
  if(endOfPage && currentpage < lastpage){
    currentpage = currentpage + 1
    getposts(false, currentpage)
  }
}) 
//<--//SCROLLING PAGE//-->








   function userclick(userId)
    {
      // alert(userId)
      
      window.location = `profile.html?userid=${userId}`
    }


    function getposts(reload = true ,page = 1 ){
            togglelouder(true)
            axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`)
            .then((response) =>{
              togglelouder(false)
                let zezo = response.data.data
                lastpage = response.data.meta.last_page



                if(reload == true){
                  document.getElementById("get-posts").innerHTML = ""
                }
            
              
                for(post of zezo)
                {
                    console.log(zezo)
                    let aut = post.author 
                    let user = currentUser()
                    let ismypost = user != null && aut.id == user.id
                    let BtnEditContent = ``
                    if(ismypost){
                      BtnEditContent = `<button class='btn btn-secondary' style='margin-left:5px;float: right' onclick="editbtnclicked('${encodeURIComponent(JSON.stringify(post))}')">edit</button>
                      
                        <button class='btn btn-danger' style='float: right' onclick="deletebtnclicked('${encodeURIComponent(JSON.stringify(post))}')">delete</button>`
                    }
                  
                    
                    let postTitle = ""
                    if(post.title != null){
                        postTitle = post.title
                    }
                    
                    let content = `
                      
                            <!--post-->
                            <div id="get-post" class="card mt-5 shadow">
                            <div class="card-header">
                              <span onclick='userclick(${aut.id})' style="cursor: pointer">
                                <img src="${aut.profile_image}" class="rounded-circle" alt="" style="width: 30px; height: 30px;">
                                <b>${aut.username}</b>
                              </span>
                                ${BtnEditContent}

                                

                            </div>
                            <div class="card-body" onclick="postonclicked(${post.id})" style="cursor: pointer">
                                    <img class="w-100" src="${post.image}" alt="">
                                  
                                    <h6 style="color: rgb(212, 216, 220); " class="mt-2">${post.created_at}</h6>
                                    <h3>
                                      ${ postTitle}
                                    
                                    </h3>
                                    <p>
                                      ${post.body}
                                    </p>
            
                                    <hr>
            
                                    <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                    </svg>
            
                                    <span>
                                        (${post.comments_count}) comments
                                        <span id="post-tags-${post.id}">
                                        
                                        </span>
                                    </span>
                                    </div>

                                    <div>
                                      
                                    </div>
                            </div>
                            </div>
                            <!--post-->
                                
                  `
                    document.getElementById("get-posts").innerHTML += content
            
                    let CurrentPostId = `post-tags-${post.id}`
            
                    document.getElementById(CurrentPostId).innerHTML = ""
            
                    for(tag of post.tags){
                      console.log(tag.name)
            
                        let tagContent =  `
                        <button class="btn btn-sm rounded-5" style="background-color: gray; color:white">${tag.name}</button>
            
                        `
                        document.getElementById(CurrentPostId).innerHTML += tagContent
                    }
                    }
                  })
     }

         
    

    function logInBtnClicked(){
      let username =   document.getElementById("UserName-name").value
      let password =   document.getElementById("Password-pass").value
      let params = {
        "username": username,
        "password": password
      }
       togglelouder(true)
      axios.post("https://tarmeezacademy.com/api/v1/login", params)
     
      .then((response) =>{
        togglelouder(false)
         localStorage.setItem("token", response.data.token)
         localStorage.setItem("user",JSON.stringify(response.data.user) )

        let modal = document.getElementById("login-Modal")
        let modalInstance =  bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showSuccessAlert("logged in successfully", "success")
        setUI()
        
        

          
        }).catch((erorr)=>{
          let message = erorr.response.data.message
          console.log(erorr)
         showSuccessAlert(message, "danger")
        })
        .finally(()=>{
          togglelouder(false)
        })
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
       togglelouder(true)
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
      .finally(()=>{
        togglelouder(false)
      })
      
    }


    function AddNewPost(){

          let postId = document.getElementById("post-id-input").value
          let isCreate = postId == null || postId == ""
          // alert(isCreate)
        
          let title =   document.getElementById("create-title-input").value
          let Body =   document.getElementById("create-body-input").value
          let image = document.getElementById("image-input").files[0]
          let token = localStorage.getItem("token")
          let formData = new FormData()
          formData.append("title", title)
          formData.append("body", Body)
          formData.append("image" , image)
        
        
          
          
         
          let headers = {
            "Content-Type": "multipart/form-data",
            "authorization": `Bearer ${token}`
          }
            if(isCreate)
              {
                axios.post("https://tarmeezacademy.com/api/v1/posts", formData ,{
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": `Bearer ${token}`
                  }
                })
                .then((response) =>{
                    
                  let modal = document.getElementById("new-Post-Modal")
                  let modalInstance =  bootstrap.Modal.getInstance(modal)
                  modalInstance.hide()
                  showSuccessAlert("User Registerd  successfully","success")
                  getposts()
                }).catch((erorr)=>{
              
                  let message = erorr.response.data.message
                  console.log(erorr)
                 showSuccessAlert(message, "danger")
              })
      
              }else{
                formData.append("_method", "put")
                axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}`, formData ,{
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": `Bearer ${token}`
                  }
                })
                .then((response) =>{
                    
                  let modal = document.getElementById("new-Post-Modal")
                  let modalInstance =  bootstrap.Modal.getInstance(modal)
                  modalInstance.hide()
                  showSuccessAlert("User Registerd  successfully","success")
                  getposts()
                }).catch((erorr)=>{
              
                  let message = erorr.response.data.message
                  console.log(erorr)
                 showSuccessAlert(message, "danger")
              })
           
          }
        } 
         
          

         
        
        

          
    

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
                         
                    
                  


    function setUI(){
        let token = localStorage.getItem("token")
          let logoutBtn = document.getElementById("div-logout")
          let loginBtn = document.getElementById("div-login")
          const addPost = document.getElementById("add-post")
        if(token == null)
            {
              addPost.style.setProperty("display" , "none" , "important")
              loginBtn.style.setProperty("display" , "flex" , "important")
              logoutBtn.style.setProperty("display" , "none" , "important")
             

            }else{

                addPost.style.setProperty("display" , "block" , "important")
                loginBtn.style.setProperty("display" , "none" , "important")
                logoutBtn.style.setProperty("display" , "flex" , "important")
                const user = currentUser()
                document.getElementById("nav-name").innerHTML = user.username
                document.getElementById("img-login").src = user.profile_image
              
                
            }
    }


     function logout (){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        // alert("logout is done")
        showSuccessAlert("logged out successfully", "success")
        setUI()
       
     }

     function currentUser(){
       let user = null
       let storgeuser = localStorage.getItem("user")
       if(storgeuser != null){
        user = JSON.parse(storgeuser)
       }

       return user
     }
     
     function postonclicked(postid){
     
      // alert(id)
      window.location = `postdetails.html?post=${postid}`
     }
     
     
    function editbtnclicked(postopject){
      let objpost = (JSON.parse(decodeURIComponent(postopject)))
      console.log(objpost)
      document.getElementById("add-btn").innerHTML = "Update"
      document.getElementById("post-id-input").value = objpost.id
      document.getElementById("AddEditPost").innerHTML = "Edit Post"
      document.getElementById("create-title-input").value = objpost.title
      document.getElementById("create-body-input").value = objpost.body
      let editmodal = new bootstrap.Modal(document.getElementById("new-Post-Modal"), {})
      editmodal.toggle()
    }

 
     function createnewpost(){
      
      document.getElementById("add-btn").innerHTML = "Create"
      document.getElementById("post-id-input").value = ""
      document.getElementById("AddEditPost").innerHTML = "Create A New Post"
      document.getElementById("create-title-input").value = ""
      document.getElementById("create-body-input").value = ""
      let editmodal = new bootstrap.Modal(document.getElementById("new-Post-Modal"), {})
      editmodal.toggle()
     }   

     function deletebtnclicked(postopject){
      let objpost = (JSON.parse(decodeURIComponent(postopject)))
      console.log(objpost)
      
      document.getElementById("delete-input").value = objpost.id
      let editmodal = new bootstrap.Modal(document.getElementById("delete-Post-Modal"), {})
      editmodal.toggle()
     }

     function DeleteNewPost(){

      let token = localStorage.getItem("token")
      let headers = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
      }
      let PostId = document.getElementById("delete-input").value
        
      
     
      axios.delete(`https://tarmeezacademy.com/api/v1/posts/${PostId }`, {
        headers: headers
         })
        
        .then((response) =>{
        
        
        let modal = document.getElementById("delete-Post-Modal")
        let modalInstance =  bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showSuccessAlert("The Post Has Been Deleted Successfully","success")
        getposts()
     }).catch((erorr)=>{
          let message = erorr.response.data.message
          console.log(erorr)
         showSuccessAlert(message, "danger")
     })
   
   
    }

    function proOnClicked(){
     const user = currentUser()
     const userId = user.id
     window.location = `profile.html?userid=${userId}`
    }

    function togglelouder(show = true) {
       if(show)
            {
             document.getElementById("loader-zs")
            }else
          {
            document.getElementById("loader-zs").style.visibility = 'hidden'
          }
    }
 