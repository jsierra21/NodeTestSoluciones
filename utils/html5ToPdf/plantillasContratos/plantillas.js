/**
 * @name PlantillasContratos
 * @type Class
 * @description Clase base de la cual extienden los modelos de la aplicación
 * @author Alfons Navarro
 */

const path = require('path')
const fs = require('fs')
const imgs = require('./../../../utils/imgs/img.json')
let bussiness
let empresa
let descripcion
let urlImg
let sitioWeb
let email
let appWebUrl
let appMovilUrl
let pbx

const Empresa = require('./../../empresa')
new Empresa().getEmpresaData().then((resp) => {
	bussiness = resp
	empresa = bussiness.empresa
	descripcion = bussiness.descripcion
	urlImg = bussiness.urlImg
	sitioWeb = bussiness.sitioWeb
	email = bussiness.email
	appWebUrl = bussiness.appWebUrl
	appMovilUrl = bussiness.appMovilUrl
	pbx = bussiness.pbx
})

class PlantillasContratos {
	//#region PLANTILLAS

	armarPlantilla(data) {
		const _adheriente = this.adheriente(data)
		const { imgLogo, imgFondoNew, imgRteLegal, imgLogoSolo } = imgs
		const { nroContrato, groupId } = data
		let contratoBody

		const signUser = data.dataContratoPdf.firma
			? `<img src="${data.sign}" style="width:150px; height: 150px"></img>`
			: ''

		let contratoHead = this.cabaceraContratos(imgLogo, imgFondoNew, imgLogoSolo)

		// Obtenemos el contrato según su tipo
		switch (parseInt(groupId, 10)) {
			case 2:
				contratoBody = this.contratoBodyPlanIntegral(data, _adheriente, nroContrato)
				break
			case 3:
				contratoBody = this.contratoBodyPlanServicioJuridico(data, _adheriente, nroContrato)
				break
			case 4:
				contratoBody = this.contratoBodyPlanAuxilioExequial(data, _adheriente, nroContrato)
				break
			case 6:
				contratoBody = this.contratoBodyPlanIntegralAlumnos(data, _adheriente, nroContrato)
				break
		}

		let contratoFooter = this.contratoFooter(data, imgRteLegal, signUser)

		let plantilla2 = `
        ${contratoHead}
        ${contratoBody}
        ${contratoFooter}
    `

		return plantilla2
	}
	//#region

	//#region HTML DINAMICO CONTRATO
	/**
	 * Cabecera generica para los diferentes contratos
	 * @param {*} imgLogo
	 * @param {*} imgFondoNew
	 * @param {*} imgLogoSolo
	 * @returns
	 */
	cabaceraContratos(imgLogo, imgFondoNew, imgLogoSolo) {
		let cabeceraContratos = `
      <div class="contenedor">
          <div class="titulo">
            <h1>SOLUCIONES INTEGRALES</h1>
            <h1>CINCO OCHO S.A.S</h1>
          </div>
          <div class="pie">
            <div class="info">
              <p>${sitioWeb}</p>
              <p>Línea de Atención al Cliente</p>
              <p><strong>PBX: ${pbx}</strong></p>
              <p>E-mail: ${email}</p>
            </div>
            <div class="img">
              <img src="${imgLogoSolo}" />
            </div>
          </div>
        </div>
    `

		return cabeceraContratos
	}

