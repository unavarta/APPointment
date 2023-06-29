<script>
</script>

<main>
	<nav>
		<a class="logo" href="/">APPointment.</a>
	</nav>

	<div class="botonesTurnos">
		<!-- <h1>Appointment</h1>
        <p>Appointment is a web application that allows users to book appointments with doctors.</p>
        <p>It is built using the MERN stack.</p>
        <p>It is a project for the course "Software Engineering" at the University of Macedonia.</p>
        <p>It is developed by: <br> -->
		<a class="boton" href="/SoliTurno">SOLICITAR UN TURNO</a>
		<a class="boton" href="/ConsultarTurno">CONSULTAR TURNO</a>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600&display=swap');
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.botonesTurnos {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 80vh;
	}
	.boton {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80px;
		width: 300px;
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
	.boton:hover {
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
