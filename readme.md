Live Base Url: https://collabchute.herokuapp.com/  
**Important**  
````
No Sign Up functionality  
Use:  
email: admin@gmail.com  
password: "123456"  
````

# Endpoints

## Sign in endpoint

**URL**  :  `/v1/api/user/signin`
**Method**  :  `POST`
**Success Response**

**Code**  :  `200 OK`
**Test Account**
```
{
	"email": "admin@gmail.com",
	"password":"123456"
}
```

## Sign up endpoint

**URL**  :  `/v1/api/user/signup`
**Method**  :  `POST`
**Success Response**

**Code**  :  `201 Resource Created`
**Code**  :  `409 Resource Conflict`

**Example Body**
```
{
	"email":"user@gmail.com",
	"password":"123456",
	"confirm_password": "123456",
	"username":"user",
	"name":"user"
}

```

## File upload endpoint

**URL**  :  `/v1/api/file/upload`
**Method**  :  `POST`
**Success Response**

**Code**  :  `201 Resource Created`

Adding Files: 
Form-data file type.
```
Query param:
project_name:  projectName,
e.g. /v1/api/file/upload?project_name
```

## List Files endpoint

**URL**  :  `/v1/api/file/list`
**Method**  :  `GET`
**Success Response**

**Code**  :  `200 OK`
```
Query param:
project_name:  projectName,
e.g. /v1/api/file/upload?project_name
```
## Download File endpoint

**URL**  :  `/v1/api/file/download`
**Method**  :  `GET`
**Success Response**

**Code**  :  `200 OK`
```
Query param:
project_name:  projectName,
file_name: fileName
e.g. /v1/api/file/download?project_name=""&file_name=""
```

## Add Project endpoint

**URL**  :  `/v1/api/project/add`
**Method**  :  `POST`
**Success Response**
**Code**  :  `200 OK`
```
Body: 
{
	project_name:  name,
	project_details:  details
}

```
## Add Todos endpoint

**URL**  :  `/v1/api/project/todos/add`
**Method**  :  `POST`
**Success Response**
**Code**  :  `200 OK`
```
Body: 
{
	project_name:  name,
	todo:  todoItem
}
```

## Update Todos endpoint

**URL**  :  `/v1/api/project/todos/add`
**Method**  :  `PUT`
**Success Response**
**Code**  :  `200 OK`
```
Body: 
{
	project_name:  name,
	todo:  todoItem
}
```
## Get Project endpoint

**URL**  :  `/v1/api/project/todos/add`
**Method**  :  `GET`
**Success Response**
**Code**  :  `200 OK`
```
Query param: 
project_name:  projectName
e.g. /v1/api/project/todos/add?project_name=""
```
## Add Member endpoint

**URL**  :  `/v1/api/project/todos/add`
**Method**  :  `POST`
**Success Response**
**Code**  :  `200 OK`
```
Body:
{
	project_name:  projectName,
	new_user_email:  member
}
```

# Deploying docker image to heroku

docker build -t warmnuances/collabchute .

docker images

docker tag 99a77db08c22 registry.heroku.com/collabchute/web

docker push registry.heroku.com/collabchute/web

heroku container:release web --app collabchute

  

# Running docker in localhost

docker run --name collabchute-app -p 8080:5000 -d warmnuances/collabchute

**Bash into container**
docker exec -it f961ba6f6005 bash

**Set GCS Key**
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Hans\Projects\School\CollabChute\server\utils\comrs-8d4974d0386b.json"

**move build**
mv build/* ../view
