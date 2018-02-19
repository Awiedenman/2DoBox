var boxTemplate = document.querySelector('#idea-template');
var saveButton = document.querySelector('.save-button');
var list = document.querySelector('.second-section ul');
var titleInput = document.querySelector('.title-input').value;
var bodyInput= document.querySelector('.body-input').value;
var form = document.forms['input-form'];
// var ideaBoxContainer = document.querySelector('.list');
var ideaString = localStorage.getItem('idea');
var ideas = JSON.parse(ideaString);

$('.save-button').on('click', createNewIdea)
$('.secondSection ul').on('submit', saveIdeaUpdates)  
$('.secondSection').on('click', '.delete-button', deleteIdea);
$('.secondSection').on('click', '.up-arrow', upVote);
$('.secondSection').on('click', '.down-arrow', downVote);
$('input[type=submit]').attr('disabled','disabled');
$('form').change(enable);
  
if(ideas) {
  window.onload = createOldIdeas();
  } else {
  ideas = [];
}

// clone box with the user's input
form.addEventListener('submit',function(e) {
  e.preventDefault();
  enable()
  // cloneIdea();
  form.reset();
});

function enable() {
  if ($('body-input') === " " && $('title-input') === "") {
    $("input[type=submit]").attr('disabled', true);
  } else {
    $("input[type=submit]").removeAttr('disabled');
  }
}
// why did you use bracket notation and not he class on .saveButton?


// function oldIdeas() {
//   for(i = 0; i < ideas.length; i++) {
//     createOldIdea(ideas[i]);
//   } 
// }

function Idea() {
  this.title = $('.title-input').val();
  this.body = $('.body-input').val();
  this.id = Date.now();
  this.quality = 'swill';
}

Idea.prototype.prepend = function() {
  $('ul').prepend(`
    li id ="${this.id}" class="new-ideas">
      <div class = "first-line">
      <div contenteditable="true" class="title" id="editable-title" rows="1">${this.title}</div>
      <img role="tab" class="delete-button" src="images/delete.svg">
      <br>
      </div>
      <div contenteditable="true" class="example-body" rows="2">${this.body}</div>
      <br>
      <div role="tablist" class="line-three">
        <img role="tab" class="up-arrow" src="images/upvote.svg">
        <img role="tab" class="down-arrow" src="images/downvote.svg">
        <p role="tab" class="quality" id="quality-tag">quality: <span role="tab" class="qual-type">${this.quality}</span></p>
       </div>
    </li>
    `)
}

function localStorageArray() {
  storageIdeaItem = [];
  moveToStorage(storageIdeaItem);
}

function createNewIdea(event) {
var newIdea = new Idea();
  newIdea.prepend();
  $('.title-input').val('');
  $('.body-input').val('');
  storageIdeaItem.push(newIdea)
  retreiveFromStorage(newIdea);
}

function moveToStorage(newIdea) {
  var storeObj = newIdea;
  var ideaString = JSON.stringify(storeObj);
  localStorage.setItem('newIdea.id', ideaString);
}

function retreiveFromStorage(newIdea) {
  var retrievedObj = localStorage.getItem('newIdea.id');
  var parsedObj = JSON.parse(retrievedObj);
}
// formCharCode is turning our randoms number into a 8 letter string.

// function cloneIdea() {
//   var boxCopy = boxTemplate.cloneNode(true);
//   var ideaObject = ideaStorage();
//   boxCopy.id = Date.now();
//   // var title = boxCopy.querySelector('.title');
//   var body = boxCopy.querySelector('.example-body');
//   boxCopy.querySelector('.title').innerText = ideaObject.title;
//   body.innerText = ideaObject.body;
//   list.prepend(boxCopy);
//   $("input[type=submit]").attr('disabled','disabled');
// }
// create clone of idea card. create the object using ideaStorage().

function createOldIdeas() {
  for(var i = 0 ; i < localStorage.length ; i++){
    oldIdea = retreiveFromStorage(key(i));
    $('ul').prepend(`
    li id ="${oldIdea.id}" class="new-ideas">
      <div class = "first-line">
      <div contenteditable="true" class="title" id="editable-title" rows="1">${oldIdea.title}</div>
      <img role="tab" class="delete-button" src="images/delete.svg">
      <br>
      </div>
      <div contenteditable="true" class="example-body" rows="2">${oldIdea.body}</div>
      <br>
      <div role="tablist" class="line-three">
        <img role="tab" class="up-arrow" src="images/upvote.svg">
        <img role="tab" class="down-arrow" src="images/downvote.svg">
        <p role="tab" class="quality" id="quality-tag">quality: <span role="tab" class="qual-type">${oldIdea.quality}</span></p>
       </div>
    </li>
    `)
  }
}
// what is the diff between the functionality of cloneIdea and createOldIdea/

// function ideaStorage() {
//   var idea = {};

//   idea.title = document.querySelector('.title-input').value;
//   idea.body = document.querySelector('.body-input').value;
//   idea.id = Date.now();
//   ideas.push(idea);
//   var ideaString = JSON.stringify(ideas);
//   localStorage.setItem('idea', ideaString);
//   return idea;
// }
// creating each individual storage itme in the giant array and 
 // pushing them into the array of ideas on creation. line 20.
  // passing idea into create old idea to prened on page.

function deleteIdea(ev) {
  var box = ev.target.closest('.new-ideas');
  var id = box.id;
  list.removeChild(box);
  ideas = ideas.filter(function(el) {
  return el.id !== id;
});
  var ideaStr = JSON.stringify(ideas);
  localStorage.setItem('idea', ideaStr);
}

function upVote() {
  var quality = $(this).parent().find('.qual-type').text();

  if(quality === 'swill') {
    $(this).parent().find('.qual-type').text('plausible');
  } else {
    $(this).parent().find('.qual-type').text('genius');
  }
}

function downVote() {
  var quality = $(this).parent().find('.qual-type').text();

  if(quality === 'genius') {
    $(this).parent().find('.qual-type').text('plausible');
  } else {
    $(this).parent().find('.qual-type').text('swill');
  }
}   
 //why did you use img for buttons? 

function saveIdeaUpdates(ev) {
  var updatedIdea = ev.target.closest('.new-ideas');
  var updatedIdeaTitle = updatedIdea.querySelector('.title').innerText;
  var updatedIdeaBody = updatedIdea.querySelector('.example-body').innerText;
  var updatedIdeaId = updatedIdea.id;
  var existingIdeasString = localStorage.getItem('idea');
  var existingIdeasObj = JSON.parse(existingIdeasString);

  for(i = 0; i < existingIdeasObj.length; i++) {
  var existingIdeaId = existingIdeasObj[i].id;

  if(existingIdeaId == updatedIdeaId) {
  existingIdeasObj[i].title = updatedIdeaTitle;
  existingIdeasObj[i].body = updatedIdeaBody;
}
}
  var newIdeaString = JSON.stringify(existingIdeasObj);
  localStorage.setItem('idea', newIdeaString);
}

// search box
$('.searchBox').on('keyup',function() {
  var ideasSearch = document.querySelectorAll('.new-ideas');
  $('li').each(function() {
  $(this).attr('ideas-search', $(this).text().toLowerCase())
  })
  var searchTerm = $(this).val().toLowerCase();
  $('li').each(function() {
    if($(this).filter('[ideas-search *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
  $(this).show();
  $('#idea-template').hide();
    } else {
  $(this).hide();
  }  
})
})
