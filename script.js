

const regUsername = document.getElementById("reg-username");
const regPwd = document.getElementById("reg-pwd");
const regCfmPwd = document.getElementById("reg-cfm-pwd");
const loginUsername = document.getElementById("login-username");
const loginPwd = document.getElementById("login-pwd");
const loginBtn = document.getElementById("login-btn");
const regBtn = document.getElementById("reg-btn");

const regShowPwd = document.querySelector('.reg-show-pwd');
const regShowCnfPwd = document.querySelector('.reg-show-cnf-pwd');
const loginShowPwd = document.querySelector('.login-show-pwd');

const regShowPwdImg = document.getElementById('reg-show-pwd-img');
const regShowCnfPwdImg = document.getElementById('reg-show-cnf-pwd-img');
const loginShowPwdImg = document.getElementById('login-show-pwd-img');

function handleHash(pwd){
    let hash = 0;
    const prime = 0xcc9e2d51; // A prime constant to void collisions

    for (let i = 0; i < pwd.length; i++) {
        let char = pwd.charCodeAt(i);
        char = (char * prime) & 0xffffffff;
        char = (char << 15) | (char >>> 17);
        hash ^= char;
        hash = (hash * 0x1b873593) & 0xffffffff;
    }

    hash ^= pwd.length;
    hash ^= hash >>> 16;
    hash = (hash * 0x85ebca6b) & 0xffffffff;
    hash ^= hash >>> 13;
    hash = (hash * 0xc2b2ae35) & 0xffffffff;
    hash ^= hash >>> 16;

    return hash >>> 0;
}

function regUser(){
    const hashedPwd = handleHash(regPwd.value);
    const user = {
        'username': regUsername.value,
        'password': hashedPwd
    };
    let arr = JSON.parse(localStorage.getItem('users'));
    if(arr == null) arr = [];

    let flag = 1;
    arr.map((e) => {
        if(e.username == regUsername.value){
            alert("This user already exists. Try to login instead");
            flag = 0;
            return;
        }
    });

    if(flag){
        arr.push(user);
        localStorage.setItem('users', JSON.stringify(arr));
        alert("Registered!")
    }
}

function loginUser(){
    const hashedPwd = handleHash(loginPwd.value);
    let arr = JSON.parse(localStorage.getItem('users'));
    if(arr == null) arr = [];

    let flag = 1;
    arr.map((e) => {
        if(e.username == loginUsername.value && e.password == hashedPwd){
            alert(`Hi ${e.username} 👋`);
            flag = 0;
        }
    })
    
    if(flag) alert("Invalid credentials!");
}

function hide_show(field, i) {
    if(field.type == 'text') {
        field.type = 'password';
        i.src = './assets/eye-close.svg'
    }else{
        field.type = 'input';
        i.src = './assets/eye-open.svg'
    }
}


regBtn.addEventListener('click', ()=>{
    if(regUsername.value == "") alert("Enter username");
    else if(regPwd.value == "") alert("Enter password");
    else if(regPwd.value != regCfmPwd.value) alert("Password values don't match");
    else{
        regUser();
    }
});

loginBtn.addEventListener('click', () => {
    if(loginUsername.value == "") alert("Enter username");
    else if(loginPwd.value == "") alert("Enter password");
    else{
        loginUser();
    }
});

regShowPwd.addEventListener('click' ,() => hide_show(regPwd, regShowPwdImg));
regShowCnfPwd.addEventListener('click' ,() => hide_show(regCfmPwd, regShowCnfPwdImg));
loginShowPwd.addEventListener('click' ,() => hide_show(loginPwd, loginShowPwdImg));
