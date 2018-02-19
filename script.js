var boxTemplate = document.querySelector('#idea-template');
var saveButton = document.querySelector('.save-button');
var list = document.querySelector('.second-section ul');
var titleInput = document.querySelector('.title-input').value;
var bodyInput= document.querySelector('.body-input').value;
var form = document.forms['input-form'];
// var ideaBoxContainer = document.querySelector('.list');
var ideaString = localStorage.getItem('idea');
var ideas = JSON.parse(ideaString);

$('.secondSection ul').on('submit', saveIdeaUpdates)  
$('.secondSection').on('click', '.delete-button', deleteIdea);
$('.secondSection').on('click', '.up-arrow', upVote);
$('.secondSection').on('click', '.down-arrow', downVote);
$('input[type=submit]').attr('disabled','disabled');
$('form').change(enable);
  
if(ideas) {
  window.onload = oldIdeas();
  } else {
  ideas = [];
}

// clone box with the user's input
form.addEventListener('submit',function(e) {
  e.preventDefault();
  enable()
  cloneIdea();
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


function oldIdeas() {
  for(i = 0; i < ideas.length; i++) {
    createOldIdea(ideas[i]);
  } 
}

// formCharCode is turning our randoms number into a 8 letter string.

function cloneIdea() {
  var boxCopy = boxTemplate.cloneNode(true);
  var ideaObject = ideaStorage();
  boxCopy.id = Date.now();
  var title = boxCopy.querySelector('.title');
  var body = boxCopy.querySelector('.example-body');
  title.innerText = ideaObject.title;
  body.innerText = ideaObject.body;
  list.prepend(boxCopy);
  $("input[type=submit]").attr('disabled','disabled');
}
// create clone of idea card. create the object using ideaStorage().

function createOldIdea(idea) {
  var boxCopy = boxTemplate.cloneNode(true);
  var title = boxCopy.querySelector('.title');
  var body = boxCopy.querySelector('.example-body');
  boxCopy.id = idea.id;
  title.innerText = idea.title;
  body.innerText = idea.body;
  list.prepend(boxCopy);
}
// what is the diff between the functionality of cloneIdea and createOldIdea/

function ideaStorage() {
  var idea = {};

  idea.title = document.querySelector('.title-input').value;
  idea.body = document.querySelector('.body-input').value;
  idea.id = Date.now();
  ideas.push(idea);
  var ideaString = JSON.stringify(ideas);
  localStorage.setItem('idea', ideaString);
  return idea;
}
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
    $(this).parent().find('.qualType').text('plausible');
  } else {
    $(this).parent().find('.qualType').text('genius');
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
$('.search-box').on('keyup',function() {
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
