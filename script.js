const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close")
/*=============== SHOW MENU ===============*/
/* validate if constant exists */
if(navToggle)
{
    navToggle.addEventListener('click', () => {
        navMenu.classList.add("show-menu")
    })
}
// /============== MENU HIDDEN ===============/
if(navClose)
{
    navClose.addEventListener('click', () => {
        navMenu.classList.remove("show-menu")
    })
}
// /=============== REMOVE MENU MOBILE ===============/
const navLinks = document.querySelectorAll(".nav-link")

function linkAction()
{
    const navMenu = document.getElementById("nav-menu")
    // when clikc on each nav link, we remove the show menu class
    navMenu.classList.remove("show-menu")
}
navLinks.forEach(n => n.addEventListener('click', linkAction))
/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader()
{
    const header = document.getElementById("header")
    //when the scroll is greater than 80 viewport height, add the class scroll header to the tag header
    if(this.scrollY >= 80) header.classList.add("scroll-header"); else header.classList.remove("scroll-header")    
}
window.addEventListener("scroll", scrollHeader)
// /=============== SCROLL SECTIONS ACTIVE LINK ===============/

// get all sections that have an id defined
const sections = document.querySelectorAll("section[id]");

// add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter()
{
    //get current scroll position
    let scrollY = window.pageYOffset;
    // loop trought sections to get height, top and ID values for each
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop -50,
        sectionId = current.getAttribute("id");
        // VARIABLE GEETT.
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector('.nav-menu a[href*=' + sectionId +']').classList.add("active-link")
        }
        else
        {
            document.querySelector('.nav-menu a[href*=' + sectionId +']').classList.remove("active-link")
        }
    })
}
// /=============== PORTFOLIO ITEM FILTER ===============/
const filterContainer = document.querySelector(".portfolio-filter-inner"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItem = portfolioItems.length;

    for(let i=0; i<totalFilterBtn; i++)
    {
        filterBtns[i].addEventListener('click', function()
        {
            filterContainer.querySelector(".active").classList.remove("active");
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");
            for(let k=0; k<totalPortfolioItem; k++)
            {
                if(filterValue === portfolioItems[k].getAttribute("data-category"))
                {
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                }
                else
                {
                    portfolioItems[k].classList.add("hide");
                    portfolioItems[k].classList.remove("show");
                }
                if(filterValue === "all")
                {
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                }
            }
        })
    }

// /=============== THEME/DISPLAY CUSTOMIZATION ===============/
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSize = document.querySelectorAll('.choose-size span');
const colorPalette = document.querySelectorAll(".choose-color span");
var root = document.querySelector(":root");
const Bg1 = document.querySelector (".bg-1");
const Bg2 = document.querySelector (".bg-2");
const Bg3 = document.querySelector (".bg-3");

// open modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}
// close modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme'))
    {
        themeModal.style.display = 'none';
    }
}
theme.addEventListener("click", openThemeModal);
themeModal.addEventListener("click", closeThemeModal);
// /===== FONTS =====/

//remove active class from spans or font size selector
const removeSizeSelector = () => {
    fontSize.forEach(size => {
        size.classList.remove("active");
    })
}
fontSize.forEach(size => {
    size.addEventListener('click', () => {

        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');
        if(size.classList.contains('font-size-1'))
        {
            fontSize = '12px';
        }
        else if(size.classList.contains('font-size-2'))
        {
            fontSize = '14px';
        }
        else if(size.classList.contains('font-size-3'))
        {
            fontSize = '16px';
        }
        else if(size.classList.contains('font-size-4'))
        {
            fontSize = '18px';
        }
        // change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
        
    })
})

// /=============== Primary colors ===============/

// remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        changeActiveColorClass();

        if(color.classList.contains('color-1'))
        {
            primaryHue = 252;
        }
        else if(color.classList.contains('color-2'))
        {
            primaryHue = 52;
        }
        else if(color.classList.contains('color-3'))
        {
            primaryHue = 352;
        }
        else if(color.classList.contains('color-4'))
        {
            primaryHue = 152;
        }
        else if(color.classList.contains('color-5'))
        {
            primaryHue = 202;
        }
        color.classList.add("active");
        root.style.setProperty('--primary-color-hue', primaryHue)
    })
})


// /=============== Jsmailserver ===============/
function sendMail() {
      // Collect input values
      var tempParams = {
        from_name: document.getElementById("fromName").value,
        to_name: document.getElementById("toName").value,
        message: document.getElementById("msg").value,
      };

      // Call EmailJS service
      emailjs
        .send("service_yb2o8bq", "template_sac0iod", tempParams) 
        .then(
          function (response) {
            console.log("Success!", response.status, response.text);
             alert("Email sent successfully!");
            openPopup();
          },
          function (error) {
            console.error("Failed to send email:", error);
            alert("Failed to send email. Please try again.");
          }
        );
}
// /=============== PopUp ===============/
let popup = document.getElementById("popup");

function openPopup(){
    popup.classList.add("open-popup");
}
function closePopup(){
    popup.classList.remove("open-popup");
}


// /=============== Theme Background ===============/
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//change background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}
Bg1.addEventListener('click', () => {
    // add active class
    Bg1.classList.add('active');
    // remove active class from the others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    // remove customize changes from local storage
    window.location.reload();
})
Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
})
Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class from the others
    Bg2.classList.remove('active');
    Bg1.classList.remove('active');
    changeBG();
})