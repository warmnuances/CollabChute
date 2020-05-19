Live Base Url: https://collabchute.herokuapp.com/

# Endpoints
- Core Functionality 1: User Auth - 100%
## User sign up: /v1/api/user/signup
## User sign in: /v1/api/user/signin

>To Access routes, you need to get a token from signin
>Pass in this into the body in signin(Postman):
>{
>	"email":"crainville@taobao.com",
>	"password":"123456"
>}
>This will give you a JWT. Pass in the authorisation header. You need to add Bearer 
>e.g Header:
> Key: Authorization 
> Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ik.....
> Jwt will store all user details. So, there is no GET Method for users. 
> In fact, you can get user email form JWT. 
> In future, roles will be in JWT


Main Functionality:
Functionality is going to center around project. 
Project itself is a core functionality that consists of Core Functionalities
## - Core Functionality 2  -> Add Project :/v1/api/project/add
Example body: 
>{
> "project_detail":"details",
> "project_name":"name of project",
>}

-> GET projects will be done once RBAC is setup

Functionalities in a project(status):
 - Core Functionality 3: Group Chat - 20% 
  -> users can connect via socket io client. Front end must be done to get chat messages to be saved into database
  -> might introduce slack integration
  -> Seperate Chats based on project - 50%

> Working Proof
> Go to browser console, in https://collabchute.herokuapp.com/
> You will notice a message: "From Server" 



- Core Functionality 4 : Adding of files - 40% done 
## @endpoint:  POST /v1/api/upload -> upload files
## @endpoint:  GET /v1/api/upload -> Get files in that server
  -> Files will be uploaded to /uploads folder in the server. 
  -> In the future, it will be uploaded to S3 or Firebase Storage - the other 40%
  -> Seperate files based on Projects 
  -> RBAC functionality not done

- Core Functionality 5: Todo List 
  -> Not Implemented 

- Core Functionality 6: Project Details 
  -> Not Implemented

- Core Functionality 7: Project Ranking
  -> Not Implemented

- Core Functionality 8: RBAC(Role Based Access Control) - 10% 
  -> other functionalities must be done first to implement this.
  -> users will have read/write access on certain functionalities based on project owner. 
  -> roles is stored in an array

- Core Functionality 8: Discussions 
  -> Issue Tracking
  -> Questions and Answers



# Deploying docker image to heroku
docker build -t warmnuances/collabchute .
docker images
docker tag 99a77db08c22 registry.heroku.com/collabchute/web 
docker push registry.heroku.com/collabchute/web
heroku container:release web --app collabchute

# Running docker in localhost
docker run --name collabchute-app -p 8080:5000 -d warmnuances/collabchute

# Bash into container
docker exec -it f961ba6f6005 bash

#Set GCS Key 
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Hans\Projects\School\CollabChute\server\utils\comrs-8d4974d0386b.json"

#move build
mv build/* ../view