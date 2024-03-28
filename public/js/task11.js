

const postsapi = 'https://jsonplaceholder.typicode.com/posts';
const tbody = document.getElementById('tbody');
var pagenumber = 1;
var numberofrecordsinpage = 15;
var maxpage = 0

specificpost()
var title = document.getElementById('title');
var userId = document.getElementById('userid')
var postId = document.getElementById('postid')
var desc = document.getElementById('desc')


async function specificpost() {
    var showcomments = document.getElementById('showcomments');
    showcomments.addEventListener('click', commentsfunc)
    const searchParams = window.location.href;
    console.log(Number(searchParams.slice((searchParams.lastIndexOf('/')+1))))
    const postid = Number(searchParams.slice((searchParams.lastIndexOf('/')+1)))
    const specificpostapi = `https://jsonplaceholder.typicode.com/posts/${postid}`
    const response = await fetch(specificpostapi);
    const specificpostdata = await response.json();
    // console.log(specificpostdata)
    
    title.innerHTML = specificpostdata.title;
    userId.innerHTML = specificpostdata.userId;
    postId.innerHTML = specificpostdata.id;
    desc.innerHTML = specificpostdata.body;
    
    async function commentsfunc() {
        var commentdiv = document.getElementById('commentslist');
        const commentsapi = `https://jsonplaceholder.typicode.com/posts/${postid}/comments`
        const response = await fetch(commentsapi);
        const comments = await response.json();
        comments.forEach(comment =>{
            // console.log(comment);
            var div = document.createElement('div');
            var postid = document.createElement('p');
            var id = document.createElement('p');
            var name =document.createElement('p');
            var email =document.createElement('p');
            var body =document.createElement('p');
            div.classList.add('commentdiv')
            postid.innerHTML=`<b>Post Id:</b> `+comment.postId;
            id.innerHTML =`<b>Id: </b>`+comment.id;
            name.innerHTML=`<b>Name:</b> `+ comment.name;
            email.innerHTML =`<b>Email: </b>`+ comment.email;
            body.innerHTML = `<b>Comment:</b>`+comment.body;
            div.append(postid,id,name,email,body);
            console.log(div)
            commentdiv.appendChild(div);
        })
    }
}

async function showposts() {

    var next = document.getElementById('nextpage');
    var previous = document.getElementById('previouspage');

    next.addEventListener('click', nextpage)
    previous.addEventListener('click', previouspage)
    document.getElementById('pagenumber').innerHTML = pagenumber

    const start = (pagenumber - 1) * numberofrecordsinpage;
    const end = (pagenumber * numberofrecordsinpage);
    console.log(start)
    const response = await fetch(postsapi);
    const data = await response.json();
    maxpage = data.length / numberofrecordsinpage;
    const posts = data;
    const recordsperpage = posts.slice(start, end);
    tbody.innerHTML = ""
    recordsperpage.forEach(element => {
        const tr = document.createElement('tr');
        const useridtd = document.createElement('td');
        const postidtd = document.createElement('td');
        const titletd = document.createElement('td');
        const bodytd = document.createElement('td');
        useridtd.innerHTML = element.userId;
        postidtd.innerHTML = element.id;
        titletd.innerHTML = element.title;
        bodytd.innerHTML = `<a href="/specificpost/${element.id}">MoreDetails</a>`;
        tr.appendChild(useridtd);
        tr.appendChild(postidtd);
        tr.appendChild(titletd);
        tr.appendChild(bodytd);
        tbody.appendChild(tr);
    });
}

function firstpage() {
    pagenumber = 1
}

function nextpage() {
    pagenumber += 1;
    if (pagenumber >= maxpage) {
        document.getElementById('nextpage').style.pointerEvents = 'none';
    }
    document.getElementById('previouspage').style.pointerEvents = 'auto';
    showposts();

}

function previouspage() {
    pagenumber -= 1;
    if (pagenumber <= 1) {
        document.getElementById('previouspage').style.pointerEvents = 'none';
    }
    document.getElementById('nextpage').style.pointerEvents = 'auto';
    showposts();
}
function lastpage() {

}
