// q

$(function() {

  init();

  function init() {
    persistIdea();
    $('.list').on('input', saveIdeaUpdates);
    $('.saveButton').on('click', saveIdea);
    $('.idea_section').on('click', '.deleteButton', deleteIdea);
    $('.idea_section').on('click', '.upArrow', upVote);
    $('.idea_section').on('click', '.downArrow', downVote);
    $("input[type=submit]").attr('disabled','disabled');
    $(document.forms['inputForm']).change(enable);
    $('.searchBox').on('keyup', searchFilter);
// =======
// // var boxTemplate = document.querySelector('#ideaTemplate');
// // var list = $('.idea_section ul');
// // var titleInput = $('.titleInput').val();
// // var bodyInput= $('.bodyInput').val();
// // var form = document.forms['inputForm'];
// // var ideaBoxContainer = $('.list');
// var ideaString = localStorage.getItem('idea');
// var ideas = JSON.parse(ideaString);

// persistIdea();

// function persistIdea() {
//   if(ideas) {
//     window.onload = oldIdeas();
//     } else {
//     ideas = [];
//   }
// }

// $('.list').on('input', saveIdeaUpdates);
// $('.saveButton').on('click', saveIdea);
// $('.idea_section').on('click', '.deleteButton', deleteIdea);
// $('.idea_section').on('click', '.upArrow', upVote);
// $('.idea_section').on('click', '.downArrow', downVote);
// $("input[type=submit]").attr('disabled','disabled');
// $(document.forms['inputForm']).change(enable);
// $('.searchBox').on('keyup', searchFilter);

// function searchFilter() {
//  var ideasSearch = document.querySelectorAll('.newIdeas');
//   $('li').each(function() {
//   $(this).attr('ideasSearch', $(this).text().toLowerCase())
//   })
//   var searchTerm = $(this).val().toLowerCase();
//   $('li').each(function() {
//     if($(this).filter('[ideasSearch *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
//   $(this).show();
//   $('#ideaTemplate').hide();
//     } else {
//   $(this).hide();
//   }  
// });
// };

// function enable() {
//   if ($('bodyInput') === "" && $('titleInput') === "") {
//     $("input[type=submit]").attr('disabled', true);
//   } else {
//     $("input[type=submit]").removeAttr('disabled');
// >>>>>>> master
  }


  function persistIdea() {
    var ideas = getIdeas();
    if(ideas) {
      window.onload = oldIdeas(ideas);
      } else {
      ideas = [];
    }
  }
// <<<<<<< HEAD

  function searchFilter() {
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
  });
  };

  function getIdeas() {
    var ideaString = localStorage.getItem('idea');
    var ideas = JSON.parse(ideaString);
    return ideas;
// =======
//   return id;
// };

// function cloneIdea() {
//   var boxCopy = document.querySelector('#ideaTemplate').cloneNode(true);
//   var ideaObject = ideaStorage();
//   boxCopy.id = ideaObject.id;
//   var title = boxCopy.querySelector('.title');
//   var body = boxCopy.querySelector('.idea_body');
//   title.innerText = ideaObject.title;
//   body.innerText = ideaObject.body;
//   $('.list').prepend(boxCopy);
//   $("input[type=submit]").attr('disabled','disabled');
// };

// function createOldIdea(idea) {
//   var boxCopy = document.querySelector('#ideaTemplate').cloneNode(true);
//   var title = boxCopy.querySelector('.title');
//   var body = boxCopy.querySelector('.idea_body');
//   boxCopy.id = idea.id;
//   $('.list').prepend(boxCopy);
//   title.innerText = idea.title;
//   body.innerText = idea.body;
// };

// function ideaStorage() {
//   var idea = {};

//   idea.title = $('.titleInput').val();
//   idea.body = $('.bodyInput').val();
//   idea.id = loop();
//   ideas.push(idea);
//   var ideaString = JSON.stringify(ideas);
//   localStorage.setItem('idea', ideaString);
//   return idea;
// };

// function deleteIdea(ev) {
//   var box = ev.target.closest('.newIdeas');
//   var id = box.id;
//   $(this).parent().parent().remove();
//   ideas = ideas.filter(function(el) {
//   return el.id !== id;
// }); 
//   var ideaStr = JSON.stringify(ideas);
//   localStorage.setItem('idea', ideaStr);
// };

// function upVote() {
//   var quality = $(this).parent().find('.qualType').text();

//   if(quality === 'swill') {
//     $(this).parent().find('.qualType').text('plausible');
//   } else {
//     $(this).parent().find('.qualType').text('genius');
// >>>>>>> master
  }

  function enable() {
    if ($('bodyInput') === "" && $('titleInput') === "") {
      $("input[type=submit]").attr('disabled', true);
    } else {
      $("input[type=submit]").removeAttr('disabled');
    }
  };

  function saveIdea(e) {
    e.preventDefault();
    var ideas = getIdeas();
    enable();
    cloneIdea(ideas);
    document.forms['inputForm'].reset();
  };

  function oldIdeas(ideas) {
    for(i = 0; i < ideas.length; i++) {
      createOldIdea(ideas[i]);
    } 
  };

  function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  function loop() {
    var id = '';
    for(i = 0; i < 8; i++ ) {
    var randomNum = random(65, 90);
    var letter = String.fromCharCode(randomNum);
    id = letter + id;
    }
    return id;
  };

  function cloneIdea(ideas) {
    var boxCopy = document.querySelector('#ideaTemplate').cloneNode(true);
    var ideaObject = ideaStorage(ideas);
    boxCopy.id = ideaObject.id;
    var title = boxCopy.querySelector('.title');
    var body = boxCopy.querySelector('.idea_body');
    title.innerText = ideaObject.title;
    body.innerText = ideaObject.body;
    $('.list').prepend(boxCopy);
    $("input[type=submit]").attr('disabled','disabled');
  };

  function createOldIdea(idea) {
    var boxCopy = document.querySelector('#ideaTemplate').cloneNode(true);
    var title = boxCopy.querySelector('.title');
    var body = boxCopy.querySelector('.idea_body');
    boxCopy.id = idea.id;
    $('.list').prepend(boxCopy);
    title.innerText = idea.title;
    body.innerText = idea.body;
  };

  function ideaStorage(ideas, quality) {
    var idea = {};
    var ideas = ideas || [];

    idea.title = $('.titleInput').val();
    idea.body = $('.bodyInput').val();
    idea.id = loop();
    idea.quality = 'swill';
    ideas.push(idea);
    var ideaString = JSON.stringify(ideas);
    localStorage.setItem('idea', ideaString);
    return idea;
  };

  function deleteIdea(ev) {
    var ideas = getIdeas();
    var box = ev.target.closest('.newIdeas');
    var id = box.id;
    console.log(box.id);
    $(this).parent().parent().remove();
    ideas = ideas.filter(function(idea) {
      return idea.id !== id;
    });
    var ideaStr = JSON.stringify(ideas);
    localStorage.setItem('idea', ideaStr);
  };

  function upVote() {
    var ideas = getIdeas();
    var quality = $(this).parent().find('.qualType').text();

    if(quality === 'swill') {
      $(this).parent().find('.qualType').text('plausible');
    } else {
      $(this).parent().find('.qualType').text('genius');
    }
  };

  function downVote() {
    var quality = $(this).parent().find('.qualType').text();

    if(quality === 'genius') {
      $(this).parent().find('.qualType').text('plausible');
    } else {
      $(this).parent().find('.qualType').text('swill');
    }
  };    

  function saveIdeaUpdates(ev) {
    var updatedIdea = ev.target.closest('.newIdeas');
    var updatedIdeaTitle = updatedIdea.querySelector('.title').innerText;
    var updatedIdeaBody = updatedIdea.querySelector('.idea_body').innerText;
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
  };
});