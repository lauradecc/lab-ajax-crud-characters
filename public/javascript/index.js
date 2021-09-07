const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');

window.addEventListener('load', () => {

  // Get all characters
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
      .getFullList()
      .then(characters => {
        let list = ''
        characters.data.forEach(character => {
          list += `<div class="character-info">
                     <div class="name">Id: ${character.id}</div>
                     <div class="name">Name: ${character.name}</div>
                     <div class="occupation"> Occupation: ${character.occupation}</div>
                     <div class="cartoon">Cartoon: ${character.cartoon}</div>
                     <div class="weapon">Weapon: ${character.weapon}</div>
                   </div>`
        })
        document.querySelector('.characters-container').innerHTML = list
      })
      .catch(err => console.log('ERROR', err))
  });


  // Get character
  document.getElementById('fetch-one').addEventListener('click', function (event) {
    
    let characterId = document.querySelector('.operation input').value

    charactersAPI
      .getOneRegister(characterId)
      .then(character => {
        console.log(character.data)
        document.querySelector('.operation input').value = ''
      })
      .catch(err => console.log('ERROR', err))
  });


  // Delete character
  document.getElementById('delete-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('.delete input').value

    charactersAPI
      .deleteOneRegister(characterId)
      .then(character => {
        console.log(character.data)
        document.querySelector('.delete input').value = ''
      })
      .catch(err => console.log('ERROR', err))
  });


  // Edit character
  document.getElementById('edit-character-form').onsubmit = e => {

    e.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const character = {
      id: inputs[0].value,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    charactersAPI
      .updateOneRegister(character)
      .then(updatedCharacter => {
        console.log(updatedCharacter.data)
        document.querySelectorAll('#edit-character-form input').forEach(input => {
          input.value = ''
          input.checked = false
        })
      })
      .catch(err => console.log('ERROR', err))
  };


  // Create new character
  document.getElementById('new-character-form').onsubmit = e => {

    e.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value
    }

    charactersAPI
      .createOneRegister(character)
      .then(newCharacter => {
        console.log(newCharacter.data)
        document.querySelectorAll('#new-character-form input').forEach(input => input.value = '')
      })
      .catch(err => console.log('ERROR', err))
  };
});