	//#region CONTRATOS
	contratoBodyPlanIntegral(data, adheriente_, nroContrato) {
		const contratobody = `
      <h2 style="text-align: center">CONTRATO DE ADHESI&Oacute;N DE PORTAFOLIO DE PRODUCTOS DE SOLUCIONES INTEGRALES CINCO OCHO</h2>

      <p style="text-align: justify">
        Entre <strong>SOLUCIONES INTEGRALES CINCO OCHO S.A.S.</strong>, en adelante <strong>SOLUCIONES 5-8</strong>, con
        domicilio principal en la ciudad de Bogot&aacute; D.C., representada en este acto por su apoderado, identificado como
        aparece al pie de su firma, de una parte, y de otra parte de la persona se&ntilde;alada al final de este documento,
        identificada como aparece al pie de su firma, en adelante EL ADHERENTE, hemos convenido celebrar el presente contrato
        de adhesi&oacute;n (en adelante el contrato), el cual se regir&aacute; por las siguientes clausulas:
      </p>

      <p><strong>I. Clausulas generales del contrato PLAN INTEGRAL.</strong></p>

      <p>
        <strong>PRIMERA &ndash; OBJETO: </strong>SOLUCIONES 5-8 prestar&aacute; sus servicios a EL ADHERENTE a trav&eacute;s
        de los siguientes productos:
      </p>

      <ol type="a" style="text-align: justify">
        <li>
          <strong>SERVICIO JUR&Iacute;DICO:</strong> Prestar asesor&iacute;as ya sean en forma virtual o
          telef&oacute;nicamente y cuando la situaci&oacute;n lo amerite personalizadas, lo mismo que la asistencia
          jur&iacute;dica en las siguiente &aacute;reas del derecho: Civil (procesos ejecutivos, sucesiones, divorcios)
          familia, (impugnaci&oacute;n de la paternidad, procesos ejecutivos de alimentos, fijaci&oacute;n, aumento,
          disminuci&oacute;n de cuota alimentaria) penal (que no se encuentren tipificados dentro de las restricciones en los
          t&eacute;rminos y condiciones). Disciplina (todas las conductas que se tipifiquen como falta disciplinaria).
          Responsabilidad Administrativa y fiscal al interior de la Instituci&oacute;n. Y asesor&iacute;a en derechos de
          petici&oacute;n y/o acciones de tutela que no involucren a la Instituci&oacute;n. NOTA ACLARATORIA La
          asesor&iacute;a y asistencia jur&iacute;dica cobija al titular del contrato y a un familiar mayor de edad, designado y relacionado por el adherente. PAR&Aacute;GRAFO
          PRIMERO: Acorde a la cl&aacute;usula SEGUNDA de los termino y condiciones, la asistencia y representaci&oacute;n
          jur&iacute;dica se brindar&aacute; siempre que la comisi&oacute;n del hecho est&eacute; acorde a la firma del
          presente documento, t&eacute;ngase en cuenta que este contrato tiene efectos del presente hacia el futuro.
        </li>
        <li>
          <strong>AUXILIO EXEQUIAL:</strong> Que incluye un auxilio &uacute;nico en dinero de hasta dos salarios
          m&iacute;nimos legales mensuales vigentes (2 SMLV) y cobija &uacute;nicamente a las personas que se encuentren
          previamente inscritas en el presente contrato como grupo familiar, a saber: cobija al adherente titular del
          contrato, a su c&oacute;nyuge o compa&ntilde;era (o) permanente, hijos, padres y hermanos (todos deben ser menores
          de70 a&ntilde;os al momento de la suscripci&oacute;n del contrato).
        </li>
        <li>
          <strong>AUXILIO SOCIAL DE DESEMPLEO Y AUXILIO POR MATERNIDAD:</strong> en caso de
          <strong>P&eacute;rdida temporal del empleo</strong> exclusivo del ADHERENTE, a causa de una sanci&oacute;n
          disciplinaria debidamente ejecutoriada (por hechos sucedidos despu&eacute;s de la fecha de suscripci&oacute;n del
          contrato), superior a 30 d&iacute;as, se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la
          familia durante el tiempo de la misma y sin que se excedan 5 meses y en caso de
          <strong>p&eacute;rdida absoluta del empleo</strong> (por hechos sucedidos despu&eacute;s de la fecha de
          suscripci&oacute;n del contrato), se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia
          durante 5 meses, de acuerdo a la siguiente <strong>tabla de auxilios porcentual en S.M.L.M.V</strong> saber: De 6
          meses a 1 a&ntilde;o de vigencia del contrato, un 20%, entre: 1 y 2 a&ntilde;os un 25%, 2 y 3 a&ntilde;os un 50%, 3
          y 4 a&ntilde;os, un80%, m&aacute;s 5 a&ntilde;os, un 100%. El apoyo de <strong>Auxilio de Maternidad</strong>, es
          una ayuda econ&oacute;mica solidaria, otorgada en el momento del nacimiento de los hijos del ADHERENTE (nacidos
          despu&eacute;s de la fecha de suscripci&oacute;n del contrato), consistente en un auxilio econ&oacute;mico por
          &uacute;nica vez, de car&aacute;cter no devolutivo y de acuerdo a la tabla de auxilios porcentual en S.M.L.M.V
          anterior.
        </li>
      </ol>

      <p style="text-align: justify">
        <strong>SEGUNDA &ndash; TERMINOS Y CONDICIONES.</strong> A trav&eacute;s de ${empresa}.,
        quien en adelante se denominar&aacute; LA PROVEEDORA, se compromete con el ADHERENTE a cumplir con lo pactado en el
        contratado, sin exceder el l&iacute;mite del mismo, a quien se encuentre al d&iacute;a con los pagos y siempre que el
        objeto de cobertura ocurra durante la vigencia del contrato, y que cumpla con los requisitos
      </p>

      <ol type="a" style="text-align: justify">
        <li>
          <strong>ASISTENCIA JURIDICA: LA ASISTENCIA JURIDICA INCLUYE:</strong><br />
          <strong>CONSULTOR&Iacute;A,</strong> ilimitada ya sea telef&oacute;nicamente o en forma virtual y cuando la
          situaci&oacute;n lo amerite personalizadas; en todas y cada una de las &aacute;reas del derecho se&ntilde;aladas y
          delimitadas en el objeto, vale decir, que la designaci&oacute;n de un profesional para la atenci&oacute;n de un
          asunto jur&iacute;dico, ser&aacute; proporcionada siempre que la consulta atendida as&iacute; lo requiera.
          <strong>PAR&Aacute;GRAFO:</strong> LA PROVEEDORA se abstendr&aacute; de designar un abogado que asista personalmente
          al adherente si a su juicio, considera que su asesor&iacute;a jur&iacute;dica no requiere de acompa&ntilde;amiento
          personalizado.<br />
          <strong>ASISTENCIA JUR&Iacute;DICA</strong> por vinculaci&oacute;n en investigaci&oacute;n disciplinaria, penal,
          penal militar, civil, responsabilidad administrativa y fiscal (no Contenciosa Administrativa), Procesos
          Prestacionales. Cobertura nacional y m&aacute;ximo tres procesos por a&ntilde;o, siempre y cuando los hechos ocurran
          durante la vigencia del presente contrato. No se asumen las preexistencias (enti&eacute;ndase por preexistencias la
          existencia real de una situaci&oacute;n legal y/o procesal antes de la vigencia del v&iacute;nculo contractual).<br />
          <strong>RESTRICCIONES:</strong> LA PROVEEDORA., se abstiene de asistir o atender la consulta del adherente, que sea
          investigados por delitos inherentes o conexos a las actividades il&iacute;citas que puedan cometer durante la
          vigencia de este contrato y que se encuentran tipificados en el C&oacute;digo Penal Colombiano, por: Delitos contra
          la existencia y seguridad del Estado. Delitos contra la administraci&oacute;n p&uacute;blica y corrupci&oacute;n,
          Delitos dolosos contra la seguridad e integridad de los integrantes de la Fuerza P&uacute;blica. Delitos de
          narcotr&aacute;fico y conexos. Delitos sexuales, que vulneren la ni&ntilde;ez; as&iacute; como el feminicidio. Por
          &uacute;ltimo LA PROVEEDORA se abstendr&aacute; de conocer de todo tipo de acciones legales que se emprendan por el
          adherente en contra de la instituci&oacute;n a la que pertenece. <strong>PAR&Aacute;GRAFO PRIMERO:</strong> Esta
          asistencia y/o representaci&oacute;n jur&iacute;dica pierde vigencia de 2 continuidad por terminaci&oacute;n del
          contrato, de acuerdo a la cl&aacute;usula h) del presente documento, en ese orden, al existir procesos en curso al
          momento de la terminaci&oacute;n y en caso de no renovaci&oacute;n del contrato EL ADHERENTE deber&aacute; otorgar
          poder a un abogado de confianza. Por tal raz&oacute;n el profesional del derecho designado por LA PROVEEDORA
          presentar&aacute; la renuncia irrevocable y definitiva ante la respectiva autoridad judicial.
          <strong>PAR&Aacute;GRAFO SEGUNDO:</strong> el Abogado que designe LA PROVEEDORA, es para que asista y represente al
          adherente durante todo el proceso; en el momento en que el adherente revoque el poder, d&aacute;ndole poder a un
          Abogado de confianza, cesar&aacute; toda responsabilidad por parte de LA PROVEEDORA frente a esta actuaci&oacute;n
          procesal, as&iacute; las cosas LA PROVEEDORA no asume ninguna vinculaci&oacute;n contractual con Abogados de
          confianza designados por EL ADHERENTE, ni asumir&aacute; ning&uacute;n costo que genere esa asistencia
          jur&iacute;dica cuando el poder le sea revocado al profesional designado por LA PROVEEDORA por parte del ADHERENTE.
          <strong>PAR&Aacute;GRAFO TERCERO:</strong> Todos los gastos documentales, notariales, de registro y dem&aacute;s
          emolumentos que surjan del proceso o de cualquiera de las actuaciones procesales ser&aacute;n &uacute;nica y
          exclusivamente de responsabilidad del ADHERENTE. De igual forma todo pago de multas, indemnizaciones, condena en
          costas y dem&aacute;s responsabilidades en dinero que se decreten procesalmente, corresponden &uacute;nica y
          exclusivamente al ADHERENTE.
          <strong>PAR&Aacute;GRAFO CUARTO:</strong> La asesoria y asistencia juridica del familiar mayor de edad designad y relacionado por el adherente en el contrato solo puede ser reasignada anulamente, siempre y cuando el beneficiario no tenga asistencia juridica en curso.
        </li>
        <li>
          <strong>AUXILIOS DE DESEMPLEO.</strong> INCLUYE:<br />
          <strong>P&Eacute;RDIDA TEMPORAL DEL EMPLEO.</strong> Cuando se determine la p&eacute;rdida temporal del empleo del
          ADHERENTE, a causa de una sanci&oacute;n disciplinaria debidamente ejecutoriada superior a 30 d&iacute;as, se
          otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia seg&uacute;n la tabla de beneficios
          prevista en el contrato.<br />
          <strong>P&Eacute;RDIDA ABSOLUTA DEL EMPLEO.</strong> Si se determina la p&eacute;rdida absoluta del empleo, por
          razones diferentes a su voluntad y que no goce de asignaci&oacute;n de retiro o pensi&oacute;n, se otorgar&aacute;
          el auxilio econ&oacute;mico de protecci&oacute;n a la familia por &uacute;nica vez, seg&uacute;n la tabla de
          beneficios prevista en el contrato. La solicitud se deba hacer a un plazo m&aacute;ximo de hasta treinta d&iacute;as
          desde la notificaci&oacute;n del fallo.
        </li>
        <li>
          <strong>AUXILIO EXEQUIAL</strong> En caso de fallecimiento del beneficiario o beneficiarios, y teniendo en cuenta
          los periodos de carencia definidos en la cl&aacute;usula d) del presente contrato, LA PROVEEDORA asumir&aacute; el
          pago de un auxilio &uacute;nico en dinero, de hasta dos salarios m&iacute;nimos legales mensuales vigentes (2
          SMLMV), a quien acredite la titularidad del contrato y cobija &uacute;nicamente a las personas que se encuentren
          previamente inscritas en el presente contrato. Se reconocer&aacute; el auxilio econ&oacute;mico inmediatamente se
          acredita la titularidad y se anexen los documentos legales del fallecimiento y la certificaci&oacute;n bancaria de
          la cuenta del titular del contrato o el beneficiario de este. Auxilio Solicitado exclusivamente por el firmante del
          contrato y a un plazo m&aacute;ximo de hasta treinta d&iacute;as desde el fallecimiento del beneficiario. En caso
          que el fallecido sea el adherente podr&aacute; solicitarlo el c&oacute;nyuge o los padres (si es soltero). Se
          deber&aacute; presentar fotocopia del documento de identidad del fallecido, certificado de defunci&oacute;n, y los
          documentos que LA PROVEEDORA requiera para el estudio de la solicitud. Lo anterior, sin perjuicio de la libertad
          probatoria de los beneficiarios para acreditar la ocurrencia del siniestro. Los documentos se&ntilde;alados no
          constituyen el &uacute;nico medio probatorio para acreditar la ocurrencia del siniestro.
        </li>
        <li>
          <strong>PER&Iacute;ODOS DE CARENCIA</strong> Los servicios derivados del presente contrato ser&aacute;n efectivos:

          <ol>
            <li>
              A partir de las 24 horas siguientes al inicio de la vigencia del contrato correspondiente a que opere
              efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota; para el caso de muerte
              accidental, definida en la cl&aacute;usula e).
            </li>
            <li>
              A partir del d&iacute;a cuarenta y seis (46), contados desde la fecha de inicio de la vigencia del contrato
              correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota;
              cuando el fallecimiento sobreviniere por cualquier causa, salvo situaciones extremas de epidemias, pandemias,
              cat&aacute;strofes naturales, c&aacute;ncer, SIDA y las enfermedades graves definidas en la cl&aacute;usula e).
            </li>
            <li>
              A partir del d&iacute;a ciento ochenta y uno (181), contados desde la fecha de inicio de vigencia del contrato
              correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota;
              cuando el fallecimiento ocurra por cualquier causa, salvo situaciones extremas de epidemias, pandemias,
              cat&aacute;strofes naturales, c&aacute;ncer y SIDA.
            </li>
            <li>
              A partir del d&iacute;a trescientos sesenta y seis (366), contados desde la fecha de inicio de vigencia del
              contrato correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera
              cuota; cuando el fallecimiento ocurra por cualquier causa.
            </li>
          </ol>
        </li>
        <li>
          <strong>DEFINICIONES</strong>
          <ol>
            <li>
              <strong>ENFERMEDADES GRAVES:</strong> Se definen como enfermedades graves las siguientes:
              <ol type="a">
                <li>
                  <strong>ACCIDENTE CEREBRO VASCULAR: </strong>Es la p&eacute;rdida s&uacute;bita de la funci&oacute;n
                  cerebral, resultante de la interrupci&oacute;n del aporte sangu&iacute;neo a una parte del cerebro, que
                  cause lesiones irreversibles tales como la p&eacute;rdida permanente del conocimiento, pensamiento, lenguaje
                  o sensaci&oacute;n. Puede ser causado por trombosis, embolia, estenosis de una arteria del cerebro o
                  hemorragia cerebral.
                </li>
                <li>
                  <strong>INSUFICIENCIA RENAL: </strong>Es el da&ntilde;o bilateral e irreversible de la funci&oacute;n de los ri&ntilde;ones, que haga necesaria la realizaci&oacute;n en forma regular de di&aacute;lisis renal o trasplante de ri&ntilde;&oacute;n.
                </li>
                <li>
                  <strong>INFARTO DEL MIOCARDIO:</strong> Es la muerte del m&uacute;sculo card&iacute;aco, ocasionada por una irrigaci&oacute;n sangu&iacute;nea deficiente.
                </li>
                <li>
                  <strong>CIRUG&Iacute;A ARTERIO-CORONARIA:</strong> Es la intervenci&oacute;n quir&uacute;rgica a coraz&oacute;n abierto, que se realiza para corregir la estenosis u oclusi&oacute;n de las arterias coronarias, que no responden a tratamiento m&eacute;dico y en consecuencia es necesaria la realizaci&oacute;n de un bypass o puente coronario.
                </li>
                <li>
                  <strong>ESCLEROSIS M&Uacute;LTIPLE:</strong> Es una enfermedad que afecta el sistema nervioso central y se
                  manifiesta por anomal&iacute;as neurol&oacute;gicas progresivas e irreversibles que conllevan a un estado de
                  incapacidad severa, con disminuci&oacute;n de la visi&oacute;n, incoordinaci&oacute;n, debilidad e
                  incontinencia urinaria.
                </li>
              </ol>
            </li>
            <li>
              <strong>MUERTE ACCIDENTAL:</strong> Es el fallecimiento de una persona por un hecho imprevisto, violento, s&uacute;bito, de origen externo, que no haya sido provocado intencionalmente por el beneficiario; o a consecuencia de una lesi&oacute;n corporal causada por dicho accidente.
            </li>
          </ol>
        </li>
        <li>
          <strong>GRUPOS FAMILIAR BENEFICIARIO.</strong> Para efectos del presente contrato, el grupos familiar beneficiario del auxilio exequial es el relacionado en el mismo. Y siempre que el titular del contrato lo solicite, los que relacione con posterioridad a trav&eacute;s de cualquiera de los medios de informaci&oacute;n que para tal fin ponga a disposici&oacute;n y cumpla con lo establecido contractualmente.<br />
          <strong>PERMANENCIA</strong>
          <ol>
            <li>Los beneficiarios principales (titular, c&oacute;nyuge, padres) tendr&aacute;n permanencia indefinida.</li>
            <li>
              Los hijos del casado o en uniuni&oacute;nn marital de hecho y los hermanos  al cumplir 30 años muni&oacute;ns 364 días, pasarán a considerarse como adicionales y se aumentara el valor correspondiente del contrato en un 10% por cada uno; siempre y cuando el ADHERENTE no manifiesta su no continuidad.. Si al momento de la suscripcion del contrato los hijos o hermanos del ADHERENTE superan esta edad, podran ser incluidos por valo adicional del 10% del contrato, por cada uno.
            </li>
          </ol>
        </li>
        <li>
          <strong>SUSTITUCI&Oacute;N DE BENEFICIARIOS DURANTE LA VIGENCIA.</strong> Bajo ninguna circunstancia los beneficiarios podr&aacute;n ceder a terceros los derechos previstos en el presente contrato, en caso de muerte de uno de ellos, durante su vigencia, no implica derecho a sustituci&oacute;n de &eacute;ste, ni cambio en el valor pactado.
        </li>
        <li>
          <strong>SUSPENSION Y TERMINACI&Oacute;N DEL CONTRATO.</strong><br />
          El contrato terminar&aacute; en forma individual respecto de cualquiera de los integrantes del grupo beneficiario, al presentarse alguna de las siguientes causas:
          <ol style="text-align: justify">
            <li>Mora en el pago: sera suspendido el contrato si al dia quince del mes no se ha consignado la cuota o hecho efectivo el descuento por nomina; se reactivara inmediatamente se restablezca el pago de las cuotas, de igual forma la antigüedad del contrato; entendiendose que durante la suspension no se prestara los servicios estableidos en el contrato ni se sumara antigüedad del mismo.</li>
            <li>Cuando el adherente solicite la terminaci&oacute;n de acuerdo a las cl&aacute;usulas del contrato.</li>
            <li>Cuando el adherente solicite la terminación de acuerdo a las cláusulas del contrato. </li>
            <li>Cuanto el adherente  fallezca.</li>
            <li>Terminación del contrato por decison interna de la empresa.</li>
            <li>Cuando se revoque el contrato por cualquier circunstancia.</li>
          </ol>
        </li>
        <li style="text-align: justify">
          <strong>NORMAS APLICABLES.</strong><br />
          A los aspectos no regulados en este contrato le ser&aacute;n aplicables las disposiciones previstas en el C&oacute;digo de Comercio y en especial la Ley 1480 de 2011 y los par&aacute;metros establecidos en la presente ley, se le pone de presente y se le explica la informaci&oacute;n aqu&iacute; contenida al adherente, en especial el siguiente art&iacute;culo:<strong>ART&Iacute;CULO 37. CONDICIONES NEGOCIALES GENERALES Y DE LOS CONTRATOS DE ADHESI&Oacute;N.</strong> Las Condiciones Neg&oacute;ciales Generales y de los contratos de adhesi&oacute;n deber&aacute;n cumplir como m&iacute;nimo los siguientes requisitos:
          <ol style="text-align: justify">
            <li>
              Haber informado suficiente, anticipada y expresamente al adherente sobre la existencia efectos y alcance de las condiciones generales. En los contratos se utilizar&aacute; el idioma castellano.
            </li>
            <li>Las condiciones generales del contrato deben ser concretas, claras y completas.</li>
            <li>
              En los contratos escritos, los caracteres deber&aacute;n ser legibles a simple vista y no incluir espacios en blanco, se har&aacute; entrega anticipada del clausulado al tomador, explic&aacute;ndole el contenido de la cobertura, de las exclusiones y de las garant&iacute;as.
            </li>
          </ol>
        </li>
        <li>
          <strong>COBERTURA TERRITORIAL</strong>
          <ul>
            <li>El presente contrato tiene cobertura dentro del territorio nacional de Colombia.</li>
          </ul>
        </li>
        <li>
          <strong>PROCEDIMIENTO PARA LA ATENCION.</strong>
          <ul>
            <li>
              Se puede hacer a trav&eacute;s de la APP ${appWebUrl}, desde la p&aacute;gina web www.soluciones5-8.com o comunicarse con la l&iacute;nea de Atenci&oacute;n al Cliente PBX ${pbx} dispuesta para el efecto.
            </li>
          </ul>
        </li>
      </ol>

      <p style="text-align: justify">
        <strong>II. Tratamiento de datos personales.</strong><br />
        EL ADHERENTE autoriza a SOLUCIONES 5-8. para recolectar, almacenar, conservar, usar, suprimir, actualizar, compartir y
        circular a terceros sus datos personales de orden demogr&aacute;fico, econ&oacute;mico, biom&eacute;trico, de
        servicios, comercial y de localizaci&oacute;n; para obtenci&oacute;n y suministro de informaci&oacute;n relativa al
        cumplimiento de sus obligaciones y el c&aacute;lculo de riesgo econ&oacute;mico o crediticio (de manera irrevocable),
        la prevenci&oacute;n y control de fraudes, y para beneficio propio o de terceros con los que SOLUCIONES 5-8, haya
        celebrado convenio, como centrales de riegos financieros. La informaci&oacute;n para el c&aacute;lculo de riesgo
        crediticio podr&aacute; ser consultada en cualquier operador de banco de datos, por las entidades financieras con las
        cuales SOLUCIONES 5-8 celebre convenios comerciales en favor de los titulares. El titular de los datos tiene derecho
        de conocer, actualizar, rectificar, suprimir los datos, y revocar la autorizaci&oacute;n salvo las excepciones
        legales. Los datos biom&eacute;tricos son datos sensibles y el adherente no est&aacute; obligado a autorizar su
        tratamiento. Estos ser&aacute;n usados para verificaci&oacute;n de identidad y suscripci&oacute;n de contratos. El
        adherente tambi&eacute;n puede presentar cualquier queja, petici&oacute;n o recurso a trav&eacute;s de los medios de
        comunicaci&oacute;n referidos en el contrato, los cuales se responder&aacute; dentro de los t&eacute;rminos legales
        estipulados.
      </p>

      <p>
        <strong>III. Generalidades y datos del adherente.</strong><br />
        <strong>GENERALIDADES</strong>
      </p>

      <ol style="text-align: justify">
        <li>
          La asistencia jur&iacute;dica, el auxilio exequial y el auxilio social de desempleo y Auxilio de Maternidad,
          corresponden exclusivamente a los enunciados en el presente contrato, a los cuales el ADHERENTE no podr&aacute;
          acceder cuando haya imposibilidad de realizar el respectivo descuento o cuando este no se encuentre al d&iacute;a
          con el pago de las obligaciones.
        </li>
        <li>
          EL ADHERENTE al firmar el presente contrato se acoge a los beneficios significativos otorgados de acuerdo a lo
          estipulado en la tabla de auxilios de protecci&oacute;n a la familia.
        </li>
      </ol>

      <strong>DATOS PERSONALES</strong>
      
      ${adheriente_}

      <p>&nbsp;</p>

      <p><strong>OBLIGACIONES ADHERENTE</strong></p>

      <ol style="text-align: justify">
        <li>
          Cumplir con el pago total del contrato pagadero en veinticuatro cuotas mensuales de $39.500.oo Treinta y nueva mil quinicientos
          pesos Mc/te.
        </li>
        <li>
          Facilitar y participar en los tr&aacute;mites que demanden el desarrollo de los diferentes procesos y actividades
          para cumplir con lo pactado en este contrato.
        </li>
        <li>
          Para dar por terminado el contrato se debe allegar la solicitud, con un mes de anticipaci&oacute;n a la fecha de
          vencimiento del periodo contractual.
        </li>
        <li>
          Bajo estas condiciones; el ADHERENTE Autoriza ampliamente para que sea descontada de su sueldo, la suma de
          $39.500.oo Treinta y nueve mil quinientos pesos Mc/te, de manera mensual e ininterrumpida, y sea consignada a favor de
          SOLUCIONES INTEGRALES CINCO OCHO S.A.S., por concepto de pago del presente contrato, correspondientes al 50% del
          auxilio exequial, al 25% de asistencia jur&iacute;dica y al 25% de auxilio social de desempleo. Estos valores se
          podr&aacute;n incrementar anualmente con base en el &iacute;ndice de precios al consumidor (IPC).
        </li>
      </ol>

      <p style="text-align: justify">
        En consecuencia se firma a los ${data.day} d&iacute;as, del mes de ${data.month} del ${data.year} , en dos (2)
        ejemplares del mismo contenido y valor probatorio, uno (1) para cada parte, despu&eacute;s de haber le&iacute;do,
        entendido y aceptado las generalidades del presente contrato de acuerdo a los t&eacute;rminos y condiciones
        establecidos en &eacute;l.
      </p>

      <p style="text-align: right"><strong># 58-${nroContrato}</strong></p>

      <p>&nbsp;</p>
    `

		return contratobody
	}

