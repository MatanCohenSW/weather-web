const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const responseMessage = document.getElementById('response-message')


weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const loocation = search.value

    fetch('/weather?address=' + loocation).then((response) => {
    response.json().then((data) => {
        if(data.error)
            responseMessage.textContent = data.error
        else
            responseMessage.textContent = data.address

            console.log(data.address)

    })

})

    console.log('test')
})