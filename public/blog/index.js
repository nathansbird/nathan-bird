var firebaseConfig = {
    apiKey: "AIzaSyCZuaiUZHwfdamCsLSyyj0RZHEMihthfqw",
    authDomain: "nathan-bird.firebaseapp.com",
    databaseURL: "https://nathan-bird.firebaseio.com",
    projectId: "nathan-bird",
    storageBucket: "nathan-bird.appspot.com",
    messagingSenderId: "154541424733",
    appId: "1:154541424733:web:d0ce2af5a97a2d60bd0db4",
    measurementId: "G-6X3S1DHKE6"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

const blogs = [];

var index = 0;

const right = () => {
    update(1);
}

const left = () => {
    update(-1);
}

const update = (direction) => {
    index += direction;

    if(index == -1){
        index = 0;
    }

    let blogLength = document.getElementById('blog-view').childElementCount;

    if(index >= blogLength){
        index = blogLength-1;
    }

    if(index == 0){
        document.getElementById('left-arrow').classList.add('hidden');
    }else if(index == blogLength-1){
        document.getElementById('right-arrow').classList.add('hidden');
    }else{
        document.getElementById('left-arrow').classList.remove('hidden');
        document.getElementById('right-arrow').classList.remove('hidden');
    }

    if(direction < 0){
        document.getElementById('blog'+index).classList.remove('hidden');
        document.getElementById('image'+index).classList.remove('hidden');

        document.getElementById('blog'+(index+1)).classList.add('preset');
        document.getElementById('image'+(index+1)).classList.add('preset');
    }else{
        document.getElementById('blog'+(index-1)).classList.add('hidden');
        document.getElementById('image'+(index-1)).classList.add('hidden');
    
        document.getElementById('blog'+index).classList.remove('preset');
        document.getElementById('image'+index).classList.remove('preset');
    }
}

const blogPage = (title, blurb, full, image, layout, date, location, index) => {

    let imageHTML = '<div class="image image-config-'+layout+' preset" id="image'+index+'" style="background: url('+image+'); background-size: cover; background-position: center;"></div>';
    let contentHTML = '<div class="copy">'+
                        '<div class="upper-spacer"></div>'+
                        '<div class="location">'+
                            '<svg class="date-icon" style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M7,12H9V14H7V12M21,6V20A2,2 0 0,1 19,22H5C3.89,22 3,21.1 3,20V6A2,2 0 0,1 5,4H6V2H8V4H16V2H18V4H19A2,2 0 0,1 21,6M5,8H19V6H5V8M19,20V10H5V20H19M15,14V12H17V14H15M11,14V12H13V14H11M7,16H9V18H7V16M15,18V16H17V18H15M11,18V16H13V18H11Z" /></svg>'+
                            '<p class="date-text">'+date+'</p>'+
                            (location?'<svg style="width:24px;height:24px;margin-left: 12px" viewBox="0 0 24 24"><path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" /></svg>'+'<p>'+location+'</p>':'')+
                            '<i class="material-icons close-bttn" onclick="document.getElementById(\'blog'+index+'\').classList.toggle(\'fullscreen\');">close</i>'+
                        '</div>'+
                        '<h1>'+title+'</h1>'+
                        '<p>'+blurb+'</p>'+
                        '<p class="full">'+full+'<br><br><br><br><br><br>.</p>'+
                        '<div class="lower-spacer"></div>'+
                    '</div>'+
                    '<div class="read-more" onclick="document.getElementById(\'blog'+index+'\').classList.toggle(\'fullscreen\');">'+
                        '<p>Read More</p>'+
                        '<i class="material-icons">keyboard_arrow_right</i>'+
                    '</div>';

    return '<div class="blog-page">'+
            '<div class="item item-config-'+layout+' preset" id="blog'+index+'">'+
                (layout == 1 ? imageHTML : contentHTML)+
                (layout == 1 ? contentHTML : imageHTML)+
            '</div>'+
        '</div>';
}

function displayBlogs(){
    document.getElementById('blog-view').innerHTML = "";
    document.getElementById('right-arrow').classList.remove('hidden');
    for(i in blogs){
        let newBlog = blogPage(blogs[i].title, blogs[i].blurb, blogs[i].full, blogs[i].image, blogs[i].layout, blogs[i].date, blogs[i].location, i);
        document.getElementById('blog-view').innerHTML += newBlog;
    }

    setTimeout(() => {
        document.getElementsByClassName('image')[0].classList.remove('preset');
        document.getElementsByClassName('item')[0].classList.remove('preset');
    }, 300);
}

db.ref().once('value').then(function(blogsSnapshot) {
    blogsSnapshot.forEach((blog) => {
        var blogVal = blog.val();
        blogs.push(
            {
                blurb: blogVal.blurb,
                full: blogVal.full,
                date: blogVal.date,
                image: blogVal.image,
                location: blogVal.location,
                title: blogVal.title,
                layout: blogVal.layout,
            }
        );
        displayBlogs();
    });
});