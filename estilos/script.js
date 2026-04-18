let carrito = [];

const formulario = document.getElementById('formulario');
const tablaCarrito = document.getElementById('tablaCarrito');
const totalPagarSpan = document.getElementById('totalPagar');
const vehiculosActivosSpan = document.getElementById('vehiculosActivos');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const placa = document.getElementById('placa').value.trim().toUpperCase();
    let vehiculoExistente = carrito.find(item => item.placa === placa);

    if (!vehiculoExistente) {
        carrito.push({
            placa: placa,
            horaEntrada: new Date(),
            horaSalida: null,
            valorPagar: 0,
            estado: 'Activo'
        });
    } 
    else if (!vehiculoExistente.horaSalida) {
        vehiculoExistente.horaSalida = new Date();
        let minutosEstacionado = Math.ceil((vehiculoExistente.horaSalida - vehiculoExistente.horaEntrada) / 1000 / 60);
        vehiculoExistente.valorPagar = minutosEstacionado * 500;
        vehiculoExistente.estado = 'Retirado';
    }
    else{
        alert("El vehículo con placa " + placa + " ya ha sido registrado y retirado.");
    }

    mostrarCarrito();
    formulario.reset();
});

function mostrarCarrito() {
    tablaCarrito.innerHTML = "";
    let total = 0;
    let vehiculosActivos = 0;

    carrito.forEach(function (item) {
        total += item.valorPagar;

        const row = document.createElement('tr');

        if(!item.horaSalida){
            vehiculosActivos++;
        }

        row.innerHTML += `
            <td>${item.placa}</td>
            <td>${formatoHora(item.horaEntrada)}</td>
            <td>${formatoHora(item.horaSalida)}</td>
            <td>${item.valorPagar}</td>
            <td class="${item.estado === 'Activo' ? 'estado-activo' : 'estado-retirado'}">${item.estado}</td>
            <td><button class="btn-eliminar" onclick="eliminarVehiculo(${carrito.indexOf(item)})">Eliminar</button></td>
        `;
        tablaCarrito.appendChild(row);
    });

    totalPagarSpan.textContent = total;
    vehiculosActivosSpan.textContent = vehiculosActivos;
}

function eliminarVehiculo(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

function formatoHora(fecha) {
    return fecha ? new Date(fecha).toLocaleTimeString() : "-";
}