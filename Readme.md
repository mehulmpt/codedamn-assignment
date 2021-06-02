## Codedamn Assignment

---

Website: https://codedamn-assignment.vercel.app/

Heroku Backend: https://codedamn.herokuapp.com/

AWS Backend: http://codedamn-env.eba-3ce2mpdm.ap-south-1.elasticbeanstalk.com/

**Note**
This website doesn't use AWS backend because website which is `HTTPS` is not able to make request to AWS backend which is `HTTP`. So i have used heroku backend.

---

### Functionalities Working

1. A code editor on frontend
2. A terminal on frontend connected to backend
3. Multiple resizable windows
4. Multiple file support in monaco editor
5. Code files are saved and restored when someone refreshes the page (use backend database to persist user data and files are stored on server folder).

### Steps to start server

- STEP 1: Clone the Repo

```
git clone https://github.com/Ferin79/codedamn-assignment.git
```

- STEP 2: Navigate to server folder

```
cd server
```

- STEP 3: Install the dependencies

```
npm install
```

- STEP 4: Create .env file and fill out the details

```
cp .env.example .env
```

- STEP 5: Build the files

```
npm run build
```

- STEP 6: Start the server

```
npm start
```

### How code saving is working???

There are basically two ways to save user code.

- Save code directly into database with filename

- Save code file in server directory or any blob storage servers.

I have used second method to store user code in server folder `/uploads/{email}/`.
Whenever user types code in frontend, the code is send to server via WebSockets.

---

### Docker Containers for code preview

So when user joins the websockets, the goal was to spin up the docker container, bind the `/uploads/{email}/` (the folder where user specific files are stored) volume to docker and start the pre-build nodejs image. I was able to do so, however i was unable to show user the static file serve output from docker becuase every docker container inside my application are listening to same port. As I was not able to connect to dynamic docker container from frontend, i was unable to create live code preview window. Due to same reason terminal is also not connected to docker, it is connected to server. I know it is harmful to give server's `CMD` access from frontend but it is just to show that terminal integrated in frontend is connected to real backend.

For more look at Docker File inside `server` folder.

**NOTE**

You may lost saved files from server because heroku server stops after 30 minutes.