	contratoBodyPlanServicioJuridico(data, adheriente_, nroContrato) {
		const contratobody = `
      <h2 style="text-align: center">CONTRATO DE ADHESI&Oacute;N DE PORTAFOLIO DE PRODUCTOS DE SOLUCIONES INTEGRALES CINCO OCHO</h2>

      <p style="text-align: justify">Entre <strong>SOLUCIONES INTEGRALES CINCO OCHO S.A.S.</strong>, en adelante <strong>SOLUCIONES 5-8</strong>, con domicilio principal en la ciudad de Bogot&aacute; D.C., representada en este acto por su apoderado, identificado como aparece al pie de su firma, de una parte, y de otra parte de la persona se&ntilde;alada al final de este documento, identificada como aparece al pie de su firma (manuscrita, digital o electronica a travez de la accion  de aceptar los terminos y condiciones), en adelante EL ADHERENTE, hemos convenido celebrar el presente contrato de adhesi&oacute;n (en adelante el contrato), el cual se regir&aacute; por las siguientes clausulas:</p>

      <p><strong>I. Clausulas generales del contrato PLAN SERVICIO JUR&Iacute;DICO.</strong></p>

      <p><strong>PRIMERA &ndash; OBJETO: </strong>SOLUCIONES 5-8 prestar&aacute; sus servicios a EL ADHERENTE a trav&eacute;s de los siguientes productos:</p>

      <ol style="text-align: justify">
        <li><strong>SERVICIO JUR&Iacute;DICO</strong>: Prestar asesor&iacute;as ya sean en forma virtual o telef&oacute;nicamente y cuando la situaci&oacute;n lo amerite personalizadas, lo mismo que la asistencia jur&iacute;dica en las siguiente &aacute;reas del derecho: en materia disciplinaria, penal y penal militar, responsabilidad Administrativa y fiscal al interior de la Instituci&oacute;n. Y asesor&iacute;a en derechos de petici&oacute;n y/o acciones de tutela que no involucren a la Instituci&oacute;n. <strong>NOTA ACLARATORIA</strong> La asesoría y asistencia jurídica cobija  al titular del contrato y a un familiar mayor de edad, designado y relacionado  por el adherente como beneficiario. <strong>PAR&Aacute;GRAFO PRIMERO</strong>: Acorde a la cl&aacute;usula SEGUNDA de los termino y condiciones, la asistencia y representaci&oacute;n jur&iacute;dica se brindar&aacute; siempre que la comisi&oacute;n del hecho est&eacute; acorde a la firma del presente documento, t&eacute;ngase en cuenta que este contrato tiene efectos del presente hacia el futuro.</li>
        <li><strong>AUXILIO SOCIAL POR SUSPENSION O PERDIDA LABORAL Y AUXILIO POR MATERNIDAD</strong>: En caso de Suspensi&oacute;n Labora exclusivo del ADHERENTE, a causa de una sanci&oacute;n disciplinaria debidamente ejecutoriada (por hechos sucedidos despu&eacute;s de la fecha de suscripci&oacute;n del contrato), superior a 30 d&iacute;as, se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia durante el tiempo de la misma y sin que se excedan 5 meses y en caso de <strong>p&eacute;rdida Laboral</strong> (por hechos sucedidos despu&eacute;s de la fecha de suscripci&oacute;n del contrato), se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia durante 5 meses, de acuerdo a la siguiente <strong>tabla de auxilios porcentual en S.M.L.M.V</strong> saber: De 6 meses a 1 a&ntilde;o de vigencia del contrato, un 10%, entre: 1 y 2 a&ntilde;os un 20%, 2 y 3 a&ntilde;os un 30%, 3 y 4 a&ntilde;os, un40%, m&aacute;s de 5 a&ntilde;os, un 50%. El apoyo de <strong>AUXILIO POR MATERNIDAD</strong>, es una ayuda econ&oacute;mica solidaria, otorgada en el momento del nacimiento de los hijos del ADHERENTE (nacidos despu&eacute;s de la fecha de suscripci&oacute;n del contrato), consistente en un auxilio econ&oacute;mico por &uacute;nica vez, de car&aacute;cter no devolutivo y de acuerdo a la tabla de auxilios porcentual en S.M.L.M.V anterior; y despu&eacute;s de los seis meses de vigencia del contrato.</li>
      </ol>

      <p><strong>SEGUNDA &ndash; TERMINOS Y CONDICIONES.</strong> A trav&eacute;s de SOLUCIONES INTEGRALES CINCO OCHO S.A.S., quien en adelante se denominar&aacute; LA PROVEEDORA, se compromete con el ADHERENTE a cumplir con lo pactado en el contratado, sin exceder el l&iacute;mite del mismo, a quien se encuentre al d&iacute;a con los pagos y siempre que el objeto de cobertura ocurra durante la vigencia del contrato, y que cumpla con los requisitos</p>

      <ol type="a" style="text-align: justify">
        <li><strong>ASISTENCIA JURIDICA</strong>: LA ASISTENCIA JURIDICA INCLUYE: <strong>CONSULTOR&Iacute;A</strong>, ilimitada ya sea telef&oacute;nicamente o en forma virtual y cuando la situaci&oacute;n lo amerite personalizadas; en materia disciplinaria, penal y penal militar. <strong>PAR&Aacute;GRAFO</strong>: LA PROVEEDORA se abstendr&aacute; de designar un abogado que asista personalmente al adherente si a su juicio, considera que su asesor&iacute;a jur&iacute;dica no requiere de acompa&ntilde;amiento personalizado. <strong>ASISTENCIA JUR&Iacute;DICA</strong> por vinculaci&oacute;n en investigaci&oacute;n disciplinaria, penal, penal militar, con cobertura nacional y m&aacute;ximo tres procesos por a&ntilde;o, siempre y cuando los hechos ocurran durante la vigencia del presente contrato. No se asumen las preexistencias (enti&eacute;ndase por preexistencias la existencia real de una situaci&oacute;n legal y/o procesal antes de la vigencia del v&iacute;nculo contractual). <strong>RESTRICCIONE</strong>S: LA PROVEEDORA., se abstendr&aacute; de representar a los afiliados cuando curse en su contra investigaci&oacute;n en materia penal y/o penal militar que involucre uno o varios de los siguientes delitos: Terrorismo, concierto para delinquir, extorsi&oacute;n, secuestro, tortura, narcotr&aacute;fico y conexos, desaparici&oacute;n forzada y delitos sexuales; cuando haya flagrancia tras cometer alguna de estas conductas. <strong>PAR&Aacute;GRAFO PRIMERO</strong>: Esta asistencia y/o representaci&oacute;n jur&iacute;dica pierde vigencia de continuidad por terminaci&oacute;n del contrato, de acuerdo a la cl&aacute;usula g) del presente documento, en ese orden, al existir procesos en curso al momento de la terminaci&oacute;n y en caso de no renovaci&oacute;n del contrato EL ADHERENTE deber&aacute; otorgar poder a un abogado de confianza. Por tal raz&oacute;n el profesional del derecho designado por LA PROVEEDORA presentar&aacute; la renuncia irrevocable y definitiva ante la respectiva autoridad judicial. <strong>PAR&Aacute;GRAFO SEGUNDO</strong>: el Abogado que designe LA PROVEEDORA, es para que asista y represente al adherente durante todo el proceso; en el momento en que el adherente revoque el poder, d&aacute;ndole poder a un Abogado de confianza, cesar&aacute; toda responsabilidad por parte de LA PROVEEDORA frente a esta actuaci&oacute;n procesal, as&iacute; las cosas LA PROVEEDORA no asume ninguna vinculaci&oacute;n contractual con Abogados de confianza designados por EL ADHERENTE, ni asumir&aacute; ning&uacute;n costo que genere esa asistencia jur&iacute;dica cuando el poder le sea revocado al profesional designado por LA PROVEEDORA por parte del ADHERENTE. <strong>PAR&Aacute;GRAFO TERCER</strong>O: Todos los gastos documentales, notariales, de registro y dem&aacute;s emolumentos que surjan del proceso o de cualquiera de las actuaciones procesales ser&aacute;n &uacute;nica y exclusivamente de responsabilidad del ADHERENTE. De igual forma todo pago de multas, indemnizaciones, condena en costas y dem&aacute;s responsabilidades en dinero que se decreten procesalmente, corresponden &uacute;nica y exclusivamente al ADHERENTE.&nbsp;<strong>PAR&Aacute;GRAFO CUARTO:</strong> La asesor&iacute;a y asistencia jur&iacute;dica del familiar mayor de edad designado y relacionado por el adherente en el contrato solo puede ser reasignada anualmente, siempre y cuando el beneficiario no tenga asistencia juridica en curso.</li>
        <li><strong>AUXILIO SOCIAL POR SUSPENSION O P&Eacute;RDIDA LABORAL.</strong> INCLUYE: <strong>SUSPENSION LABORAL</strong>. Cuando se determine la p&eacute;rdida temporal del empleo del ADHERENTE, a causa de una sanci&oacute;n disciplinaria debidamente ejecutoriada superior a 30 d&iacute;as, se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia seg&uacute;n la tabla de beneficios prevista en el contrato. <strong>P&Eacute;RDIDA LABORAL</strong> Si se determina la p&eacute;rdida absoluta del empleo, por razones diferentes a su voluntad y que no goce de asignaci&oacute;n de retiro o pensi&oacute;n, se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia por &uacute;nica vez, seg&uacute;n la tabla de beneficios prevista en el contrato. La solicitud se deba hacer a un plazo m&aacute;ximo de hasta treinta d&iacute;as desde la notificaci&oacute;n del fallo</li>
        <li><strong>SUSPENSION Y TERMINACI&Oacute;N DEL CONTRATO</strong>. El contrato terminar&aacute; en forma individual respecto de cualquiera de los relacionados en el presente contrato, al presentarse alguna de las siguientes causas:
        <ol>
          <li>Mora en el pago: sera suspendido el contrato si al dia quince del mes no se ha consignado la cuota o hecho efectivo el descuento por nomina; se reactivara inmediatamente se restablezca el pago de las cuotas, de igual forma la antigüedad del contrato; entendiendose que durante la suspension no se prestara los servicios estableidos en el contrato ni se sumara antigüedad del mismo.</li>
          <li>Cuando el adherente solicite la terminaci&oacute;n de acuerdo a las cl&aacute;usulas del contrato.</li>
          <li>Cuanto el adherente fallezca.</li>
          <li>Terminaci&oacute;n del contrato por decison interna de la empresa.</li>
          <li>Cuando se revoque el contrato por cualquier circunstancia.</li>
        </ol>
        </li>
        <li><strong>NORMAS APLICABLES.</strong>
       
        <p>A los aspectos no regulados en este contrato le ser&aacute;n aplicables las disposiciones previstas en el C&oacute;digo de Comercio y en especial la Ley 1480 de 2011 y los par&aacute;metros establecidos en la presente ley, se le pone de presente y se le explica la informaci&oacute;n aqu&iacute; contenida al adherente, en especial el siguiente art&iacute;culo:<strong>ART&Iacute;CULO 37. CONDICIONES NEGOCIALES GENERALES Y DE LOS CONTRATOS DE ADHESI&Oacute;N.</strong> Las Condiciones Neg&oacute;ciales Generales y de los contratos de adhesi&oacute;n deber&aacute;n cumplir como m&iacute;nimo los siguientes requisitos:</p>
         <ol>
          <li>Haber informado suficiente, anticipada y expresamente al adherente sobre la existencia efectos y alcance de las condiciones generales. En los contratos se utilizar&aacute; el idioma castellano.</li>
          <li>Las condiciones generales del contrato deben ser concretas, claras y completas.</li>
          <li>En los contratos escritos, los caracteres deber&aacute;n ser legibles a simple vista y no incluir espacios en blanco, se har&aacute; entrega anticipada del clausulado al tomador, explic&aacute;ndole el contenido de la cobertura, de las exclusiones y de las garant&iacute;as.</li>
        </ol>
        </li>
        <li><strong>COBERTURA TERRITORIAL</strong>
        <ul>
          <li>El presente contrato tiene cobertura dentro del territorio nacional de Colombia.</li>
        </ul>
        </li>
        <li><strong>PROCEDIMIENTO PARA LA ATENCION.</strong>
        <ul>
          <li>Se puede hacer a trav&eacute;s de la APP <strong>${appWebUrl}</strong>, o desde la p&aacute;gina web <strong>${sitioWeb}</strong> o comunicarse con la l&iacute;nea de Atenci&oacute;n al Cliente PBX <strong>${pbx}</strong> dispuesta para el efecto.</li>
        </ul>
        </li>
      </ol>

      <p style="text-align: justify"><strong>II. Tratamiento de datos personales.</strong><br />
        EL ADHERENTE autoriza a SOLUCIONES 5-8. para recolectar, almacenar, conservar, usar, suprimir, actualizar, compartir y circular a terceros sus datos personales de orden demogr&aacute;fico, econ&oacute;mico, biom&eacute;trico, de servicios, comercial y de localizaci&oacute;n; para obtenci&oacute;n y suministro de informaci&oacute;n relativa al cumplimiento de sus obligaciones y el c&aacute;lculo de riesgo econ&oacute;mico o crediticio (de manera irrevocable), la prevenci&oacute;n y control de fraudes, y para beneficio propio o de terceros con los que SOLUCIONES 5-8, haya celebrado convenio, como centrales de riegos financieros. La informaci&oacute;n para el c&aacute;lculo de riesgo crediticio podr&aacute; ser consultada en cualquier operador de banco de datos, por las entidades financieras con las cuales SOLUCIONES 5-8 celebre convenios comerciales en favor de los titulares. El titular de los datos tiene derecho de conocer, actualizar, rectificar, suprimir los datos, y revocar la autorizaci&oacute;n salvo las excepciones legales. Los datos biom&eacute;tricos son datos sensibles y el adherente no est&aacute; obligado a autorizar su tratamiento. Estos ser&aacute;n usados para verificaci&oacute;n de identidad y suscripci&oacute;n de contratos. El adherente tambi&eacute;n puede presentar cualquier queja, petici&oacute;n o recurso a trav&eacute;s de los medios de comunicaci&oacute;n referidos en el contrato, los cuales se responder&aacute; dentro de los t&eacute;rminos legales estipulados.
      </p>

      <p><strong>III. Generalidades y datos del adherente.</strong><br />
      <strong>GENERALIDADES</strong></p>

      <ol type="a" style="text-align: justify">
        <li>La asistencia jur&iacute;dica, el auxilio exequial y el auxilio social de desempleo y Auxilio de Maternidad, corresponden exclusivamente a los enunciados en el presente contrato, a los cuales el ADHERENTE no podr&aacute; acceder cuando haya imposibilidad de realizar el respectivo descuento o cuando este no se encuentre al d&iacute;a con el pago de las obligaciones.</li>
        <li>EL ADHERENTE  al firmar el presente contrato se acoge a los beneficios significativos otorgados de acuerdo a lo estipulado en la tabla de auxilios de protección a la familia.</li>
      </ol>

      <p><strong>DATOS PERSONALES</strong> ${adheriente_}</p>

      <p>&nbsp;</p>

      <p><strong>OBLIGACIONES ADHERENTE</strong></p>

      <ol>
        <li>Cumplir con el pago total del contrato pagadero en veinticuatro cuotas mensuales de $29.000.oo veintinueve mil pesos Mc/te.</li>
        <li>Facilitar y participar en los tr&aacute;mites que demanden el desarrollo de los diferentes procesos y actividades para cumplir con lo pactado en este contrato.</li>
        <li>Para dar por terminado el contrato se debe allegar la solicitud, con un mes de anticipaci&oacute;n a la fecha de vencimiento del periodo contractual.</li>
        <li>Bajo estas condiciones; el ADHERENTE Autoriza ampliamente para que sea descontada de su sueldo, la suma de $29.000.oo veintinueve mil pesos Mc/te, de manera mensual e ininterrumpida, y sea consignada a favor de SOLUCIONES INTEGRALES CINCO OCHO S.A.S., por concepto de pago del presente contrato. Suma esta correspondientes correspondientes al 50% del auxilio exequial, y al 50% de auxilio social por suspensi&oacute;n o perdida laboral. Estos valores se podr&aacute;n incrementar anualmente con base en el &iacute;ndice porcental del aumento del salario minimo legal</li>
      </ol>

      <p style="text-align: justify">En consecuencia se firma a los ${data.day} d&iacute;as, del mes de ${data.month} del ${data.year} , en dos (2) ejemplares del mismo contenido y valor probatorio, uno (1) para cada parte, despu&eacute;s de haber le&iacute;do, entendido y aceptado las generalidades del presente contrato de acuerdo a los t&eacute;rminos y condiciones establecidos en &eacute;l.</p>

      <p>NUMERO DE CONTRATO<strong> 58-${nroContrato}</strong></p>

      <p>&nbsp;</p>

      <p>&nbsp;</p>
    `

		return contratobody
	}

