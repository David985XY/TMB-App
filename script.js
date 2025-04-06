document.addEventListener("DOMContentLoaded", function () {
    const tablaBody = document.getElementById("tabla-body");
    const paradasDiv = document.getElementById("paradas");
    const listaParadas = document.getElementById("lista-paradas");
    const nombreLinea = document.getElementById("nombre-linea");

    // Cargar las líneas de metro desde prueba.json
    fetch("prueba.json")
        .then(response => response.json())
        .then(lineas => {
            // Cargar las paradas desde paradas.json
            fetch("paradas.json")
                .then(response => response.json())
                .then(paradasData => {
                    // Llenar la tabla con las líneas de metro
                    lineas.forEach(linea => {
                        const fila = document.createElement("tr");

                        fila.innerHTML = `
                            <td>${linea.NOM_LINIA}</td>
                            <td>${linea.DESC_LINIA}</td>
                            <td>${linea.NOM_OPERADOR}</td>
                            <td>
                                Pico: ${linea.FRECUENCIA_MINUTOS.hora_pico} min | 
                                Valle: ${linea.FRECUENCIA_MINUTOS.hora_valle} min | 
                                Nocturno: ${linea.FRECUENCIA_MINUTOS.nocturno} min
                            </td>
                            <td>
                                <!-- Botón de "Ver Paradas" -->
                                <button class="btn btn-rojo ver-paradas" data-id="${linea.CODI_LINIA}">
                                    Ver Paradas
                                </button>
                            </td>
                        `;

                        tablaBody.appendChild(fila);
                    });

                    // Reasignar los eventos para los botones "Ver Paradas"
                    const botonVerParadas = document.querySelectorAll(".ver-paradas");
                    botonVerParadas.forEach(btn => {
                        btn.addEventListener("click", function () {
                            const lineaSeleccionada = lineas.find(linea => linea.CODI_LINIA === this.getAttribute("data-id"));
                            if (lineaSeleccionada) {
                                nombreLinea.textContent = lineaSeleccionada.NOM_LINIA;

                                // Vaciar la lista de paradas
                                listaParadas.innerHTML = "";

                                // Aquí se agregan las paradas de la línea seleccionada
                                lineaSeleccionada.PARADAS.forEach(parada => {
                                    // Buscar la parada en paradasData
                                    const paradaData = paradasData.features.find(feature => feature.properties.NOM_ESTACIO === parada);

                                    if (paradaData) {
                                        const enlace = paradaData.properties.PICTO;  // Obtener el pictograma
                                        const li = document.createElement("li");
                                        li.innerHTML = `${parada} <span class="badge bg-primary">${enlace}</span>`;
                                        listaParadas.appendChild(li);
                                    } else {
                                        const li = document.createElement("li");
                                        li.textContent = `${parada} (No encontrado)`;
                                        listaParadas.appendChild(li);
                                    }
                                });

                                paradasDiv.classList.remove("d-none");  // Mostrar las paradas
                            }
                        });
                    });
                })
                
        })
        
});
