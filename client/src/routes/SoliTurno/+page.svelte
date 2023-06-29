<script>
	let especialidades = [];
	import { createEventDispatcher } from 'svelte';
	import emailjs from '@emailjs/browser';

	async function logJSONData() {
		try {
			const response = await fetch('http://localhost:3000/api/getespecialidades/');
			const jsonData = await response.json();

			for (let i = 0; i < jsonData.length; i++) {
				especialidades = jsonData;
			}
			return especialidades;
		} catch (error) {
			console.error('Error:', error);
		}
	}

	logJSONData();

	console.log(Math.floor(100000 + Math.random() * 900000));

	const horarios = [8, 9, 10, 11, 12];

	function checkDNI() {
		let dni = document.getElementById('documento').value;
		if (dni.length > 8) {
			return false;
		} else if (dni.length < 8) {
			return false;
		} else {
			return true;
		}
	}
	function corregirHorario() {
		let horario = document.getElementById('horario').value;
		horario -= 3;
		var auxiliar = horario;
		horario = '0' + auxiliar + ':00:00';
		return horario;
	}

	async function postHorario() {
		var fecha = document.getElementById('fecha').value;
		var fechaSeleccionada = new Date(fecha);
		var fechaActual = new Date();
		if (fechaSeleccionada <= fechaActual) {
			alert('No se puede elegir una fecha pasada');
		} else {
			var id = Math.floor(100000 + Math.random() * 900000);
			var especialidad = document.getElementById('especialidad').value;
			var fecha = document.getElementById('fecha').value + ':' + corregirHorario();
			var fechaMail =
				document.getElementById('fecha').value +
				'a las ' +
				document.getElementById('horario').value +
				':00';
			var dni = document.getElementById('documento').value;
			var dniCheck = checkDNI();
			if (dniCheck == false) {
				alert('DNI no válido');
				return;
			}
			var email = document.getElementById('email').value;
			var nombre = document.getElementById('nombre').value;
			var templateParams = {
				email_paciente: email,
				nombre_paciente: nombre,
				fecha_turno: fechaMail,
				id_turno: id,
				doctor_nombre: especialidad
			};
			if (especialidad == 'null' || fecha == '' || horario == 'null' || dniCheck == false) {
				alert('Faltan datos');
				return;
			} else {
				fetch('http://localhost:3000/api/postHorario', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						fecha: fecha,
						especialidad: especialidad,
						documentopaciente: dni,
						idturno: id
					})
				})
					.then((response) => response.json())
					.then((response) => console.log(JSON.stringify(response)));
				alert('Turno solicitado con éxito. Su ID de turno es: ' + id + '.');
				emailjs
					.send('service_appointment', 'template_3desjk3', templateParams, 'dmdDR4pvIQbCchzed')
					.then(
						(result) => {
							console.log('SUCCESS!', result.text);
						},
						(error) => {
							console.log('FAILED...', error.text);
						}
					);
			}
		}
	}

	const dispatch = createEventDispatcher();
	let correo = '';

	function verificarCorreo() {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (regex.test(correo)) {
			dispatch('correoValido', correo);
		} else {
			dispatch('correoInvalido');
		}
	}
</script>

<main>
	<nav>
		<a class="logo" href="/">APPointment.</a>
	</nav>
	<div class="contenedor">
		<h1 class="solicitar">SOLICITUD TURNO</h1>
		<div class="cuerpo">
			<div class="contenedor-dos">
				<label for="documento">INGRESE SU DOCUMENTO:</label>

				<input type="text" id="documento" placeholder="DNI" />
				<br />
				<label for="especialidad">SELECCIONE LA ESPECIALIDAD:</label>
				<select name="especialidad" id="especialidad">
					<option value="null">ESPECIALIDAD</option>
					{#each especialidades as especialidad}
						<option value={especialidad.especialidad}
							>{especialidad.especialidad} - {especialidad.apellido}</option
						>
					{/each}
				</select>
				<br />
				<label for="fecha">SELECCIONE LA FECHA:</label>
				<input type="date" id="fecha" />
				<br />
				<label for="horario">SELECCIONE EL HORARIO</label>

				<select name="horario" id="horario">
					<option value="null">HORARIO</option>
					{#each horarios as horario}
						<option value={horario}>{horario}:00</option>
					{/each}
				</select>
				<br />
				<label for="email">INGRESE SU CORREO ELECTRÓNICO</label>
				<input
					type="text"
					id="email"
					bind:value={correo}
					on:input={verificarCorreo}
					name="email"
					placeholder="Correo Electronico"
				/>
				{#if correo}
					{#if /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(correo)}
						<p style="color: green;">Correo válido</p>
					{:else}
						<p style="color: red;">Correo inválido</p>
					{/if}
				{/if}
				<label for="nombre">INGRESE SU NOMBRE</label>
				<input type="text" id="nombre" name="nombre" placeholder="Su Nombre" />
			</div>
		</div>
		<br />

		<button on:click={postHorario}>AGENDAR TURNO</button>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600&display=swap');
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	main {
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
	.contenedor-dos {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
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
	select {
		align-items: right;
		align-self: right;
		justify-content: right;
	}
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
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80px;
		width: 40vw;
		margin: 10px;
		font-size: 20px;
		font-weight: 600;
		text-decoration: none;
		background-color: white;
		transition: 0.3s;
		color: black;
		font-family: 'Jost', sans-serif;
		border: 2px solid black;
	}
	button:hover {
		background-color: greenyellow;
		transition: 0.3s;
		cursor: pointer;
	}

	select {
		border: none;
		font-family: 'Jost', sans-serif;
		font-weight: 600;
		border: 1px solid black;
		width: 180px;
		text-align: center;
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
