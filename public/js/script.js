let checkPriority = () => {
    document.querySelectorAll('.taskPriority').forEach(label => {
        if (label.textContent === 'Low') {
            label.classList.add('lowPriority')
            label.classList.remove('highPriority')
            label.classList.remove('mediumPriority')
        } else if (label.textContent === 'Medium') {
            label.classList.add('mediumPriority')
            label.classList.remove('highPriority')
            label.classList.remove('lowPriority')
        } else if (label.textContent === 'High') {
            label.classList.add('highPriority')
            label.classList.remove('mediumPriority')
            label.classList.remove('lowPriority')
        }
    })
}

checkPriority()

let deleteButtons = document.querySelectorAll('.taskDeleteButton')

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let taskId = button.dataset.id
        fetch(`/tasks/${taskId}`, {
            method: 'DELETE',
            body: {}
        })
        button.parentElement.parentElement.parentElement.classList.add('hidden')
    })
})

let uncompleteButtons = document.querySelectorAll('.taskChangeStatusButton')
uncompleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let taskId = button.dataset.id
        if (button.dataset.completed === 'true') {
            fetch(`/tasks/${taskId}/uncomplete`, {
                method: 'PUT',
                body: {}
            })
            button.parentElement.previousElementSibling.classList.remove('completedTask')
            button.dataset.completed = 'false'

        } else {
            fetch(`/tasks/${taskId}/complete`, {
                method: 'PUT',
                body: {}
            })
            button.parentElement.previousElementSibling.classList.add('completedTask')
            button.dataset.completed = 'true'

        }
    })
})

let editButtons = document.querySelectorAll('.taskEditButton')
let tasks = document.querySelectorAll('.taskDetails')
let updateTaskForms = document.querySelectorAll('.updateTaskForm')
editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let taskId = button.dataset.id

        if (button.dataset.edit === 'Edit') {
            button.dataset.edit = 'Cancel'
            tasks.forEach(task => {
                if (task.dataset.id === taskId) {
                    task.classList.add('hidden')
                }
            })
            updateTaskForms.forEach(updateTaskForm => {
                if (updateTaskForm.dataset.id === taskId) {
                    updateTaskForm.classList.remove('hidden')
                }
            })
        } else {
            button.dataset.edit = 'Edit'
            tasks.forEach(task => {
                if (task.dataset.id === taskId) {
                    task.classList.remove('hidden')
                }
            })
            updateTaskForms.forEach(updateTaskForm => {
                if (updateTaskForm.dataset.id === taskId) {
                    updateTaskForm.classList.add('hidden')
                }
            })
        }
    })
})


let updateButtons = document.querySelectorAll('.taskUpdateButton')

updateButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault()
        console.log(button.parentElement[1].value)
        console.log(button.dataset.completed)
        let taskId = button.dataset.id
        fetch(`/tasks/${taskId}/update`, {
            method: 'PUT',
            body: JSON.stringify({
                name: button.parentElement[0].value,
                description: button.parentElement[1].value,
                priority: button.parentElement[2].value,
                completed: button.dataset.completed
            }),
            headers: {
                //api is expecting json & charset utf
                'content-type': 'application/json; charset=UTF-8'
            }
        })

        editButtons.forEach(editButton => {
            if (taskId === editButton.dataset.id) {
                editButton.dataset.edit = 'Edit'
            }
        })

        tasks.forEach(task => {
            if (task.dataset.id === taskId) {
                task.classList.remove('hidden')
                console.log(task.firstElementChild.children[0])
                console.log(button.parentElement.children[0].value)
                task.firstElementChild.children[0].textContent = button.parentElement.children[0].value
                task.firstElementChild.children[1].textContent = button.parentElement.children[1].value
                task.firstElementChild.children[2].textContent = button.parentElement.children[2].value
            }

            checkPriority()

        })
        updateTaskForms.forEach(updateTaskForm => {
            if (updateTaskForm.dataset.id === taskId) {
                updateTaskForm.classList.add('hidden')
            }
        })
    })
})

let hiddenButtons = document.querySelectorAll('button.hidden')
let taskGroups = document.querySelectorAll('.task')
hiddenButtons.forEach(hiddenButton => {
    taskGroups.forEach(task => {
        task.addEventListener('mouseover', event => {
            if (hiddenButton.dataset.id === task.firstElementChild.dataset.id) {
                hiddenButton.classList.remove('hidden')
            }
        })
        task.addEventListener('mouseout', event => {
            if (hiddenButton.dataset.id === task.firstElementChild.dataset.id) {
                hiddenButton.classList.add('hidden')
            }
        })
    })
})




