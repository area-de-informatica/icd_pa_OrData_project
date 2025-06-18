// Preguntas del diagnóstico
const diagnosticQuestions = [
  {
    question: "¿Comprendes el concepto de 'widget' en Orange Data Mining?",
    options: ["Sí", "No"],
    id: "q1",
  },
  {
    question: "¿Sabes cómo crear un flujo de trabajo en Orange Data Mining?",
    options: ["Sí", "No"],
    id: "q2",
  },
  {
    question:
      "¿Comprendes la diferencia entre modelos supervisados y no supervisados en machine learning?",
    options: ["Sí", "No"],
    id: "q3",
  },
  {
    question:
      "¿Sabes cómo interpretar los resultados de un árbol de decisión en términos de precisión y validación?",
    options: ["Sí", "No"],
    id: "q4",
  },
  {
    question:
      "¿Entiendes la importancia del preprocesamiento de datos antes de aplicar modelos en Orange Data Mining?",
    options: ["Sí", "No"],
    id: "q5",
  },
  {
    question:
      "¿Sabes qué es el overfitting en el contexto de los modelos de aprendizaje automático?",
    options: ["Sí", "No"],
    id: "q6",
  },
  {
    question: "¿Sabes cómo crear un flujo de trabajo en Orange Data Mining?",
    options: ["Sí", "No"],
    id: "q7",
  },
];

let responses = {};
let currentLevel = ""; // Esto almacenará el nivel determinado
let currentQuestionIndex = 0; // Índice de la pregunta actual

// Respuestas correctas para cada pregunta (índice 0 basado en el array)
const correctAnswers = [
  1, // 1: B -> Es un módulo gráfico que realiza tareas específicas
  1, // 2: B -> Integrar módulos y procesar datos
  1, // 3: B -> Eliminar datos faltantes y transformar datos para mejorar los modelos
  1, // 4: B -> Un modelo predictivo basado en características de los datos
  0, // 5: A -> El modelo ajusta a los datos de entrenamiento, pero no generaliza bien
];

