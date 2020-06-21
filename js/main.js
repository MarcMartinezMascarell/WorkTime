//Asignación variables
var projectsView = document.getElementById('projects');

document.getElementById('formTask').addEventListener('submit', saveProject);


//Función para guardar los proyectos en Local Storage
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

//Función para añadir los proyectos guardados a la lista
function getProject() {
    let projects = JSON.parse(localStorage.getItem('projects'));
    projectsView.innerHTML = '';

    for(let i = 0; i < projects.length; i++){
        let title = projects[i].title;
        let description = projects[i].description;
        projectsView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <a style="cursor:pointer" class="font-weight-bold mr-4" onclick="showDescription(${i})">${title}</a>
                <p style="display:none" id="d` +i + `">${description}</p>
                <a class="btn btn-danger" onclick="deleteProject('${title}')">Borrar</a>
                <a class="btn btn-success ml-2" onclick="beginCrono(${i})" id="iniciar`+i+`">Iniciar</a>
                <p id="temporizador` +i + `" class="float-right">0</p>
            </div>
            <div>

            </div>
        </div>`
    }
}

//Actualizamos los proyectos por si acaso
getProject();


//Función para borrar proyectos al pulsar el boton de Borrar
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

/*
function showDescription() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
*/

//Función para mostrar la descripción al pulsar en el titulo del proyecto
function showDescription(i){

    if(document.getElementById("d"+i).style.display == "block"){
        document.getElementById("d"+i).style.display = "none";
    } else {
        document.getElementById("d"+i).style.display = "block";
    }
}

function beginCrono(i) {
    let temporizador = document.getElementById("temporizador" + i);
    let verify = false;
    let time = 0, interval = 0;

    if(verify === false){
        interval = setInterval(function(){
            time += 1;
            temporizador.innerHTML = time;
        }, 1000);
        verify = true;
    } else {
        verify = false;
        clearInterval(interval);
    }
}