	contratoBodyPlanAuxilioExequial(data, adheriente_, nroContrato) {
		const contratobody = `
      <h2 style="text-align: center">CONTRATO DE ADHESI&Oacute;N DE PORTAFOLIO DE PRODUCTOS DE SOLUCIONES INTEGRALES CINCO OCHO</h2>

      <p>Entre <strong>SOLUCIONES INTEGRALES CINCO OCHO S.A.S.</strong>, en adelante <strong>SOLUCIONES 5-8</strong>, con domicilio principal en la ciudad de Bogot&aacute; D.C., representada en este acto por su apoderado, identificado como aparece al pie de su firma, de una parte, y de otra parte de la persona se&ntilde;alada al final de este documento, identificada como aparece al pie de su firma (manuscrita, digital o electronica a travez de la accion  de aceptar los terminos y condiciones), en adelante EL ADHERENTE, hemos convenido celebrar el presente contrato de adhesi&oacute;n (en adelante el contrato), el cual se regir&aacute; por las siguientes clausulas:</p>

      <p><strong>I. Clausulas generales del contrato PLAN EXEQUIAL.</strong></p>

      <p><strong>PRIMERA &ndash; OBJETO: </strong>SOLUCIONES 5-8 prestar&aacute; sus servicios a EL ADHERENTE a trav&eacute;s de los siguientes productos:</p>

      <ol>
        <li><strong>AUXILIO EXEQUIAL:</strong> Que incluye un auxilio &uacute;nico en dinero de hasta dos salarios m&iacute;nimos legales mensuales vigentes (2 SMLV) y cobija &uacute;nicamente a las personas que se encuentren previamente inscritas en el presente contrato como grupo familiar, a saber: cobija al adherente titular del contrato, a su c&oacute;nyuge o compa&ntilde;era (o) permanente, hijos, padres y hermanos (todos deben ser menores de70 a&ntilde;os al momento de la suscripci&oacute;n del contrato).</li>
        <li><strong>AUXILIO SOCIAL POR SUSPENSION O PERDIDA LABORAL Y AUXILIO POR MATERNIDAD</strong>: En caso de Suspensi&oacute;n Labora exclusivo del ADHERENTE, a causa de una sanci&oacute;n disciplinaria debidamente ejecutoriada (por hechos sucedidos despu&eacute;s de la fecha de suscripci&oacute;n del contrato), superior a 30 d&iacute;as, se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia durante el tiempo de la misma y sin que se excedan 5 meses y en caso de <strong>p&eacute;rdida Laboral </strong>(por hechos sucedidos despu&eacute;s de la fecha de suscripci&oacute;n del contrato), se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia durante 5 meses, de acuerdo a la siguiente <strong>tabla de auxilios porcentual en S.M.L.M.V</strong> saber: De 6 meses a 1 a&ntilde;o de vigencia del contrato, un 10%, entre: 1 y 2 a&ntilde;os un 20%, 2 y 3 a&ntilde;os un 30%, 3 y 4 a&ntilde;os, un40%, m&aacute;s de 5 a&ntilde;os, un 50%. El apoyo de <strong>AUXILIO POR MATERNIDAD</strong>, es una ayuda econ&oacute;mica solidaria, otorgada en el momento del nacimiento de los hijos del ADHERENTE (nacidos despu&eacute;s de la fecha de suscripci&oacute;n del contrato), consistente en un auxilio econ&oacute;mico por &uacute;nica vez, de car&aacute;cter no devolutivo y de acuerdo a la tabla de auxilios porcentual en S.M.L.M.V anterior; y despu&eacute;s de los seis meses de vigencia del contrato.</li>
      </ol>

      <p><strong>SEGUNDA &ndash; TERMINOS Y CONDICIONES.</strong> A trav&eacute;s de SOLUCIONES INTEGRALES CINCO OCHO S.A.S., quien en adelante se denominar&aacute; LA PROVEEDORA, se compromete con el ADHERENTE a cumplir con lo pactado en el contratado, sin exceder el l&iacute;mite del mismo, a quien se encuentre al d&iacute;a con los pagos y siempre que el objeto de cobertura ocurra durante la vigencia del contrato, y que cumpla con los requisitos</p>

      <ol>
        <li><strong>AUXILIO SOCIAL POR SUSPENSION O P&Eacute;RDIDA LABORAL</strong>. INCLUYE: SUSPENSION LABORAL. Cuando se determine la p&eacute;rdida temporal del empleo del ADHERENTE, a causa de una sanci&oacute;n disciplinaria debidamente ejecutoriada superior a 30 d&iacute;as, se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia seg&uacute;n la tabla de beneficios prevista en el contrato. P&Eacute;RDIDA LABORAL Si se determina la p&eacute;rdida absoluta del empleo, por razones diferentes a su voluntad y que no goce de asignaci&oacute;n de retiro o pensi&oacute;n, se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia por &uacute;nica vez, seg&uacute;n la tabla de beneficios prevista en el contrato. La solicitud se deba hacer a un plazo m&aacute;ximo de hasta treinta d&iacute;as desde la notificaci&oacute;n del fallo.</li>
        <li><strong>AUXILIO EXEQUIAL</strong> En caso de fallecimiento del beneficiario o beneficiarios, y teniendo en cuenta los periodos de carencia definidos en la cl&aacute;usula d) del presente contrato, LA PROVEEDORA asumir&aacute; el pago de un auxilio &uacute;nico en dinero, de hasta dos salarios m&iacute;nimos legales mensuales vigentes (2 SMLMV), a quien acredite la titularidad del contrato y cobija &uacute;nicamente a las personas que se encuentren previamente inscritas en el presente contrato. Se reconocer&aacute; el auxilio econ&oacute;mico inmediatamente se acredita la titularidad y se anexen los documentos legales del fallecimiento y la certificaci&oacute;n bancaria de la cuenta del titular del contrato o el beneficiario de este. Auxilio Solicitado exclusivamente por el firmante del contrato y a un plazo m&aacute;ximo de hasta treinta d&iacute;as desde el fallecimiento del beneficiario. En caso que el fallecido sea el adherente podr&aacute; solicitarlo el c&oacute;nyuge o los padres (si es soltero). Se deber&aacute; presentar fotocopia del documento de identidad del fallecido, certificado de defunci&oacute;n, y los documentos que LA PROVEEDORA requiera para el estudio de la solicitud. Lo anterior, sin perjuicio de la libertad probatoria de los beneficiarios para acreditar la ocurrencia del siniestro. Los documentos se&ntilde;alados no constituyen el &uacute;nico medio probatorio para acreditar la ocurrencia del siniestro.</li>
        <li><strong>PER&Iacute;ODOS DE CARENCIA</strong> Los servicios derivados del presente contrato ser&aacute;n efectivos:
        <ol>
          <li>A partir de las 24 horas siguientes al inicio de la vigencia del contrato correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota; para el caso de muerte accidental, definida en la cl&aacute;usula e).</li>
          <li>A partir del d&iacute;a cuarenta y seis (46), contados desde la fecha de inicio de la vigencia del contrato correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota; cuando el fallecimiento sobreviniere por cualquier causa, salvo situaciones extremas de epidemias, pandemias, cat&aacute;strofes naturales, c&aacute;ncer, SIDA y las enfermedades graves definidas en la cl&aacute;usula e).</li>
          <li>A partir del d&iacute;a ciento ochenta y uno (181), contados desde la fecha de inicio de vigencia del contrato correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota; cuando el fallecimiento ocurra por cualquier causa, salvo situaciones extremas de epidemias, pandemias, cat&aacute;strofes naturales, c&aacute;ncer y SIDA.</li>
          <li>A partir del d&iacute;a trescientos sesenta y seis (366), contados desde la fecha de inicio de vigencia del contrato correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota; cuando el fallecimiento ocurra por cualquier causa.</li>
        </ol>
        </li>
        <li><strong>DEFINICIONES</strong>
        <ol>
          <li><strong>ENFERMEDADES GRAVES:</strong> Se definen como enfermedades graves las siguientes:
          <ol>
            <li><strong>ACCIDENTE CEREBRO VASCULAR: </strong>Es la p&eacute;rdida s&uacute;bita de la funci&oacute;n cerebral, resultante de la interrupci&oacute;n del aporte sangu&iacute;neo a una parte del cerebro, que cause lesiones irreversibles tales como la p&eacute;rdida permanente del conocimiento, pensamiento, lenguaje o sensaci&oacute;n. Puede ser causado por trombosis, embolia, estenosis de una arteria del cerebro o hemorragia cerebral.</li>
            <li><strong>INSUFICIENCIA RENAL: </strong>Es el da&ntilde;o bilateral e irreversible de la funci&oacute;n de los ri&ntilde;ones, que haga necesaria la realizaci&oacute;n en forma regular de di&aacute;lisis renal o trasplante de ri&ntilde;&oacute;n.</li>
            <li><strong>INFARTO DEL MIOCARDIO:</strong> Es la muerte del m&uacute;sculo card&iacute;aco, ocasionada por una irrigaci&oacute;n sangu&iacute;nea deficiente.</li>
            <li><strong>CIRUG&Iacute;A ARTERIO-CORONARIA:</strong> Es la intervenci&oacute;n quir&uacute;rgica a coraz&oacute;n abierto, que se realiza para corregir la estenosis u oclusi&oacute;n de las arterias coronarias, que no responden a tratamiento m&eacute;dico y en consecuencia es necesaria la realizaci&oacute;n de un bypass o puente coronario.</li>
            <li><strong>ESCLEROSIS M&Uacute;LTIPLE:</strong> Es una enfermedad que afecta el sistema nervioso central y se manifiesta por anomal&iacute;as neurol&oacute;gicas progresivas e irreversibles que conllevan a un estado de incapacidad severa, con disminuci&oacute;n de la visi&oacute;n, incoordinaci&oacute;n, debilidad e incontinencia urinaria.</li>
          </ol>
          </li>
          <li><strong>MUERTE ACCIDENTAL:</strong> Es el fallecimiento de una persona por un hecho imprevisto, violento, s&uacute;bito, de origen externo, que no haya sido provocado intencionalmente por el beneficiario; o a consecuencia de una lesi&oacute;n corporal causada por dicho accidente.</li>
        </ol>
        </li>
        <li><strong>GRUPOS FAMILIAR BENEFICIARIO.</strong> Para efectos del presente contrato, el grupos familiar beneficiario del auxilio exequial es el relacionado en el mismo. Y siempre que el titular del contrato lo solicite, los que relacione con posterioridad a trav&eacute;s de cualquiera de los medios de informaci&oacute;n que para tal fin ponga a disposici&oacute;n y cumpla con lo establecido contractualmente.<br />
        <strong>PERMANENCIA</strong>
        <ol>
          <li>Los beneficiarios principales (titular, c&oacute;nyuge, padres) tendr&aacute;n permanencia indefinida.</li>
          <li>Los hijos del casado o en uni&oacute;n marital de hecho y los hermanos al cumplir 30 a&ntilde;os m&aacute;s 364 d&iacute;as, pasar&aacute;n a considerarse como adicionales y se aumentara el valor correspondiente del contrato en un 10% por cada uno; siempre y cuando el ADHERENTE no manifiesta su no continuidad.. Si al momento de la suscripcion del contrato los hijos o hermanos del ADHERENTE superan esta edad, podran ser incluidos por valo adicional del 10% del contrato, por cada uno.</li>
        </ol>
        </li>
        <li><strong>SUSTITUCI&Oacute;N DE BENEFICIARIOS DURANTE LA VIGENCIA.</strong> Bajo ninguna circunstancia los beneficiarios podr&aacute;n ceder a terceros los derechos previstos en el presente contrato, en caso de muerte de uno de ellos, durante su vigencia, no implica derecho a sustituci&oacute;n de &eacute;ste, ni cambio en el valor pactado.</li>
        <li><strong>SUSPENSION Y</strong>&nbsp;<strong>TERMINACI&Oacute;N DEL CONTRATO.</strong><br />
        El contrato terminar&aacute; en forma individual respecto de cualquiera de los integrantes del grupo beneficiario, al presentarse alguna de las siguientes causas:
        <ol>
          <li>La mora en el pago: sera suspendido el contrato si al dia quince del mes no se ha consignado la cuota o hecho efectivo el descuento por nomina; se reactivara inmediatamente se restablezca el pago de las cuotas, de igual forma la antigüedad del contrato; entendiendose que durante la suspension no se prestara los servicios estableidos en el contrato ni se sumara antigüedad del mismo.</li>
          <li>Cuando el adherente solicite la terminaci&oacute;n de acuerdo a las cl&aacute;usulas del contrato.</li>
          <li>Cuanto el adherente adherente fallezca.</li>
          <li>Terminaci&oacute;n del contrato por decison interna de la empresa.</li>
          <li>Cuando se revoque el contrato por cualquier circunstancia.</li>
        </ol>
        </li>
        <li><strong>NORMAS APLICABLES.</strong><br />
        A los aspectos no regulados en este contrato le ser&aacute;n aplicables las disposiciones previstas en el C&oacute;digo de Comercio y en especial la Ley 1480 de 2011 y los par&aacute;metros establecidos en la presente ley, se le pone de presente y se le explica la informaci&oacute;n aqu&iacute; contenida al adherente, en especial el siguiente art&iacute;culo:<strong>ART&Iacute;CULO 37. CONDICIONES NEGOCIALES GENERALES Y DE LOS CONTRATOS DE ADHESI&Oacute;N.</strong> Las Condiciones Neg&oacute;ciales Generales y de los contratos de adhesi&oacute;n deber&aacute;n cumplir como m&iacute;nimo los siguientes requisitos:
        <ol>
          <li>Haber informado suficiente, anticipada y expresamente al adherente sobre la existencia efectos y alcance de las condiciones generales. En los contratos se utilizar&aacute; el idioma castellano.</li>
          <li>Las condiciones generales del contrato deben ser concretas, claras y completas.</li>
          <li>En los contratos escritos, los caracteres deber&aacute;n ser legibles a simple vista y no incluir espacios en blanco, se har&aacute; entrega anticipada del clausulado al tomador, explic&aacute;ndole el contenido de la cobertura, de las exclusiones y de las garant&iacute;as.</li>
        </ol>
        </li>
        <li><strong>COBERTURA TERRITORIAL</strong>
        <ul>
          <li>El presente contrato tiene cobertura dentro del territorio nacional de Colombia.</li>
        </ul>
        </li>
        <li><strong>PROCEDIMIENTO PARA LA ATENCION.</strong>
        <ul>
          <li>Se puede hacer a trav&eacute;s de la APP <strong>${appWebUrl}</strong>, o desde la p&aacute;gina web <strong>www.soluciones5-8.com</strong> o comunicarse con la l&iacute;nea de Atenci&oacute;n al Cliente PBX <strong>${pbx}</strong> dispuesta para el efecto.</li>
        </ul>
        </li>
      </ol>

      <p><strong>II. Tratamiento de datos personales.</strong><br />
      EL ADHERENTE autoriza a SOLUCIONES 5-8. para recolectar, almacenar, conservar, usar, suprimir, actualizar, compartir y circular a terceros sus datos personales de orden demogr&aacute;fico, econ&oacute;mico, biom&eacute;trico, de servicios, comercial y de localizaci&oacute;n; para obtenci&oacute;n y suministro de informaci&oacute;n relativa al cumplimiento de sus obligaciones y el c&aacute;lculo de riesgo econ&oacute;mico o crediticio (de manera irrevocable), la prevenci&oacute;n y control de fraudes, y para beneficio propio o de terceros con los que SOLUCIONES 5-8, haya celebrado convenio, como centrales de riegos financieros. La informaci&oacute;n para el c&aacute;lculo de riesgo crediticio podr&aacute; ser consultada en cualquier operador de banco de datos, por las entidades financieras con las cuales SOLUCIONES 5-8 celebre convenios comerciales en favor de los titulares. El titular de los datos tiene derecho de conocer, actualizar, rectificar, suprimir los datos, y revocar la autorizaci&oacute;n salvo las excepciones legales. Los datos biom&eacute;tricos son datos sensibles y el adherente no est&aacute; obligado a autorizar su tratamiento. Estos ser&aacute;n usados para verificaci&oacute;n de identidad y suscripci&oacute;n de contratos. El adherente tambi&eacute;n puede presentar cualquier queja, petici&oacute;n o recurso a trav&eacute;s de los medios de comunicaci&oacute;n referidos en el contrato, los cuales se responder&aacute; dentro de los t&eacute;rminos legales estipulados.</p>

      <p><strong>III. Generalidades y datos del adherente.</strong><br />
      <strong>GENERALIDADES</strong></p>

      <ol>
        <li>El auxilio exequial, el auxilio social por suspensión o perdida laboral y auxilio por maternidad, corresponden exclusivamente a los enunciados en el presente contrato, a los cuales el ADHERENTE no podrá acceder cuando haya imposibilidad de realizar el respectivo descuento o cuando este no se encuentre al día con el pago de las obligaciones.</li>
        <li>EL ADHERENTE  al firmar el presente contrato se acoge a los beneficios significativos otorgados de acuerdo a lo estipulado en la tabla de auxilios de protección a la familia.</li>
      </ol>

      <p><strong>DATOS PERSONALES</strong> ${adheriente_}</p>

      <p>&nbsp;</p>

      <p><strong>OBLIGACIONES ADHERENTE</strong></p>

      <ol>
        <li>Cumplir con el pago total del contrato pagadero en veinticuatro cuotas mensuales de $29.000.oo veintinueve mil pesos Mc/te.</li>
        <li>Facilitar y participar en los tr&aacute;mites que demanden el desarrollo de los diferentes procesos y actividades para cumplir con lo pactado en este contrato.</li>
        <li>Para dar por terminado el contrato se debe allegar la solicitud, con un mes de anticipaci&oacute;n a la fecha de vencimiento del periodo contractual.</li>
        <li>Bajo estas condiciones; el ADHERENTE Autoriza ampliamente para que sea descontada de su sueldo, la suma de $29.000.oo veintinueve mil pesos Mc/te, de manera mensual e ininterrumpida, y sea consignada a favor de SOLUCIONES INTEGRALES CINCO OCHO S.A.S., por concepto de pago del presente contrato. Suma esta correspondientes correspondientes al 50% del auxilio exequial, y al 50% de auxilio social por suspensi&oacute;n o perdida laboral. Estos valores se podr&aacute;n incrementar anualmente con base en el &iacute;ndice porcental del aumento del salario minimo legal</li>
      </ol>

      <p style="text-align: justify">En consecuencia se firma a los ${data.day} d&iacute;as, del mes de ${data.month} del ${data.year} , en dos (2) ejemplares del mismo contenido y valor probatorio, uno (1) para cada parte, despu&eacute;s de haber le&iacute;do, entendido y aceptado las generalidades del presente contrato de acuerdo a los t&eacute;rminos y condiciones establecidos en &eacute;l.</p>

      <p>NUMERO DE CONTRATO<strong> 58-${nroContrato}</strong></p>

      <p>&nbsp;</p>

      <p>&nbsp;</p>

    `

		return contratobody
	}

