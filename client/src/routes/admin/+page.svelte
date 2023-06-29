<script>
    import { onMount } from "svelte";

    var turnos = [

    ]

    onMount(async () => {
        const response = await fetch("http://localhost:3000/api/getHorarios/");
        const jsonData = await response.json();
        console.log(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
           
            turnos = jsonData;
        }
    });
</script>

<main>
    <p>Turnos Actuales</p>
    <a href="/">Go back</a>
    <button >Mostrar Turnos</button>
    <div class="turnos"> 
        <table>
            <tr>
              <th>Especialidad</th>
              <th>Fecha Turno</th>
              <th>Hora Turno</th>
              <th>Documento Paciente</th>
              <th>ID del Turno</th>
            </tr>
            {#each turnos as turno}
            <tr>
              <td>{turno.especialidad}</td>
              <td>{turno.fecha.slice(0, 10)}</td>
              <td>{turno.fecha.slice(11, 16)}</td>
              <td>{turno.documentopaciente}</td>
              <td>{turno.idturno}</td>
            </tr>
            {/each}
          </table>
    </div>
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .turnos{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    p{
        border: 2px solid black;
    }

    table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #e8f0fe;
  }
</style>