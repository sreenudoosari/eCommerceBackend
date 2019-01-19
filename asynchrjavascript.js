//Synchronous Code
console.log("Start");
console.log("End");

//Asynchronous Code
console.log("Start");
setTimeout(() => {
    console.log("get details from DB....")
},2000);
console.log("End");

//Using CallBack Function
console.log("Start");
const user=getUser(1, function(user){
    console.log("user is:",user);
    getRepostories(user.userName,repocallback)
});
console.log("End");
function getUser(id,callback){
    setTimeout(() => {
        console.log("Get User list from DB...");
        callback({id:id,userName:"Nodejs"});
    },2000);
}
//Chaining Call Backs
console.log("Start");
const user=getUser(1, (user) =>{
    console.log("user is:",user);
    getRepostories(user.userName,(repos)=>{
        console.log("repos:",repos);
        getCommits(repos[0], (commit) =>{
            console.log("Get Commit :",commit);
        });
    });
});
console.log("End");
function getUser(id,callback){
    setTimeout(() => {
        console.log("Get User list from DB...");
        callback({id:id,userName:"Nodejs"});
    },2000);
}
function getRepostories(userName,repocallback){
    setTimeout(() =>{
        console.log("Get Repostories list from DB..");
        repocallback(["repo1","repo2","repo3"]);
    })
}
function getCommits(repo,commitcallback){
    setTimeout(() =>{
        console.log("Get Repostories list from DB..");
        commitcallback(["commit1","commit2"]);
    })
}

//to Overcome these Call back hell functions,we used named functions
 //Chaining Call Backs
console.log("Start");
const user=getUser(1, displayUser);
console.log("End");

function displayUser(user){
    console.log("user is:",user);
    getRepostories(user.userName,displayRepo);
}

function displayRepo(repos){
    console.log("repos:",repos);
    getCommits(repos[0],displayCommit);
}

function displayCommit(commits){
    console.log("commits:",commits);

}

function getUser(id,callback){
    setTimeout(() => {
        console.log("Get User list from DB...");
        callback({id:id,userName:"Nodejs"});
    },2000);
}
function getRepostories(userName,repocallback){
    setTimeout(() =>{
        console.log("Get Repostories list from DB..");
        repocallback(["repo1","repo2","repo3"]);
    })
}
function getCommits(repo,commitcallback){
    setTimeout(() =>{
        console.log("Get Repostories list from DB..");
        commitcallback(["commit1","commit2"]);
    })
}

//Promises
//Creation of Promises
const promise =new Promise((resolve,reject) => {
    setTimeout(() =>{
         resolve({id:1,userName:"NodeJs"});
    })
    

   // reject(new Error("error occured"));
})

promise
.then(result => console.log("result" ,result))
.catch(error => console.log("Error",error.message));

//