	contratoBodyPlanIntegralAlumnos(data, adheriente_, nroContrato) {
		const contratobody = `
      <h2 style="text-align: center">CONTRATO DE ADHESI&Oacute;N DE PORTAFOLIO DE PRODUCTOS DE SOLUCIONES INTEGRALES CINCO OCHO</h2>

      <p>Entre <strong>SOLUCIONES INTEGRALES CINCO OCHO S.A.S.</strong>, en adelante <strong>SOLUCIONES 5-8</strong>, con domicilio principal en la ciudad de Bogot&aacute; D.C., representada en este acto por su apoderado, identificado como aparece al pie de su firma, de una parte, y de otra parte de la persona se&ntilde;alada al final de este documento, identificada como aparece al pie de su firma (manuscrita, digital o electronica a travez de la accion  de aceptar los terminos y condiciones), en adelante EL ADHERENTE, hemos convenido celebrar el presente contrato de adhesi&oacute;n (en adelante el contrato), el cual se regir&aacute; por las siguientes clausulas:</p>

      <p><strong>I. Clausulas generales del contrato PARA ALUMNOS.</strong></p>

      <p><strong>PRIMERA &ndash; OBJETO: </strong>SOLUCIONES 5-8 prestar&aacute; sus servicios a EL ADHERENTE a trav&eacute;s de los siguientes productos:</p>

      <ol type="a" style="text-align: justify">
        <li><strong>SERVICIO JUR&Iacute;DICO</strong>: Prestar asesor&iacute;as ya sean en forma virtual o telef&oacute;nicamente y cuando la situaci&oacute;n lo amerite personalizadas, lo mismo que la asistencia jur&iacute;dica en las siguiente &aacute;reas del derecho: en materia disciplinaria, penal y penal militar, responsabilidad Administrativa y fiscal al interior de la Instituci&oacute;n. Y asesor&iacute;a en derechos de petici&oacute;n y/o acciones de tutela que no involucren a la Instituci&oacute;n. <strong>NOTA ACLARATORIA</strong> La asesor&iacute;a y asistencia jur&iacute;dica cobija &uacute;nicamente al titular del contrato <strong>PAR&Aacute;GRAFO PRIMERO</strong>: Acorde a la cl&aacute;usula SEGUNDA de los termino y condiciones, la asistencia y representaci&oacute;n jur&iacute;dica se brindar&aacute; siempre que la comisi&oacute;n del hecho est&eacute; acorde a la firma del presente documento, t&eacute;ngase en cuenta que este contrato tiene efectos del presente hacia el futuro.</li>
        <li><strong>AUXILIO EXEQUIAL:</strong> Que incluye un auxilio único  en dinero de un salario mínimo legales mensuales vigentes  (1 SMLMV) y cobija únicamente a EL ADHERENTE.</li>
        <li><strong>AUXILIO SOCIAL POR TERMINACION DEL PROCESO DE FORMACION</strong>: En caso que del proceso de formaci&oacute;n le sea terminado y no sea por voluntad del ADHERENTE se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia de acuerdo a la siguiente <strong>tabla de auxilios porcentual en S.M.L.M.V</strong> saber: De 6 meses a 1 a&ntilde;o de vigencia del contrato, un 10%, entre: 1 y 2 a&ntilde;os un 20%, 2 y 3 a&ntilde;os un 30%.</li>
      </ol>

      <p><strong>SEGUNDA &ndash; TERMINOS Y CONDICIONES.</strong> A trav&eacute;s de SOLUCIONES INTEGRALES CINCO OCHO S.A.S., quien en adelante se denominar&aacute; LA PROVEEDORA, se compromete con el ADHERENTE a cumplir con lo pactado en el contratado, sin exceder el l&iacute;mite del mismo, a quien se encuentre al d&iacute;a con los pagos y siempre que el objeto de cobertura ocurra durante la vigencia del contrato, y que cumpla con los requisitos</p>

      <ol type="a" style="text-align: justify">
        <li><strong>ASISTENCIA JURIDICA</strong>: LA ASISTENCIA JURIDICA INCLUYE: <strong>CONSULTOR&Iacute;A</strong>, ilimitada ya sea telef&oacute;nicamente o en forma virtual y cuando la situaci&oacute;n lo amerite personalizadas; en materia disciplinaria, penal y penal militar. <strong>PAR&Aacute;GRAFO</strong>: LA PROVEEDORA se abstendr&aacute; de designar un abogado que asista personalmente al adherente si a su juicio, considera que su asesor&iacute;a jur&iacute;dica no requiere de acompa&ntilde;amiento personalizado. <strong>ASISTENCIA JUR&Iacute;DICA</strong> por vinculaci&oacute;n en investigaci&oacute;n disciplinaria, penal, penal militar, con cobertura nacional y m&aacute;ximo tres procesos por a&ntilde;o, siempre y cuando los hechos ocurran durante la vigencia del presente contrato. No se asumen las preexistencias (enti&eacute;ndase por preexistencias la existencia real de una situaci&oacute;n legal y/o procesal antes de la vigencia del v&iacute;nculo contractual). <strong>RESTRICCIONE</strong>S: LA PROVEEDORA., se abstendr&aacute; de representar a los afiliados cuando curse en su contra investigaci&oacute;n en materia penal y/o penal militar que involucre uno o varios de los siguientes delitos: Terrorismo, concierto para delinquir, extorsi&oacute;n, secuestro, tortura, narcotr&aacute;fico y conexos, desaparici&oacute;n forzada y delitos sexuales; cuando haya flagrancia tras cometer alguna de estas conductas. <strong>PAR&Aacute;GRAFO PRIMERO</strong>: Esta asistencia y/o representaci&oacute;n jur&iacute;dica pierde vigencia de continuidad por terminaci&oacute;n del contrato, de acuerdo a la cl&aacute;usula g) del presente documento, en ese orden, al existir procesos en curso al momento de la terminaci&oacute;n y en caso de no renovaci&oacute;n del contrato EL ADHERENTE deber&aacute; otorgar poder a un abogado de confianza. Por tal raz&oacute;n el profesional del derecho designado por LA PROVEEDORA presentar&aacute; la renuncia irrevocable y definitiva ante la respectiva autoridad judicial. <strong>PAR&Aacute;GRAFO SEGUNDO</strong>: el Abogado que designe LA PROVEEDORA, es para que asista y represente al adherente durante todo el proceso; en el momento en que el adherente revoque el poder, d&aacute;ndole poder a un Abogado de confianza, cesar&aacute; toda responsabilidad por parte de LA PROVEEDORA frente a esta actuaci&oacute;n procesal, as&iacute; las cosas LA PROVEEDORA no asume ninguna vinculaci&oacute;n contractual con Abogados de confianza designados por EL ADHERENTE, ni asumir&aacute; ning&uacute;n costo que genere esa asistencia jur&iacute;dica cuando el poder le sea revocado al profesional designado por LA PROVEEDORA por parte del ADHERENTE. <strong>PAR&Aacute;GRAFO TERCER</strong>O: Todos los gastos documentales, notariales, de registro y dem&aacute;s emolumentos que surjan del proceso o de cualquiera de las actuaciones procesales ser&aacute;n &uacute;nica y exclusivamente de responsabilidad del ADHERENTE. De igual forma todo pago de multas, indemnizaciones, condena en costas y dem&aacute;s responsabilidades en dinero que se decreten procesalmente, corresponden &uacute;nica y exclusivamente al ADHERENTE.</li>
        <li><strong>AUXILIO SOCIAL POR TERMINACION DEL PROCESO DE FORMACION</strong>, INCLUYE: Si se determina la terminaci&oacute;n del proceso de formaci&oacute;n, por razones diferentes a su voluntad, se otorgar&aacute; el auxilio econ&oacute;mico de protecci&oacute;n a la familia por &uacute;nica vez, seg&uacute;n la tabla de beneficios prevista en el contrato. La solicitud se deba hacer a un plazo m&aacute;ximo de hasta treinta d&iacute;as desde la notificaci&oacute;n del fallo.</li>
        <li><strong>AUXILIO EXEQUIA</strong>L En caso de fallecimiento del ADHERENTE y teniendo en cuenta los periodos de carencia definidos en la cl&aacute;usula d) del presente contrato, LA PROVEEDORA asumir&aacute; el pago de un auxilio &uacute;nico en dinero de un salario m&iacute;nimo legale mensuale vigente (1 SMLMV), a quien acredite la titularidad del contrato y cobija &uacute;nicamente al ADHERENTE. Auxilio Solicitado exclusivamente a un plazo m&aacute;ximo de hasta treinta d&iacute;as desde el fallecimiento del ADHERENTE. y podr&aacute; solicitarlo el c&oacute;nyuge o los padres (si es soltero). Se deber&aacute; presentar fotocopia del documento de identidad del fallecido, certificado de defunci&oacute;n, y los documentos que LA PROVEEDORA requiera para el estudio de la solicitud. Lo anterior, sin perjuicio de la libertad probatoria de los beneficiarios para acreditar la ocurrencia del siniestro. Los documentos se&ntilde;alados no constituyen el &uacute;nico medio probatorio para acreditar la ocurrencia del siniestro.</li>
        <li><strong>PER&Iacute;ODOS DE CARENCIA</strong> Los servicios derivados del presente contrato ser&aacute;n efectivos:
        <ol>
          <li>A partir de las 24 horas siguientes al inicio de la vigencia del contrato correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota; para el caso de muerte accidental, definida en la cl&aacute;usula e).</li>
          <li>A partir del d&iacute;a cuarenta y seis (46), contados desde la fecha de inicio de la vigencia del contrato correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota; cuando el fallecimiento sobreviniere por cualquier causa, salvo situaciones extremas de epidemias, pandemias, cat&aacute;strofes naturales, c&aacute;ncer, SIDA y las enfermedades graves definidas en la cl&aacute;usula e).</li>
          <li>A partir del d&iacute;a ciento ochenta y uno (181), contados desde la fecha de inicio de vigencia del contrato correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota; cuando el fallecimiento ocurra por cualquier causa, salvo situaciones extremas de epidemias, pandemias, cat&aacute;strofes naturales, c&aacute;ncer y SIDA.</li>
          <li>A partir del d&iacute;a trescientos sesenta y seis (366), contados desde la fecha de inicio de vigencia del contrato correspondiente a que opere efectivamente el token o c&oacute;digo de descuento, o pago de la primera cuota; cuando el fallecimiento ocurra por cualquier causa.</li>
        </ol>
        </li>
        <li><strong>DEFINICIONES</strong>
        <ol>
          <li><strong>ENFERMEDADES GRAVES:</strong> Se definen como enfermedades graves las siguientes:
          <ol>
            <li><strong>ACCIDENTE CEREBRO VASCULAR: </strong>Es la p&eacute;rdida s&uacute;bita de la funci&oacute;n cerebral, resultante de la interrupci&oacute;n del aporte sangu&iacute;neo a una parte del cerebro, que cause lesiones irreversibles tales como la p&eacute;rdida permanente del conocimiento, pensamiento, lenguaje o sensaci&oacute;n. Puede ser causado por trombosis, embolia, estenosis de una arteria del cerebro o hemorragia cerebral.</li>
            <li><strong>INSUFICIENCIA RENAL: </strong>Es el da&ntilde;o bilateral e irreversible de la funci&oacute;n de los ri&ntilde;ones, que haga necesaria la realizaci&oacute;n en forma regular de di&aacute;lisis renal o trasplante de ri&ntilde;&oacute;n.</li>
            <li><strong>INFARTO DEL MIOCARDIO:</strong> Es la muerte del m&uacute;sculo card&iacute;aco, ocasionada por una irrigaci&oacute;n sangu&iacute;nea deficiente.</li>
            <li><strong>CIRUG&Iacute;A ARTERIO-CORONARIA:</strong> Es la intervenci&oacute;n quir&uacute;rgica a coraz&oacute;n abierto, que se realiza para corregir la estenosis u oclusi&oacute;n de las arterias coronarias, que no responden a tratamiento m&eacute;dico y en consecuencia es necesaria la realizaci&oacute;n de un bypass o puente coronario.</li>
            <li><strong>ESCLEROSIS M&Uacute;LTIPLE:</strong> Es una enfermedad que afecta el sistema nervioso central y se manifiesta por anomal&iacute;as neurol&oacute;gicas progresivas e irreversibles que conllevan a un estado de incapacidad severa, con disminuci&oacute;n de la visi&oacute;n, incoordinaci&oacute;n, debilidad e incontinencia urinaria.</li>
          </ol>
          </li>
          <li><strong>MUERTE ACCIDENTAL:</strong> Es el fallecimiento de una persona por un hecho imprevisto, violento, s&uacute;bito, de origen externo, que no haya sido provocado intencionalmente por el beneficiario; o a consecuencia de una lesi&oacute;n corporal causada por dicho accidente.</li>
        </ol>
        </li>
        <li><strong>SUSTITUCI&Oacute;N DE BENEFICIARIOS DURANTE LA VIGENCIA.</strong> Bajo ninguna circunstancia los beneficiarios podr&aacute;n ceder a terceros los derechos previstos en el presente contrato.</li>
        <li><strong>SUSPENSION Y</strong>&nbsp;<strong>TERMINACI&Oacute;N DEL CONTRATO.</strong><br />
        El contrato terminar&aacute; en forma individual respecto de cualquiera de los integrantes del grupo beneficiario, al presentarse alguna de las siguientes causas:
        <ol>
          <li>Mora en el pago: sera suspendido el contrato si al dia quince del mes no se ha consignado la cuota o hecho efectivo el descuento por nomina; se reactivara inmediatamente se restablezca el pago de las cuotas, de igual forma la antigüedad del contrato; entendiendose que durante la suspension no se prestara los servicios estableidos en el contrato ni se sumara antigüedad del mismo.</li>
          <li>Cuando el adherente solicite la terminaci&oacute;n de acuerdo a las cl&aacute;usulas del contrato.</li>
          <li>Cuanto el adherente  fallezca.</li>
          <li>Terminación del contrato por decison interna de la empresa.</li>
          <li>Cuando se revoque el contrato por cualquier circunstancia.</li>
          <li>Para efectos de continuidad contractual al termino del curso de formacion, se mantendra el tiempo de antigüedad del presente contrato en el inicio inmediato del nuevo contrato que adquiera como profesional.</li>
        </ol>
        </li>
        <li><strong>NORMAS APLICABLES.</strong><br />
        A los aspectos no regulados en este contrato le ser&aacute;n aplicables las disposiciones previstas en el C&oacute;digo de Comercio y en especial la Ley 1480 de 2011 y los par&aacute;metros establecidos en la presente ley, se le pone de presente y se le explica la informaci&oacute;n aqu&iacute; contenida al adherente, en especial el siguiente art&iacute;culo:<strong>ART&Iacute;CULO 37. CONDICIONES NEGOCIALES GENERALES Y DE LOS CONTRATOS DE ADHESI&Oacute;N.</strong> Las Condiciones Neg&oacute;ciales Generales y de los contratos de adhesi&oacute;n deber&aacute;n cumplir como m&iacute;nimo los siguientes requisitos:
        <ol>
          <li>Haber informado suficiente, anticipada y expresamente al adherente sobre la existencia efectos y alcance de las condiciones generales. En los contratos se utilizar&aacute; el idioma castellano.</li>
          <li>Las condiciones generales del contrato deben ser concretas, claras y completas.</li>
          <li>En los contratos escritos, los caracteres deber&aacute;n ser legibles a simple vista y no incluir espacios en blanco, se har&aacute; entrega anticipada del clausulado al tomador, explic&aacute;ndole el contenido de la cobertura, de las exclusiones y de las garant&iacute;as.</li>
        </ol>
        </li>
        <li><strong>COBERTURA TERRITORIAL</strong>
        <ul>
          <li>El presente contrato tiene cobertura dentro del territorio nacional de Colombia.</li>
        </ul>
        </li>
        <li><strong>PROCEDIMIENTO PARA LA ATENCION.</strong>
        <ul>
          <li>Se puede hacer a trav&eacute;s de la APP <strong>${appWebUrl}</strong>, o desde la p&aacute;gina web <strong>www.soluciones5-8.com</strong> o comunicarse con la l&iacute;nea de Atenci&oacute;n al Cliente PBX <strong>${pbx}</strong> dispuesta para el efecto.</li>
        </ul>
        </li>
      </ol>

      <p style="text-align: justify"><strong>II. Tratamiento de datos personales.</strong><br />
      EL ADHERENTE autoriza a SOLUCIONES 5-8. para recolectar, almacenar, conservar, usar, suprimir, actualizar, compartir y circular a terceros sus datos personales de orden demogr&aacute;fico, econ&oacute;mico, biom&eacute;trico, de servicios, comercial y de localizaci&oacute;n; para obtenci&oacute;n y suministro de informaci&oacute;n relativa al cumplimiento de sus obligaciones y el c&aacute;lculo de riesgo econ&oacute;mico o crediticio (de manera irrevocable), la prevenci&oacute;n y control de fraudes, y para beneficio propio o de terceros con los que SOLUCIONES 5-8, haya celebrado convenio, como centrales de riegos financieros. La informaci&oacute;n para el c&aacute;lculo de riesgo crediticio podr&aacute; ser consultada en cualquier operador de banco de datos, por las entidades financieras con las cuales SOLUCIONES 5-8 celebre convenios comerciales en favor de los titulares. El titular de los datos tiene derecho de conocer, actualizar, rectificar, suprimir los datos, y revocar la autorizaci&oacute;n salvo las excepciones legales. Los datos biom&eacute;tricos son datos sensibles y el adherente no est&aacute; obligado a autorizar su tratamiento. Estos ser&aacute;n usados para verificaci&oacute;n de identidad y suscripci&oacute;n de contratos. El adherente tambi&eacute;n puede presentar cualquier queja, petici&oacute;n o recurso a trav&eacute;s de los medios de comunicaci&oacute;n referidos en el contrato, los cuales se responder&aacute; dentro de los t&eacute;rminos legales estipulados.</p>

      <p><strong>III. Generalidades y datos del adherente.</strong><br />
      <strong>GENERALIDADES</strong></p>

      <ol type="a" style="text-align: justify">
        <li>1.  La asistencia jurídica, el auxilio exequial y el auxilio social por  terminación del proceso de formacion, corresponden exclusivamente a los enunciados en el presente contrato, a los cuales el ADHERENTE no podrá acceder cuando haya imposibilidad de realizar el respectivo descuento o cuando este no se encuentre al día con el pago de las obligaciones.</li>
        <li>2.  EL ADHERENTE  al firmar el presente contrato se acoge a los beneficios significativos otorgados de acuerdo a lo estipulado en la tabla de auxilios de protección a la familia.</li>
      </ol>

      <p><strong>DATOS PERSONALES</strong> ${adheriente_}</p>

      <p>&nbsp;</p>

      <p><strong>OBLIGACIONES ADHERENTE</strong></p>

      <ol type="a" style="text-align: justify">
        <li>Cumplir con el pago  total del contrato pactado y pagadero  cuotas mensuales de  $16.000.oo dieciseis mil pesos  Mc/te.</li>
        <li>Facilitar y participar en los tr&aacute;mites que demanden el desarrollo de los diferentes procesos y actividades para cumplir con lo pactado en este contrato.</li>
        <li>Para dar por terminado el contrato se debe allegar la solicitud, con un mes de anticipaci&oacute;n a la fecha de vencimiento del periodo contractual.</li>
        <li>Bajo estas condiciones; el ADHERENTE cancelara mensual mente por obligación de pago a través de los medios electrónicos de pago o consignación bancaria que la proveedora ponga en conocimiento para tal fin, la suma de $16.000.oo dieciseis mil pesos  Mc/te, de manera mensual e ininterrumpida,   a favor de SOLUCIONES INTEGRALES CINCO OCHO S.A.S., por concepto de pago  del presente contrato. Suma esta correspondientes al 50% del auxilio exequial, al 25% de asistencia jurídica y al 25% de auxilio  social por  terminación del proceso de formación. Estos  valores se podrán incrementar anualmente con base en el índice porcentual del aumento del salario minimo legal.</li>
      </ol>

      <p style="text-align: justify">En consecuencia se firma a los ${data.day} d&iacute;as, del mes de ${data.month} del ${data.year} , en dos (2) ejemplares del mismo contenido y valor probatorio, uno (1) para cada parte, despu&eacute;s de haber le&iacute;do, entendido y aceptado las generalidades del presente contrato de acuerdo a los t&eacute;rminos y condiciones establecidos en &eacute;l.</p>

      <p>NUMERO DE CONTRATO<strong> 58-${nroContrato}</strong></p>

      <p>&nbsp;</p>

      <p>&nbsp;</p>
    `

		return contratobody
	}
	//#endregion

