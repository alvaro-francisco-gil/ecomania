# Encargo de diseño — el ecoavatar

**Para: el diseñador. Documento de encargo.**

Companion de [`creative-core-exploration.md`](creative-core-exploration.md) (las decisiones de
producto), [`decisions/value-axes.md`](../../decisions/value-axes.md) y
[`decisions/avatar-rendering.md`](../../decisions/avatar-rendering.md) (los registros de
decisión), [`projects/value-system.md`](../../projects/value-system.md) (la fundamentación
académica de los ejes) y [`rive-and-animation.md`](../../rive-and-animation.md) (el flujo de
trabajo en Rive).

> **Estado: borrador de encargo.** Todo lo marcado **DECIDIDO** es firme. Lo marcado
> **ABIERTO** es decisión del diseñador o está pendiente. Antes de encargar hay que cerrar
> el número de formas base (§9).

---

## 1. Qué estamos construyendo

Cada usuario de ecomania tiene un **ecoavatar**: una criatura que representa *qué tipo de
ecologista es*, no *cuánto*. Se genera a partir de un cuestionario de onboarding y sigue
evolucionando con el tiempo según responde a cuestionarios sobre temas de actualidad.

No es un catálogo de personajes. Es **un instrumento**: unas pocas piezas dibujadas y unos
mandos que las combinan. El avatar de cada usuario es una combinación en ese instrumento, no
una ilustración guardada.

El usuario elige **una sola cosa**: su **elemento** (fuego, agua, aire, tierra), en una de las
primeras preguntas del cuestionario. Todo lo demás se deriva de sus respuestas. La regla:
*tú eliges tu elemento; tus respuestas eligen todo lo demás.*

Se construye en **Rive** (un `.riv` por forma base) y corre idéntico en la app nativa y en la
web.

---

## 2. El modelo, en una página

La identidad de un usuario son **cuatro números**, uno por eje de valores. Cada uno va de `−1`
a `+1`.

| Eje | Pregunta que responde | − | + |
|---|---|---|---|
| **1 · moral** | ¿Quién merece consideración moral? | Antropocéntrico — la naturaleza importa por lo que da a las personas | Ecocéntrico — la naturaleza vale por sí misma |
| **2 · medios** | ¿Cómo compatibilizamos bienestar y planeta? | Tecnológico — innovar y crecer mejor | Suficiencia — consumir menos, hay límites |
| **3 · agencia** | ¿De dónde viene el cambio? | Individual — decisiones personales | Colectivo — política y organización |
| **4 · autoridad** | ¿Quién debería mandar? | Tecnocrático — expertos e instituciones | Grassroots — comunidades y poder distribuido |

Y **aparte** de los valores, un quinto sistema:

- **El reloj** — cuánto juega y cuánto se implica el usuario (nivel, XP). Crece con el uso.
  **No es un valor.** Es el único que "sube"; los ejes no suben, cambian de lado.

### Cómo se reparte esto en el dibujo

| Sistema | Dónde vive visualmente |
|---|---|
| **Eje 1** | **La forma base** — es qué criatura te toca. No es un mando. |
| **Eje 2** | La **superficie** del cuerpo |
| **Eje 3** | Los **acompañantes** |
| **Eje 4** | La **geometría** del cuerpo |
| Reloj | El **aura** — cuánta hay |
| **Elemento** *(lo elige el usuario)* | El aura — **de qué está hecha** |

Es decir: **dentro de una forma base hay tres mandos de valores + el aura.** El eje 1 no es un
mando porque cambia la topología de la criatura, y eso no se interpola — es otro dibujo.

El **elemento** no añade canal: reviste el aura que ya existe. *El material es tuyo, la
intensidad se gana.* Ver §5b.

---

## 3. Identidad binaria, intensidad graduada · DECIDIDO

**No hay estado neutro ni intermedio.** El sistema funciona con dos reglas:

- **El signo decide QUÉ eres.** Si tu eje 2 es positivo eres *suficiencia*; si es negativo,
  *tecnológico*. Sin medias tintas: no existe "medio metálico medio remendado".
- **La magnitud decide CON CUÁNTA FUERZA se ve.** A `+0.2`, tres parches. A `+0.9`, doce
  parches y costuras por todo el cuerpo.

