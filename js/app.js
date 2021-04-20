/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 * Edit by Ahmed Fawzy Elragal for UDACITY project 
 * Email: mailto:elragal30@gmail.com
*/

/**
 * Define Global Variables
 * 
*/
let sectionsAr = document.getElementsByTagName("section");
let Fragment = document.createDocumentFragment();
const ulElm = document.getElementById("navbar__list");

document.addEventListener('DOMContentLoaded', buildlinks);
document.addEventListener('scroll', ActiveSection);
ulElm.addEventListener('click', scrollToSection);
document.getElementById("btnAdd").addEventListener('click', addSection);
/**
 * End Global Variables
 * Start Helper Functions
 * 
 * get sections and build links in fragment
 * 
*/
/**
* @description get sections and build links into faragment
*   then append them to dom
*/
function buildlinks()
{
  ulElm.innerHTML = "";
   
    for (var i=0;i< sectionsAr.length;i++)
    {
        var liElm = document.createElement('li');
        liElm.className = "navbar__menu menu__link";
        
        var aElm =document.createElement('a');
        aElm.href = "index.html#"+sectionsAr[i].getAttribute("id");
        aElm.innerText = sectionsAr[i].getAttribute("data-nav");
        aElm.setAttribute('data-nav', sectionsAr[i].getAttribute("data-nav"));
        liElm.appendChild (aElm);
    
        Fragment.appendChild(liElm);
    }
    
    ulElm.appendChild(Fragment);
}

/**
* @description get the active section and change its class.
* also change style of active link bounded with this section
* then remove active class from other sections/links.
*/

function ActiveSection()
{
    
    const linksEl = document.getElementsByTagName("a");
    for (var i=0;i< sectionsAr.length;i++)
    {
        if(linksEl.length < sectionsAr.length){break;}
        const rec = sectionsAr[i].getBoundingClientRect();
                if(rec.top >= -150 && rec.top <= 400 )
        {
            sectionsAr[i].className ="your-active-class";
            linksEl[i].className = "navbar__menu activeLink";
        }
        else
        {
            sectionsAr[i].className ="";
            linksEl[i].className = "navbar__menu menu__link";
        }
    }
    
}
/**
* @description function to scroll to specified section bounded with link.
* performance boosted by make one event listner and then confirm that is a link 
* then get target to know which link pressed
* also prevented the default action of link
* scrolling with smooth effect
*/
function scrollToSection(obj)
{
    
    if(obj.target.nodeName === "A" ){
        obj.preventDefault();              
        const secNumber = obj.target.getAttribute('data-nav').match(/\d/g);
        window.scrollTo(0,sectionsAr[secNumber -1].offsetTop);
    }
}
/**
* @description function to add sections dynamically through button in navbar 
* edit : max sections set to 9 
*/
function addSection()
{
    if (sectionsAr.length < 9) {

        const sElm = sectionsAr[sectionsAr.length - 1];
        const mainElm = document.getElementsByTagName("main");
        const newSection = document.createElement('section');
        newSection.innerHTML = sElm.innerHTML;
        const secNumber = Number.parseInt(sElm.getAttribute("data-nav").match(/\d/g)) + 1;
        newSection.setAttribute("data-nav", "section " + secNumber);
        newSection.id = "section" + secNumber;
        newSection.childNodes[1].children[0].innerText = "section " + secNumber;
        mainElm[0].appendChild(newSection);
        sectionsAr = document.getElementsByTagName("section");
        buildlinks();
    }
    else {
        alert("لايمكن اضافة المزيد من الاقسام");
    }

}
/**
* @description function to scroll to top of page through fixed button
*/
function scrollToTop()
{
    window.scrollTo(0,10);
}