	contratoFooter(data, imgRteLegal, signUser) {
		let footer = `
      <table align="center" border="0" cellpadding="1" cellspacing="1" style="height: 30px; width: 80%">
          <tbody>
            <tr>
              <td style="text-align: center; vertical-align: middle"><strong>${data.nameEmpresa}</strong></td>
              <td>&nbsp;</td>
              <td style="text-align: center; vertical-align: middle"><strong>EL ADHERENTE</strong></td>
            </tr>
            <tr>
              <td style="text-align: center; vertical-align: middle"></td>
              <td>&nbsp;</td>
              <td style="text-align: center; vertical-align: middle"></td>
            </tr>
            <tr>
              <td style="text-align: center; vertical-align: middle"><strong>${data.nameRrptateLegal}</strong></td>
              <td>&nbsp;</td>
              <td style="text-align: center; vertical-align: middle">${data.usrNames} ${data.usrLastNames}</td>
            </tr>
            <tr>
              <td style="height: 0px; width: 0px">______________________________________</td>
              <td>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
              </td>
              <td>_________________________________________</td>
            </tr>
            <tr>
              <td><strong>NOMBRE DEL REPRESENTANTE LEGAL</strong></td>
              <td>&nbsp;</td>
              <td style="text-align: center; vertical-align: middle"><strong>NOMBRE Y APELLIDOS</strong></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center"><strong>C.C ${data.cedulaRrptateLegal}</strong></td>
              <td></td>
              <td style="text-align: center">${data.usrCedula}</td>
            </tr>
            <tr>
              <td>______________________________________&nbsp;</td>
              <td>&nbsp;</td>
              <td>__________________________________________</td>
            </tr>
            <tr>
              <td style="text-align: center; vertical-align: middle"><strong># C&Eacute;DULA</strong></td>
              <td>&nbsp;</td>
              <td style="text-align: center; vertical-align: middle">#&nbsp; <strong>C&Eacute;DULA</strong></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td colspan="1" rowspan="3" style="text-align: center; vertical-align: bottom">
                <img src="${imgRteLegal}" style="width: 150px; height: 150px" />
              </td>
              <td>&nbsp;</td>
              <td colspan="1" rowspan="3" style="text-align: center; vertical-align: bottom">
               <div>
                    ${signUser}
                    <div>FIRMA ELECTRONICA</div>
                    <div>${new Date()}</div>                 
                  <div> NOMBRE: ${data.usrNames} ${data.usrLastNames}</div>
                  <div>CC: ${data.usrCedula}</div>
                </div> 
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>______________________________________&nbsp;</td>
              <td>&nbsp;</td>
              <td>__________________________________________</td>
            </tr>
            <tr>
              <td style="text-align: center; vertical-align: middle"><strong>FIRMA</strong></td>
              <td>&nbsp;</td>
              <td style="text-align: center"><strong>FIRMA</strong></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>${data.pin}</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>______________________________________________</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td><strong>PIN</strong></td>
            </tr>
          </tbody>
        </table>
    `

		return footer
	}

