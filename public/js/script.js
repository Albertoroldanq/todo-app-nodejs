let deleteButtons = document.querySelectorAll('.taskDeleteButton')

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let taskId = button.dataset.id
        fetch(`/tasks/${taskId}`, {
            method: 'DELETE',
            body: {}
        })
        button.parentElement.hidden = true
    })
})

// let completeButtons = document.querySelectorAll('.taskCompleteButton')
// completeButtons.forEach(button => {
//     button.addEventListener('click', (event) => {
//         let taskId = button.dataset.id
//
//     })
// })

let uncompleteButtons = document.querySelectorAll('.taskChangeStatusButton')
uncompleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let taskId = button.dataset.id
        if(button.textContent === 'Uncompleted'){
            fetch(`/tasks/${taskId}/uncomplete`, {
                method: 'PUT',
                body: {}
            })
            button.parentElement.classList.remove('completedTask')
            button.textContent = 'Completed'

            console.log('uncomplete button')
        } else {
            fetch(`/tasks/${taskId}/complete`, {
                method: 'PUT',
                body: {}
            })
            button.parentElement.classList.add('completedTask')
            button.textContent = 'Uncompleted'
            console.log('complete button')
        }
    })
})

let editButtons = document.querySelectorAll('.taskEditButton')
editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let taskId = button.dataset.id
        let tasks = document.querySelectorAll('.taskDetails')
        let updateTaskForms = document.querySelectorAll('.updateTaskForm')

        tasks.forEach(task => {
            if(task.dataset.id === taskId) {
                task.classList.add('hidden')
            }
            updateTaskForms.forEach(updateTaskForm => {
                if(updateTaskForm.dataset.id === taskId) {
                    updateTaskForm.classList.remove('hidden')
                    console.log(taskId)
                }
            })
        })
    })
})


let updateButtons = document.querySelectorAll('.taskUpdateButton')
updateButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let taskId = button.dataset.id
            fetch(`/tasks/${taskId}/update`, {
                method: 'PUT',
                body: {
                }
            })
            console.log('update button')
    })
})