// Cargar preguntas diagnósticas
function loadDiagnosticQuestions() {
  const diagnosticContainer = document.getElementById("diagnostic-questions");
  diagnosticQuestions.forEach((question) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
            <p>${question.question}</p>
            <button onclick="recordAnswer('${question.id}', 'Sí', this)">Sí</button>
            <button onclick="recordAnswer('${question.id}', 'No', this)">No</button>
        `;
    diagnosticContainer.appendChild(questionDiv);
  });
}

// Guardar las respuestas seleccionadas
function recordAnswer(questionId, answer, button) {
  responses[questionId] = answer;

  // Resaltar la respuesta seleccionada
  const buttons = button.parentElement.querySelectorAll("button");
  buttons.forEach((btn) => btn.classList.remove("selected")); // Eliminar selección previa
  button.classList.add("selected"); // Añadir clase a la respuesta seleccionada
}

// Evaluar las respuestas del diagnóstico y redirigir al nivel correspondiente
function evaluateDiagnostic() {
  let yesCount = 0;

  // Contar el número de respuestas "Sí"
  for (const response in responses) {
    if (responses[response] === "Sí") {
      yesCount++;
    }
  }

  // Mostrar el resultado y redirigir al examen correspondiente
  const diagnosticMessage = document.getElementById("diagnostic-message");
  if (yesCount <= 3) {
    diagnosticMessage.textContent =
      "Tu nivel es Básico. ¡Comienza con el examen básico!";
    currentLevel = "basic";
  } else if (yesCount === 5) {
    diagnosticMessage.textContent =
      "Tu nivel es Intermedio. ¡Comienza con el examen intermedio!";
    currentLevel = "medium";
  } else if (yesCount >= 6) {
    diagnosticMessage.textContent =
      "Tu nivel es Avanzado. ¡Comienza con el examen avanzado!";
    currentLevel = "advanced";
  }

  // Ocultar la prueba diagnóstica y mostrar el mensaje del resultado
  document.getElementById("diagnostic-section").style.display = "none";
  document.getElementById("diagnostic-result").style.display = "block";
}

// Iniciar el examen según el nivel cuando el estudiante haga clic en "Empezar Examen"
function startLevel() {
  document.getElementById("diagnostic-result").style.display = "none"; // Ocultar el mensaje del nivel
  document.getElementById("question-container").style.display = "block"; // Mostrar la sección del examen
  loadExamQuestions(currentLevel); // Cargar las preguntas del nivel seleccionado
}

// Variable global para las preguntas de cada nivel
let questions = {};

// Cargar las preguntas del examen según el nivel
function loadExamQuestions(level) {
  console.log("Nivel seleccionado:", level); // Depuración: Mostrar el nivel seleccionado

  // Asegurarse de que las preguntas estén definidas antes de acceder a ellas
  if (!level) {
    console.error("Nivel no definido");
    return;
  }

  // Asignar las preguntas del nivel
  questions = getQuestionsForLevel(level);

  // Comprobar si las preguntas fueron cargadas correctamente
  if (!questions || questions.length === 0) {
    console.error("No se han encontrado preguntas para el nivel:", level);
    return;
  }

  console.log("Preguntas cargadas para el nivel", level, ":", questions); // Depuración: Mostrar las preguntas cargadas

  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = ""; // Limpiar preguntas previas antes de cargar nuevas preguntas

  const question = questions[currentQuestionIndex];

  questionContainer.innerHTML = `
        <p>${question.question}</p>
        ${question.options
          .map(
            (option, optionIndex) =>
              `<button onclick="checkAnswer(${optionIndex}, ${currentQuestionIndex})">${option}</button>`
          )
          .join("")}
    `;
}

// Obtener las preguntas correspondientes al nivel
function getQuestionsForLevel(level) {
  const questions = {
    basic: [
      {
        question:
          "Contexto: Laura, una estudiante de ingeniería de sistemas, está aprendiendo a usar Orange Data Mining para realizar análisis de datos. Durante una sesión práctica, observa que la interfaz del software incluye varios elementos llamados “widgets”, y se pregunta cuál es su función principal. ¿Cuál es la función principal de un widget en Orange Data Mining?",
        options: [
          "Es un componente que realiza cálculos matemáticos complejos",
          "Es un módulo gráfico que realiza tareas específicas",
          "Es un tipo de gráfico usado para visualizar resultados",
          "Es una herramienta de depuración de errores en los modelos",
        ],
        answer: 1, // Respuesta correcta: B
        justification:
          "En Orange, un widget es un módulo visual que se utiliza para realizar tareas específicas dentro del flujo de trabajo, como cargar datos, aplicar filtros, entrenar modelos, entre otros.",
      },
      {
        question:
          "Contexto: Durante una clase, el profesor le pide a los estudiantes construir un modelo de clasificación en Orange. Para lograrlo, deben conectar varios componentes que realicen tareas como carga de datos, limpieza, entrenamiento y evaluación del modelo. ¿Cuál es el propósito principal de un flujo de trabajo en Orange Data Mining?",
        options: [
          "Organizar archivos y carpetas",
          "Integrar módulos y procesar datos",
          "Programar directamente en Python",
          "Crear gráficos de presentaciones interactivas",
        ],
        answer: 1, // Respuesta correcta: B
        justification:
          "En Orange, los flujos de trabajo permiten conectar visualmente los widgets para procesar datos de manera secuencial, facilitando el análisis sin necesidad de programación.",
      },
      {
        question:
          "Contexto: Camilo está desarrollando un modelo predictivo y su asesor le recomienda realizar un adecuado preprocesamiento de los datos para mejorar el rendimiento del modelo. ¿Qué significa 'preprocesamiento de datos' en machine learning?",
        options: [
          "Generar nuevos modelos",
          "Eliminar datos faltantes y transformar datos para mejorar los modelos",
          "Visualizar los datos para presentar resultados",
          "Integrar diferentes algoritmos en una sola ejecución",
        ],
        answer: 1, // Respuesta correcta: B
        justification:
          "El preprocesamiento de datos incluye tareas como normalización, tratamiento de valores faltantes y codificación, esenciales para mejorar la calidad de los modelos predictivos.",
      },
      {
        question:
          "Contexto: En una competencia universitaria de ciencia de datos, uno de los equipos utiliza un árbol de decisión como modelo principal para clasificar correos electrónicos como spam o no spam. ¿Qué es un árbol de decisión en machine learning?",
        options: [
          "Un algoritmo que predice valores numéricos",
          "Un modelo predictivo basado en características de los datos",
          "Una herramienta para clasificar gráficos según su tipo",
          "Un proceso de búsqueda en bases de datos para encontrar patrones",
        ],
        answer: 1, // Respuesta correcta: B
        justification:
          "Un árbol de decisión es un modelo que toma decisiones basadas en las características de los datos, construyendo una estructura en forma de árbol que conduce a una predicción final.",
      },
      {
        question:
          "Contexto: Un grupo de estudiantes entrena un modelo que muestra una precisión del 100% en los datos de entrenamiento, pero al evaluarlo con nuevos datos, su rendimiento disminuye notablemente. ¿Qué describe mejor el fenómeno conocido como 'overfitting' en aprendizaje automático?",
        options: [
          "El modelo ajusta a los datos de entrenamiento, pero no generaliza bien",
          "El modelo hace predicciones incorrectas en todos los casos",
          "El modelo no logra ajustar correctamente los parámetros iniciales",
          "El modelo ignora las variables irrelevantes en los datos",
        ],
        answer: 0, // Respuesta correcta: A
        justification:
          "El sobreajuste o overfitting ocurre cuando un modelo aprende demasiado bien los detalles de los datos de entrenamiento, incluyendo el ruido, lo que impide que generalice correctamente a nuevos conjuntos de datos.",
      },
    ],
  };

  return questions[level] || [];
}

function checkAnswer(selectedOption, questionIndex) {
  const question = questions[questionIndex];
  const feedbackContainer = document.getElementById("feedback-container");
  const nextButton = document.getElementById("next-button");
  const retryButton = document.getElementById("retry-button");

  // Verificar si la respuesta seleccionada es correcta
  if (selectedOption === question.answer) {
    document.getElementById(
      "feedback-message"
    ).innerHTML = `<span id="correct">¡Correcto! ${question.justification}</span>`;
    feedbackContainer.style.display = "block";
    nextButton.style.display = "inline-block";
    retryButton.style.display = "none";
  } else {
    document.getElementById(
      "feedback-message"
    ).innerHTML = `<span id="incorrect">Incorrecto. ${question.justification}</span>`;
    feedbackContainer.style.display = "block";
    nextButton.style.display = "none";
    retryButton.style.display = "inline-block";
  }

  // Deshabilitar los botones después de seleccionar
  const buttons = document.querySelectorAll("#question-container button");
  buttons.forEach((button) => (button.disabled = true));
}

function nextQuestion() {
  currentQuestionIndex++; // Incrementar el índice de la pregunta
  if (currentQuestionIndex < questions[currentLevel].length) {
    loadExamQuestions(currentLevel); // Cargar la siguiente pregunta
    document.getElementById("feedback-container").style.display = "none"; // Ocultar retroalimentación
  } else {
    alert("¡Has completado el examen!");
  }
}

function retryQuestion() {
  loadExamQuestions(currentLevel); // Recargar la pregunta actual
  document.getElementById("feedback-container").style.display = "none"; // Ocultar retroalimentación
}

// Cargar las preguntas diagnósticas al cargar la página
window.onload = loadDiagnosticQuestions;
