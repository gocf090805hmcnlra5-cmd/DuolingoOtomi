
document.addEventListener("DOMContentLoaded", cargarPerfil);

async function cargarPerfil() {

    try {

        const respuesta = await fetch("obtener_datos.php", {
            method: "GET",
            credentials: "same-origin"
        });

        if (!respuesta.ok) {
            throw new Error("Error al consultar el servidor");
        }

        const resultado = await respuesta.json();

        if (!resultado.success) {
            alert(resultado.mensaje || "No se pudieron cargar los datos");
            window.location.href = "login.html";
            return;
        }

        const datos = resultado.datos;

        // Función para colocar información en el HTML
        function colocar(id, valor) {

            const elemento = document.getElementById(id);

            if (elemento) {
                elemento.textContent =
                    valor !== null && valor !== undefined && valor !== ""
                    ? valor
                    : "No disponible";
            }
        }

        // Formato de fechas
        function formatoFecha(fecha) {

            if (!fecha) return "No disponible";

            const partes = fecha.substring(0, 10).split("-");

            if (partes.length !== 3) return fecha;

            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }

        // DATOS PERSONALES
        colocar("nombreUsuario", datos.nombre);
        colocar("correoUsuario", datos.email);
        colocar("fechaRegistro", formatoFecha(datos.fecha_ingreso));
        colocar("fechaNacimiento", formatoFecha(datos.fecha_nac));
        colocar("paisUsuario", datos.pais);
        colocar("nivelUsuario", datos.nivel);

        // LOGROS
        colocar("diasRacha", datos.racha ?? 0);
        colocar("experiencias", datos.experiencia ?? 0);

        // RACHA ACTUAL
        colocar("rachaActual", datos.racha ?? 0);

        // RECOMPENSAS
        colocar("monedas", datos.monedas ?? 0);
        colocar("vidas", datos.vidas ?? 5);

        // INFORMACIÓN DEL CURSO
        colocar("numeroCurso", datos.id_curso ?? "Sin curso");
        colocar("fechaIngreso", formatoFecha(datos.fecha_ingreso));

        // PORCENTAJE DE PROGRESO
        const avance = Math.max(
            0,
            Math.min(100, Number(datos.porcentaje) || 0)
        );

        colocar("porcentaje", avance + "%");

        document.getElementById("barraProgreso").style.width =
            avance + "%";

    } catch (error) {

        console.error("Error al cargar el perfil:", error);

        alert("No fue posible cargar tu perfil. Intenta nuevamente.");

    }

}