	adheriente(data) {
		const _adheriente_ = `
      <table align="left" border="1" cellpadding="5" cellspacing="1" style="width: 100%">
        <thead>
          <tr>
            <th scope="col" colspan="3" style="text-align: center">DEL ADHERIENTE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NOMBRE</td>
            <td colspan="2">${data.usrNames} ${data.usrLastNames}</td>
          </tr>
          <tr>
            <td>NO. IDENTIFICACIÓN</td>
            <td colspan="2">${data.usrCedula}</td>
          </tr>
          <tr>
            <td>FECHA NACIMIENTO</td>
            <td colspan="2">${data.fnacimiento.split('T')[0]}</td>
          </tr>
          <tr>
            <td>ESTADO CIVIL</td>
            <td colspan="2">${data.estadoCivilText}</td>
          </tr>
          <tr>
            <td>NRO. PIN</td>
            <td colspan="2">${data.pin}</td>
          </tr>
          <tr>
            <td>Referido o código de asesor comercial</td>
            <td colspan="2">${data.referido}</td>
          </tr>
          <tr>
            <td>NRO. CELULAR</td>
            <td colspan="2">${data.usrNroCelular}</td>
          </tr>
          <tr>
            <td>E-MAIL</td>
            <td colspan="2">${data.usrEmail}</td>
          </tr>
          <tr>
            <td>E-MAIL ALTERNATIVO</td>
            <td colspan="2">${data.usrEmailAlternative}</td>
          </tr>
          <tr>
            <td>DIRECCIÓN</td>
            <td colspan="2">${data.direccion}</td>
          </tr>
          <tr>
            <td>CIUDAD</td>
            <td colspan="2">${data.ciudadText}</td>
          </tr>
          ${this.beneficiarios(data.beneficiario, data.parentescoArray, 'BENEFICIARIOS AUXILIO EXEQUIAL')}
          ${this.beneficiarios(data.beneficiarioJuridico, data.parentescoArray, 'BENEFICIARIOS SERVICIO JURIDICO')}
        </tbody>
      </table>
    `

		return _adheriente_
	}