La clave: **la gradación se consigue repitiendo elementos diseñados, no mezclándolos.** Un
parche es una pieza dibujada; ponerla tres veces o doce no interpola nada. Por eso sigue siendo
cierto que **todo lo que ve un usuario está diseñado** — no hay ni un estado calculado por el
motor.

**La regla es universal: NINGÚN eje tiene estado neutro.** Ni siquiera el eje 1 — por eso el
número de formas base tiene que ser **par** (§9): con un número impar, la de en medio sería un
neutro encubierto.

Aplica a los **ejes 2 y 4** tal cual. El eje 3 queda abierto en el vocabulario (§5), pero sujeto
a la misma regla. El eje 1 la cumple repartiendo formas base a partes iguales entre los dos
lados.

### Qué resuelve esto

- **El bucle de cuestionarios tiene salida visible.** Responder mueve la densidad del marcador
  aunque no cruces ninguna frontera. Sin esto, un usuario podía responder cincuenta
  cuestionarios sin que su avatar cambiara nada.
- **El vaivén en la frontera se vuelve trivial.** Alguien que oscila alrededor del cero pasa de
  *un parche* a *una arista* — no de barro a cromo. El problema desaparece por construcción,
  sin necesidad de zonas muertas en el código.
- **Se conserva lo que buscábamos:** marcador legible al instante, revelación fuerte al terminar
  el onboarding, y nada sin diseñar.

### El diseñador nunca dibuja una combinación

Se dibuja la criatura y, por cada mando, en qué se convierte en cada polo y con qué elemento
repetible se intensifica. Rive compone.

| | Enfoque catálogo | Este encargo |
|---|---|---|
| Piezas a autorar | **8 identidades × 4 densidades = 32 ilustraciones** | **1 criatura + 6 variantes de polo** |
| Resultados posibles | 32 | 32 |
| Si añadiéramos un mando | 64 | 8 |

El catálogo crece multiplicando; esto crece sumando.

### La condición que lo hace posible

Funciona **solo si cada mando toca propiedades distintas del dibujo**:

- La **superficie** cambia de qué color y textura son las formas — no dónde están.
- La **geometría** cambia dónde están las formas — no de qué color son.
- Los **acompañantes** son piezas aparte — no tocan el cuerpo.

Si dos mandos tocaran la misma propiedad se pelearían (en Rive, literalmente: uno pisa al otro
o parpadea). Por eso este reparto no es una preferencia estética — es lo que mantiene el
trabajo en sumas.

---

## 4. Entregable transversal: la hoja de lenguaje de valores

**Se hace UNA vez, antes de dibujar ninguna criatura, y sirve para todas.**

Una página (o unas pocas) que define qué significa **visualmente** cada polo, en abstracto:

- ¿Qué materiales, acabados y paletas son "tecnológico"? ¿Y "suficiencia"?
- ¿Qué lógica de crecimiento y orden es "tecnocrático"? ¿Y "grassroots"?
- ¿Qué paleta de fondo comparte toda la familia?

Sin esta hoja, cada criatura interpretaría los polos a su manera y el conjunto se leería como
tres productos distintos en vez de una familia. **Es el entregable más importante del encargo**,
aunque no sea un dibujo.

---

## 5. Vocabulario por eje

### Eje 1 — antropocéntrico ↔ ecocéntrico → **la forma base** · DECIDIDO

Cada forma base es un `.riv` distinto: criatura distinta, rig distinto. Se distinguen por dos
marcadores combinados:

| | **Reino** | **Rostro** |
|---|---|---|
| **− Antropocéntrico** | construido, geométrico, humanoide | **tiene cara**, ojos frontales |
| **+ Ecocéntrico** | vegetal, fúngico, colonial | **sin rostro** |

El **rostro** es el marcador clave: perder la cara *es* perder el marco humano. Una criatura
sin rostro no invita a proyectarse en ella, y eso es exactamente lo que dice el polo
ecocéntrico.

> **Sin forma base intermedia.** El número de formas base es **par**: la mitad a cada lado del
> eje. Si hay más de una por lado, la magnitud elige cuál dentro de ese lado — misma regla que
> los demás ejes (signo = identidad, magnitud = intensidad). Ver §9.
>
> Este eje no es un mando: es **qué criatura te toca**, y cambia solo mediante una **ceremonia
> de transformación que el usuario acepta o rechaza** — nunca automáticamente.

