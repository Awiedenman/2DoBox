
$(function() {

  init();


  function init() {
    persistIdea();
    $('.list').on('input', saveIdeaUpdates);
    $('.saveButton').on('click', saveIdea);
    $('.idea_section').on('click', '.deleteButton', deleteIdea);
    $('.idea_section').on('click', '.upArrow, .downArrow', vote);
    $("input[type=submit]").attr('disabled','disabled');
    $(document.forms['inputForm']).change(enable);
    $('.searchBox').on('keyup', searchFilter);
    $('.idea_section').on('click', '.completed_button', completedIdea);
  }
 
  function persistIdea() {
    var ideas = getIdeas();
    if(ideas) {
      window.onload = oldIdeas(ideas);
      } else {
      ideas = [];
    }
  }

  function searchFilter() {
    var ideasSearch = $('.newIdeas');
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
    if (idea.completed){
      boxCopy.classList.add('completed');
    }
  };

  function ideaStorage(ideas, quality) {
    var idea = {};
    var ideas = ideas || [];

    idea.title = $('.titleInput').val();
    idea.body = $('.bodyInput').val();
    idea.id = loop();
    idea.quality = 'normal';
    idea.completed = false;
    ideas.push(idea);
    var ideaString = JSON.stringify(ideas);
    localStorage.setItem('idea', ideaString);
    return idea;
  };

  function deleteIdea(e) {
    var ideas = getIdeas();
    var box = e.target.closest('.newIdeas');
    var id = box.id;
    // console.log(box.id);
    $(this).parent().parent().remove();
    ideas = ideas.filter(function(idea) {
      return idea.id !== id;
    });
    sendToStorage(ideas);
  };

  function completedIdea(e) {
    var box = e.target.closest('.newIdeas');
    var id = box.id;
    $(this).parent().parent().toggleClass('completed');
    var ideas = getIdeas(); 
    var cardId = $(this).parent().parent().attr('id');
    var ideaIndex = ideas.findIndex(function(el) { 
      return el.id == cardId; 
    });
    ideas[ideaIndex].completed = !ideas[ideaIndex].completed;
    sendToStorage(ideas);


        // ideas[ideaIndex].quality = qualityArray[index + 1];
    // } else if ( eventTarget.hasClass('downArrow') && index > 0){
    //     eventTarget.siblings('p').find('.qualType').text(qualityArray[index - 1]);
    //     ideas[ideaIndex].quality = qualityArray[index - 1];
    // }
    // if ($(this))
  }

  function sendToStorage(ideas) {
    var ideaStr = JSON.stringify(ideas);
    localStorage.setItem('idea', ideaStr);
  }

  function vote(e) {
    eventTarget = $(this);
    var ideas = getIdeas();
    var quality = $(this).parent().find('.qualType').text();
    qualityArray = ['none', 'low', 'normal', 'high', 'critical', 'really cool']
    cardId = $(this).parent().parent().attr('id');
    var index = qualityArray.indexOf(quality);
    changeValue(eventTarget, quality, qualityArray, index, ideas, cardId)
  }

  function changeValue(eventTarget, quality, qualityArray, index, ideas, cardId){
    var ideaIndex = ideas.findIndex(function(idea) { 
      return idea.id == cardId; 
    });
    if (eventTarget.hasClass('upArrow') && index < qualityArray.length -1 ){
        eventTarget.siblings('p').find('.qualType').text(qualityArray[index + 1]);
        ideas[ideaIndex].quality = qualityArray[index + 1];
    } else if ( eventTarget.hasClass('downArrow') && index > 0){
        eventTarget.siblings('p').find('.qualType').text(qualityArray[index - 1]);
        ideas[ideaIndex].quality = qualityArray[index - 1];
    }
    sendToStorage(ideas);
  }   

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
    sendToStorage(existingIdeasObj)
  };
});