	beneficiarios(beneficiarios, parentescos, cabecera) {
		let ben = ''
		if (beneficiarios.length !== 0) {
			ben = `
      <tr>
        <td colspan="3" style="text-align: center; vertical-align: middle">
          <strong>${cabecera}</strong>
        </td>
      </tr>
      <tr>
        <td>PARENTESCO</td>
        <td style="text-align: center">NOMBRES Y APELLIDOS</td>
        <td style="text-align: center; vertical-align: middle">EDAD</td>
      </tr>
    `
			const parentescoArray = JSON.parse(parentescos)
			beneficiarios.map(async (beneficiario) => {
				let parentesto = this.findParentescoText(beneficiario.parentesco, parentescoArray)
				ben += `
        
        <tr>
          <td>${parentesto}</td>
          <td>${beneficiario.nombreCompleto}</td>
          <td>${beneficiario.edad}</td>
        </tr>
      `
			})
		}

		return ben
	}

	findParentescoText(id, parentescoArray) {
		let _parentesco

		_parentesco = parentescoArray.find((parentesco) => parseInt(parentesco.id, 10) === parseInt(id, 10))
		return _parentesco.description
	}
	//#endregion

	base64_encode(file) {
		// read binary data
		console.log(file)
		const bitmap = fs.readFileSync(file)
		// convert binary data to base64 encoded string
		return new Buffer.from(bitmap).toString('base64')
	}
}

module.exports.PlantillasContratos = PlantillasContratos