### Eje 2 — tecnológico ↔ suficiencia → **la superficie** · DECIDIDO

El marcador no es *de qué está hecho* sino **cómo fue hecho**:

| | Identidad (la decide el signo) | Gradación (la decide la magnitud) |
|---|---|---|
| **− Tecnológico** | manufactura perfecta, **sin costuras**, pulida, puede emitir luz propia | de unos pocos paneles/facetas a una superficie enteramente panelizada y recorrida por luz |
| **+ Suficiencia** | tejido a mano, irregular, **con remiendos visibles**; grietas rellenas | de dos o tres parches a costuras y remiendos por todo el cuerpo |

Por qué "cómo fue hecho" y no "de qué material": porque suficiencia significa **reparar en vez
de reemplazar**. Un cuerpo con costuras cosidas a la vista dice eso sin necesidad de explicarlo.
Es argumento, no decoración.

El elemento repetible es el **parche** en un polo y la **faceta/panel** en el otro. Ambos se
dibujan una vez y se instancian según la magnitud (§3).

### Eje 3 — individual ↔ colectivo → **los acompañantes** · ⚠️ ABIERTO — ELIGE TÚ

Este es el eje que peor se visualiza en abstracto, así que **la elección es del diseñador**, en
dos frentes.

**a) Qué vocabulario:**

| Opción | − Individual | + Colectivo | Coste |
|---|---|---|---|
| **A · Cuántos** | criatura sola | ~20, un enjambre | bajo — se dibuja *un* acompañante y se instancia |
| **B · Fusión** | individuo nítido, contorno cerrado | **el cuerpo *es* el enjambre** — banco de peces con forma de criatura | alto — el cuerpo se disuelve, rig complejo |
| **C · Conexión** | criatura sola, sin vínculos | **nodo indistinguible de la red** — micelio, malla, tejido continuo | medio — encaja muy bien en formas base fúngicas; ojo en las construidas, donde los hilos pueden leerse como cables |

Se pueden mezclar (A + C funciona bien: más acompañantes *y* más conectados).

**b) Cómo gradúa:** los ejes 2 y 4 gradúan repitiendo un elemento (§3). Este eje puede hacer lo
mismo de forma muy natural —contando acompañantes— o puede quedarse binario. Tú eliges.

**Criterio:** elige lo que mejor se sostenga en el polo colectivo sin comprometer la
legibilidad del avatar a tamaño pequeño.

> **⚠️ El polo individual necesita marcador propio, no la ausencia del otro.**
> Es lo que obliga la regla de que ningún eje tiene neutro (§3) y de que ningún polo puede verse
> peor que su opuesto (§12). Si "individual" se define simplemente como *no tener acompañantes*,
> pasan dos cosas malas: no hay nada que graduar en ese lado, y la ausencia siempre se lee como
> versión pobre.
>
> Así que el polo individual tiene que **afirmar algo**: un contorno cerrado y sellado, una
> coraza autosuficiente, un vínculo cortado, una soledad deliberada. Y ese marcador también
> tiene que poder intensificarse. *Estar solo* debe verse tan diseñado y tan digno como *ser
> legión*.

> **Consecuencia a tener en cuenta.** El aspecto `community` (actividad social real del usuario
> en la app) también quiere expresarse en los acompañantes. **El eje 3 elige primero** — es
> valor, y el valor manda sobre la actividad. Lo que quede libre es para `community`.
>
> La salida limpia, si el eje 3 se lleva número y conexión, es que `community` se lleve el
> **movimiento**: la misma composición de acompañantes, pero **dormida ↔ bulliciosa** (ritmo,
> órbita, agitación). Estructura vs movimiento son propiedades genuinamente disjuntas, así que
> siguen componiendo sin pelearse. Decisión pendiente — §13.

### Eje 4 — tecnocrático ↔ grassroots → **la geometría del cuerpo** · DECIDIDO

El marcador es **la jerarquía entre las partes del cuerpo** — literalmente, si hay un jefe:

| | Identidad (la decide el signo) | Gradación (la decide la magnitud) |
|---|---|---|
| **− Tecnocrático** | una parte **dominante** manda: cabeza, corona, torre; simetría bilateral | de un centro discreto a una corona imponente con módulos repetidos alineados bajo ella |
| **+ Grassroots** | **sin centro**: todas las partes equivalentes, ramificación sin jerarquía | de una o dos ramificaciones a un rizoma completo |

