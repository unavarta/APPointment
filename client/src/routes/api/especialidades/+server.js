export async function _loadEspecialidades() {
    const response = await fetch('https://localhost:3000/api/getEspecialidades');
    const especialidades = await response.json();
    const especialidad = especialidades.map((especialidad) => {
        return{
            nombre: especialidad.nombre,
            id: especialidad._id,
            especialidad: especialidad.especialidad
        };
    });
       
    return new Response(JSON.stringify(especialidad), {
        headers: { 'Content-Type': 'application/json' },
        });
    }