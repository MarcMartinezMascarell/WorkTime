document.getElementById('formTask').addEventListener('submit', saveProject);

function saveProject(e){

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const project = {
        title: title,
        description: description
    };

    if(localStorage.getItem('projects') === null) {
        let projects = [];
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    } else {
        let projects = JSON.parse(localStorage.getItem('projects'));
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    getProject();
    document.getElementById('formTask').reset();
    e.preventDefault();
}

function getProject() {
    let projects = JSON.parse(localStorage.getItem('projects'));
    let projectsView = document.getElementById('projects');

    projectsView.innerHTML = '';

    for(let i = 0; i < projects.length; i++){
        let title = projects[i].title;
        let description = projects[i].description;
        projectsView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p><span class="font-weight-bold">${title}</span> - ${description}</p>
                <a class="btn btn-danger" onclick="deleteProject('${title}')">Borrar</a>
            </div>
        </div>`
    }
}

getProject();

function deleteProject(title){

    let confirmation = confirm("Esta seguro que desea borrar el proyecto?");
    if(confirmation == true){
    let projects = JSON.parse(localStorage.getItem('projects'));

    for(let i = 0; i < projects.length; i++){
        if(projects[i].title == title){
            projects.splice(i, 1);
        }
    }
    localStorage.setItem('projects', JSON.stringify(projects));
    getProject();
    }

}