Por qué esto y no "simétrico vs asimétrico": porque el eje pregunta literalmente *quién manda*.
Un cuerpo con cabeza rectora frente a un cuerpo donde cualquier parte vale lo mismo **es** el
eje, no una metáfora suya. La simetría sale gratis como consecuencia.

El elemento repetible es el **módulo subordinado** en un polo y la **ramificación** en el otro.

### El reloj → **el aura** · DECIDIDO en concepto

Capa que se superpone a cualquier combinación: halo, partículas, carga luminosa. Crece con el
nivel del usuario. **No expresa ningún valor** — expresa cuánto juega.

Debe funcionar sobre las 8 combinaciones sin taparlas ni contradecirlas.

## 5b. El elemento → **el material del aura** · DECIDIDO

Cuatro elementos: **fuego, agua, aire, tierra**. Los **elige el usuario** en una de las primeras
preguntas del cuestionario, y son **lo único que elige**.

**No son un canal nuevo.** El reloj sigue mandando *cuánta* aura hay; el elemento manda **de qué
está hecha**:

| Elemento | El aura es… |
|---|---|
| **Fuego** | ascuas, chispas ascendentes, calor |
| **Agua** | gotas, ondas, corriente |
| **Aire** | motas en suspensión, ráfagas, vapor |
| **Tierra** | polvo, esporas, partículas sedimentarias |

**Restricciones:**

- **Ambiental y solo ambiental.** El elemento no toca el cuerpo: ni superficie, ni geometría, ni
  acompañantes, ni topología. Esos cuatro portadores ya están ocupados por los valores.
- **No puede tomar prestado el vocabulario de la superficie** (eje 2). Si el fuego trae acabados
  metálicos, colisiona con un canal de valores y además los avatares pierden variedad, porque
  quien elige fuego tiende a puntuar tecnológico.
- **Lectura ecológica, no esotérica.** En una app de ecología los cuatro elementos no son
  místicos: son los cuatro sistemas planetarios — energía, hidrosfera, atmósfera, litosfera. El
  lenguaje visual debe seguir esa lectura, no la del horóscopo.

**Coste: cuatro efectos ambientales, dibujados una sola vez.** Al ser ambientales y no ir sobre
el cuerpo, **no se multiplican por forma base** — es lo más barato de todo el encargo.

**Oportunidad:** como se elige en las primeras preguntas, el funnel puede mostrar el aura **ya
encendida** mientras el resto de la criatura se va resolviendo con las respuestas. El avatar
empieza a existir antes de terminar la encuesta.

---

## 6. Los dos polos se diseñan con el mismo cariño

**La instrucción más importante de todo el encargo.**

Como no hay estado intermedio, **cada usuario vive siempre en un polo de cada eje**. No hay
posición de reposo, no hay "por defecto": las 8 combinaciones son igual de reales y de
frecuentes.

De ahí la trampa a evitar: **que uno de los polos sea el dibujo original y el otro una
variación de él.** Si la criatura se dibuja metálica y luego "se le añade" el remiendo, el polo
metálico saldrá con más carácter y el remendado parecerá una versión degradada. Y eso, además
de flojo, incumple una regla dura (§12): **ningún polo puede verse peor que su opuesto.**

Cómo evitarlo:

- Dibuja la criatura en un estado de **construcción** —limpio, sin compromiso de eje— que sirva
  de base geométrica y **que nunca se muestra al usuario**.
- Desde ahí, autora **los dos polos de cada mando** como iguales, no como original y variante.
- Revísalos siempre **en pareja, uno al lado del otro**, nunca por separado.
- **Los dos polos necesitan su elemento repetible** para poder graduar (§3). Ninguno puede
  definirse como la ausencia del otro: la ausencia no se puede intensificar y siempre se lee
  como versión pobre.

*Atajo posible si el presupuesto aprieta:* tomar el dibujo de construcción como uno de los dos
polos y autorar solo el opuesto — 3 variantes en vez de 6. Es la mitad de trabajo, pero se paga
exactamente con el sesgo descrito arriba. Solo si hay que recortar.

---

## 7. Entregables

### Una vez, para todo el proyecto

1. **Hoja de lenguaje de valores** (§4).
2. **Paleta y reglas de familia** — lo que comparten todas las formas base.

