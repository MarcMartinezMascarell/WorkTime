//AsignaciÃ³n variables
var projectsView = document.getElementById('projects');

document.getElementById('formTask').addEventListener('submit', saveProject);

var verify = new Array();
var cronos = new Array();
var contadores = [0, 0, 0];


//FunciÃ³n para guardar los proyectos en Local Storage
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

//FunciÃ³n para aÃ±adir los proyectos guardados a la lista
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
                <a class="btn btn-success ml-2" onclick="start(this, ` + i +`)">Iniciar</a>
                <p id="temporizador` +i + `" class="float-right">0</p>
            </div>
            <div>
            </div>
        </div>`;
    }
}

//Actualizamos los proyectos por si acaso
getProject();


//FunciÃ³n para borrar proyectos al pulsar el boton de Borrar
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

//FunciÃ³n para mostrar la descripciÃ³n al pulsar en el titulo del proyecto
function showDescription(i){

    if(document.getElementById("d"+i).style.display == "block"){
        document.getElementById("d"+i).style.display = "none";
    } else {
        document.getElementById("d"+i).style.display = "block";
    }
}

/*
function beginCrono(i) {
    let temporizador = document.getElementById("temporizador" + i);
	
    if(verify[i] == false){
		time = contadores[i];
        interval = setInterval(function(){
			contadores[i] += 0.1;
            temporizador.innerHTML = contadores[i].toFixed(1);
			alert("Contador "+i+"="+contadores[i]);//Quitar!!
        }, 100);
		cronos[i] = interval;
        verify[i] = true;
    } else {
        clearInterval(cronos[i]);
    }
}
*/

function start(d, i){
	
    if (d.innerHTML == "Parar"){
        clearInterval(d.interval);
        d.innerHTML='Reiniciar';
    } else {
        d.interval=setInterval(function(){
			contadores[i] += 0.1;
			document.getElementById("temporizador"+i).innerHTML = contadores[i].toFixed(1);
    
        },100);
        d.innerHTML='Parar';
    }
}