var boxTemplate = document.querySelector('#ideaTemplate');
var saveButton = document.querySelector('.saveButton');
var list = document.querySelector('.idea_section ul');
var titleInput = document.querySelector('.titleInput').value;
var bodyInput= document.querySelector('.bodyInput').value;
var form = document.forms['inputForm'];
var ideaBoxContainer = document.querySelector('.list');
var ideaString = localStorage.getItem('idea');
var ideas = JSON.parse(ideaString);

$('.idea_section').on('click', '.deleteButton', deleteIdea);
$('.idea_section').on('click', '.upArrow', upVote);
$('.idea_section').on('click', '.downArrow', downVote);
$("input[type=submit]").attr('disabled','disabled');
$("form").change(enable);
 

if(ideas) {
  window.onload = oldIdeas();
  } else {
  ideas = [];
}

ideaBoxContainer.addEventListener('input', function(event) {
  saveIdeaUpdates(event);
});

list.addEventListener('input', function(event) {
  saveIdeaUpdates(event);
});

// clone box with the user's input
form.addEventListener('submit',function(e) {
  enable()
  e.preventDefault();

  cloneIdea();
  form.reset();
});

function enable() {
  if ($('bodyInput') == " " && $('titleInput') == "") {
    $("input[type=submit]").attr('disabled','disabled');
  } else {
    $("input[type=submit]").removeAttr('disabled');
  }
}

function oldIdeas() {
  for(i = 0; i < ideas.length; i++) {
    createOldIdea(ideas[i]);
  } 
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  var id = '';
  for(i = 0; i < 8; i++ ) {
  var randomNum = random(65, 90);
  var letter = String.fromCharCode(randomNum);
  id = letter + id;
  }
  return id;
}

function cloneIdea() {
  var boxCopy = boxTemplate.cloneNode(true);
  var ideaObject = ideaStorage();
  boxCopy.id = ideaObject.id;
  var title = boxCopy.querySelector('.title');
  var body = boxCopy.querySelector('.idea_body');
  title.innerText = ideaObject.title;
  body.innerText = ideaObject.body;
  list.prepend(boxCopy);
  $("input[type=submit]").attr('disabled','disabled');
}

function createOldIdea(idea) {
  var boxCopy = boxTemplate.cloneNode(true);
  var title = boxCopy.querySelector('.title');
  var body = boxCopy.querySelector('.idea_body');
  boxCopy.id = idea.id;
  list.prepend(boxCopy);
  title.innerText = idea.title;
  body.innerText = idea.body;
}

function ideaStorage() {
  var idea = {};

  idea.title = document.querySelector('.titleInput').value;
  idea.body = document.querySelector('.bodyInput').value;
  idea.id = loop();
  ideas.push(idea);
  var ideaString = JSON.stringify(ideas);
  localStorage.setItem('idea', ideaString);
  return idea;
}

function deleteIdea(ev) {
  var box = ev.target.closest('.newIdeas');
  var id = box.id;
  list.removeChild(box);
  ideas = ideas.filter(function(el) {
  return el.id !== id;
});
  var ideaStr = JSON.stringify(ideas);
  localStorage.setItem('idea', ideaStr);
}

function upVote() {
  var quality = $(this).parent().find('.qualType').text();

  if(quality === 'swill') {
    $(this).parent().find('.qualType').text('plausible');
  } else {
    $(this).parent().find('.qualType').text('genius');
  }
}

function downVote() {
  var quality = $(this).parent().find('.qualType').text();

  if(quality === 'genius') {
    $(this).parent().find('.qualType').text('plausible');
  } else {
    $(this).parent().find('.qualType').text('swill');
  }
}    

function saveIdeaUpdates(ev) {
  var updatedIdea = ev.target.closest('.newIdeas');
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
  var ideasSearch = document.querySelectorAll('.newIdeas');
  $('li').each(function() {
  $(this).attr('ideasSearch', $(this).text().toLowerCase())
  })
  var searchTerm = $(this).val().toLowerCase();
  $('li').each(function() {
    if($(this).filter('[ideasSearch *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
  $(this).show();
  $('#ideaTemplate').hide();
    } else {
  $(this).hide();
  }  
})
})