### Por cada forma base

| # | Entregable | ¿Dibujo nuevo? |
|---|---|---|
| 1 | **La criatura**, completa y riggeada (estado de construcción, §6) | ✅ **la ilustración principal** |
| 2 | `idle` + `blink` — vida basal | animación |
| 3 | Superficie: polo **manufacturado** + su elemento repetible (faceta/panel) | recolor/retextura |
| 4 | Superficie: polo **remendado** + su elemento repetible (parche) | recolor/retextura |
| 5 | Geometría: polo **jerárquico** + su elemento repetible (módulo subordinado) | recolocar el rig |
| 6 | Geometría: polo **sin centro** + su elemento repetible (ramificación) | recolocar el rig |
| 7 | **El acompañante** | ✅ pieza pequeña |
| 8 | Compañía: polos individual / colectivo (según §5) | instanciar y colocar |
| 8b | Para cada polo de los ejes 2 y 4: **densidad mínima y máxima** del elemento repetible | reglas de colocación |
| 9 | **Aura** del reloj | ✅ efecto en capa |
| 10 | Máquina de estados con las capas cableadas | montaje |
| 11 | **Hoja de contactos** de verificación (§8) | revisión |

**Dibujos de verdad: tres.** La criatura, el acompañante y el aura. El resto son variantes de
esos mismos dibujos.

---

## 8. Verificación: la hoja de contactos

No es dibujar 8 cosas. Es **sentarse delante de Rive, recorrer las 8 combinaciones y mirar.**

Lo que se busca **no** son las combinaciones alineadas — esas salen bien solas (suficiencia +
colectivo + grassroots es coherente sin esfuerzo). Lo que hay que cazar son las
**contradictorias**, que son usuarios reales:

- **Manufacturado + colectivo + sin centro** — un enjambre cromado micelial. ¿Criatura o fallo
  de render?
- **Remendado + individual + jerárquico** — un ermitaño de barro con simetría perfecta.

Cuando una falla, **se arregla el polo, no la combinación** — y con eso se arregla en todas las
composiciones donde aparecía.

Además de las 8 identidades hay que mirar **los dos extremos de densidad** de cada una, y muy en
particular **el par de frontera**: la densidad mínima de un polo junto a la densidad mínima de
su opuesto (un parche vs una faceta). Es lo que ve alguien que oscila alrededor del cero, y el
salto entre ambos tiene que ser suave — si ahí hay un salto brusco, la gradación no está
haciendo su trabajo.

Todo tiene que sostenerse **a tamaño pequeño** y **con el aura encima**, en todos sus niveles.

---

## 9. ⚠️ PENDIENTE — cuántas formas base

**Decisión de producto, no del diseñador. Bloquea el encargo.**

Cada forma base multiplica entera la tabla de §7 (columna "por cada forma base"). Lo que **no**
se multiplica es la hoja de lenguaje ni los props — que es justo lo que da coherencia de
familia, y por eso ampliar más tarde sale barato.

**Tiene que ser un número par**, mitad a cada lado del eje: con un número impar la forma de en
medio sería un neutro encubierto, y no hay neutros en ningún eje (§3).

| | Reparto del eje 1 | Coste |
|---|---|---|
| **2** (recomendado para empezar) | construido *con rostro* · orgánico *sin rostro* | base |
| **4** | construido · animal │ vegetal · fúngico-colonial | ×2 |

Con 4, la **magnitud** elige cuál de las dos de tu lado te toca — misma regla que los demás
ejes. Con 2, basta el signo.

**Recomendación: empezar con 2.** Es el reparto más barato, el más legible (cara ↔ sin cara, no
hay ambigüedad posible) y el que permite validar antes si el eje 1 discrimina de verdad en la
población de ecomania. Pasar a 4 más tarde es puramente aditivo: las dos criaturas existentes
se quedan como el extremo de su lado.

---

## 10. Contrato técnico

- **Un `.riv` por forma base**, en `packages/shared/assets/`. Corre idéntico en app
  (`rive-react-native`) y web (`@rive-app/react-canvas`).
- **Los mandos se cablean como capas independientes** de la máquina de estados — una capa por
  mando, corriendo en paralelo.
