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
                     <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
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
      .then(characterInfo => {
        const character = characterInfo.data
        text = `<div class="character-info">
                  <div class="name">Id: ${character.id}</div>
                  <div class="name">Name: ${character.name}</div>
                  <div class="occupation"> Occupation: ${character.occupation}</div>
                  <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
                  <div class="weapon">Weapon: ${character.weapon}</div>
                </div>`
        document.querySelector('.characters-container').innerHTML = text
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
        document.getElementById('delete-one').style.backgroundColor = !character.data ? "red" : "green"
        // if (!character.data) document.getElementById('delete-one').style.backgroundColor = 'red'
        // else document.getElementById('delete-one').style.backgroundColor = 'green'       
        document.querySelector('.delete input').value = ''
      })
      .catch(err => {
        console.log('ERROR', err)
        document.getElementById('delete-one').style.backgroundColor = 'red'
      })
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
        document.getElementById('send-data').style.backgroundColor = 'green'
      })
      .catch(err => {
        console.log('ERROR', err)
        document.getElementById('send-data').style.backgroundColor = 'red'
      })
  };


  // Create new character
  document.getElementById('new-character-form').onsubmit = e => {

    e.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(character)
      .then(newCharacter => {
        console.log(newCharacter.data)
        document.getElementById('create-data').style.backgroundColor = 'green'    
        document.querySelectorAll('#new-character-form input').forEach(input => input.value = '')
      })
      .catch(err => {
        console.log('ERROR', err)
        document.getElementById('create-data').style.backgroundColor = 'red'    
      })

  };
});
