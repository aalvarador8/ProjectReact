import { useState } from 'react'

function ContactForm() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    servicio: '',
    mensaje: ''
  })

  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  const manejarCambio = (e) => {
    const { name, value } = e.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio'
    }

    if (!formulario.correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(formulario.correo)) {
      nuevosErrores.correo = 'Ingrese un correo válido'
    }

    if (!formulario.servicio) {
      nuevosErrores.servicio = 'Seleccione un servicio'
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio'
    }

    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (validarFormulario()) {
      setEnviado(true)

      setFormulario({
        nombre: '',
        correo: '',
        servicio: '',
        mensaje: ''
      })

      setErrores({})
    }
  }

  return (
    <section className="section" id="contacto">
      <h2>Contacto</h2>

      <form className="form" onSubmit={manejarEnvio}>
        <input
          type="text"
          name="nombre"
          placeholder="Ingrese su nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
        />
        {errores.nombre && <span>{errores.nombre}</span>}

        <input
          type="email"
          name="correo"
          placeholder="Ingrese su correo"
          value={formulario.correo}
          onChange={manejarCambio}
        />
        {errores.correo && <span>{errores.correo}</span>}

        <select
          name="servicio"
          value={formulario.servicio}
          onChange={manejarCambio}
        >
          <option value="">Seleccione un servicio</option>
          <option value="automatizacion">Automatización</option>
          <option value="datos">Análisis de datos</option>
          <option value="prediccion">Modelos predictivos</option>
        </select>
        {errores.servicio && <span>{errores.servicio}</span>}

        <textarea
          name="mensaje"
          placeholder="Escriba que desea aprender"
          value={formulario.mensaje}
          onChange={manejarCambio}
        />
        {errores.mensaje && <span>{errores.mensaje}</span>}

        <button type="submit">Enviar</button>

        {enviado && <p className="success">Formulario enviado correctamente.</p>}
      </form>
    </section>
  )
}

export default ContactForm