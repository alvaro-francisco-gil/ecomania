# Encargo de diseño — el ecoavatar

**Para: el diseñador. Documento de encargo.**

Companion de [`creative-core-exploration.md`](creative-core-exploration.md) (las decisiones de
producto), [`../projects/value-system.md`](../projects/value-system.md) (la fundamentación
académica de los ejes) y [`../rive-and-animation.md`](../rive-and-animation.md) (el flujo de
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
mandos numéricos que las combinan. El avatar de cada usuario es una posición en ese
instrumento, no una ilustración guardada.

Se construye en **Rive** (un `.riv` por forma base) y corre idéntico en la app nativa y en la
web.

---

## 2. El modelo, en una página

La identidad de un usuario son **cuatro números continuos**, uno por eje de valores. Cada uno
va de `−1` a `+1`, con `0` en el centro.

| Eje | Pregunta que responde | − | + |
|---|---|---|---|
| **1 · moral** | ¿Quién merece consideración moral? | Antropocéntrico — la naturaleza importa por lo que da a las personas | Ecocéntrico — la naturaleza vale por sí misma |
| **2 · medios** | ¿Cómo compatibilizamos bienestar y planeta? | Tecnológico — innovar y crecer mejor | Suficiencia — consumir menos, hay límites |
| **3 · agencia** | ¿De dónde viene el cambio? | Individual — decisiones personales | Colectivo — política y organización |
| **4 · autoridad** | ¿Quién debería mandar? | Tecnocrático — expertos e instituciones | Grassroots — comunidades y poder distribuido |

Y **aparte** de los valores, un quinto sistema:

- **El reloj** — cuánto juega y cuánto se implica el usuario (nivel, XP). Crece con el uso.
  **No es un valor.** Es el único que "sube"; los ejes no suben, se mueven.

### Cómo se reparte esto en el dibujo

| Sistema | Dónde vive visualmente |
|---|---|
| **Eje 1** | **La forma base** — es qué criatura te toca. No es un mando. |
| **Eje 2** | La **superficie** del cuerpo |
| **Eje 3** | Los **acompañantes** |
| **Eje 4** | La **geometría** del cuerpo |
| Reloj | El **aura** |

Es decir: **dentro de una forma base hay tres mandos de valores + el aura.** El eje 1 no es un
mando porque cambia la topología de la criatura, y eso no se interpola — es otro dibujo.

---

## 3. La regla de oro: paramétrico, no catálogo

**El diseñador nunca dibuja una combinación.** Dibuja la criatura una vez y define, por cada
mando, en qué se convierte en cada extremo. Rive compone.

Con 3 mandos × 3 estados hay **27 combinaciones posibles**, y se dibujan **cero**:

| | Enfoque catálogo | Este encargo |
|---|---|---|
| Piezas a autorar | 27 ilustraciones | **1 criatura + 6 variantes** |
| Resultados posibles | 27 | 27 |
| Si añadiéramos un mando | 81 | 8 |

El catálogo crece multiplicando; esto crece sumando. Es la única forma de que el encargo sea
asumible.

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

Cada forma base es un `.riv` distinto: criatura distinta, rig distinto. Se reparten a lo largo
del eje, y se distinguen por dos marcadores combinados:

| | **Reino** | **Rostro** |
|---|---|---|
| **− Antropocéntrico** | construido, geométrico, humanoide | tiene cara, ojos frontales |
| **· Centro** | animal, criatura reconocible | ojos no humanos, laterales |
| **+ Ecocéntrico** | vegetal, fúngico, colonial | **sin rostro** |

El **rostro** es el marcador clave: perder la cara *es* perder el marco humano. Una criatura
sin rostro no invita a proyectarse en ella, y eso es exactamente lo que dice el polo
ecocéntrico.

### Eje 2 — tecnológico ↔ suficiencia → **la superficie** · DECIDIDO

El marcador no es *de qué está hecho* sino **cómo fue hecho**:

| | Superficie |
|---|---|
| **− Tecnológico** | manufactura perfecta, **sin costuras**, pulida, puede emitir luz propia |
| **· Centro** | cerámica esmaltada — material íntegro y honesto, con marcas de torno |
| **+ Suficiencia** | tejido a mano, irregular, **con remiendos visibles**; grietas rellenas, parches |

Por qué "cómo fue hecho" y no "de qué material": porque suficiencia significa **reparar en vez
de reemplazar**. Un cuerpo con costuras cosidas a la vista dice eso sin necesidad de explicarlo.
Es argumento, no decoración.

> El centro **no es** una mezcla de metal y barro. Es un tercer material íntegro por derecho
> propio. Ver §6.

### Eje 3 — individual ↔ colectivo → **los acompañantes** · ⚠️ ABIERTO — ELIGE TÚ

Este es el eje que peor se visualiza en abstracto, así que la elección de vocabulario es del
diseñador. Dos candidatos:

**Opción A · Cuántos son**

| − Individual | · Centro | + Colectivo |
|---|---|---|
| criatura sola | 2–3 acompañantes pequeños | ~20, un enjambre |

Barato de construir: se dibuja **un** acompañante y se instancia. Legible al instante.
Riesgo: puede leerse como "mascotas" en vez de como colectividad.

**Opción B · Grado de fusión**

| − Individual | · Centro | + Colectivo |
|---|---|---|
| individuo nítido, contorno cerrado | contorno con siluetas fantasma alrededor | **el cuerpo *es* el enjambre** — como un banco de peces con forma de criatura |

Mucho más potente y evita del todo la lectura de mascota, pero es bastante más caro: en el
extremo el cuerpo se disuelve, y eso es rig complejo.

**Opción C · Conexión**

| − Individual | · Centro | + Colectivo |
|---|---|---|
| criatura sola, sin vínculos | unida por unos pocos hilos a acompañantes sueltos | **nodo indistinguible de la red** — micelio, malla, tejido continuo |

Coste intermedio. Es la lectura más precisa del eje —"el cambio viene de la estructura, no del
individuo"— y encaja especialmente bien con las formas base fúngicas y coloniales. Riesgo: en
las formas base construidas o animales los hilos pueden leerse como cables o correas, que es
otra cosa.

**Criterio para elegir:** las tres son válidas y se pueden mezclar (A + C juntas funcionan: más
acompañantes *y* más conectados). El filtro es el neutro: si el extremo colectivo de B o C
compromete la legibilidad del centro o exige rehacer el rig, ve con A y guarda la otra como
ampliación.

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

| | Geometría |
|---|---|
| **− Tecnocrático** | una parte **dominante** manda: cabeza, corona, torre; simetría bilateral perfecta; crecimiento modular repetido |
| **· Centro** | centro suave, simetría radial orgánica (helecho, anémona) |
| **+ Grassroots** | **sin centro**: todas las partes equivalentes, rizomático, ramificación sin jerarquía |

Por qué esto y no "simétrico vs asimétrico": porque el eje pregunta literalmente *quién manda*.
Un cuerpo con cabeza rectora frente a un cuerpo donde cualquier parte vale lo mismo **es** el
eje, no una metáfora suya. La simetría sale gratis como consecuencia.

### El reloj → **el aura** · DECIDIDO en concepto

Capa que se superpone a cualquier combinación: halo, partículas, carga luminosa. Crece con el
nivel del usuario. **No expresa ningún valor** — expresa cuánto juega.

Debe funcionar sobre las 27 combinaciones sin taparlas ni contradecirlas.

---

## 6. El neutro se diseña PRIMERO

**La instrucción más importante de todo el encargo.**

El **avatar neutro** es la criatura con los tres mandos en el centro: cerámica esmaltada,
geometría radial orgánica, compañía mínima.

No es un placeholder ni un gris. Es **un diseño terminado que da la casualidad de estar en el
centro** — y cada mando tiene su propio marcador central, que **no es la media de los polos**
(cerámica no es medio metal medio barro; radial no es una simetría a medio romper).

Por qué importa tanto: el sistema arranca amortiguado. Un usuario nuevo nace en el centro y
**se queda cerca durante semanas**, ganando carácter según responde. El neutro es, con
diferencia, el avatar más visto del producto — y es el que decide si alguien se queda.

**Si se diseñan primero los polos, el centro sale como promedio: un resto sin carácter.** Por
eso el orden es: neutro terminado y aprobado → después los polos, derivados de él.

---

## 7. Entregables

### Una vez, para todo el proyecto

1. **Hoja de lenguaje de valores** (§4).
2. **Paleta y reglas de familia** — lo que comparten todas las formas base.

### Por cada forma base

| # | Entregable | ¿Dibujo nuevo? |
|---|---|---|
| 1 | **La criatura neutra**, completa y riggeada | ✅ **la ilustración principal** |
| 2 | `idle` + `blink` — vida basal | animación |
| 3 | Superficie: variante **manufacturada** | recolor/retextura |
| 4 | Superficie: variante **remendada** | recolor/retextura |
| 5 | Geometría: pose **jerárquica** | recolocar el rig |
| 6 | Geometría: pose **sin centro** | recolocar el rig |
| 7 | **El acompañante** | ✅ pieza pequeña |
| 8 | Compañía: estados pocos / enjambre | instanciar y colocar |
| 9 | **Aura** del reloj | ✅ efecto en capa |
| 10 | Máquina de estados con las capas cableadas | montaje |
| 11 | **Hoja de contactos** de verificación (§8) | revisión |

**Dibujos de verdad: tres.** La criatura, el acompañante y el aura. El resto son variantes de
esos mismos dibujos.

---

## 8. Verificación: la hoja de contactos

No es dibujar 27 cosas. Es **sentarse delante de Rive, recorrer las 27 esquinas moviendo los
tres mandos, y mirar.**

Lo que se busca **no** son las combinaciones alineadas — esas salen bien solas (suficiencia +
colectivo + grassroots es coherente sin esfuerzo). Lo que hay que cazar son las
**contradictorias**, que son usuarios reales:

- **Metálico + enjambre + rizomático** — un enjambre cromado micelial. ¿Criatura o fallo de render?
- **Remendado + solo + jerárquico** — un ermitaño de barro con simetría perfecta.

Cuando una falla, **se arregla la variante, no la combinación** — y con eso se arregla en todas
las composiciones donde aparecía.

---

## 9. ⚠️ PENDIENTE — cuántas formas base

**Decisión de producto, no del diseñador. Bloquea el encargo.**

Cada forma base multiplica entera la tabla de §7 (columna "por cada forma base"). Lo que **no**
se multiplica es la hoja de lenguaje ni los props — que es justo lo que da coherencia de
familia, y por eso ampliar más tarde sale barato.

| | Reparto del eje 1 | Coste |
|---|---|---|
| **3** (recomendado para empezar) | construido · animal · vegetal-fúngico | base |
| **4** | construido · animal · vegetal · fúngico-colonial | +33% |

**Recomendación: empezar con 3.** La cuarta se añade cuando haya datos reales que confirmen que
el eje 1 discrimina de verdad en la población de ecomania.

---

## 10. Contrato técnico

- **Un `.riv` por forma base**, en `packages/shared/assets/`. Corre idéntico en app
  (`rive-react-native`) y web (`@rive-app/react-canvas`).
- **Los mandos son inputs numéricos con nombre** (`0..100`), cableados como **capas
  independientes** de la máquina de estados — una capa por mando, corriendo en paralelo.
- **Los nombres de los inputs son contrato congelado.** Viven como constantes en
  `packages/shared/src/avatar/`. El diseñador puede re-animar, re-riggear y añadir estados con
  total libertad — **pero renombrar un input rompe las dos aplicaciones a la vez.** Cualquier
  cambio de nombre es una petición explícita, nunca un ajuste silencioso.
- **Nombres provisionales** (a confirmar al escribir el código):
  `surface`, `companions`, `order`, `aura`, `archetype`.
- **Rive:** el editor es gratis; **exportar `.riv` requiere el plan Cadet ($9/mes)**. Se activa
  cuando haya que exportar de verdad. Detalles en [`../rive-and-animation.md`](../rive-and-animation.md).

---

## 11. Ejemplos concretos

Ninguno de estos está dibujado. Los cuatro salen de la criatura + 6 variantes.

**🌿 Suficiencia + colectivo + grassroots, sobre base vegetal-fúngica**
Un hongo sin rostro, de fibra tejida con remiendos visibles, sin parte dominante —todos sus
lóbulos equivalentes— rodeado de veinte esporas hijas. *Un comunero micelial.*

**🏙 Tecnológico + individual + tecnocrático, sobre base construida**
Una figura con rostro, superficie sin costuras que emite luz propia, sola, con una corona
claramente rectora y simetría bilateral perfecta. *Un tecnócrata luminoso.*

**⚡ Contradictoria — ecocéntrico + tecnológico + colectivo + tecnocrático**
Organismo vegetal sin rostro, de vidrio pulido luminoso, con veinte acompañantes **en formación
simétrica** bajo una parte rectora. *Un jardín de cristal regimentado.* Raro pero coherente —
de los que hay que revisar en la hoja de contactos.

**🔨 Contradictoria — antropocéntrico + suficiencia + colectivo + grassroots**
Figura con rostro, de barro remendado, sin jefe, en asamblea. *Una asamblea de barro.*

---

## 12. Restricciones

- **Nada de iconografía literal en los ejes.** Un micrófono, una pancarta o una hoja de reciclaje
  no sirven como marcador de eje: no se pueden mostrar "al 40%", así que aparecerían de golpe y
  romperían la continuidad. Los props valen para **motivos de arquetipo y cosméticos
  desbloqueables**, que sí son discretos.
- **Nada de lectura política izquierda-derecha.** Los ejes son ecológicos y deliberadamente más
  ricos que eso.
- **Ningún polo puede ser el "malo".** Los cuatro ejes describen posiciones legítimas; ninguna
  puede verse más fea, más oscura o más pobre que su opuesta. (Además de ser correcto, es
  requisito legal: los valores ecológicos son datos de categoría especial y el instrumento no
  puede inducir respuestas.)
- **El neutro no puede ser feo.** Ver §6.
- Todo tiene que **legibilidad a tamaño pequeño** — el avatar aparece en listas y perfiles, no
  solo a pantalla completa.

---

## 13. Abierto / pendiente

| # | Qué | De quién es |
|---|---|---|
| 1 | **Cuántas formas base** (§9) | producto — **bloquea** |
| 2 | **Vocabulario del eje 3** — opción A, B o C, o mezcla (§5) | diseñador |
| 3 | Portadores de los aspectos `voice`, `knowledge` y `community` — sin asignar. `community` depende de lo que elija el eje 3; candidato: el **movimiento** de los acompañantes (§5). Ojo con el punto muerto: si el polo individual deja **cero** acompañantes, `community` se queda sin nada que animar para los usuarios individualistas — o se garantiza un mínimo de uno, o `community` tiene que apoyarse también en el cuerpo | producto + diseñador |
| 4 | Taxonomía de arquetipos: nombres, motivos, y cuáles comparten forma base | producto |
| 5 | Niveles del aura y su progresión | producto + diseñador |
| 6 | Nombres definitivos de los inputs (§10) | desarrollo |
