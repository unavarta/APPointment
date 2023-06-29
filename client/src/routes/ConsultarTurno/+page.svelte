<script>
	import { get } from "svelte/store";

	
	function agarrarDatos() {
		var numturno = document.getElementById('numturno');

		const regex = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/;
		regex.test(numturno);
		if (numturno.length > 6 || numturno.length < 6 || numturno == '' || numturno == 'null') {
			alert('Número de turno no válido.');
			return;
		} else {
			async function getTurno() {
				const caca = numturno.value;
				try {
					const response = await fetch('http://localhost:3000/api/getHorarios/' + caca);
					const jsonData = await response.json();
					var especialidad = jsonData[0].especialidad;
					var fecha = jsonData[0].fecha.slice(0, 10);
					var horario = jsonData[0].fecha.slice(11, 16);
					var documento = jsonData[0].documentopaciente;

					// mostrar el turno en la pagina
					turno.className = 'turno';
					const contenedor = document.getElementById('turno');
					
					const parrafo = document.createElement('p');
					parrafo.textContent = 'Especialidad: ' + especialidad  +' Fecha: ' + fecha + ' Horario: ' + horario + ' DNI: ' + documento;
					contenedor.appendChild(parrafo);
					console.log(especialidad);
					alert('Turno es: ' + especialidad + ' ' + fecha + ' ' + horario + ' ' + documento + '');

					return true;			
				} catch (error) {
					console.log(error);
				}
			}
			getTurno();
			
		}
		return true;
		
	}

	async function cancelarTurno(){
		const numturno = document.getElementById('numturno').value;
  const response = await fetch('http://localhost:3000/api/deleteHorario/' + numturno, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const jsonData = await response.json();
  console.log(jsonData);

  alert('Turno cancelado con éxito.');
	}
</script>

<main>
	<nav>
		<a class="logo" href="/">APPointment.</a>
	</nav>
	<div class="contenedor">
		<h1 class="solicitar">CONSULTAR TURNO</h1>
		<div class="cuerpo">
			<div class="contenedor-dos" />
			<label for="documento">INGRESE EL NÚMERO DE TURNO</label>
			<input type="text" id="numturno" name="numturno" placeholder="Número de turno" />
		</div>
		<br />

		<button on:click={agarrarDatos}>BUSCAR TURNO</button>
		<button on:click={cancelarTurno}>CANCELAR TURNO</button>
		<br />
		<div class="contenedorTurno">
			<div id="turno">

			</div>
		</div>
		
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600&display=swap');
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.contenedorTurno{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		font-family: 'jost', sans-serif;
	}
	.turno{
		font-family: 'Jost', sans-serif;
		font-weight: 600;
		font-size: 1.2rem;
		margin: 10px;
		background-color: pink;
		border: 1px solid black;
		padding: 20px;
		width: 40vw;
		text-align: center;
		
	}
	main {
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.contenedor {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.cuerpo {
		background-color: greenyellow;
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: 'Jost', sans-serif;
		height: auto;
		width: 40vw;
		padding: 20px;
		justify-content: center;
	}

	.cuerpo label {
		align-items: left;
	}
	.cuerpo input,
	input {
		text-align: center;
		font-family: 'Jost', sans-serif;
		font-weight: 600;
		padding: 10px;
		margin: 10px;
		border: 1px solid black;
	}
	h1 {
		font-family: 'Jost', sans-serif;
		font-weight: 600;
		font-size: 1.8rem;
		margin: 10px;
	}
	button {
		font-family: 'Jost', sans-serif;
		font-weight: 600;
		font-size: 1.2rem;
		background-color: white;
		color: black;
		padding: 20px;
		width: 40vw;
		margin: 10px;
		transition: 0.3s;
	}
	button:hover {
		background-color: greenyellow;
		transition: 0.3s;
		cursor: pointer;
	}

	nav {
		margin: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.logo {
		text-align: center;
		font-size: 3rem;
		font-weight: 700;
		color: black;
		text-decoration: none;
		transition: 0.3s;
		font-family: 'Jost', sans-serif;
		transition: 0.3s;
	}
	.logo:hover {
		text-shadow: 2px 0 greenyellow, -2px 0 greenyellow, 0 2px greenyellow, 0 -2px greenyellow,
			1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
		transition: 0.3s;
	}
</style>
