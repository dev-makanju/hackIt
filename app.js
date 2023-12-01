const menu = document.querySelector("#user-menu-list");
const menu_button = document.querySelector("#user-menu");
const allMenuItems = menu.querySelectorAll('[role="menuitem"]');
const class_active = document.querySelector('.notification-bell');
const profile_but_active = document.querySelector('.user-nav-info')

// accordion
const _mainWrapper = document.querySelector("#setup-guide");
const _mainWrapperItems = _mainWrapper.querySelectorAll('[role="accordionItem"]');
const _completed = [];
const uncheck = document.getElementById('uncheck');
const check = document.getElementById('check');


function handleSearchFocus() {
  const search_inp = document.querySelector("#search");
  search_inp.classList.add("is-active");
}

function handleBlur() {
  const search_inp = document.querySelector("#search");
  search_inp.classList.remove("is-active");
}

function handleMenuArrowKeyPress(e, menuposition) {
  const isLastMenuItem = menuposition === allMenuItems.length - 1;
  const isFirstItem = menuposition === 0;
  const nextMenuItem = allMenuItems.item(menuposition + 1);
  const prevMenuItem = allMenuItems.item(menuposition - 1);

  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
   if(isLastMenuItem) {
      allMenuItems.item(0).focus();
      return;
   }
   nextMenuItem.focus()
  }

  if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
   if(isFirstItem) {
      allMenuItems.item(allMenuItems.length - 1).focus(); 
      return;
   }
   prevMenuItem.focus()
  }
}

function handleEscapeKeyPress(e) {
  if (e.key === "Escape") {
    closeUserMenu();
  }
}

function openUserMenu() {
  profile_but_active.classList.add('not-button-active')
  menu.classList.add("open-menu");
  menu_button.ariaExpanded = true;
  allMenuItems["1"].focus();
  allMenuItems.item(0).focus();
  menu.addEventListener("keyup", handleEscapeKeyPress);
  allMenuItems.forEach((menuItem, menuItemIndex) => {
    menuItem.addEventListener("keyup", (e) => {
      handleMenuArrowKeyPress(e, menuItemIndex);
    });
  });
}

function closeUserMenu() {
  menu.classList.remove("open-menu");
  menu_button.ariaExpanded = false;
  profile_but_active.classList.remove('not-button-active');
}

function handleUserMenu() {
  if (menu.classList.contains("open-menu")) {
    closeUserMenu();
    return;
  }
  openUserMenu();
}

function handleNotificationMenu() {
  const not_class = document.querySelector("#notification-menu-list")
  if(not_class.classList.contains('notify-active')){
    not_class.classList.remove('notify-active')
    class_active.ariaExpanded = false;
    class_active.classList.remove('not-button-active')
  }else{
    not_class.classList.add('notify-active')
    class_active.classList.add('not-button-active')
    class_active.ariaExpanded = true;
  }
}

function getCompletedList(){
  let width = _completed.length
  const tracker = document.querySelector('#tracker')
  tracker.style.width = width*20+'px';
}


function handleAccordionMenu(val) {
  _mainWrapperItems.forEach((wrapperItem , index)  => {
    if(index === (parseInt(val) - 1)){
      wrapperItem.classList.add('open')
      wrapperItem.children[1].style.maxHeight = '200px'
      wrapperItem.children[0].ariaExpanded = true;
    }else{  
      wrapperItem.classList.remove('open')
      wrapperItem.children[0].ariaExpanded = false;
      wrapperItem.children[1].style.maxHeight = '0px'
    }
  })
}

function handleCompletedChecks(val){
  _mainWrapperItems.forEach((wrapperItem , index)  => {
    if (index === (parseInt(val) - 1)) {
      // Check if the value exists in _completed
      const indexOfVal = _completed.indexOf(parseInt(val));  
      // If the value exists, remove it; otherwise, push it
      if (indexOfVal !== -1) {
        _completed.splice(indexOfVal, 1)
        wrapperItem.children[0].children[0].children[0].classList.remove('uncheck')
        wrapperItem.children[0].children[0].children[0].classList.add('check')
        wrapperItem.children[0].children[0].children[1].classList.add('uncheck')
        wrapperItem.children[0].children[0].children[1].classList.remove('check')
      } else {
        _completed.push(parseInt(val));
        wrapperItem.children[0].children[0].children[0].classList.remove('check')
        wrapperItem.children[0].children[0].children[0].classList.add('uncheck')
        wrapperItem.children[0].children[0].children[1].classList.add('check')
        wrapperItem.children[0].children[0].children[1].classList.remove('uncheck')
      }
    }
    getCompletedList()
  })
}

function handleAcordionMenuDropdown(){
  const nav = document.querySelector('#open-nav')
  const _item = document.querySelector('#remove-onclick')
  nav.classList.toggle('open-nav')
  if(nav.classList.contains('open-nav')){
    _item.style.display = 'block'
  }else{
    _item.style.display = 'none'
  }
}

const closeModal = () => {
  const overlay = document.querySelector('#modal-overlay');
  overlay.style.display = 'none'
};

handleAcordionMenuDropdown()