- **Los inputs son numéricos `0..100`**, y usan todo el rango. **`50` es la frontera**: por
  debajo estás en el polo −, por encima en el polo +, y la distancia hasta `50` es la densidad
  del marcador. Así un solo input por mando lleva a la vez la identidad y la intensidad.
- **Los nombres de los inputs son contrato congelado.** Viven como constantes en
  `packages/shared/src/avatar/`. El diseñador puede re-animar, re-riggear y añadir estados con
  total libertad — **pero renombrar un input rompe las dos aplicaciones a la vez.** Cualquier
  cambio de nombre es una petición explícita, nunca un ajuste silencioso.
- **Nombres provisionales** (a confirmar al escribir el código):
  `surface`, `companions`, `geometry`, `aura`, `archetype` — alineados con los nombres de canal
  de `packages/shared/src/values/axes.ts`.
- **Rive:** el editor es gratis; **exportar `.riv` requiere el plan Cadet ($9/mes)**. Se activa
  cuando haya que exportar de verdad. Detalles en [`../rive-and-animation.md`](../../rive-and-animation.md).

---

## 11. Ejemplos concretos

Ninguno de estos está dibujado. Los cuatro salen de la criatura + las variantes de polo.

**🌿 Suficiencia + colectivo + grassroots, sobre base vegetal-fúngica**
Un hongo sin rostro, de fibra tejida con remiendos visibles, sin parte dominante —todos sus
lóbulos equivalentes— rodeado de esporas hijas. *Un comunero micelial.*

**🏙 Tecnológico + individual + tecnocrático, sobre base construida**
Una figura con rostro, superficie sin costuras que emite luz propia, sola, con una corona
claramente rectora y simetría bilateral perfecta. *Un tecnócrata luminoso.*

**⚡ Contradictoria — ecocéntrico + tecnológico + colectivo + tecnocrático**
Organismo vegetal sin rostro, de vidrio pulido luminoso, con acompañantes **en formación
simétrica** bajo una parte rectora. *Un jardín de cristal regimentado.* Raro pero coherente —
de los que hay que revisar en la hoja de contactos.

**🔨 Contradictoria — antropocéntrico + suficiencia + colectivo + grassroots**
Figura con rostro, de barro remendado, sin jefe, en asamblea. *Una asamblea de barro.*

---

## 12. Restricciones

- **Ningún polo puede ser el "malo".** Los cuatro ejes describen posiciones legítimas; ninguna
  puede verse más fea, más oscura o más pobre que su opuesta. Además de ser correcto, es
  requisito legal: los valores ecológicos son datos de categoría especial y el sistema no puede
  inducir respuestas. Con dos estados por eje esto se vuelve **más** crítico, no menos: no hay
  gradación que suavice nada, cada polo se muestra siempre a plena potencia.
- **Nada de iconografía literal en los ejes.** Un micrófono, una pancarta o una hoja de
  reciclaje no sirven como marcador de eje: son símbolos culturales estrechos y colapsan un eje
  ancho en una sola imagen. Los props valen para **motivos de arquetipo y cosméticos
  desbloqueables**.
- **Nada de lectura política izquierda-derecha.** Los ejes son ecológicos y deliberadamente más
  ricos que eso.
- **Legibilidad a tamaño pequeño** — el avatar aparece en listas y perfiles, no solo a pantalla
  completa.
- **El usuario no elige su aspecto.** Todo se deriva de sus respuestas; no hay personalización
  manual de los canales de valores.

---

## 13. Abierto / pendiente

| # | Qué | De quién es |
|---|---|---|
| 1 | **Cuántas formas base** (§9) | producto — **bloquea** |
| 2 | **Vocabulario del eje 3** (A / B / C o mezcla) **y si es discreto o continuo** (§5) | diseñador |
| 3 | Portadores de los aspectos `voice`, `knowledge` y `community` — sin asignar. `community` depende de lo que elija el eje 3; candidato: el **movimiento** de los acompañantes (§5). Ojo con el punto muerto: si el polo individual deja **cero** acompañantes, `community` se queda sin nada que animar para los usuarios individualistas — o se garantiza un mínimo de uno, o `community` tiene que apoyarse también en el cuerpo | producto + diseñador |
| 4 | Taxonomía de arquetipos: nombres, motivos, y cuáles comparten forma base | producto |
| 5 | Niveles del aura y su progresión | producto + diseñador |
| 6 | Nombres definitivos de los inputs (§10) | desarrollo |
