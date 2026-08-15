# ProyectoMapaCorrosion

## Descripción del Proyecto

El Mapa de Corrosión es una plataforma web interactiva y de libre acceso diseñada para visualizar y consultar los niveles de corrosión en el estado de Yucatán. El sistema actúa como la interfaz visual gráfica de un modelo matemático predictivo externo, el cual calcula los índices de corrosión tomando en cuenta variables ambientales clave de la región.

Este proyecto nace con la necesidad de ofrecer una herramienta rápida e intuitiva, donde el público general y especialistas puedan observar el panorama geoespacial de la corrosión sin requerir conocimientos técnicos ni autenticación en el sistema.

### Características Principales

- **Visualización Térmica (Heatmap)**: El mapa presenta una capa visual estática pre-calculada estilo "mapa de calor", coloreada según el grado de corrosión estimado para cada zona, permitiendo una comprensión inmediata del entorno.

- **Interacción Dinámica**: Al hacer clic en un punto geográfico específico, el sistema consulta en tiempo real al modelo matemático y despliega un panel detallado.

- **Información Detallada**: Los datos mostrados por coordenada incluyen la velocidad y grado de corrosión, la fecha de la medición, y los parámetros ambientales utilizados para el cálculo (humedad relativa, temperatura, concentración de cloruros/sulfatos y pH).

- **Acceso Público**: Navegación libre por el mapa y uso de filtros visuales (por nivel de corrosión, zona, fechas) sin necesidad de iniciar sesión.

### Tecnología e Arquitectura

El proyecto cuenta con:

- **Frontend**: aplicación web con mapa interactivo (Next.js + MapLibre GL).
- **Backend**: API REST para el manejo de datos (FastAPI).
- **Base de datos**: base de datos geoespacial (PostGIS) para almacenar la información de los puntos.

## Cómo correr el proyecto

### Requisitos

- Tener instalado **Docker** y **Docker Compose** en tu máquina.

### Pasos

1. Clona el repositorio y entra al directorio del proyecto:

   ```bash
   git clone <url-del-repositorio>
   cd ProyectoMapaCorrosion
   ```

2. Levanta los servicios con Docker Compose:

   ```bash
   docker-compose up --build
   ```

   Esto iniciará tres contenedores:

   - **Base de datos** (PostGIS) en `localhost:5432`.
   - **Backend** (API) en `http://localhost:8000`.
   - **Frontend** (mapa interactivo) en `http://localhost:3000`.

3. Abre el navegador en [http://localhost:3000](http://localhost:3000) para ver el mapa.

4. Para detener los servicios:

   ```bash
   docker-compose down
   ```

> **Nota**: los cambios en el código del backend y frontend se reflejan automáticamente gracias al modo de desarrollo (hot reload) configurado en los contenedores.
